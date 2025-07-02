import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseFitnessExercises, useSupabaseRecipes, useSupabaseMentalExercises, SupabaseKnowledgeItem } from './useSupabaseKnowledgeHub';

export type KnowledgeItem = {
  id: string;
  title: string;
  category: 'fitness' | 'nutrition' | 'mental';
  subcategory: string;
  status: 'draft' | 'published';
  tags: string[];
  imageUrl?: string;
  emoji?: string;
  createdAt: string;
  description?: string;
};

const mapSupabaseToKnowledgeItem = (item: SupabaseKnowledgeItem, category: 'fitness' | 'nutrition' | 'mental'): KnowledgeItem => {
  let subcategory = '';
  let emoji = '';
  
  switch (category) {
    case 'fitness':
      // Handle both string and array subcategories - join array with comma or use string
      if (Array.isArray(item.muscle_group_sub)) {
        subcategory = item.muscle_group_sub.join(', ') || item.muscle_group_main || 'general';
      } else {
        subcategory = item.muscle_group_sub || item.muscle_group_main || 'general';
      }
      emoji = '🏋️‍♂️';
      break;
    case 'nutrition':
      subcategory = item.category?.toLowerCase() || 'general';
      emoji = '🥗';
      break;
    case 'mental':
      subcategory = item.exercise_type?.toLowerCase().replace('_', ' ') || 'general';
      emoji = '🧘‍♀️';
      break;
  }

  return {
    id: item.id,
    title: item.name,
    category,
    subcategory,
    status: item.is_draft ? 'draft' : 'published',
    tags: item.tags || [],
    imageUrl: item.header_image,
    emoji,
    createdAt: item.created_at,
    description: category === 'fitness' ? item.intro : undefined,
  };
};

export const useKnowledgeHubData = () => {
  const { exercises: fitnessExercises, isLoading: loadingFitness, refetch: refetchFitness } = useSupabaseFitnessExercises();
  const { recipes, isLoading: loadingRecipes, refetch: refetchRecipes } = useSupabaseRecipes();
  const { exercises: mentalExercises, isLoading: loadingMental, refetch: refetchMental } = useSupabaseMentalExercises();

  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAnyLoading = loadingFitness || loadingRecipes || loadingMental;
    setIsLoading(isAnyLoading);

    if (!isAnyLoading) {
      const allItems: KnowledgeItem[] = [
        ...fitnessExercises.map(item => mapSupabaseToKnowledgeItem(item, 'fitness')),
        ...recipes.map(item => mapSupabaseToKnowledgeItem(item, 'nutrition')),
        ...mentalExercises.map(item => mapSupabaseToKnowledgeItem(item, 'mental')),
      ];

      // Sort by created date (latest first)
      const sortedItems = allItems.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setKnowledgeItems(sortedItems);
    }
  }, [fitnessExercises, recipes, mentalExercises, loadingFitness, loadingRecipes, loadingMental]);

  // Set up real-time subscriptions with proper channel management
  useEffect(() => {
    const channels = [
      supabase
        .channel('fitness-exercises-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'fitness_exercises' }, () => {
          refetchFitness();
        }),
      supabase
        .channel('recipes-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'recipes' }, () => {
          refetchRecipes();
        }),
      supabase
        .channel('mental-exercises-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'mental_health_exercises' }, () => {
          refetchMental();
        }),
    ];

    channels.forEach(channel => channel.subscribe());

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  }, [refetchFitness, refetchRecipes, refetchMental]);

  const refetch = () => {
    refetchFitness();
    refetchRecipes();
    refetchMental();
  };

  return {
    knowledgeItems,
    isLoading,
    refetch,
  };
};
