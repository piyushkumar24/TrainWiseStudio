
import React from 'react';
import { Label } from '@/components/ui/label';

interface MentalExerciseTagSelectorProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

const availableTags = [
  'Relaxation', 'Focus', 'Sleep', 'Morning Boost', 'Anxiety Relief', 
  'Stress Management', 'Self-Compassion', 'Mindfulness', 'Confidence',
  'Energy', 'Clarity', 'Patience', 'Gratitude', 'Breathing'
];

export const MentalExerciseTagSelector = ({
  selectedTags,
  onTagToggle
}: MentalExerciseTagSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Tags (Optional)</Label>
      <p className="text-sm text-gray-500">Select relevant tags to help clients find this exercise</p>
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={`px-3 py-1 rounded-full text-sm border transition-all ${
              selectedTags.includes(tag)
                ? 'bg-orange-100 border-orange-300 text-orange-700'
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};
