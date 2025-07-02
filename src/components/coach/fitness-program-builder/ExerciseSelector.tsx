import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useExerciseSelection } from './hooks/useExerciseSelection';
import { ExerciseFilters } from './components/ExerciseFilters';
import { ExerciseList } from './components/ExerciseList';
import { SetsConfiguration } from './components/SetsConfiguration';

interface ExerciseSelectorProps {
  onSelect: (exerciseData: any) => void;
  onBack: () => void;
  initialData?: any;
  isAddingSuperset?: boolean;
}

export const ExerciseSelector = ({ onSelect, onBack, initialData, isAddingSuperset }: ExerciseSelectorProps) => {
  const {
    isLoading,
    searchTerm,
    setSearchTerm,
    muscleGroupFilter,
    setMuscleGroupFilter,
    selectedExercise,
    setSelectedExercise,
    sets,
    fitnessExercises,
    addSet,
    removeSet,
    updateSet
  } = useExerciseSelection(initialData, isAddingSuperset);

  const handleExerciseSelect = (exercise: any) => {
    setSelectedExercise(exercise);
  };

  const handleConfirm = () => {
    if (!selectedExercise) return;

    // Create a proper ContentBlock structure with content_id
    const contentBlock = {
      id: `block_${Date.now()}`,
      type: 'exercise' as const,
      data: {
        exerciseName: selectedExercise.name,
        muscleGroup: selectedExercise.muscle_group_main,
        sets: sets.map(set => ({
          reps: set.reps,
          repRange: set.repRange,
          useRange: set.useRange || false
        }))
      },
      order: 0,
      contentId: selectedExercise.id // ✅ LINK TO KNOWLEDGE HUB
    };

    onSelect(contentBlock);
  };

  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {isAddingSuperset ? 'Add Exercise to Superset' : initialData ? 'Edit Exercise' : 'Select Exercise'}
          </h3>
          <p className="text-sm text-gray-600">
            {isAddingSuperset ? 'Choose an additional exercise from your Knowledge Hub' : 'Choose an exercise from your Knowledge Hub and configure sets/reps'}
          </p>
        </div>
      </div>

      {/* Exercise Selection */}
      {!selectedExercise && (
        <div className="space-y-4">
          {/* Filters */}
          <ExerciseFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            muscleGroupFilter={muscleGroupFilter}
            onMuscleGroupChange={setMuscleGroupFilter}
          />

          {/* Exercise List */}
          <ExerciseList
            exercises={fitnessExercises}
            onExerciseSelect={handleExerciseSelect}
          />
        </div>
      )}

      {/* Exercise Configuration */}
      {selectedExercise && (
        <div className="space-y-4">
          {/* Selected Exercise Info */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="text-2xl">🏋️‍♂️</span>
                  {selectedExercise.name}
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedExercise(null)}
                >
                  Change Exercise
                </Button>
              </div>
              <p className="text-sm text-gray-600 capitalize">
                {selectedExercise.muscle_group_main}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Sets Configuration */}
              <SetsConfiguration
                sets={sets}
                onAddSet={addSet}
                onRemoveSet={removeSet}
                onUpdateSet={updateSet}
              />

              {/* Confirm Button */}
              <Button 
                onClick={handleConfirm}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                {isAddingSuperset ? 'Add to Superset' : initialData ? 'Update Exercise' : 'Add Exercise to Day'}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
