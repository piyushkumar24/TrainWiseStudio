
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ProgramData } from '@/hooks/useProgramBuilder';
import { ProgramCategory } from '@/pages/coach/CreateProgram';
import { WeekCard } from './WeekCard';
import { EmptyWeeksState } from './EmptyWeeksState';

interface WeekDayBuilderViewProps {
  programData: ProgramData | null;
  programCategory: ProgramCategory;
  onAddWeek: () => void;
  onAddDay: (weekId: string) => void;
  onDuplicateWeek: (weekId: string) => void;
  onRemoveWeek?: (weekId: string) => void;
  onAddBlock: (weekId: string, dayId: string) => void;
  onEditBlock?: (weekId: string, dayId: string, blockId: string) => void;
  onDeleteBlock?: (weekId: string, dayId: string, blockId: string) => void;
  onRemoveDay?: (weekId: string, dayId: string) => void;
}

export const WeekDayBuilderView = ({
  programData,
  programCategory,
  onAddWeek,
  onAddDay,
  onDuplicateWeek,
  onRemoveWeek,
  onAddBlock,
  onEditBlock,
  onDeleteBlock,
  onRemoveDay
}: WeekDayBuilderViewProps) => {
  const getCategoryEmoji = () => {
    switch (programCategory) {
      case 'fitness': return '🏋️';
      case 'nutrition': return '🥗';
      case 'mental': return '🧘‍♀️';
      default: return '📋';
    }
  };

  const getCategoryTitle = () => {
    switch (programCategory) {
      case 'fitness': return 'Fitness';
      case 'nutrition': return 'Nutrition';
      case 'mental': return 'Mental Health';
      default: return 'Program';
    }
  };

  if (!programData?.weeks || programData.weeks.length === 0) {
    return <EmptyWeeksState onAddWeek={onAddWeek} />;
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {getCategoryEmoji()} Week & Day Builder
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Create weeks, days, and add content blocks to build your {getCategoryTitle().toLowerCase()} program
          </p>
        </div>
        <Button
          onClick={onAddWeek}
          className="bg-orange-500 hover:bg-orange-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Week
        </Button>
      </div>

      {/* Weeks */}
      <div className="space-y-4">
        {programData.weeks.map((week) => (
          <WeekCard
            key={week.id}
            week={week}
            programCategory={programCategory}
            onAddDay={() => onAddDay(week.id)}
            onDuplicateWeek={() => onDuplicateWeek(week.id)}
            onRemoveWeek={onRemoveWeek ? () => onRemoveWeek(week.id) : undefined}
            onAddBlock={onAddBlock}
            onEditBlock={onEditBlock}
            onDeleteBlock={onDeleteBlock}
            onRemoveDay={onRemoveDay}
          />
        ))}
      </div>
    </div>
  );
};
