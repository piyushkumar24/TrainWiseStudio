
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CalendarDays, Crown, Zap, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { PlanCard } from '@/components/customer/plan/PlanCard';
import { CurrentPlanCard } from '@/components/customer/plan/CurrentPlanCard';

interface PaymentHistoryItem {
  date: string;
  plan: string;
  amount: string;
  status: 'Paid' | 'Failed' | 'Cancelled';
}

interface CurrentPlan {
  type: 'Premium' | 'Standard' | 'Trial' | 'OTP' | null;
  expiresOn?: string;
  isSubscription: boolean;
  status: 'Active' | 'Expires Soon' | 'Expired';
  daysLeft?: number;
}

const CustomerPlan = () => {
  const [showPlans, setShowPlans] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Dummy data - replace with real data from Supabase
  const currentPlan: CurrentPlan = {
    type: 'Standard',
    expiresOn: '2025-07-25',
    isSubscription: true,
    status: 'Active',
  };

  const paymentHistory: PaymentHistoryItem[] = [
    { date: '2025-06-25', plan: 'Standard', amount: '€19', status: 'Paid' },
    { date: '2025-05-25', plan: 'Standard', amount: '€19', status: 'Paid' },
    { date: '2025-04-25', plan: 'Standard', amount: '€19', status: 'Paid' },
  ];

  const plans = [
    {
      id: 'otp',
      name: 'One-Time Plan',
      emoji: '⚡',
      price: '€9.99',
      duration: '1 month access',
      description: 'Perfect for trying out one specific area',
      features: [
        'Choose 1 category (Fitness, Nutrition, or Mental Health)',
        'Access for 1 month',
        'No automatic renewal',
        'Basic support'
      ],
      popular: false,
    },
    {
      id: 'standard',
      name: 'Standard Subscription',
      emoji: '🏋️',
      price: '€19/month',
      duration: 'Monthly renewal',
      description: 'Focus on one area with ongoing support',
      features: [
        '1 selected category',
        'Monthly renewal',
        'Blog + Knowledge Hub access',
        'Email support',
        'Progress tracking'
      ],
      popular: false,
    },
    {
      id: 'premium',
      name: 'Premium Subscription',
      emoji: '👑',
      price: '€39/month',
      duration: 'Monthly renewal',
      description: 'Complete wellness transformation',
      features: [
        'All 3 categories (Fitness, Nutrition, Mental Health)',
        'Full platform access',
        'Progression tracking & analytics',
        'Personal coach feedback',
        'Priority support',
        'Exclusive content'
      ],
      popular: true,
    },
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    // TODO: Integrate with Stripe Checkout
    console.log('Selected plan:', planId);
  };

  const handleUpgrade = () => {
    setShowPlans(true);
  };

  const handleCancelSubscription = () => {
    // TODO: Integrate with Stripe Billing Portal
    console.log('Cancel subscription');
  };

  const handleUpdatePayment = () => {
    // TODO: Integrate with Stripe Billing Portal
    console.log('Update payment info');
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Expires Soon':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Expired':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'text-green-600';
      case 'Failed':
        return 'text-red-600';
      case 'Cancelled':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            💳 My Plan
          </h1>
          <p className="text-gray-600">
            Manage your subscription, view billing history, and explore available options.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Expired Plan Alert */}
        {currentPlan.status === 'Expired' && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Your plan has expired. Select a new plan to continue accessing your programs and features.
            </AlertDescription>
          </Alert>
        )}

        {/* Current Plan Card */}
        <CurrentPlanCard
          currentPlan={currentPlan}
          onUpgrade={handleUpgrade}
          onCancel={handleCancelSubscription}
          onUpdatePayment={handleUpdatePayment}
        />

        {/* Available Plans Section */}
        {(showPlans || currentPlan.status === 'Expired' || !currentPlan.type) && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                Choose Your Plan
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Select the perfect plan for your wellness journey. All plans include access to expert guidance and premium content.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onSelect={() => handlePlanSelect(plan.id)}
                  isSelected={selectedPlan === plan.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* Payment History */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-orange-500" />
              Payment History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {paymentHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistory.map((payment, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {new Date(payment.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </TableCell>
                        <TableCell>{payment.plan}</TableCell>
                        <TableCell className="font-semibold">{payment.amount}</TableCell>
                        <TableCell>
                          <span className={`font-medium ${getPaymentStatusColor(payment.status)}`}>
                            {payment.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarDays className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No payment history</h3>
                <p className="text-gray-600">Your payment history will appear here once you make your first purchase.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerPlan;
