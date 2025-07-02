
import { useState } from 'react';
import { ExerciseData } from '@/pages/coach/CreateFitnessExercise';

export const useBasicInfoValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAndNext = (data: ExerciseData, onNext: () => void) => {
    console.log('🔍 Validating exercise data:', data);
    
    const newErrors: Record<string, string> = {};
    
    // Validate title
    if (!data.title?.trim()) {
      newErrors.title = 'Title is required';
      console.log('❌ Title validation failed:', data.title);
    } else {
      console.log('✅ Title validation passed:', data.title);
    }
    
    // Validate intro
    if (!data.intro?.trim()) {
      newErrors.intro = 'Short intro is required';
      console.log('❌ Intro validation failed:', data.intro);
    } else {
      console.log('✅ Intro validation passed:', data.intro);
    }
    
    // Validate muscle group
    if (!data.muscleGroup?.main) {
      newErrors.muscleGroup = 'Please select a muscle group';
      console.log('❌ Muscle group validation failed:', data.muscleGroup);
    } else {
      console.log('✅ Muscle group validation passed:', data.muscleGroup);
    }
    
    // Validate tags
    if (!data.tags || data.tags.length === 0) {
      newErrors.tags = 'Please add at least one tag';
      console.log('❌ Tags validation failed:', data.tags);
    } else {
      console.log('✅ Tags validation passed:', data.tags);
    }

    console.log('🎯 Validation errors:', newErrors);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('✅ All validation passed - calling onNext');
      onNext();
    } else {
      console.log('❌ Validation failed - cannot proceed');
    }
  };

  return {
    errors,
    setErrors,
    validateAndNext,
  };
};
