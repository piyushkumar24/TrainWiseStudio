
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseRecipes } from '@/hooks/useSupabaseKnowledgeHub';
import { RecipeData } from '@/types/recipe';

export const useRecipeEditor = () => {
  const { recipeId } = useParams();
  const isEditMode = Boolean(recipeId);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [recipeData, setRecipeData] = useState<RecipeData>({
    name: '',
    category: '',
    portionYield: 1,
    nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
    tags: [],
    contentBlocks: [],
    headerImageUrl: undefined,
  });

  const { saveDraft, createRecipe, updateRecipe, isSaving, isCreating } = useSupabaseRecipes();

  // Fetch existing recipe data if in edit mode
  const { data: existingRecipe, isLoading: isLoadingRecipe } = useQuery({
    queryKey: ['recipe-edit', recipeId],
    queryFn: async () => {
      if (!recipeId) return null;
      
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', recipeId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: isEditMode,
  });

  // Safely parse metrics data with fallback
  const parseNutrition = (metrics: any) => {
    if (metrics && typeof metrics === 'object' && !Array.isArray(metrics)) {
      return {
        calories: Number(metrics.calories) || 0,
        protein: Number(metrics.protein) || 0,
        carbs: Number(metrics.carbs) || 0,
        fat: Number(metrics.fat) || 0,
      };
    }
    return { calories: 0, protein: 0, carbs: 0, fat: 0 };
  };

  // Load existing data when in edit mode
  useEffect(() => {
    if (existingRecipe && isEditMode) {
      setRecipeData({
        name: existingRecipe.name || '',
        category: existingRecipe.category || '',
        portionYield: existingRecipe.portion_count || 1,
        nutrition: parseNutrition(existingRecipe.metrics),
        tags: existingRecipe.tags || [],
        contentBlocks: (existingRecipe.blocks as unknown as any[]) || [],
        headerImageUrl: existingRecipe.header_image || undefined,
      });
    }
  }, [existingRecipe, isEditMode]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    if (isEditMode) {
      updateRecipe({ id: recipeId!, data: recipeData, isDraft: true });
    } else {
      saveDraft(recipeData);
    }
  };

  const handlePublish = () => {
    if (isEditMode) {
      updateRecipe({ id: recipeId!, data: recipeData, isDraft: false });
    } else {
      createRecipe(recipeData);
    }
    setCurrentStep(4); // Move to success step
  };

  const updateRecipeData = (updates: Partial<RecipeData>) => {
    setRecipeData(prev => ({ ...prev, ...updates }));
  };

  return {
    currentStep,
    recipeData,
    isEditMode,
    isLoadingRecipe,
    handleNext,
    handlePrevious,
    handleSaveDraft,
    handlePublish,
    updateRecipeData,
  };
};
