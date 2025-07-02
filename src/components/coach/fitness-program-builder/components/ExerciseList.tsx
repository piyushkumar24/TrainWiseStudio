
import React from 'react';
import { Dumbbell } from 'lucide-react';

interface Exercise {
  id: string;
  title: string;
  subcategory: string;
  emoji?: string;
  tags: string[];
}

interface ExerciseListProps {
  exercises: Exercise[];
  onExerciseSelect: (exercise: Exercise) => void;
}

export const ExerciseList = ({ exercises, onExerciseSelect }: ExerciseListProps) => {
  if (exercises.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Dumbbell className="h-12 w-12 mx-auto text-gray-300 mb-3" />
        <p className="text-sm">No exercises found in your Knowledge Hub</p>
        <p className="text-xs text-gray-400 mt-1">
          Create fitness exercises in Knowledge Hub to use them here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-60 overflow-y-auto">
      {exercises.map((exercise) => (
        <button
          key={exercise.id}
          onClick={() => onExerciseSelect(exercise)}
          className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="text-2xl">{exercise.emoji}</div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">{exercise.title}</div>
              <div className="text-sm text-gray-600 capitalize">
                {exercise.subcategory}
                {exercise.tags.length > 0 && (
                  <span className="ml-2 text-gray-400">
                    • {exercise.tags.slice(0, 2).join(', ')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
