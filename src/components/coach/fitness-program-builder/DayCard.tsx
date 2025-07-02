
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Dumbbell, X, Utensils, Brain } from 'lucide-react';
import { DayContent, ContentBlock } from '@/hooks/useProgramBuilder';
import { ProgramCategory } from '@/pages/coach/CreateProgram';
import { ContentBlockPreview } from './ContentBlockPreview';

interface DayCardProps {
  day: DayContent;
  weekId: string;
  programCategory: ProgramCategory;
  onAddBlock: (weekId: string, dayId: string) => void;
  onEditBlock?: (weekId: string, dayId: string, blockId: string) => void;
  onDeleteBlock?: (weekId: string, dayId: string, blockId: string) => void;
  onRemoveDay?: (weekId: string, dayId: string) => void;
}

export const DayCard = ({ 
  day, 
  weekId, 
  programCategory, 
  onAddBlock, 
  onEditBlock, 
  onDeleteBlock,
  onRemoveDay
}: DayCardProps) => {
  const getCategoryIcon = () => {
    switch (programCategory) {
      case 'fitness': return <Dumbbell className="h-4 w-4 text-orange-500" />;
      case 'nutrition': return <Utensils className="h-4 w-4 text-orange-500" />;
      case 'mental': return <Brain className="h-4 w-4 text-orange-500" />;
      default: return <Dumbbell className="h-4 w-4 text-orange-500" />;
    }
  };

  const getEmptyStateText = () => {
    switch (programCategory) {
      case 'fitness': return 'No exercises added';
      case 'nutrition': return 'No recipes added';
      case 'mental': return 'No mental exercises added';
      default: return 'No content blocks added';
    }
  };

  return (
    <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium text-gray-900 flex items-center gap-2">
            {getCategoryIcon()}
            {day.dayName}
          </CardTitle>
          {onRemoveDay && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveDay(weekId, day.id)}
              className="h-6 w-6 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-3 space-y-3">
        {/* Content Blocks */}
        {day.blocks.map((block) => (
          <ContentBlockPreview 
            key={block.id} 
            block={block}
            onEdit={onEditBlock ? () => onEditBlock(weekId, day.id, block.id) : undefined}
            onDelete={onDeleteBlock ? () => onDeleteBlock(weekId, day.id, block.id) : undefined}
          />
        ))}

        {/* Add Block Button */}
        <Button
          onClick={() => onAddBlock(weekId, day.id)}
          variant="outline"
          size="sm"
          className="w-full border-dashed border-orange-200 text-orange-600 hover:bg-orange-50 py-2"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Block
        </Button>

        {/* Empty State */}
        {day.blocks.length === 0 && (
          <div className="text-center py-4 text-gray-500 text-sm">
            {getEmptyStateText()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
