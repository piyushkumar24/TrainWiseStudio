
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface MentalExerciseFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  typeFilter: string;
  onTypeChange: (value: string) => void;
}

export const MentalExerciseFilters = ({
  searchTerm,
  onSearchChange,
  typeFilter,
  onTypeChange
}: MentalExerciseFiltersProps) => {
  const exerciseTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'meditation', label: 'Meditation' },
    { value: 'breathing', label: 'Breathing' },
    { value: 'mindfulness', label: 'Mindfulness' },
    { value: 'visualization', label: 'Visualization' },
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search mental exercises..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {exerciseTypes.map((type) => (
          <Button
            key={type.value}
            variant={typeFilter === type.value ? "default" : "outline"}
            size="sm"
            onClick={() => onTypeChange(type.value)}
            className={typeFilter === type.value ? "bg-orange-500 hover:bg-orange-600" : ""}
          >
            {type.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
