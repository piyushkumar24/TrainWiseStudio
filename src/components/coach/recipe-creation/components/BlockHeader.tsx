
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, Edit, Trash2 } from 'lucide-react';
import { blockIcons, blockLabels } from '../config/blockConfig';
import { ContentBlock } from '@/types/recipe';

interface BlockHeaderProps {
  block: ContentBlock;
  index: number;
  totalBlocks: number;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMove: (direction: 'up' | 'down') => void;
}

export const BlockHeader = ({
  block,
  index,
  totalBlocks,
  isEditing,
  onEdit,
  onDelete,
  onMove,
}: BlockHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-lg">{blockIcons[block.type]}</span>
        <span className="font-medium text-gray-900">
          {blockLabels[block.type]}
        </span>
      </div>
      
      <div className="flex items-center gap-1">
        {/* Move buttons */}
        {index > 0 && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onMove('up')}
            className="p-1 h-7 w-7"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        )}
        {index < totalBlocks - 1 && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onMove('down')}
            className="p-1 h-7 w-7"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        )}
        
        {/* Edit button */}
        {!isEditing && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onEdit}
            className="p-1 h-7 w-7 text-blue-600 hover:text-blue-700"
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
        
        {/* Delete button */}
        <Button
          size="sm"
          variant="ghost"
          onClick={onDelete}
          className="p-1 h-7 w-7 text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
