
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Crown, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PremiumRequired = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 text-center">
        <div className="space-y-6">
          {/* Icon */}
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
            <Lock className="h-10 w-10 text-orange-600" />
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <Crown className="h-6 w-6 text-orange-500" />
              Premium Only
            </h1>
            <p className="text-gray-600 leading-relaxed">
              The Progression page is exclusively available for Premium subscribers. 
              Upgrade your plan to unlock detailed progress tracking, coach feedback, 
              and comprehensive analytics.
            </p>
          </div>

          {/* Features */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">What you'll get:</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                <span>Detailed progress graphs and analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                <span>Direct feedback from your coach</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                <span>Complete check-in history tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                <span>Program completion statistics</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/dashboard/plan')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Premium
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="w-full"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
