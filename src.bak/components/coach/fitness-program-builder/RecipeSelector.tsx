import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useRecipeSelection } from './hooks/useRecipeSelection';
import { RecipeFilters } from './components/RecipeFilters';
import { RecipeList } from './components/RecipeList';
import { PortionConfiguration } from './components/PortionConfiguration';

interface RecipeSelectorProps {
  onSelect: (recipeData: any) => void;
  onBack: () => void;
  initialData?: any;
}

export const RecipeSelector = ({ onSelect, onBack, initialData }: RecipeSelectorProps) => {
  const {
    isLoading,
    searchTerm,
    setSearchTerm,
    mealTypeFilter,
    setMealTypeFilter,
    selectedRecipe,
    setSelectedRecipe,
    portionConfig,
    nutritionRecipes,
    updatePortionConfig
  } = useRecipeSelection(initialData);

  const handleRecipeSelect = (recipe: any) => {
    setSelectedRecipe(recipe);
  };

  const handleConfirm = () => {
    // In edit mode, use initialData; otherwise use selectedRecipe
    const isEditMode = Boolean(initialData);
    const recipeToUse = isEditMode ? initialData : selectedRecipe;
    
    if (!recipeToUse && !isEditMode) return;

    const recipeData = {
      id: isEditMode ? initialData.id : `recipe_${Date.now()}`,
      type: 'recipe',
      data: {
        recipeName: isEditMode ? initialData.data?.recipeName : selectedRecipe.name,
        mealType: isEditMode ? initialData.data?.mealType : selectedRecipe.category,
        portionMin: portionConfig.min,
        portionMax: portionConfig.max,
        mealTime: portionConfig.mealTime
      },
      order: isEditMode ? initialData.order : 0,
      contentId: isEditMode ? initialData.contentId : selectedRecipe.id // ✅ LINK TO KNOWLEDGE HUB
    };

    onSelect(recipeData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // If we have initial data (editing mode), skip recipe selection and go straight to configuration
  const isEditMode = Boolean(initialData);
  const showConfiguration = selectedRecipe || isEditMode;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {initialData ? 'Edit Recipe' : 'Select Recipe'}
          </h3>
          <p className="text-sm text-gray-600">
            {showConfiguration 
              ? 'Configure portions and meal time' 
              : 'Choose a recipe from your Knowledge Hub and configure portions'
            }
          </p>
        </div>
      </div>

      {/* Recipe Selection */}
      {!showConfiguration && (
        <div className="space-y-4">
          {/* Filters */}
          <RecipeFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            mealTypeFilter={mealTypeFilter}
            onMealTypeChange={setMealTypeFilter}
          />

          {/* Recipe List */}
          <RecipeList
            recipes={nutritionRecipes}
            onRecipeSelect={handleRecipeSelect}
          />
        </div>
      )}

      {/* Recipe Configuration */}
      {showConfiguration && (
        <div className="space-y-4">
          {/* Selected Recipe Info */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="text-2xl">🥗</span>
                  {isEditMode ? initialData?.data?.recipeName : selectedRecipe?.name}
                </CardTitle>
                {!isEditMode && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedRecipe(null)}
                  >
                    Change Recipe
                  </Button>
                )}
              </div>
              <p className="text-sm text-gray-600 capitalize">
                {isEditMode ? initialData?.data?.mealType : selectedRecipe?.category}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Portion Configuration */}
              <PortionConfiguration
                portionConfig={portionConfig}
                onUpdateConfig={updatePortionConfig}
              />

              {/* Confirm Button */}
              <Button 
                onClick={handleConfirm}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                {initialData ? 'Update Recipe' : 'Add Recipe to Day'}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
