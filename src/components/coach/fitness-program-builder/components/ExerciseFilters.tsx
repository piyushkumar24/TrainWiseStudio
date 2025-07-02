
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

const muscleGroupOptions = [
  { value: 'all', label: 'All Muscle Groups' },
  { value: 'chest', label: 'Chest' },
  { value: 'back', label: 'Back' },
  { value: 'legs', label: 'Legs' },
  { value: 'shoulders', label: 'Shoulders' },
  { value: 'arms', label: 'Arms' },
  { value: 'core', label: 'Core' },
  { value: 'full body', label: 'Full Body' },
];

interface ExerciseFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  muscleGroupFilter: string;
  onMuscleGroupChange: (value: string) => void;
}

export const ExerciseFilters = ({
  searchTerm,
  onSearchChange,
  muscleGroupFilter,
  onMuscleGroupChange
}: ExerciseFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search exercises..."
          className="pl-10"
        />
      </div>

      {/* Muscle Group Filter */}
      <Select value={muscleGroupFilter} onValueChange={onMuscleGroupChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by muscle group" />
        </SelectTrigger>
        <SelectContent>
          {muscleGroupOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
