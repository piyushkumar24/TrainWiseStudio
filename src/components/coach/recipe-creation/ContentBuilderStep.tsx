import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft, Save } from 'lucide-react';
import { RecipeData, ContentBlock } from '@/types/recipe';
import { ContentBlockCard } from './ContentBlockCard';

interface ContentBuilderStepProps {
  data: RecipeData;
  onUpdate: (updates: Partial<RecipeData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  onBack: () => void;
  onSaveDraft: () => void;
}

const blockTypes = [
  { type: 'text', label: 'Text Block', icon: '📝', description: 'Add description or guidance text' },
  { type: 'ingredients', label: 'Ingredients', icon: '🥘', description: 'List ingredients with quantities' },
  { type: 'steps', label: 'Cooking Steps', icon: '📋', description: 'Step-by-step instructions' },
  { type: 'image', label: 'Image Upload', icon: '📷', description: 'Add recipe photos' },
];

export const ContentBuilderStep = ({ data, onUpdate, onNext, onPrevious, onBack, onSaveDraft }: ContentBuilderStepProps) => {
  const [showBlockSelector, setShowBlockSelector] = useState(false);

  const addBlock = (type: string) => {
    const newBlock: ContentBlock = {
      id: `block_${Date.now()}`,
      type: type as any,
      content: '',
      order: data.contentBlocks.length,
      items: type === 'ingredients' || type === 'steps' ? [] : undefined,
    };
    
    onUpdate({
      contentBlocks: [...data.contentBlocks, newBlock]
    });
    setShowBlockSelector(false);
  };

  const updateBlock = (blockId: string, updates: Partial<ContentBlock>) => {
    const updatedBlocks = data.contentBlocks.map(block =>
      block.id === blockId ? { ...block, ...updates } : block
    );
    onUpdate({ contentBlocks: updatedBlocks });
  };

  const deleteBlock = (blockId: string) => {
    const updatedBlocks = data.contentBlocks
      .filter(block => block.id !== blockId)
      .map((block, index) => ({ ...block, order: index }));
    onUpdate({ contentBlocks: updatedBlocks });
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const currentIndex = data.contentBlocks.findIndex(block => block.id === blockId);
    if (
      (direction === 'up' && currentIndex > 0) ||
      (direction === 'down' && currentIndex < data.contentBlocks.length - 1)
    ) {
      const newBlocks = [...data.contentBlocks];
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      
      [newBlocks[currentIndex], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[currentIndex]];
      
      newBlocks.forEach((block, index) => {
        block.order = index;
      });
      
      onUpdate({ contentBlocks: newBlocks });
    }
  };

  const isBlockValid = (block: ContentBlock) => {
    switch (block.type) {
      case 'image':
        return block.imageUrl && block.imageUrl.trim().length > 0;
      case 'ingredients':
      case 'steps':
        return block.items && block.items.length > 0;
      case 'text':
      default:
        return block.content && block.content.trim().length > 0;
    }
  };

  const canProceed = data.contentBlocks.length > 0 && 
    data.contentBlocks.every(block => isBlockValid(block));

  return (
    <div className="space-y-6 pb-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            📋 Add Content
          </h2>
          <p className="text-gray-600">
            Build your recipe with flexible content blocks
          </p>
        </div>

        {/* Content Blocks */}
        <div className="space-y-4 mb-6">
          {data.contentBlocks.map((block, index) => (
            <ContentBlockCard
              key={block.id}
              block={block}
              index={index}
              totalBlocks={data.contentBlocks.length}
              onUpdate={(updates) => updateBlock(block.id, updates)}
              onDelete={() => deleteBlock(block.id)}
              onMove={(direction) => moveBlock(block.id, direction)}
            />
          ))}

          {data.contentBlocks.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No content blocks yet
              </h3>
              <p className="text-gray-500 mb-4">
                Add your first content block to get started
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
            Add Content Block
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

      {/* Navigation */}
      <div className="space-y-4 md:space-y-0 md:flex md:justify-between md:items-center pt-6">
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

      {!canProceed && data.contentBlocks.length > 0 && (
        <p className="text-center text-sm text-gray-500">
          Please complete all content blocks to continue
        </p>
      )}
    </div>
  );
};
