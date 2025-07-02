
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Edit3, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  GripVertical
} from 'lucide-react';
import { InstructionBlock } from '@/pages/coach/CreateFitnessExercise';

interface BlockHeaderProps {
  block: InstructionBlock;
  index: number;
  totalBlocks: number;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMove: (direction: 'up' | 'down') => void;
}

const getBlockIcon = (type: string) => {
  switch (type) {
    case 'text': return '📝';
    case 'image': return '📷';
    case 'video': return '📹';
    case 'link': return '🔗';
    case 'protip': return '💡';
    default: return '📄';
  }
};

const getBlockTitle = (type: string) => {
  switch (type) {
    case 'text': return 'Text Instructions';
    case 'image': return 'Image Upload';
    case 'video': return 'Video Upload';
    case 'link': return 'Video Link';
    case 'protip': return 'Pro Tip';
    default: return 'Instruction Block';
  }
};

export const BlockHeader = ({
  block,
  index,
  totalBlocks,
  isEditing,
  onEdit,
  onDelete,
  onMove
}: BlockHeaderProps) => {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div className="flex items-center gap-2 text-gray-400 flex-shrink-0">
          <GripVertical className="h-4 w-4" />
          <span className="text-sm">#{index + 1}</span>
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-lg flex-shrink-0">{getBlockIcon(block.type)}</span>
          <h4 className="font-medium text-gray-900 truncate">{getBlockTitle(block.type)}</h4>
        </div>
      </div>
      
      <div className="flex items-center gap-1 flex-shrink-0">
        {/* Move buttons */}
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onMove('up')}
          disabled={index === 0}
          className="h-7 w-7 p-0 sm:h-8 sm:w-8"
        >
          <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onMove('down')}
          disabled={index === totalBlocks - 1}
          className="h-7 w-7 p-0 sm:h-8 sm:w-8"
        >
          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
        
        {/* Edit/Delete buttons */}
        {!isEditing && (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={onEdit}
              className="h-7 w-7 p-0 text-blue-600 sm:h-8 sm:w-8"
            >
              <Edit3 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onDelete}
              className="h-7 w-7 p-0 text-red-600 sm:h-8 sm:w-8"
            >
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
