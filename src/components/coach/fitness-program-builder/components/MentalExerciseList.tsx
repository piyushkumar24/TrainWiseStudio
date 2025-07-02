
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MentalExerciseListProps {
  exercises: any[];
  onExerciseSelect: (exercise: any) => void;
}

export const MentalExerciseList = ({ exercises, onExerciseSelect }: MentalExerciseListProps) => {
  if (exercises.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No mental exercises found matching your criteria
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {exercises.map((exercise) => (
        <Card 
          key={exercise.id}
          className="cursor-pointer hover:shadow-md transition-shadow h-fit"
          onClick={() => onExerciseSelect(exercise)}
        >
          <CardContent className="p-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="text-xl">🧘‍♀️</div>
                <h4 className="font-medium text-gray-900 text-sm leading-tight flex-1">
                  {exercise.title}
                </h4>
              </div>
              <div className="flex flex-col gap-1">
                <Badge variant="secondary" className="text-xs capitalize w-fit">
                  {exercise.subcategory}
                </Badge>
                {exercise.tags && exercise.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {exercise.tags.slice(0, 2).map((tag: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {exercise.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{exercise.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
