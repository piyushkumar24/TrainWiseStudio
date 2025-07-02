
import React from 'react';
import { FitnessBlocks } from './FitnessBlocks';
import { NutritionBlocks } from './NutritionBlocks';
import { MentalBlocks } from './MentalBlocks';

interface DayContentProps {
  day: {
    day: number;
    dayName: string;
    isCompleted: boolean;
    isActive: boolean;
    blocks: any[];
  };
  programType: 'fitness' | 'nutrition' | 'mental';
  isExpired: boolean;
}

export const DayContent = ({ day, programType, isExpired }: DayContentProps) => {
  const renderBlocks = () => {
    switch (programType) {
      case 'fitness':
        return <FitnessBlocks blocks={day.blocks} isExpired={isExpired} />;
      case 'nutrition':
        return <NutritionBlocks blocks={day.blocks} isExpired={isExpired} />;
      case 'mental':
        return <MentalBlocks blocks={day.blocks} isExpired={isExpired} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          {day.dayName} - Day {day.day}
        </h2>
        {day.isCompleted && (
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            ✓ Completed
          </div>
        )}
      </div>

      {renderBlocks()}
    </div>
  );
};
