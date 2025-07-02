
import React from 'react';
import { BasicInfoStep } from './BasicInfoStep';
import { InstructionBuilderStep } from './InstructionBuilderStep';
import { PreviewStep } from './PreviewStep';
import { SuccessStep } from './SuccessStep';
import { ExerciseData } from '@/pages/coach/CreateFitnessExercise';

interface FitnessExerciseStepRendererProps {
  currentStep: number;
  exerciseData: ExerciseData;
  updateExerciseData: (updates: Partial<ExerciseData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  onBack: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
}

export const FitnessExerciseStepRenderer = ({
  currentStep,
  exerciseData,
  updateExerciseData,
  onNext,
  onPrevious,
  onBack,
  onSaveDraft,
  onPublish,
}: FitnessExerciseStepRendererProps) => {
  switch (currentStep) {
    case 1:
      return (
        <BasicInfoStep
          data={exerciseData}
          onUpdate={updateExerciseData}
          onNext={onNext}
          onPrevious={onPrevious}
          onBack={onBack}
          onSaveDraft={onSaveDraft}
        />
      );
    case 2:
      return (
        <InstructionBuilderStep
          data={exerciseData}
          onUpdate={updateExerciseData}
          onNext={onNext}
          onPrevious={onPrevious}
          onBack={onBack}
          onSaveDraft={onSaveDraft}
        />
      );
    case 3:
      return (
        <PreviewStep
          data={exerciseData}
          onNext={onPublish}
          onPrevious={onPrevious}
          onBack={onBack}
          onSaveDraft={onSaveDraft}
        />
      );
    case 4:
      return <SuccessStep />;
    default:
      return null;
  }
};
