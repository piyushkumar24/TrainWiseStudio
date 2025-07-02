
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ContentViewer } from '@/components/shared/ContentViewer';

const RecipeViewer = () => {
  const { recipeId } = useParams();

  const { data: recipe, isLoading, error } = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', recipeId)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <ContentViewer
      data={recipe}
      contentType="nutrition"
      isLoading={isLoading}
      error={error}
      notFoundMessage="The recipe you're looking for doesn't exist."
    />
  );
};

export default RecipeViewer;
