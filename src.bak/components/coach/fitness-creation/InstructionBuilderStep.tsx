

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, GripVertical, ArrowLeft, Save } from 'lucide-react';
import { ExerciseData, InstructionBlock } from '@/pages/coach/CreateFitnessExercise';
import { InstructionBlockCard } from './InstructionBlockCard';

interface InstructionBuilderStepProps {
  data: ExerciseData;
  onUpdate: (updates: Partial<ExerciseData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  onBack: () => void;
  onSaveDraft: () => void;
}

const blockTypes = [
  { type: 'text', label: 'Text Instructions', icon: '📝', description: 'Step-by-step written instructions' },
  { type: 'image', label: 'Image Upload', icon: '📷', description: 'Upload demonstration images' },
  { type: 'video', label: 'Video Upload', icon: '📹', description: 'Upload or record video guide' },
  { type: 'link', label: 'Video Link', icon: '🔗', description: 'Embed YouTube or external video' },
  { type: 'protip', label: 'Pro Tip', icon: '💡', description: 'Add helpful tips and warnings' },
];

export const InstructionBuilderStep = ({ data, onUpdate, onNext, onPrevious, onBack, onSaveDraft }: InstructionBuilderStepProps) => {
  const [showBlockSelector, setShowBlockSelector] = useState(false);

  const addBlock = (type: string) => {
    const newBlock: InstructionBlock = {
      id: `block_${Date.now()}`,
      type: type as any,
      content: '',
      order: data.instructionBlocks.length,
    };
    
    onUpdate({
      instructionBlocks: [...data.instructionBlocks, newBlock]
    });
    setShowBlockSelector(false);
  };

  const updateBlock = (blockId: string, updates: Partial<InstructionBlock>) => {
    const updatedBlocks = data.instructionBlocks.map(block =>
      block.id === blockId ? { ...block, ...updates } : block
    );
    onUpdate({ instructionBlocks: updatedBlocks });
  };

  const deleteBlock = (blockId: string) => {
    const updatedBlocks = data.instructionBlocks
      .filter(block => block.id !== blockId)
      .map((block, index) => ({ ...block, order: index }));
    onUpdate({ instructionBlocks: updatedBlocks });
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const currentIndex = data.instructionBlocks.findIndex(block => block.id === blockId);
    if (
      (direction === 'up' && currentIndex > 0) ||
      (direction === 'down' && currentIndex < data.instructionBlocks.length - 1)
    ) {
      const newBlocks = [...data.instructionBlocks];
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      
      [newBlocks[currentIndex], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[currentIndex]];
      
      // Update order property
      newBlocks.forEach((block, index) => {
        block.order = index;
      });
      
      onUpdate({ instructionBlocks: newBlocks });
    }
  };

  // Updated validation logic to handle image/video blocks properly
  const isBlockValid = (block: InstructionBlock) => {
    switch (block.type) {
      case 'image':
        return block.imageUrl && block.imageUrl.trim().length > 0;
      case 'video':
        return block.videoUrl && block.videoUrl.trim().length > 0;
      case 'text':
      case 'link':
      case 'protip':
      default:
        return block.content && block.content.trim().length > 0;
    }
  };

  const canProceed = data.instructionBlocks.length > 0 && 
    data.instructionBlocks.every(block => isBlockValid(block));

  return (
    <div className="space-y-6 pb-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            🔧 Build Instructions
          </h2>
          <p className="text-gray-600">
            Create step-by-step instructions with text, media, and tips
          </p>
        </div>

        {/* Instruction Blocks */}
        <div className="space-y-4 mb-6">
          {data.instructionBlocks.map((block, index) => (
            <InstructionBlockCard
              key={block.id}
              block={block}
              index={index}
              totalBlocks={data.instructionBlocks.length}
              onUpdate={(updates) => updateBlock(block.id, updates)}
              onDelete={() => deleteBlock(block.id)}
              onMove={(direction) => moveBlock(block.id, direction)}
            />
          ))}

          {data.instructionBlocks.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No instruction blocks yet
              </h3>
              <p className="text-gray-500 mb-4">
                Add your first instruction block to get started
              </p>
            </div>
          )}
        </div>

        {/* Add Block Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => setShowBlockSelector(!showBlockSelector)}
            variant="outline"
            className="border-2 border-dashed border-orange-200 text-orange-600 hover:bg-orange-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Instruction Block
          </Button>
        </div>

        {/* Block Type Selector */}
        {showBlockSelector && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg animate-fade-in">
            <p className="text-sm font-medium text-gray-700 mb-3">Choose block type:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {blockTypes.map((blockType) => (
                <button
                  key={blockType.type}
                  onClick={() => addBlock(blockType.type)}
                  className="p-3 text-left border border-gray-200 rounded-lg hover:border-orange-200 hover:bg-white transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{blockType.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{blockType.label}</p>
                      <p className="text-sm text-gray-500">{blockType.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation - Mobile First Design */}
      <div className="space-y-4 md:space-y-0 md:flex md:justify-between md:items-center pt-6">
        {/* Top row on mobile - Back and Save Draft buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-3">
          <Button 
            onClick={onBack}
            variant="outline"
            className="w-full sm:w-auto px-4 sm:px-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hub
          </Button>
          
          <Button 
            onClick={onSaveDraft}
            variant="outline"
            className="w-full sm:w-auto px-4 sm:px-6 text-orange-600 border-orange-200 hover:bg-orange-50"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
        </div>

        {/* Bottom row on mobile - Previous and Next buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={onPrevious}
            variant="outline"
            className="flex-1 md:flex-none px-4 md:px-6"
          >
            ← Previous
          </Button>
          
          <Button 
            onClick={onNext}
            disabled={!canProceed}
            className="flex-1 md:flex-none bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 disabled:opacity-50"
          >
            Next: Preview →
          </Button>
        </div>
      </div>

      {!canProceed && data.instructionBlocks.length > 0 && (
        <p className="text-center text-sm text-gray-500">
          Please complete all instruction blocks to continue
        </p>
      )}
    </div>
  );
};

