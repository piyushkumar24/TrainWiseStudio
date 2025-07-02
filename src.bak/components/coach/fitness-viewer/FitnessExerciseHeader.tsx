
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Target } from 'lucide-react';

interface FitnessExerciseHeaderProps {
  exercise: {
    name: string;
    muscle_group_main?: string;
    muscle_group_sub?: string;
    tags?: any;
  };
}

export const FitnessExerciseHeader = ({ exercise }: FitnessExerciseHeaderProps) => {
  const tags = Array.isArray(exercise.tags) ? exercise.tags : [];

  return (
    <div className="text-center animate-fade-in">
      <div className="text-6xl mb-4">🏋️‍♂️</div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {exercise.name}
      </h1>
      
      {/* Muscle Groups */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {exercise.muscle_group_main && (
          <Badge className="bg-orange-100 text-orange-700 border-orange-200 flex items-center gap-1">
            <ChevronRight className="h-3 w-3" />
            {exercise.muscle_group_main}
          </Badge>
        )}
        {exercise.muscle_group_sub && (
          <Badge variant="outline" className="flex items-center gap-1">
            <Target className="h-3 w-3" />
            {exercise.muscle_group_sub}
          </Badge>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {tags.map((tag: string, index: number) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
