
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar, Clock, Target } from 'lucide-react';

interface ProgramLogHeaderProps {
  program: {
    title: string;
    type: 'fitness' | 'nutrition' | 'mental';
    currentWeek: number;
    totalWeeks: number;
    startDate: string;
  };
  selectedWeek: number;
  selectedDay: number;
  onBack: () => void;
  onDayChange: (week: number, day: number) => void;
  dayCompleted: boolean;
}

export const ProgramLogHeader = ({
  program,
  selectedWeek,
  selectedDay,
  onBack,
  onDayChange,
  dayCompleted
}: ProgramLogHeaderProps) => {
  const getDaysSinceStart = () => {
    const startDate = new Date(program.startDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const generateDayOptions = () => {
    const options = [];
    for (let week = 1; week <= program.totalWeeks; week++) {
      for (let day = 1; day <= 7; day++) {
        const dayName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][day - 1];
        options.push({
          value: `${week}-${day}`,
          label: `Week ${week}, ${dayName}`,
          week,
          day
        });
      }
    }
    return options;
  };

  const handleDaySelect = (value: string) => {
    const [week, day] = value.split('-').map(Number);
    onDayChange(week, day);
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      {/* Top Row */}
      <div className="flex items-center justify-between p-4">
        <Button onClick={onBack} variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Badge variant="outline" className="text-xs">
          {program.type.charAt(0).toUpperCase() + program.type.slice(1)}
        </Badge>
      </div>

      {/* Program Title */}
      <div className="px-4 pb-2">
        <h1 className="text-lg font-bold text-gray-900 truncate">
          {program.title}
        </h1>
      </div>

      {/* Day Selector */}
      <div className="px-4 pb-3">
        <Select
          value={`${selectedWeek}-${selectedDay}`}
          onValueChange={handleDaySelect}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select day" />
          </SelectTrigger>
          <SelectContent>
            {generateDayOptions().map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-4 px-4 pb-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>Day {getDaysSinceStart()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>Week {selectedWeek}/{program.totalWeeks}</span>
        </div>
        <div className="flex items-center gap-1">
          <Target className="h-4 w-4" />
          <span className={dayCompleted ? 'text-green-600' : 'text-orange-600'}>
            {dayCompleted ? 'Complete' : 'In Progress'}
          </span>
        </div>
      </div>
    </div>
  );
};
