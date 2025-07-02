
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { MentalContentBlock } from '@/pages/coach/CreateMentalExercise';

interface MentalBlockMenuProps {
  showAddMenu: boolean;
  onToggleMenu: () => void;
  onAddBlock: (type: MentalContentBlock['type']) => void;
}

const blockTypes = [
  { type: 'text', label: 'Text Block', emoji: '📝', description: 'Instructions and guidance' },
  { type: 'image', label: 'Image Block', emoji: '🖼️', description: 'Visual aids or diagrams' },
  { type: 'video', label: 'Video Block', emoji: '🎥', description: 'Guided video content' },
  { type: 'audio', label: 'Audio Block', emoji: '🎵', description: 'Meditation or breathing audio' },
  { type: 'protip', label: 'Pro Tip', emoji: '💡', description: 'Helpful tips and best practices' },
];

export const MentalBlockMenu = ({ showAddMenu, onToggleMenu, onAddBlock }: MentalBlockMenuProps) => {
  const handleAddBlock = (type: MentalContentBlock['type']) => {
    onAddBlock(type);
    onToggleMenu();
  };

  return (
    <div className="relative">
      <Button
        onClick={onToggleMenu}
        className="w-full border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-600 py-6"
        variant="outline"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Content Block
      </Button>

      {showAddMenu && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          <div className="p-2">
            {blockTypes.map((blockType) => (
              <button
                key={blockType.type}
                onClick={() => handleAddBlock(blockType.type as MentalContentBlock['type'])}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl">{blockType.emoji}</span>
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
  );
};
