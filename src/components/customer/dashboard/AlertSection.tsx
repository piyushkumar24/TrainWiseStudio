
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';

interface AlertData {
  type: 'payment' | 'no_plan' | 'expiring' | 'expired' | 'missed_checkins' | 'feedback';
  message: string;
  priority: number;
  action?: {
    text: string;
    link: string;
  };
}

interface AlertSectionProps {
  alerts: AlertData[];
}

export const AlertSection = ({ alerts }: AlertSectionProps) => {
  const navigate = useNavigate();

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'payment':
      case 'expired':
        return 'border-red-200 bg-red-50';
      case 'no_plan':
      case 'missed_checkins':
        return 'border-yellow-200 bg-yellow-50';
      case 'expiring':
        return 'border-orange-200 bg-orange-50';
      case 'feedback':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'payment':
      case 'expired':
        return '❌';
      case 'no_plan':
        return '⚠️';
      case 'expiring':
        return '⏳';
      case 'missed_checkins':
        return '⏰';
      case 'feedback':
        return '💬';
      default:
        return '📢';
    }
  };

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => (
        <div 
          key={index}
          className="animate-in fade-in slide-in-from-right-4 duration-500"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <Card className={`${getAlertColor(alert.type)} border-l-4`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-1">
                  {getAlertIcon(alert.type)}
                </span>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium mb-2">
                    {alert.message}
                  </p>
                  {alert.action && (
                    <Button
                      onClick={() => navigate(alert.action!.link)}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                      size="sm"
                    >
                      {alert.action.text}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};
