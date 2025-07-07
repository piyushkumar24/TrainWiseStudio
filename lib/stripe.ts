import Stripe from 'stripe';

// This is a placeholder for your actual Stripe secret key
// In production, this should be stored in an environment variable
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';

// Initialize Stripe client
export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16' as any, // Type assertion to bypass version check
});

// Define subscription plan IDs
export const SUBSCRIPTION_PLANS = {
  TRIAL: 'price_1RgYDiPL9sQgSKUW2b3nOQVz', // Trial Plan Price ID
  OTP: 'price_1RgYEoPL9sQgSKUWu0cm30os', // OTP Plan Price ID
  STANDARD: 'price_1RgYFDPL9sQgSKUWtqhC2Rqi', // Standard Plan Price ID
  PREMIUM: 'price_1RgYFXPL9sQgSKUWPRphaplz', // Premium Plan Price ID
};

// Create a checkout session for subscription
export async function createCheckoutSession(customerId: string, priceId: string, returnUrl: string) {
  try {
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${returnUrl}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnUrl}?canceled=true`,
    });

    return { sessionId: session.id };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new Error('Failed to create checkout session');
  }
}

// Create a Stripe customer
export async function createCustomer(email: string, name: string) {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
    });

    return customer;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw new Error('Failed to create customer');
  }
}

// Cancel a subscription
export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId);
    return subscription;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw new Error('Failed to cancel subscription');
  }
}

// Get subscription details
export async function getSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    throw new Error('Failed to retrieve subscription');
  }
} 