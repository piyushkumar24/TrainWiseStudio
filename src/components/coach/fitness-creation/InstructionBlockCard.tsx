
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Save, X } from 'lucide-react';
import { InstructionBlock } from '@/pages/coach/CreateFitnessExercise';
import { useInstructionBlockCard } from './hooks/useInstructionBlockCard';
import { BlockEditor } from './components/BlockEditor';
import { BlockDisplay } from './components/BlockDisplay';
import { BlockHeader } from './components/BlockHeader';

interface InstructionBlockCardProps {
  block: InstructionBlock;
  index: number;
  totalBlocks: number;
  onUpdate: (updates: Partial<InstructionBlock>) => void;
  onDelete: () => void;
  onMove: (direction: 'up' | 'down') => void;
}

export const InstructionBlockCard = ({
  block,
  index,
  totalBlocks,
  onUpdate,
  onDelete,
  onMove
}: InstructionBlockCardProps) => {
  const {
    isEditing,
    tempContent,
    setIsEditing,
    setTempContent,
    handleSave,
    handleCancel,
    handleFileChange
  } = useInstructionBlockCard({ block, onUpdate, onDelete });

  // Check if save should be enabled based on block type
  const isSaveEnabled = () => {
    if (block.type === 'image') {
      return block.imageUrl && block.imageUrl.trim().length > 0;
    } else if (block.type === 'video') {
      return block.videoUrl && block.videoUrl.trim().length > 0;
    } else {
      return tempContent.trim().length > 0;
    }
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-3">
        <BlockHeader
          block={block}
          index={index}
          totalBlocks={totalBlocks}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onDelete={onDelete}
          onMove={onMove}
        />
      </CardHeader>
      
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <BlockEditor
              block={block}
              tempContent={tempContent}
              setTempContent={setTempContent}
              handleFileChange={handleFileChange}
            />
            <div className="flex gap-2 justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!isSaveEnabled()}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
        ) : (
          <BlockDisplay block={block} />
        )}
      </CardContent>
    </Card>
  );
};
