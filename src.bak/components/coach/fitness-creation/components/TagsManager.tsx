
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { ExerciseData } from '@/pages/coach/CreateFitnessExercise';

const availableTags = [
  'Beginner', 'Intermediate', 'Advanced', 'Equipment-free', 'Gym Required',
  'Stretch', 'Mobility', 'Strength', 'Cardio', 'HIIT', 'Low Impact'
];

interface TagsManagerProps {
  data: ExerciseData;
  onUpdate: (updates: Partial<ExerciseData>) => void;
  error?: string;
}

export const TagsManager = ({ data, onUpdate, error }: TagsManagerProps) => {
  const [newTag, setNewTag] = useState('');

  const handleTagAdd = (tag: string) => {
    if (!data.tags.includes(tag)) {
      onUpdate({ tags: [...data.tags, tag] });
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    onUpdate({ tags: data.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleCustomTagAdd = () => {
    if (newTag.trim() && !data.tags.includes(newTag.trim())) {
      onUpdate({ tags: [...data.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  return (
    <div className="space-y-4">
      <Label>Tags *</Label>
      
      {/* Current Tags */}
      {data.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-3 py-1">
              {tag}
              <button
                onClick={() => handleTagRemove(tag)}
                className="ml-2 hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Available Tags */}
      <div className="space-y-2">
        <p className="text-sm text-gray-600">Quick Add:</p>
        <div className="flex flex-wrap gap-2">
          {availableTags.filter(tag => !data.tags.includes(tag)).map((tag) => (
            <Button
              key={tag}
              size="sm"
              variant="outline"
              onClick={() => handleTagAdd(tag)}
              className="text-xs hover:bg-orange-50 hover:text-orange-600"
            >
              + {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Custom Tag */}
      <div className="flex gap-2">
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add custom tag..."
          className="flex-1"
          onKeyPress={(e) => e.key === 'Enter' && handleCustomTagAdd()}
        />
        <Button onClick={handleCustomTagAdd} variant="outline">
          Add
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
