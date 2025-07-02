
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target } from 'lucide-react';

interface FitnessInfoCardsProps {
  exercise: {
    intro?: string;
    target?: string;
  };
}

export const FitnessInfoCards = ({ exercise }: FitnessInfoCardsProps) => {
  return (
    <>
      {/* Introduction */}
      {exercise.intro && (
        <Card className="animate-fade-in">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">{exercise.intro}</p>
          </CardContent>
        </Card>
      )}

      {/* Target Information */}
      {exercise.target && (
        <Card className="animate-fade-in">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-500" />
              Target & Benefits
            </h2>
            <p className="text-gray-700 leading-relaxed">{exercise.target}</p>
          </CardContent>
        </Card>
      )}
    </>
  );
};
