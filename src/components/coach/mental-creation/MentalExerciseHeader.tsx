
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/PageHeader';
import { CreationProgressBar } from '@/components/coach/fitness-creation/CreationProgressBar';

interface MentalExerciseHeaderProps {
  isEditMode: boolean;
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onSaveDraft: () => void;
  stickyOffset?: string;
}

export const MentalExerciseHeader = ({ 
  isEditMode, 
  currentStep, 
  totalSteps,
  onBack,
  onSaveDraft,
  stickyOffset
}: MentalExerciseHeaderProps) => {
  const actions = (
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

  const progressBar = (
    <CreationProgressBar currentStep={currentStep} totalSteps={totalSteps} />
  );

  return (
    <PageHeader
      title={isEditMode ? 'Edit Mental Health Exercise' : 'Create Mental Health Exercise'}
      showBackButton={true}
      onBack={onBack}
      actions={actions}
      progressBar={progressBar}
      stickyOffset={stickyOffset}
    />
  );
};
