
import React from 'react';
import { RecipeInfoStep } from './RecipeInfoStep';
import { ContentBuilderStep } from './ContentBuilderStep';
import { RecipePreviewStep } from './RecipePreviewStep';
import { RecipeSuccessStep } from './RecipeSuccessStep';
import { RecipeData } from '@/types/recipe';

interface RecipeStepRendererProps {
  currentStep: number;
  recipeData: RecipeData;
  onUpdate: (updates: Partial<RecipeData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  onBack: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
}

export const RecipeStepRenderer = ({
  currentStep,
  recipeData,
  onUpdate,
  onNext,
  onPrevious,
  onBack,
  onSaveDraft,
  onPublish,
}: RecipeStepRendererProps) => {
  switch (currentStep) {
    case 1:
      return (
        <RecipeInfoStep
          data={recipeData}
          onUpdate={onUpdate}
          onNext={onNext}
          onBack={onBack}
          onSaveDraft={onSaveDraft}
        />
      );
    case 2:
      return (
        <ContentBuilderStep
          data={recipeData}
          onUpdate={onUpdate}
          onNext={onNext}
          onPrevious={onPrevious}
          onBack={onBack}
          onSaveDraft={onSaveDraft}
        />
      );
    case 3:
      return (
        <RecipePreviewStep
          data={recipeData}
          onNext={onPublish}
          onPrevious={onPrevious}
          onBack={onBack}
          onSaveDraft={onSaveDraft}
        />
      );
    case 4:
      return <RecipeSuccessStep />;
    default:
      return null;
  }
};
