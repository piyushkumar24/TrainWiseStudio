
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface BottomNavigationProps {
  onPreviousDay: () => void;
  onNextDay: () => void;
  isNextDisabled: boolean;
  isPreviousDisabled: boolean;
  selectedWeek: number;
  selectedDay: number;
}

export const BottomNavigation = ({
  onPreviousDay,
  onNextDay,
  isNextDisabled,
  isPreviousDisabled,
  selectedWeek,
  selectedDay
}: BottomNavigationProps) => {
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onPreviousDay}
          disabled={isPreviousDisabled}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
          <Calendar className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium">
            Week {selectedWeek} • {dayNames[selectedDay - 1]}
          </span>
        </div>

        <Button
          variant="outline"
          onClick={onNextDay}
          disabled={isNextDisabled}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {isNextDisabled && (
        <p className="text-center text-xs text-gray-500 mt-2">
          Program not yet active for future days
        </p>
      )}
    </div>
  );
};
