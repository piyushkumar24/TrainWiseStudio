
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';

interface ExerciseSet {
  id: string;
  reps: number;
  repRange?: {
    min: number;
    max: number;
  };
  useRange?: boolean;
}

interface SetsConfigurationProps {
  sets: ExerciseSet[];
  onAddSet: () => void;
  onRemoveSet: (setId: string) => void;
  onUpdateSet: (setId: string, field: 'reps' | 'repRange' | 'useRange', value: number | { min: number; max: number } | boolean) => void;
}

export const SetsConfiguration = ({
  sets,
  onAddSet,
  onRemoveSet,
  onUpdateSet
}: SetsConfigurationProps) => {
  const toggleRangeMode = (setId: string, useRange: boolean) => {
    const currentSet = sets.find(s => s.id === setId);
    if (currentSet?.useRange === useRange) return; // Prevent unnecessary updates
    
    onUpdateSet(setId, 'useRange', useRange);
    if (useRange && !currentSet?.repRange) {
      onUpdateSet(setId, 'repRange', { min: 8, max: 12 });
    }
  };

  return (
    <div>
      <Label className="text-sm font-medium text-gray-900 mb-3 block">
        Sets & Reps Configuration
      </Label>
      
      <div className="space-y-2">
        {sets.map((set, index) => (
          <div key={set.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700 sm:w-12 flex-shrink-0">
              Set {index + 1}
            </span>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant={!set.useRange ? "secondary" : "outline"}
                size="sm"
                onClick={() => toggleRangeMode(set.id, false)}
                className="h-7 px-2 text-xs"
              >
                Fixed
              </Button>
              <Button
                variant={set.useRange ? "secondary" : "outline"}
                size="sm"
                onClick={() => toggleRangeMode(set.id, true)}
                className="h-7 px-2 text-xs"
              >
                Range
              </Button>
            </div>

            {set.useRange ? (
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Input
                  type="number"
                  value={set.repRange?.min || 8}
                  onChange={(e) => onUpdateSet(set.id, 'repRange', { 
                    min: parseInt(e.target.value) || 8, 
                    max: set.repRange?.max || 12 
                  })}
                  className="w-16 sm:w-14 h-8 text-center flex-shrink-0"
                  min="1"
                  max="100"
                />
                <span className="text-xs text-gray-500 flex-shrink-0">-</span>
                <Input
                  type="number"
                  value={set.repRange?.max || 12}
                  onChange={(e) => onUpdateSet(set.id, 'repRange', { 
                    min: set.repRange?.min || 8, 
                    max: parseInt(e.target.value) || 12 
                  })}
                  className="w-16 sm:w-14 h-8 text-center flex-shrink-0"
                  min="1"
                  max="100"
                />
                <span className="text-xs text-gray-600 flex-shrink-0">reps</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Input
                  type="number"
                  value={set.reps}
                  onChange={(e) => onUpdateSet(set.id, 'reps', parseInt(e.target.value) || 0)}
                  className="w-16 sm:w-16 h-8 text-center flex-shrink-0"
                  min="1"
                  max="100"
                />
                <span className="text-xs text-gray-600 flex-shrink-0">reps</span>
              </div>
            )}

            {sets.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveSet(set.id)}
                className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 flex-shrink-0 sm:ml-auto"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        
        <Button
          variant="outline"
          size="sm"
          onClick={onAddSet}
          className="w-full border-dashed text-orange-600 border-orange-200 hover:bg-orange-50"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Set
        </Button>
      </div>
    </div>
  );
};
