
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Plus } from 'lucide-react';

interface EmptyWeeksStateProps {
  onAddWeek: () => void;
}

export const EmptyWeeksState = ({ onAddWeek }: EmptyWeeksStateProps) => {
  return (
    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No weeks added yet
      </h3>
      <p className="text-gray-500 mb-4">
        Start building your program by adding your first week
      </p>
      <Button
        onClick={onAddWeek}
        className="bg-orange-500 hover:bg-orange-600"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Week 1
      </Button>
    </div>
  );
};
