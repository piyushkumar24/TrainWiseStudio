
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, Copy, Calendar, ChevronDown, ChevronRight, X } from 'lucide-react';
import { WeekContent } from '@/hooks/useProgramBuilder';
import { ProgramCategory } from '@/pages/coach/CreateProgram';
import { DayCard } from './DayCard';

interface WeekCardProps {
  week: WeekContent;
  programCategory: ProgramCategory;
  onAddDay: () => void;
  onDuplicateWeek: () => void;
  onRemoveWeek?: () => void;
  onAddBlock: (weekId: string, dayId: string) => void;
  onEditBlock?: (weekId: string, dayId: string, blockId: string) => void;
  onDeleteBlock?: (weekId: string, dayId: string, blockId: string) => void;
  onRemoveDay?: (weekId: string, dayId: string) => void;
}

export const WeekCard = ({ 
  week, 
  programCategory, 
  onAddDay, 
  onDuplicateWeek,
  onRemoveWeek,
  onAddBlock,
  onEditBlock,
  onDeleteBlock,
  onRemoveDay
}: WeekCardProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="bg-orange-50 border-b cursor-pointer hover:bg-orange-100 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                {isOpen ? (
                  <ChevronDown className="h-5 w-5 text-orange-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-orange-500" />
                )}
                <Calendar className="h-5 w-5 text-orange-500" />
                Week {week.weekNumber}
                {!isOpen && week.days.length > 0 && (
                  <span className="text-sm text-gray-600 font-normal">
                    ({week.days.length} day{week.days.length !== 1 ? 's' : ''})
                  </span>
                )}
              </CardTitle>
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDuplicateWeek}
                  className="text-orange-600 border-orange-200 hover:bg-orange-50"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Duplicate</span>
                </Button>
                {onRemoveWeek && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onRemoveWeek}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                    <span className="hidden sm:inline">Remove</span>
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="p-4">
            {/* Days Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {week.days.map((day) => (
                <DayCard
                  key={day.id}
                  day={day}
                  weekId={week.id}
                  programCategory={programCategory}
                  onAddBlock={onAddBlock}
                  onEditBlock={onEditBlock}
                  onDeleteBlock={onDeleteBlock}
                  onRemoveDay={onRemoveDay}
                />
              ))}
            </div>

            {/* Add Day Button */}
            <div className="flex justify-center">
              <Button
                onClick={onAddDay}
                variant="outline"
                size="sm"
                className="border-dashed border-orange-200 text-orange-600 hover:bg-orange-50"
                disabled={week.days.length >= 7}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Day
              </Button>
            </div>

            {/* Empty State */}
            {week.days.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                <p className="text-gray-500 mb-3">No days added to this week</p>
                <Button
                  onClick={onAddDay}
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Day
                </Button>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
