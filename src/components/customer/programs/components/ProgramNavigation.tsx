
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface ProgramNavigationProps {
  weeks: number;
  selectedWeek: number;
  selectedDay: number;
  onWeekChange: (week: number) => void;
  onDayChange: (day: number) => void;
  currentWeek: number;
}

export const ProgramNavigation = ({
  weeks,
  selectedWeek,
  selectedDay,
  onWeekChange,
  onDayChange,
  currentWeek
}: ProgramNavigationProps) => {
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="sticky top-[120px] z-40 bg-white border-b border-gray-200 shadow-sm">
      {/* Week Selector */}
      <div className="px-4 py-3 border-b border-gray-100">
        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-2">
            {Array.from({ length: weeks }, (_, i) => i + 1).map((week) => (
              <button
                key={week}
                onClick={() => onWeekChange(week)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  selectedWeek === week
                    ? "bg-orange-500 text-white"
                    : week <= currentWeek
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-gray-50 text-gray-400 cursor-not-allowed"
                )}
                disabled={week > currentWeek}
              >
                Week {week}
                {week === currentWeek && (
                  <Badge className="ml-2 bg-green-100 text-green-700 text-xs">
                    Current
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Day Selector */}
      <div className="px-4 py-3">
        <div className="flex justify-between gap-1">
          {dayNames.map((dayName, index) => {
            const dayNumber = index + 1;
            const isSelected = selectedDay === dayNumber;
            const isCompleted = selectedWeek < currentWeek || 
                              (selectedWeek === currentWeek && dayNumber < new Date().getDay());
            
            return (
              <button
                key={dayName}
                onClick={() => onDayChange(dayNumber)}
                className={cn(
                  "flex-1 py-2 px-1 rounded-lg text-xs font-medium transition-colors",
                  isSelected
                    ? "bg-orange-500 text-white"
                    : isCompleted
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                <div className="text-center">
                  <div>{dayName}</div>
                  {isCompleted && <div className="text-xs mt-1">✓</div>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
