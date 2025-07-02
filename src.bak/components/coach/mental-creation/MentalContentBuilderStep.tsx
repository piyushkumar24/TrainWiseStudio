
import React, { useState } from 'react';
import { MentalExerciseData, MentalContentBlock } from '@/pages/coach/CreateMentalExercise';
import { MentalContentBlockCard } from './MentalContentBlockCard';
import { MentalBlockMenu } from './MentalBlockMenu';
import { MentalEmptyState } from './MentalEmptyState';
import { MentalContentBuilderNavigation } from './MentalContentBuilderNavigation';

interface MentalContentBuilderStepProps {
  data: MentalExerciseData;
  onUpdate: (updates: Partial<MentalExerciseData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  onBack: () => void;
  onSaveDraft: () => void;
}

export const MentalContentBuilderStep = ({ 
  data, 
  onUpdate, 
  onNext, 
  onPrevious, 
  onBack, 
  onSaveDraft 
}: MentalContentBuilderStepProps) => {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const addBlock = (type: MentalContentBlock['type']) => {
    const newBlock: MentalContentBlock = {
      id: `block_${Date.now()}`,
      type,
      content: '',
      order: data.contentBlocks.length,
    };

    onUpdate({
      contentBlocks: [...data.contentBlocks, newBlock]
    });
  };

  const updateBlock = (blockId: string, updates: Partial<MentalContentBlock>) => {
    const updatedBlocks = data.contentBlocks.map(block =>
      block.id === blockId ? { ...block, ...updates } : block
    );
    onUpdate({ contentBlocks: updatedBlocks });
  };

  const deleteBlock = (blockId: string) => {
    const updatedBlocks = data.contentBlocks.filter(block => block.id !== blockId);
    onUpdate({ contentBlocks: updatedBlocks });
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const currentIndex = data.contentBlocks.findIndex(block => block.id === blockId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= data.contentBlocks.length) return;

    const updatedBlocks = [...data.contentBlocks];
    [updatedBlocks[currentIndex], updatedBlocks[newIndex]] = [updatedBlocks[newIndex], updatedBlocks[currentIndex]];
    
    // Update order numbers
    updatedBlocks.forEach((block, index) => {
      block.order = index;
    });

    onUpdate({ contentBlocks: updatedBlocks });
  };

  return (
    <div className="space-y-6 pb-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            📦 Add Content Blocks
          </h2>
          <p className="text-gray-600">Build your mental health exercise with flexible content blocks. Add instructions, media, and tips to guide your clients.</p>
        </div>
        
        <div className="space-y-4 mb-6">
          <MentalBlockMenu
            showAddMenu={showAddMenu}
            onToggleMenu={() => setShowAddMenu(!showAddMenu)}
            onAddBlock={addBlock}
          />

          {data.contentBlocks.length === 0 ? (
            <MentalEmptyState />
          ) : (
            <div className="space-y-4">
              {data.contentBlocks
                .sort((a, b) => a.order - b.order)
                .map((block, index) => (
                  <MentalContentBlockCard
                    key={block.id}
                    block={block}
                    index={index}
                    totalBlocks={data.contentBlocks.length}
                    onUpdate={(updates) => updateBlock(block.id, updates)}
                    onDelete={() => deleteBlock(block.id)}
                    onMove={(direction) => moveBlock(block.id, direction)}
                  />
                ))}
            </div>
          )}
        </div>
      </div>

      <MentalContentBuilderNavigation
        onBack={onBack}
        onSaveDraft={onSaveDraft}
        onPrevious={onPrevious}
        onNext={onNext}
      />

      {/* Click outside to close add menu */}
      {showAddMenu && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowAddMenu(false)}
        />
      )}
    </div>
  );
};
