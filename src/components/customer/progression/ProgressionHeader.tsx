
import React from 'react';
import { TrendingUp } from 'lucide-react';

export const ProgressionHeader = () => {
  return (
    <div className="space-y-2 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-orange-100 rounded-lg">
          <TrendingUp className="h-6 w-6 text-orange-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          📈 Progression
        </h1>
      </div>
      <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
        Track your journey across fitness, nutrition and mental health.
      </p>
    </div>
  );
};
