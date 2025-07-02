
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';

interface ContentBlockPreviewProps {
  block: {
    id: string;
    type: 'exercise' | 'recipe' | 'mental' | 'text' | 'image' | 'video' | 'url' | 'pro_tip' | 'avoidance';
    data: any;
    order: number;
  };
  onEdit: () => void;
  onDelete: () => void;
}

const getBlockIcon = (type: string) => {
  switch (type) {
    case 'exercise': return '🏋️‍♂️';
    case 'recipe': return '🍳';
    case 'mental': return '🧘‍♀️';
    case 'text': return '📝';
    case 'image': return '🖼️';
    case 'video': return '🎥';
    case 'url': return '🔗';
    case 'pro_tip': return '💡';
    case 'avoidance': return '⚠️';
    default: return '📋';
  }
};

const getBlockTitle = (block: any) => {
  // Add debugging for exercise blocks
  if (block.type === 'exercise') {
    console.log('Exercise block data:', block.data);
  }

  switch (block.type) {
    case 'exercise':
      // Check the actual structure from ExerciseSelector
      return block.data?.exerciseName || 
             block.data?.title || 
             block.data?.name ||
             'Exercise';
    case 'recipe':
      return block.data?.recipeName || block.data?.title || 'Recipe';
    case 'mental':
      return block.data?.title || 'Mental Exercise';
    case 'text':
      return 'Text Block';
    case 'image':
      return 'Image';
    case 'video':
      return 'Video';
    case 'url':
      return block.data?.title || 'Link';
    case 'pro_tip':
      return 'Pro Tip';
    case 'avoidance':
      return 'Avoidance';
    default:
      return 'Content Block';
  }
};

const getExerciseDetails = (block: any) => {
  if (block.type !== 'exercise' || !block.data?.sets) {
    return null;
  }

  const sets = block.data.sets;
  const totalSets = sets.length;
  
  // Get rep information
  const repInfo = sets.map((set: any) => {
    if (set.useRange && set.repRange) {
      return `${set.repRange.min}-${set.repRange.max}`;
    } else {
      return `${set.reps || 0}`;
    }
  });

  // If all sets have the same reps, show it once, otherwise show range
  const uniqueReps = [...new Set(repInfo)];
  const repsDisplay = uniqueReps.length === 1 ? uniqueReps[0] : `${Math.min(...repInfo.map(r => parseInt(r.split('-')[0]) || 0))}-${Math.max(...repInfo.map(r => parseInt(r.split('-')[1]) || parseInt(r) || 0))}`;

  return {
    sets: totalSets,
    reps: repsDisplay,
    // Check the actual structure from ExerciseSelector
    subcategory: block.data?.muscleGroup || 'Unknown'
  };
};

const getRecipeDetails = (block: any) => {
  if (block.type !== 'recipe') {
    return null;
  }

  const mealTime = block.data?.mealTime || '08:00';
  const portionMin = block.data?.portionMin || 1;
  const portionMax = block.data?.portionMax || 1;
  const mealType = block.data?.mealType || 'meal';

  const portionText = portionMin === portionMax ? `${portionMin} portion${portionMin > 1 ? 's' : ''}` : `${portionMin}-${portionMax} portions`;

  return {
    mealTime,
    portionText,
    mealType
  };
};

const getPreviewText = (block: any) => {
  switch (block.type) {
    case 'exercise':
      const exerciseDetails = getExerciseDetails(block);
      if (exerciseDetails) {
        return `${exerciseDetails.subcategory} • ${exerciseDetails.sets} sets • ${exerciseDetails.reps} reps`;
      }
      return block.data?.muscleGroup || 'Exercise details';
    
    case 'recipe':
      const recipeDetails = getRecipeDetails(block);
      if (recipeDetails) {
        return `🕐 ${recipeDetails.mealTime} • ${recipeDetails.portionText} • ${recipeDetails.mealType}`;
      }
      return block.data?.description || block.data?.summary || 'Recipe details';
    
    case 'mental':
      return block.data?.description || block.data?.summary || 'Mental exercise details';
    
    case 'text':
      const textContent = block.data?.content || block.data?.text || '';
      if (typeof textContent === 'string' && textContent.length > 0) {
        return textContent.length > 50 ? textContent.substring(0, 50) + '...' : textContent;
      }
      return 'Text content';
    
    case 'image':
      return block.data?.caption || block.data?.alt || 'Image content';
    
    case 'video':
      return block.data?.title || block.data?.description || 'Video content';
    
    case 'url':
      return block.data?.url || block.data?.description || 'Link content';
    
    case 'pro_tip':
      const tipContent = block.data?.content || block.data?.tip || '';
      if (typeof tipContent === 'string' && tipContent.length > 0) {
        return tipContent.length > 50 ? tipContent.substring(0, 50) + '...' : tipContent;
      }
      return 'Pro tip content';
    
    case 'avoidance':
      const avoidanceContent = block.data?.content || block.data?.warning || '';
      if (typeof avoidanceContent === 'string' && avoidanceContent.length > 0) {
        return avoidanceContent.length > 50 ? avoidanceContent.substring(0, 50) + '...' : avoidanceContent;
      }
      return 'Avoidance content';
    
    default:
      return 'Content block';
  }
};

export const ContentBlockPreview = ({ block, onEdit, onDelete }: ContentBlockPreviewProps) => {
  const icon = getBlockIcon(block.type);
  const title = getBlockTitle(block);
  const previewText = getPreviewText(block);

  return (
    <Card className="border border-gray-200 hover:border-orange-200 transition-colors">
      <CardContent className="p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <span className="text-xl flex-shrink-0">{icon}</span>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-sm truncate">
                {title}
              </h4>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {previewText}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="h-8 w-8 p-0 text-gray-500 hover:text-orange-600 hover:bg-orange-50"
            >
              <Edit2 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="h-8 w-8 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
