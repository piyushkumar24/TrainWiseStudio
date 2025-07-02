
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface MotivationCardProps {
  message: string;
  sentAt: string;
}

export const MotivationCard = ({ message, sentAt }: MotivationCardProps) => {
  if (!message) return null;

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-700">
      <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl flex-shrink-0">
              💬
            </div>
            <div className="flex-1">
              <p className="text-gray-700 font-medium mb-2">Daily Motivation</p>
              <p className="text-gray-900 text-lg mb-3">{message}</p>
              <p className="text-sm text-gray-500">Sent at {sentAt}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
