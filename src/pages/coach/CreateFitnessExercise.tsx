
import React from 'react';
import { CreationProgressBar } from '@/components/coach/fitness-creation/CreationProgressBar';
import { PageHeader } from '@/components/shared/PageHeader';
import { Badge } from '@/components/ui/badge';
import { FitnessExerciseStepRenderer } from '@/components/coach/fitness-creation/FitnessExerciseStepRenderer';
import { LoadingSpinner } from '@/components/coach/fitness-creation/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useFitnessExerciseEditor } from '@/hooks/useFitnessExerciseEditor';

export type ExerciseData = {
  title: string;
  intro: string;
  tags: string[];
  muscleGroup: {
    main: string;
    sub: string[]; // Changed from string to string[]
  };
  instructionBlocks: InstructionBlock[];
  headerImageUrl?: string;
};

export type InstructionBlock = {
  id: string;
  type: 'text' | 'image' | 'video' | 'link' | 'protip';
  content: string;
  order: number;
  imageUrl?: string;
  videoUrl?: string;
};

const CreateFitnessExercise = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    exerciseData,
    updateExerciseData,
    handleNext,
    handlePrevious,
    handleSaveDraft,
    handlePublish,
    isEditMode,
    isLoadingExercise,
  } = useFitnessExerciseEditor();

  const totalSteps = 4;

  const handleBack = () => {
    navigate('/coach/knowledgeHub');
  };

  if (isEditMode && isLoadingExercise) {
    return <LoadingSpinner />;
  }

  const headerActions = (
    <div className="flex items-center gap-3">
      {isEditMode && (
        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
          Edit Mode
        </Badge>
      )}
      <div className="text-sm text-gray-500">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );

  const headerProgressBar = (
    <CreationProgressBar currentStep={currentStep} totalSteps={totalSteps} />
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={isEditMode ? 'Edit Fitness Exercise' : 'Create Fitness Exercise'}
        showBackButton={true}
        onBack={handleBack}
        actions={headerActions}
        progressBar={headerProgressBar}
        stickyOffset="top-0"
      />

      <div className="px-4 sm:px-6 md:px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <FitnessExerciseStepRenderer
            currentStep={currentStep}
            exerciseData={exerciseData}
            updateExerciseData={updateExerciseData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onBack={handleBack}
            onSaveDraft={handleSaveDraft}
            onPublish={handlePublish}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateFitnessExercise;
