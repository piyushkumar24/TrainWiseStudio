import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useMentalExerciseSelection } from './hooks/useMentalExerciseSelection';
import { MentalExerciseFilters } from './components/MentalExerciseFilters';
import { MentalExerciseList } from './components/MentalExerciseList';
import { TextBlockConfiguration } from './components/TextBlockConfiguration';

interface MentalExerciseSelectorProps {
  onSelect: (exerciseData: any) => void;
  onBack: () => void;
  initialData?: any;
}

export const MentalExerciseSelector = ({ onSelect, onBack, initialData }: MentalExerciseSelectorProps) => {
  const {
    isLoading,
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    selectedExercise,
    setSelectedExercise,
    textBlock,
    mentalExercises,
    updateTextBlock
  } = useMentalExerciseSelection(initialData);

  const handleExerciseSelect = (exercise: any) => {
    setSelectedExercise(exercise);
  };

  const handleConfirm = () => {
    if (!selectedExercise) return;

    const exerciseData = {
      id: `mental_${Date.now()}`,
      type: 'mental',
      data: {
        exerciseName: selectedExercise.name,
        exerciseType: selectedExercise.exercise_type,
        textBlock: textBlock
      },
      order: 0,
      contentId: selectedExercise.id // ✅ LINK TO KNOWLEDGE HUB
    };

    onSelect(exerciseData);
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
            {initialData ? 'Edit Mental Exercise' : 'Select Mental Exercise'}
          </h3>
          <p className="text-sm text-gray-600">
            Choose a mental exercise from your Knowledge Hub and add optional guidance
          </p>
        </div>
      </div>

      {/* Exercise Selection */}
      {!selectedExercise && (
        <div className="space-y-4">
          {/* Filters */}
          <MentalExerciseFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            typeFilter={typeFilter}
            onTypeChange={setTypeFilter}
          />

          {/* Exercise List */}
          <MentalExerciseList
            exercises={mentalExercises}
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
                  <span className="text-2xl">🧘‍♀️</span>
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
                {selectedExercise.exercise_type}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Text Block Configuration */}
              <TextBlockConfiguration
                textBlock={textBlock}
                onUpdateTextBlock={updateTextBlock}
              />

              {/* Confirm Button */}
              <Button 
                onClick={handleConfirm}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                {initialData ? 'Update Mental Exercise' : 'Add Mental Exercise to Day'}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
