
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface QuickActionsProps {
  subscriptionPlan: string;
}

export const QuickActions = ({ subscriptionPlan }: QuickActionsProps) => {
  const navigate = useNavigate();

  const getActions = (plan: string) => {
    const baseActions = [
      { icon: '📓', label: 'Fill Today\'s Check-In', link: '/checkin' },
      { icon: '📖', label: 'Journal', link: '/journal' },
      { icon: '🛍️', label: 'View Shop', link: '/shop' }
    ];

    if (plan === 'premium' || plan === 'standard') {
      baseActions.splice(1, 0, 
        { icon: '🧘', label: 'Knowledge Hub', link: '/dashboard/library' },
        { icon: '📢', label: 'Blog', link: '/dashboard/blog' }
      );
    }

    if (plan === 'otp') {
      return [baseActions[0]]; // Only check-in for OTP
    }

    return baseActions;
  };

  const actions = getActions(subscriptionPlan);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {actions.map((action, index) => (
              <Button
                key={index}
                onClick={() => navigate(action.link)}
                variant="outline"
                className="h-20 flex-col gap-2 hover:bg-orange-50 hover:border-orange-200 transition-all hover:scale-105"
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="text-xs text-center leading-tight">
                  {action.label}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
