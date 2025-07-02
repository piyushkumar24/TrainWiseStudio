
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const QuickStats = () => {
  const navigate = useNavigate();

  const stats = [
    {
      label: 'Training Consistency',
      value: '80%',
      icon: '🏃‍♂️',
      color: 'text-green-600'
    },
    {
      label: 'Weight Change',
      value: '-1.5kg',
      subtitle: 'this month',
      icon: '⚖️',
      color: 'text-blue-600'
    },
    {
      label: 'Mood Average',
      value: '4.5/5',
      icon: '😊',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-900">
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Your Progress at a Glance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-gray-50">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                  {stat.subtitle && <div className="text-xs">{stat.subtitle}</div>}
                </div>
              </div>
            ))}
          </div>
          
          <Button
            onClick={() => navigate('/dashboard/progress')}
            variant="outline"
            className="w-full"
          >
            See Full Progress
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
