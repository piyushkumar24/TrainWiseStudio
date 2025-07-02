import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

// This is your Stripe webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
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
      }
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
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
    if (priceId.includes("premium")) {
      planType = "PREMIUM";
    } else if (priceId.includes("standard")) {
      planType = "STANDARD";
    } else if (priceId.includes("otp")) {
      planType = "OTP";
    } else {
      planType = "TRIAL";
    }

    // Update or create subscription in database
    await prisma.subscription.upsert({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      update: {
        status: subscription.status === "active" ? "ACTIVE" : "CANCELLED",
        startDate: new Date(subscription.current_period_start * 1000),
        endDate: new Date(subscription.current_period_end * 1000),
      },
      create: {
        userId: user.id,
        planType: planType as any,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        status: subscription.status === "active" ? "ACTIVE" : "CANCELLED",
        startDate: new Date(subscription.current_period_start * 1000),
        endDate: new Date(subscription.current_period_end * 1000),
      },
    });

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
    const subscription = await stripe.subscriptions.retrieve(
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

    // Update user's Stripe customer ID if needed
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        subscriptions: {
          create: {
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: subscription.id,
            planType: "STANDARD" as any, // Default to standard, will be updated by subscription event
            status: "ACTIVE",
            startDate: new Date(subscription.current_period_start * 1000),
            endDate: new Date(subscription.current_period_end * 1000),
          },
        },
      },
    });

    console.log(`Created subscription for user: ${user.id}`);
  } catch (error) {
    console.error("Error handling checkout session:", error);
  }
} 