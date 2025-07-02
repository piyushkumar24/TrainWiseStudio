import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { ExerciseData } from '@/pages/coach/CreateFitnessExercise';

const muscleGroups = {
  'Arms': ['Biceps', 'Triceps', 'Forearms'],
  'Chest': ['Upper Chest', 'Mid Chest', 'Lower Chest'],
  'Legs': ['Quadriceps', 'Hamstrings', 'Calves', 'Glutes'],
  'Back': ['Lats', 'Rhomboids', 'Lower Back', 'Upper Back'],
  'Core': ['Abs', 'Obliques', 'Lower Abs'],
  'Shoulders': ['Front Delts', 'Side Delts', 'Rear Delts'],
  'Full Body': ['Compound Movement'],
  'Stretch': ['Upper Body Stretch', 'Lower Body Stretch', 'Full Body Stretch'],
  'Warm-Up': ['Dynamic Warm-Up', 'Static Warm-Up', 'Sport-Specific Warm-Up'],
};

interface MuscleGroupSelectorProps {
  data: ExerciseData;
  onUpdate: (updates: Partial<ExerciseData>) => void;
  error?: string;
}

export const MuscleGroupSelector = ({ data, onUpdate, error }: MuscleGroupSelectorProps) => {
  const selectedSubcategories = data.muscleGroup.sub || [];

  const handleSubcategoryToggle = (subGroup: string) => {
    const isSelected = selectedSubcategories.includes(subGroup);
    let newSubcategories;
    
    if (isSelected) {
      // Remove from selection
      newSubcategories = selectedSubcategories.filter(item => item !== subGroup);
    } else {
      // Add to selection (limit to 3 max for better UX)
      if (selectedSubcategories.length < 3) {
        newSubcategories = [...selectedSubcategories, subGroup];
      } else {
        return; // Don't add if already at limit
      }
    }
    
    onUpdate({ 
      muscleGroup: { ...data.muscleGroup, sub: newSubcategories }
    });
  };

  const clearAllSubcategories = () => {
    onUpdate({ 
      muscleGroup: { ...data.muscleGroup, sub: [] }
    });
  };

  const selectAllSubcategories = () => {
    if (data.muscleGroup.main) {
      const allSubcategories = muscleGroups[data.muscleGroup.main as keyof typeof muscleGroups];
      onUpdate({ 
        muscleGroup: { ...data.muscleGroup, sub: allSubcategories }
      });
    }
  };

  return (
    <div className="space-y-4">
      <Label>Target Muscle Group *</Label>
      
      {/* Main Group */}
      <div className="space-y-2">
        <p className="text-sm text-gray-600">Main Region:</p>
        <div className="flex flex-wrap gap-2">
          {Object.keys(muscleGroups).map((group) => (
            <Button
              key={group}
              size="sm"
              variant={data.muscleGroup.main === group ? "default" : "outline"}
              onClick={() => onUpdate({ 
                muscleGroup: { main: group, sub: [] } // Reset subcategories when main changes
              })}
              className={data.muscleGroup.main === group 
                ? 'bg-orange-500 hover:bg-orange-600' 
                : 'hover:bg-gray-50'
              }
            >
              {group}
            </Button>
          ))}
        </div>
      </div>

      {/* Sub Groups */}
      {data.muscleGroup.main && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Specific Muscles (up to 3):</p>
            <div className="flex gap-2">
              {selectedSubcategories.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearAllSubcategories}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={selectAllSubcategories}
                className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
              >
                <Check className="h-3 w-3 mr-1" />
                Select All
              </Button>
            </div>
          </div>

          {/* Selected subcategories display */}
          {selectedSubcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 bg-orange-50 rounded-lg">
              <span className="text-sm text-orange-700 font-medium">Selected:</span>
              {selectedSubcategories.map((subGroup) => (
                <Badge 
                  key={subGroup}
                  className="bg-orange-100 text-orange-700 border-orange-200 cursor-pointer hover:bg-orange-200"
                  onClick={() => handleSubcategoryToggle(subGroup)}
                >
                  {subGroup}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          )}

          {/* Available subcategories */}
          <div className="flex flex-wrap gap-2">
            {muscleGroups[data.muscleGroup.main as keyof typeof muscleGroups].map((subGroup) => {
              const isSelected = selectedSubcategories.includes(subGroup);
              const isDisabled = !isSelected && selectedSubcategories.length >= 3;
              
              return (
                <Button
                  key={subGroup}
                  size="sm"
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => handleSubcategoryToggle(subGroup)}
                  disabled={isDisabled}
                  className={
                    isSelected 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : isDisabled 
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-50'
                  }
                >
                  {isSelected && <Check className="h-3 w-3 mr-1" />}
                  {subGroup}
                </Button>
              );
            })}
          </div>
          
          <p className="text-xs text-gray-500">
            {selectedSubcategories.length}/3 selected
          </p>
        </div>
      )}
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
