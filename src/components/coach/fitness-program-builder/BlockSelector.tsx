
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ExerciseSelector } from './ExerciseSelector';
import { RecipeSelector } from './RecipeSelector';
import { MentalExerciseSelector } from './MentalExerciseSelector';
import { ContentBlock } from '@/hooks/useProgramBuilder';
import { ProgramCategory } from '@/pages/coach/CreateProgram';

interface BlockSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBlock: (block: ContentBlock) => void;
  programCategory: ProgramCategory;
  isMobile: boolean;
  editingBlock?: ContentBlock | null;
}

export const BlockSelector = ({
  isOpen,
  onClose,
  onSelectBlock,
  programCategory,
  isMobile,
  editingBlock
}: BlockSelectorProps) => {
  const getTitle = () => {
    switch (programCategory) {
      case 'fitness': return editingBlock ? 'Edit Exercise' : 'Add Exercise';
      case 'nutrition': return editingBlock ? 'Edit Recipe' : 'Add Recipe';
      case 'mental': return editingBlock ? 'Edit Mental Exercise' : 'Add Mental Exercise';
      default: return 'Add Content';
    }
  };

  const renderSelector = () => {
    switch (programCategory) {
      case 'fitness':
        return (
          <ExerciseSelector
            onSelect={onSelectBlock}
            onBack={onClose}
            initialData={editingBlock?.data}
          />
        );
      case 'nutrition':
        return (
          <RecipeSelector
            onSelect={onSelectBlock}
            onBack={onClose}
            initialData={editingBlock?.data}
          />
        );
      case 'mental':
        return (
          <MentalExerciseSelector
            onSelect={onSelectBlock}
            onBack={onClose}
            initialData={editingBlock?.data}
          />
        );
      default:
        return null;
    }
  };

  const content = (
    <>
      <div className="p-4">
        {renderSelector()}
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{getTitle()}</SheetTitle>
          </SheetHeader>
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};
