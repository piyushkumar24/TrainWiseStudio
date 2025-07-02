
import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Badge } from '@/components/ui/badge';
import { CreationProgressBar } from '@/components/coach/fitness-creation/CreationProgressBar';
import { useNavigate } from 'react-router-dom';
import { useRecipeEditor } from '@/hooks/useRecipeEditor';
import { RecipeStepRenderer } from '@/components/coach/recipe-creation/RecipeStepRenderer';

const CreateNutritionRecipe = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    recipeData,
    isEditMode,
    isLoadingRecipe,
    handleNext,
    handlePrevious,
    handleSaveDraft,
    handlePublish,
    updateRecipeData,
  } = useRecipeEditor();

  const totalSteps = 4;

  const handleBack = () => {
    navigate('/coach/knowledgeHub');
  };

  if (isEditMode && isLoadingRecipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
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
        title={isEditMode ? 'Edit Nutrition Recipe' : 'Create Nutrition Recipe'}
        showBackButton={true}
        onBack={handleBack}
        actions={headerActions}
        progressBar={headerProgressBar}
        stickyOffset="top-0"
      />

      <div className="px-4 sm:px-6 md:px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <RecipeStepRenderer
            currentStep={currentStep}
            recipeData={recipeData}
            onUpdate={updateRecipeData}
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

export default CreateNutritionRecipe;
