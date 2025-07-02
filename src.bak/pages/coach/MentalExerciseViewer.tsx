
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ContentViewer } from '@/components/shared/ContentViewer';

const MentalExerciseViewer = () => {
  const { mentalId } = useParams();

  const { data: exercise, isLoading, error } = useQuery({
    queryKey: ['mental-exercise', mentalId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mental_health_exercises')
        .select('*')
        .eq('id', mentalId)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <ContentViewer
      data={exercise}
      contentType="mental"
      isLoading={isLoading}
      error={error}
      notFoundMessage="The mental health exercise you're looking for doesn't exist."
    />
  );
};

export default MentalExerciseViewer;
