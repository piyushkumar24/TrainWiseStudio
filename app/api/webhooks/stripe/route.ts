import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

// This is your Stripe webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature") || "";

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error(`Webhook Error: ${errorMessage}`);
      return NextResponse.json(
        { error: `Webhook Error: ${errorMessage}` },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCancellation(deletedSubscription);
        break;
      case "checkout.session.completed":
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        if (checkoutSession.mode === "subscription") {
          await handleCheckoutSessionCompleted(checkoutSession);
        } else if (checkoutSession.mode === "payment") {
          await handleOneTimePayment(checkoutSession);
        }
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error in webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  try {
    // Find user by Stripe customer ID
    const user = await prisma.user.findFirst({
      where: {
        subscriptions: {
          some: {
            stripeCustomerId: subscription.customer as string,
          },
        },
      },
    });

    if (!user) {
      console.error("User not found for subscription:", subscription.id);
      return;
    }

    // Get subscription item
    const item = subscription.items.data[0];
    const priceId = item.price.id;

    // Determine plan type based on price ID
    let planType;
    switch (priceId) {
      case 'price_1RgYFXPL9sQgSKUWPRphaplz':
        planType = "PREMIUM";
        break;
      case 'price_1RgYFDPL9sQgSKUWtqhC2Rqi':
        planType = "STANDARD";
        break;
      case 'price_1RgYEoPL9sQgSKUWu0cm30os':
        planType = "OTP";
        break;
      case 'price_1RgYDiPL9sQgSKUW2b3nOQVz':
        planType = "TRIAL";
        break;
      default:
        console.log(`Unknown price ID: ${priceId}`);
        planType = "STANDARD"; // Default to STANDARD if unknown
    }

    // Find existing subscription
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        stripeSubscriptionId: subscription.id,
      },
    });

    // Convert timestamp to Date using type assertion
    const stripeObj = subscription as unknown as { current_period_start: number; current_period_end: number };
    const startDate = new Date(Number(stripeObj.current_period_start) * 1000);
    const endDate = new Date(Number(stripeObj.current_period_end) * 1000);

    if (existingSubscription) {
      // Update existing subscription
      await prisma.subscription.update({
        where: {
          id: existingSubscription.id,
        },
        data: {
          status: subscription.status === "active" ? "ACTIVE" : "CANCELLED",
          startDate,
          endDate,
        },
      });
    } else {
      // Create new subscription
      await prisma.subscription.create({
        data: {
          userId: user.id,
          planType: planType as any,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          status: subscription.status === "active" ? "ACTIVE" : "CANCELLED",
          startDate,
          endDate,
        },
      });
    }

    console.log(`Updated subscription for user: ${user.id}`);
  } catch (error) {
    console.error("Error handling subscription change:", error);
  }
}

async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  try {
    // Update subscription status in database
    await prisma.subscription.updateMany({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        status: "CANCELLED",
      },
    });

    console.log(`Cancelled subscription: ${subscription.id}`);
  } catch (error) {
    console.error("Error handling subscription cancellation:", error);
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    if (!session.customer || !session.subscription) {
      console.error("Missing customer or subscription ID in session:", session.id);
      return;
    }

    // Get subscription details
    const subscriptionData = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    // Find user by customer ID
    const user = await prisma.user.findFirst({
      where: {
        email: session.customer_email as string,
      },
    });

    if (!user) {
      console.error("User not found for session:", session.id);
      return;
    }

    // Convert timestamp to Date using type assertion
    const stripeObj = subscriptionData as unknown as { current_period_start: number; current_period_end: number };
    const startDate = new Date(Number(stripeObj.current_period_start) * 1000);
    const endDate = new Date(Number(stripeObj.current_period_end) * 1000);

    // Update user's Stripe customer ID if needed
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        subscriptions: {
          create: {
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: subscriptionData.id,
            planType: "STANDARD" as any, // Default to standard, will be updated by subscription event
            status: "ACTIVE",
            startDate,
            endDate,
          },
        },
      },
    });

    console.log(`Created subscription for user: ${user.id}`);
  } catch (error) {
    console.error("Error handling checkout session:", error);
  }
}

async function handleOneTimePayment(session: Stripe.Checkout.Session) {
  try {
    // Extract user ID from metadata
    const userId = session.metadata?.userId;
    const planType = session.metadata?.planType;
    
    if (!userId || planType !== 'OTP') {
      console.error("Missing userId or invalid planType in metadata:", session.metadata);
      return;
    }
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      console.error("User not found for OTP payment:", userId);
      return;
    }
    
    // Calculate end date (typically 30 days for OTP)
    const now = new Date();
    const endDate = new Date(now);
    endDate.setDate(now.getDate() + 30); // 30-day access
    
    // Create subscription record for the one-time payment
    await prisma.subscription.create({
      data: {
        userId,
        planType: "OTP",
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: session.id, // Use session ID since there's no subscription ID
        status: "ACTIVE",
        startDate: now,
        endDate,
      },
    });
    
    console.log(`Created OTP subscription for user: ${userId}`);
  } catch (error) {
    console.error("Error handling one-time payment:", error);
  }
} 