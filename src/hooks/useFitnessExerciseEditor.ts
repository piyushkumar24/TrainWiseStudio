import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ExerciseData, InstructionBlock } from '@/pages/coach/CreateFitnessExercise';
import { useSupabaseFitnessExercises } from '@/hooks/useSupabaseKnowledgeHub';
import { toast } from 'sonner';

// Helper function to convert blob URL to base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const convertBlobUrlToBase64 = async (blobUrl: string): Promise<string> => {
  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return await blobToBase64(blob);
  } catch (error) {
    console.error('Error converting blob URLs to base64:', error);
    return blobUrl;
  }
};

export const useFitnessExerciseEditor = () => {
  const { exerciseId } = useParams();
  const isEditMode = Boolean(exerciseId);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [exerciseData, setExerciseData] = useState<ExerciseData>({
    title: '',
    intro: '',
    tags: [],
    muscleGroup: { main: '', sub: [] }, // Changed to array
    instructionBlocks: [],
    headerImageUrl: undefined,
  });

  const { saveDraft, createExercise, updateExercise, isSaving, isCreating } = useSupabaseFitnessExercises();

  // Fetch existing exercise data if in edit mode
  const { data: existingExercise, isLoading: isLoadingExercise } = useQuery({
    queryKey: ['fitness-exercise-edit', exerciseId],
    queryFn: async () => {
      if (!exerciseId) return null;
      
      const { data, error } = await supabase
        .from('fitness_exercises')
        .select('*')
        .eq('id', exerciseId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: isEditMode,
  });

  // Load existing data when in edit mode
  useEffect(() => {
    if (existingExercise && isEditMode) {
      const loadedData = {
        title: existingExercise.name || '',
        intro: existingExercise.intro || '',
        tags: existingExercise.tags || [],
        muscleGroup: {
          main: existingExercise.muscle_group_main || '',
          sub: existingExercise.muscle_group_sub || [], // Now handles array
        },
        instructionBlocks: (existingExercise.blocks as unknown as InstructionBlock[]) || [],
        headerImageUrl: existingExercise.header_image || undefined,
      };
      console.log('🔄 Loading existing exercise data:', loadedData);
      setExerciseData(loadedData);
    }
  }, [existingExercise, isEditMode]);

  const handleNext = () => {
    console.log('📈 Moving to next step from:', currentStep);
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    console.log('📉 Moving to previous step from:', currentStep);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateExerciseData = (updates: Partial<ExerciseData>) => {
    console.log('🔄 Updating exercise data:', updates);
    setExerciseData(prev => {
      const updated = { ...prev, ...updates };
      console.log('📊 Updated exercise data:', updated);
      return updated;
    });
  };

  const processExerciseData = async (data: ExerciseData) => {
    console.log('🔄 Processing exercise data for save:', data);
    let processedData = { ...data };

    // Convert blob URLs to base64 if present
    if (data.headerImageUrl && data.headerImageUrl.startsWith('blob:')) {
      console.log('Converting header image blob URL to base64...');
      processedData.headerImageUrl = await convertBlobUrlToBase64(data.headerImageUrl);
    }

    // Handle blob URLs in instruction blocks
    if (data.instructionBlocks && data.instructionBlocks.length > 0) {
      console.log('Processing instruction blocks for blob URLs...');
      const processedBlocks = await Promise.all(
        data.instructionBlocks.map(async (block) => {
          const processedBlock = { ...block };
          
          if (block.imageUrl && block.imageUrl.startsWith('blob:')) {
            console.log('Converting block image blob URL to base64...');
            processedBlock.imageUrl = await convertBlobUrlToBase64(block.imageUrl);
          }
          
          if (block.videoUrl && block.videoUrl.startsWith('blob:')) {
            console.log('Converting block video blob URL to base64...');
            processedBlock.videoUrl = await convertBlobUrlToBase64(block.videoUrl);
          }
          
          return processedBlock;
        })
      );
      processedData.instructionBlocks = processedBlocks;
    }

    console.log('✅ Processed exercise data:', processedData);
    return processedData;
  };

  const handleSaveDraft = async () => {
    try {
      console.log('💾 Saving draft to database...');
      const processedData = await processExerciseData(exerciseData);

      if (isEditMode) {
        console.log('🔄 Updating existing exercise as draft');
        updateExercise({ id: exerciseId!, data: processedData, isDraft: true });
      } else {
        console.log('➕ Creating new draft');
        saveDraft(processedData);
      }
    } catch (error) {
      console.error('Error processing draft data:', error);
      toast.error('Failed to save draft - please try again');
    }
  };

  const handlePublish = async () => {
    try {
      console.log('🚀 Publishing exercise...');
      const processedData = await processExerciseData(exerciseData);

      if (isEditMode) {
        console.log('🔄 Updating existing exercise as published');
        updateExercise({ id: exerciseId!, data: processedData, isDraft: false });
      } else {
        console.log('➕ Creating new published exercise');
        createExercise(processedData);
      }
      setCurrentStep(4); // Move to success step
    } catch (error) {
      console.error('Error processing publish data:', error);
      toast.error('Failed to publish exercise - please try again');
    }
  };

  return {
    currentStep,
    setCurrentStep,
    exerciseData,
    updateExerciseData,
    handleNext,
    handlePrevious,
    handleSaveDraft,
    handlePublish,
    isEditMode,
    isLoadingExercise,
    isSaving,
    isCreating,
  };
};
