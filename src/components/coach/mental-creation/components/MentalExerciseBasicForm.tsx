
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MentalExerciseBasicFormProps {
  name: string;
  type: string;
  duration: number;
  onNameChange: (name: string) => void;
  onTypeChange: (type: string) => void;
  onDurationChange: (duration: number) => void;
}

const exerciseTypes = [
  'Meditation',
  'Breathwork', 
  'Journaling',
  'Mental Practice',
  'Mindfulness Exercise',
  'Yoga'
];

export const MentalExerciseBasicForm = ({
  name,
  type,
  duration,
  onNameChange,
  onTypeChange,
  onDurationChange
}: MentalExerciseBasicFormProps) => {
  return (
    <>
      {/* Exercise Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Exercise Name *
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="e.g., '5-Minute Morning Breathing', 'Gratitude Journal Practice'"
          className="w-full"
        />
      </div>

      {/* Exercise Type */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Exercise Type *</Label>
        <Select value={type} onValueChange={onTypeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select exercise type" />
          </SelectTrigger>
          <SelectContent>
            {exerciseTypes.map((exerciseType) => (
              <SelectItem key={exerciseType} value={exerciseType.toLowerCase().replace(' ', '_')}>
                {exerciseType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <Label htmlFor="duration" className="text-sm font-medium">
          Duration (minutes) *
        </Label>
        <Input
          id="duration"
          type="number"
          value={duration}
          onChange={(e) => onDurationChange(parseInt(e.target.value) || 0)}
          min="1"
          max="120"
          className="w-full"
        />
      </div>
    </>
  );
};
