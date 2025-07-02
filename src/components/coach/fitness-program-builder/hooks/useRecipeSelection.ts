
import { useState, useEffect } from 'react';
import { useKnowledgeHubData } from '@/hooks/useKnowledgeHubData';

export const useRecipeSelection = (initialData?: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [mealTypeFilter, setMealTypeFilter] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [portionConfig, setPortionConfig] = useState({
    min: 1,
    max: 1,
    mealTime: '08:00'
  });

  const { knowledgeItems } = useKnowledgeHubData();

  useEffect(() => {
    if (initialData?.data) {
      setPortionConfig({
        min: initialData.data.portionMin || 1,
        max: initialData.data.portionMax || 1,
        mealTime: initialData.data.mealTime || '08:00'
      });
      
      // Always set selectedRecipe when in edit mode to ensure we skip recipe selection
      setSelectedRecipe({
        title: initialData.data.recipeName,
        subcategory: initialData.data.mealType
      });
    } else {
      // Reset states when not in edit mode
      setSelectedRecipe(null);
      setPortionConfig({
        min: 1,
        max: 1,
        mealTime: '08:00'
      });
    }
    setIsLoading(false);
  }, [initialData]); // This will re-run whenever initialData changes

  const nutritionRecipes = knowledgeItems?.filter(item => 
    item.category === 'nutrition' &&
    (searchTerm === '' || item.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (mealTypeFilter === 'all' || item.subcategory === mealTypeFilter)
  ) || [];

  const updatePortionConfig = (field: string, value: number | string) => {
    setPortionConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return {
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
  };
};
