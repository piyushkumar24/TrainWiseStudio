import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export type SupabaseKnowledgeItem = {
  id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  name: string;
  tags: string[];
  header_image?: string;
  is_draft: boolean;
  // Specific to fitness
  intro?: string;
  target?: string;
  muscle_group_main?: string;
  muscle_group_sub?: string[]; // Changed to array
  // Specific to recipes
  category?: string;
  allergies?: string[];
  portion_count?: number;
  metrics?: {
    protein: number;
    fat: number;
    carbs: number;
    kcal: number;
  };
  // Specific to mental health
  exercise_type?: string;
  // Common
  blocks: any[];
};

export const useSupabaseFitnessExercises = () => {
  const queryClient = useQueryClient();

  const { data: exercises = [], isLoading, refetch } = useQuery({
    queryKey: ['fitness-exercises'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fitness_exercises')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as SupabaseKnowledgeItem[];
    },
  });

  const createExercise = useMutation({
    mutationFn: async (exerciseData: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('fitness_exercises')
        .insert({
          created_by: user.id,
          name: exerciseData.title,
          intro: exerciseData.intro,
          target: exerciseData.target,
          tags: exerciseData.tags,
          header_image: exerciseData.headerImageUrl,
          muscle_group_main: exerciseData.muscleGroup.main,
          muscle_group_sub: exerciseData.muscleGroup.sub, // Now array
          blocks: exerciseData.instructionBlocks,
          is_draft: false,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fitness-exercises'] });
      toast.success('Fitness exercise created successfully! 💪');
    },
    onError: (error) => {
      console.error('Error creating fitness exercise:', error);
      toast.error('Failed to create fitness exercise');
    },
  });

  const updateExercise = useMutation({
    mutationFn: async ({ id, data: exerciseData, isDraft }: { id: string; data: any; isDraft: boolean }) => {
      const { data, error } = await supabase
        .from('fitness_exercises')
        .update({
          name: exerciseData.title,
          intro: exerciseData.intro,
          target: exerciseData.target,
          tags: exerciseData.tags,
          header_image: exerciseData.headerImageUrl,
          muscle_group_main: exerciseData.muscleGroup.main,
          muscle_group_sub: exerciseData.muscleGroup.sub, // Now array
          blocks: exerciseData.instructionBlocks,
          is_draft: isDraft,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, { isDraft }) => {
      queryClient.invalidateQueries({ queryKey: ['fitness-exercises'] });
      toast.success(isDraft ? 'Draft saved successfully! 💾' : 'Fitness exercise updated successfully! 💪');
    },
    onError: (error) => {
      console.error('Error updating fitness exercise:', error);
      toast.error('Failed to update fitness exercise');
    },
  });

  const saveDraft = useMutation({
    mutationFn: async (exerciseData: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('fitness_exercises')
        .insert({
          created_by: user.id,
          name: exerciseData.title || 'Untitled Exercise',
          intro: exerciseData.intro,
          target: exerciseData.target,
          tags: exerciseData.tags,
          header_image: exerciseData.headerImageUrl,
          muscle_group_main: exerciseData.muscleGroup.main,
          muscle_group_sub: exerciseData.muscleGroup.sub, // Now array
          blocks: exerciseData.instructionBlocks,
          is_draft: true,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fitness-exercises'] });
      toast.success('Draft saved successfully! 💾');
    },
    onError: (error) => {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft');
    },
  });

  return {
    exercises,
    isLoading,
    refetch,
    createExercise: createExercise.mutate,
    updateExercise: updateExercise.mutate,
    saveDraft: saveDraft.mutate,
    isCreating: createExercise.isPending,
    isSaving: saveDraft.isPending,
  };
};

export const useSupabaseRecipes = () => {
  const queryClient = useQueryClient();

  const { data: recipes = [], isLoading, refetch } = useQuery({
    queryKey: ['recipes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as SupabaseKnowledgeItem[];
    },
  });

  const createRecipe = useMutation({
    mutationFn: async (recipeData: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('recipes')
        .insert({
          created_by: user.id,
          name: recipeData.name,
          category: recipeData.category,
          tags: recipeData.tags,
          allergies: recipeData.allergies || [],
          header_image: recipeData.headerImageUrl,
          portion_count: recipeData.portionYield,
          metrics: recipeData.nutrition,
          blocks: recipeData.contentBlocks,
          is_draft: false,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      toast.success('Recipe created successfully! 🥗');
    },
    onError: (error) => {
      console.error('Error creating recipe:', error);
      toast.error('Failed to create recipe');
    },
  });

  const updateRecipe = useMutation({
    mutationFn: async ({ id, data: recipeData, isDraft }: { id: string; data: any; isDraft: boolean }) => {
      const { data, error } = await supabase
        .from('recipes')
        .update({
          name: recipeData.name,
          category: recipeData.category,
          tags: recipeData.tags,
          allergies: recipeData.allergies || [],
          header_image: recipeData.headerImageUrl,
          portion_count: recipeData.portionYield,
          metrics: recipeData.nutrition,
          blocks: recipeData.contentBlocks,
          is_draft: isDraft,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, { isDraft }) => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      toast.success(isDraft ? 'Draft saved successfully! 💾' : 'Recipe updated successfully! 🥗');
    },
    onError: (error) => {
      console.error('Error updating recipe:', error);
      toast.error('Failed to update recipe');
    },
  });

  const saveDraft = useMutation({
    mutationFn: async (recipeData: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('recipes')
        .insert({
          created_by: user.id,
          name: recipeData.name || 'Untitled Recipe',
          category: recipeData.category,
          tags: recipeData.tags,
          allergies: recipeData.allergies || [],
          header_image: recipeData.headerImageUrl,
          portion_count: recipeData.portionYield,
          metrics: recipeData.nutrition,
          blocks: recipeData.contentBlocks,
          is_draft: true,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      toast.success('Draft saved successfully! 💾');
    },
    onError: (error) => {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft');
    },
  });

  return {
    recipes,
    isLoading,
    refetch,
    createRecipe: createRecipe.mutate,
    updateRecipe: updateRecipe.mutate,
    saveDraft: saveDraft.mutate,
    isCreating: createRecipe.isPending,
    isSaving: saveDraft.isPending,
  };
};

export const useSupabaseMentalExercises = () => {
  const queryClient = useQueryClient();

  const { data: exercises = [], isLoading, refetch } = useQuery({
    queryKey: ['mental-exercises'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mental_health_exercises')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as SupabaseKnowledgeItem[];
    },
  });

  const createExercise = useMutation({
    mutationFn: async (exerciseData: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('mental_health_exercises')
        .insert({
          created_by: user.id,
          name: exerciseData.name,
          exercise_type: exerciseData.type,
          tags: exerciseData.tags,
          header_image: exerciseData.headerImageUrl,
          blocks: exerciseData.contentBlocks,
          is_draft: false,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mental-exercises'] });
      toast.success('Mental exercise created successfully! 🧠');
    },
    onError: (error) => {
      console.error('Error creating mental exercise:', error);
      toast.error('Failed to create mental exercise');
    },
  });

  const updateExercise = useMutation({
    mutationFn: async ({ id, data: exerciseData, isDraft }: { id: string; data: any; isDraft: boolean }) => {
      const { data, error } = await supabase
        .from('mental_health_exercises')
        .update({
          name: exerciseData.name,
          exercise_type: exerciseData.type,
          tags: exerciseData.tags,
          header_image: exerciseData.headerImageUrl,
          blocks: exerciseData.contentBlocks,
          is_draft: isDraft,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, { isDraft }) => {
      queryClient.invalidateQueries({ queryKey: ['mental-exercises'] });
      toast.success(isDraft ? 'Draft saved successfully! 💾' : 'Mental exercise updated successfully! 🧠');
    },
    onError: (error) => {
      console.error('Error updating mental exercise:', error);
      toast.error('Failed to update mental exercise');
    },
  });

  const saveDraft = useMutation({
    mutationFn: async (exerciseData: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('mental_health_exercises')
        .insert({
          created_by: user.id,
          name: exerciseData.name || 'Untitled Exercise',
          exercise_type: exerciseData.type,
          tags: exerciseData.tags,
          header_image: exerciseData.headerImageUrl,
          blocks: exerciseData.contentBlocks,
          is_draft: true,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mental-exercises'] });
      toast.success('Draft saved successfully! 💾');
    },
    onError: (error) => {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft');
    },
  });

  return {
    exercises,
    isLoading,
    refetch,
    createExercise: createExercise.mutate,
    updateExercise: updateExercise.mutate,
    saveDraft: saveDraft.mutate,
    isCreating: createExercise.isPending,
    isSaving: saveDraft.isPending,
  };
};
