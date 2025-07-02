
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface PortionConfigurationProps {
  portionConfig: {
    min: number;
    max: number;
    mealTime: string;
  };
  onUpdateConfig: (field: string, value: number | string) => void;
}

export const PortionConfiguration = ({ portionConfig, onUpdateConfig }: PortionConfigurationProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="portionMin" className="text-sm font-medium">
            Min Portion
          </Label>
          <Input
            id="portionMin"
            type="number"
            min="1"
            value={portionConfig.min}
            onChange={(e) => onUpdateConfig('min', parseInt(e.target.value) || 1)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="portionMax" className="text-sm font-medium">
            Max Portion
          </Label>
          <Input
            id="portionMax"
            type="number"
            min="1"
            value={portionConfig.max}
            onChange={(e) => onUpdateConfig('max', parseInt(e.target.value) || 1)}
            className="mt-1"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="mealTime" className="text-sm font-medium">
          🕐 Meal Time
        </Label>
        <Input
          id="mealTime"
          type="time"
          value={portionConfig.mealTime}
          onChange={(e) => onUpdateConfig('mealTime', e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );
};
