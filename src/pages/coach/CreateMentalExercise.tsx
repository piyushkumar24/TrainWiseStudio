
import React, { useState, useEffect } from 'react';
import { MentalInfoStep } from '@/components/coach/mental-creation/MentalInfoStep';
import { MentalContentBuilderStep } from '@/components/coach/mental-creation/MentalContentBuilderStep';
import { MentalPreviewStep } from '@/components/coach/mental-creation/MentalPreviewStep';
import { MentalSuccessStep } from '@/components/coach/mental-creation/MentalSuccessStep';
import { MentalExerciseHeader } from '@/components/coach/mental-creation/MentalExerciseHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { useSupabaseMentalExercises } from '@/hooks/useSupabaseKnowledgeHub';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type MentalExerciseData = {
  name: string;
  type: string;
  duration: number;
  tags: string[];
  contentBlocks: MentalContentBlock[];
  headerImageUrl?: string;
};

export type MentalContentBlock = {
  id: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'protip';
  content: string;
  order: number;
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
};

const CreateMentalExercise = () => {
  const navigate = useNavigate();
  const { mentalId } = useParams();
  const isEditMode = Boolean(mentalId);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [exerciseData, setExerciseData] = useState<MentalExerciseData>({
    name: '',
    type: '',
    duration: 5,
    tags: [],
    contentBlocks: [],
  });

  const { saveDraft, createExercise, updateExercise, isSaving, isCreating } = useSupabaseMentalExercises();

  // Fetch existing exercise data if in edit mode
  const { data: existingExercise, isLoading: isLoadingExercise } = useQuery({
    queryKey: ['mental-exercise-edit', mentalId],
    queryFn: async () => {
      if (!mentalId) return null;
      
      const { data, error } = await supabase
        .from('mental_health_exercises')
        .select('*')
        .eq('id', mentalId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: isEditMode,
  });

  // Load existing data when in edit mode
  useEffect(() => {
    if (existingExercise && isEditMode) {
      setExerciseData({
        name: existingExercise.name || '',
        type: existingExercise.exercise_type || '',
        duration: 5, // Default duration as it's not stored in the database
        tags: existingExercise.tags || [],
        contentBlocks: (existingExercise.blocks as unknown as MentalContentBlock[]) || [],
        headerImageUrl: existingExercise.header_image || undefined,
      });
    }
  }, [existingExercise, isEditMode]);

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBack = () => {
    navigate('/coach/knowledgeHub');
  };

  const handleSaveDraft = () => {
    if (isEditMode) {
      updateExercise({ id: mentalId!, data: exerciseData, isDraft: true });
    } else {
      saveDraft(exerciseData);
    }
  };

  const handlePublish = () => {
    if (isEditMode) {
      updateExercise({ id: mentalId!, data: exerciseData, isDraft: false });
    } else {
      createExercise(exerciseData);
    }
    setCurrentStep(4); // Move to success step
  };

  const updateExerciseData = (updates: Partial<MentalExerciseData>) => {
    setExerciseData(prev => ({ ...prev, ...updates }));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <MentalInfoStep
            data={exerciseData}
            onUpdate={updateExerciseData}
            onNext={handleNext}
            onBack={handleBack}
            onSaveDraft={handleSaveDraft}
          />
        );
      case 2:
        return (
          <MentalContentBuilderStep
            data={exerciseData}
            onUpdate={updateExerciseData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onBack={handleBack}
            onSaveDraft={handleSaveDraft}
          />
        );
      case 3:
        return (
          <MentalPreviewStep
            data={exerciseData}
            onNext={handlePublish}
            onPrevious={handlePrevious}
            onBack={handleBack}
            onSaveDraft={handleSaveDraft}
          />
        );
      case 4:
        return <MentalSuccessStep />;
      default:
        return null;
    }
  };

  if (isEditMode && isLoadingExercise) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MentalExerciseHeader
        isEditMode={isEditMode}
        currentStep={currentStep}
        totalSteps={totalSteps}
        onBack={handleBack}
        onSaveDraft={handleSaveDraft}
        stickyOffset="top-0"
      />

      <div className="px-4 sm:px-6 md:px-8 py-6">
        <div className="max-w-4xl mx-auto">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default CreateMentalExercise;
