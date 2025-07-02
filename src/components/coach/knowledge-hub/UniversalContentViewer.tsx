
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ContentViewer } from '@/components/shared/ContentViewer';
import { ContentType } from '@/config/contentTypes';

type SupabaseContentData = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  header_image?: string;
  blocks: any; // Supabase Json type
  is_draft: boolean;
  // Fitness specific
  intro?: string;
  target?: string;
  muscle_group_main?: string;
  muscle_group_sub?: string[]; // Changed from string to string[]
  // Nutrition specific
  category?: string;
  allergies?: string[];
  portion_count?: number;
  metrics?: any;
  // Mental specific
  exercise_type?: string;
};

type ContentResult = {
  data: SupabaseContentData;
  type: ContentType;
};

const UniversalContentViewer = () => {
  const { id } = useParams();

  const { data: content, isLoading, error } = useQuery({
    queryKey: ['universal-content', id],
    queryFn: async (): Promise<ContentResult> => {
      if (!id) throw new Error('No ID provided');

      // Try fitness exercises first
      const { data: fitnessData, error: fitnessError } = await supabase
        .from('fitness_exercises')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (!fitnessError && fitnessData) {
        return { data: fitnessData as SupabaseContentData, type: 'fitness' };
      }

      // Try recipes next
      const { data: recipeData, error: recipeError } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (!recipeError && recipeData) {
        return { data: recipeData as SupabaseContentData, type: 'nutrition' };
      }

      // Try mental health exercises last
      const { data: mentalData, error: mentalError } = await supabase
        .from('mental_health_exercises')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (!mentalError && mentalData) {
        return { data: mentalData as SupabaseContentData, type: 'mental' };
      }

      throw new Error('Content not found');
    },
    enabled: !!id,
  });

  if (!content) {
    return (
      <ContentViewer
        data={null}
        contentType="fitness"
        isLoading={isLoading}
        error={error}
        notFoundMessage="The content you're looking for doesn't exist."
      />
    );
  }

  return (
    <ContentViewer
      data={content.data}
      contentType={content.type}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default UniversalContentViewer;
