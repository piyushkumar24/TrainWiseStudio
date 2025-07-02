
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, X, Plus } from 'lucide-react';

interface ListBlockEditorProps {
  items: string[];
  blockType: 'ingredients' | 'steps';
  onItemsChange: (items: string[]) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ListBlockEditor = ({ 
  items, 
  blockType, 
  onItemsChange, 
  onSave, 
  onCancel 
}: ListBlockEditorProps) => {
  const [newItem, setNewItem] = React.useState('');

  const handleAddItem = () => {
    if (newItem.trim()) {
      const updatedItems = [...items, newItem.trim()];
      onItemsChange(updatedItems);
      setNewItem('');
    }
  };

  const handleRemoveItem = (itemIndex: number) => {
    const updatedItems = items.filter((_, i) => i !== itemIndex);
    onItemsChange(updatedItems);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {items.map((item, itemIndex) => (
          <div key={itemIndex} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            {blockType === 'steps' && (
              <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {itemIndex + 1}
              </span>
            )}
            <span className="flex-1">{item}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleRemoveItem(itemIndex)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={blockType === 'ingredients' ? 'e.g., 2 cups quinoa' : 'e.g., Heat oil in a pan'}
          className="flex-1"
          onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
        />
        <Button onClick={handleAddItem} size="sm" variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-2">
        <Button onClick={onSave} size="sm" className="bg-green-600 hover:bg-green-700">
          <Check className="h-4 w-4 mr-1" />
          Save
        </Button>
        <Button onClick={onCancel} size="sm" variant="outline">
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
      </div>
    </div>
  );
};
