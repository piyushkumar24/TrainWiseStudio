
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, Shield, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

interface CurrentPlan {
  type: 'Premium' | 'Standard' | 'Trial' | 'OTP' | null;
  expiresOn?: string;
  isSubscription: boolean;
  status: 'Active' | 'Expires Soon' | 'Expired';
  daysLeft?: number;
}

interface CurrentPlanCardProps {
  currentPlan: CurrentPlan;
  onUpgrade: () => void;
  onCancel: () => void;
  onUpdatePayment: () => void;
}

export const CurrentPlanCard = ({ currentPlan, onUpgrade, onCancel, onUpdatePayment }: CurrentPlanCardProps) => {
  const getPlanIcon = (type: string) => {
    switch (type) {
      case 'Premium':
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 'Standard':
        return <Shield className="h-5 w-5 text-blue-500" />;
      case 'Trial':
        return <Zap className="h-5 w-5 text-purple-500" />;
      case 'OTP':
        return <Zap className="h-5 w-5 text-orange-500" />;
      default:
        return <Shield className="h-5 w-5 text-gray-500" />;
    }
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Expires Soon':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'Expired':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDaysLeft = (expiresOn: string) => {
    const today = new Date();
    const expiry = new Date(expiresOn);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  if (!currentPlan.type) {
    return (
      <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <Shield className="h-12 w-12 text-orange-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Choose a Plan to Continue</h3>
            <p className="text-gray-600">
              Select a plan to access your personalized wellness programs and start your journey.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const daysLeft = currentPlan.expiresOn ? calculateDaysLeft(currentPlan.expiresOn) : 0;

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getPlanIcon(currentPlan.type)}
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {currentPlan.type} Plan
              </h2>
              {currentPlan.type === 'Trial' && (
                <p className="text-sm text-gray-600">
                  14-day free trial
                </p>
              )}
            </div>
          </div>
          <Badge className={getStatusBadgeColor(currentPlan.status)}>
            <div className="flex items-center gap-1">
              {getStatusIcon(currentPlan.status)}
              {currentPlan.status}
            </div>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Plan Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>
                {currentPlan.isSubscription ? 'Renews on' : 'Expires on'}
              </span>
            </div>
            {currentPlan.expiresOn && (
              <p className="font-medium text-gray-900">
                {formatDate(currentPlan.expiresOn)}
              </p>
            )}
          </div>
          
          {(currentPlan.type === 'Trial' || currentPlan.type === 'OTP') && daysLeft > 0 && (
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Time remaining</div>
              <div className="font-bold text-lg">
                <span className={daysLeft <= 3 ? 'text-red-600' : 'text-gray-900'}>
                  {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Trial Countdown */}
        {currentPlan.type === 'Trial' && daysLeft <= 3 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="font-medium text-yellow-800">Trial ending soon</span>
            </div>
            <p className="text-sm text-yellow-700">
              Your trial expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''}. Choose a plan to continue your wellness journey.
            </p>
          </div>
        )}

        {/* OTP Renewal Notice */}
        {currentPlan.type === 'OTP' && daysLeft <= 7 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <span className="font-medium text-orange-800">Plan expires soon</span>
            </div>
            <p className="text-sm text-orange-700">
              Expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''} — renew to continue accessing your programs.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
          {(currentPlan.type === 'OTP' || currentPlan.type === 'Standard' || currentPlan.type === 'Trial') && (
            <Button 
              onClick={onUpgrade} 
              className="bg-orange-500 hover:bg-orange-600 text-white flex-1"
            >
              {currentPlan.type === 'Trial' ? 'Choose Plan' : 'Upgrade Plan'}
            </Button>
          )}
          
          {currentPlan.isSubscription && currentPlan.status === 'Active' && (
            <>
              <Button 
                variant="outline" 
                onClick={onUpdatePayment}
                className="flex-1"
              >
                Update Payment Info
              </Button>
              <Button 
                variant="outline" 
                onClick={onCancel}
                className="text-red-600 border-red-200 hover:bg-red-50 flex-1"
              >
                Cancel Subscription
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
