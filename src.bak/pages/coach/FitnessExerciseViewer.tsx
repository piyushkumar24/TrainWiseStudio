
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ContentViewer } from '@/components/shared/ContentViewer';

const FitnessExerciseViewer = () => {
  const { exerciseId } = useParams();

  console.log('FitnessExerciseViewer - exerciseId:', exerciseId);

  const { data: exercise, isLoading, error } = useQuery({
    queryKey: ['fitness-exercise', exerciseId],
    queryFn: async () => {
      console.log('Fetching fitness exercise with ID:', exerciseId);
      const { data, error } = await supabase
        .from('fitness_exercises')
        .select('*')
        .eq('id', exerciseId)
        .single();
      
      if (error) {
        console.error('Error fetching fitness exercise:', error);
        throw error;
      }
      
      console.log('Fetched fitness exercise data:', data);
      return data;
    },
  });

  console.log('FitnessExerciseViewer - exercise:', exercise);
  console.log('FitnessExerciseViewer - isLoading:', isLoading);
  console.log('FitnessExerciseViewer - error:', error);

  return (
    <ContentViewer
      data={exercise}
      contentType="fitness"
      isLoading={isLoading}
      error={error}
      notFoundMessage="The fitness exercise you're looking for doesn't exist."
    />
  );
};

export default FitnessExerciseViewer;
