import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";
import { stripe, SUBSCRIPTION_PLANS } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { planType } = await req.json();

    // Validate plan type
    if (!["TRIAL", "OTP", "STANDARD", "PREMIUM"].includes(planType)) {
      return NextResponse.json(
        { message: "Invalid plan type" },
        { status: 400 }
      );
    }

    // Get or create Stripe customer
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        subscriptions: {
          where: {
            status: "ACTIVE",
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Check if user already has an active subscription
    const hasActiveSubscription = user.subscriptions.length > 0;
    
    // For trial plan, create subscription directly in database
    if (planType === "TRIAL") {
      // Check if user has already used trial
      const hasUsedTrial = await prisma.subscription.findFirst({
        where: {
          userId: user.id,
          planType: "TRIAL",
        },
      });

      if (hasUsedTrial) {
        return NextResponse.json(
          { message: "Trial already used" },
          { status: 400 }
        );
      }

      // Create trial subscription
      const now = new Date();
      const trialEndDate = new Date(now);
      trialEndDate.setDate(now.getDate() + 14); // 14-day trial

      await prisma.subscription.create({
        data: {
          userId: user.id,
          planType: "TRIAL",
          startDate: now,
          endDate: trialEndDate,
          status: "ACTIVE",
        },
      });

      return NextResponse.json(
        { message: "Trial activated successfully" },
        { status: 200 }
      );
    }

    // For paid plans, create Stripe checkout session
    let stripeCustomerId = user.subscriptions[0]?.stripeCustomerId;

    // If no existing customer ID, create a new customer
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name || undefined,
        metadata: {
          userId: user.id,
        },
      });
      stripeCustomerId = customer.id;
    }

    // Get price ID based on plan type
    const priceId = SUBSCRIPTION_PLANS[planType];

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXTAUTH_URL}/dashboard/checkout?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/checkout?canceled=true`,
      subscription_data: {
        metadata: {
          userId: user.id,
          planType,
        },
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { message: "An error occurred during checkout" },
      { status: 500 }
    );
  }
} 