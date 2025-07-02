
import { useState, useEffect, useMemo } from 'react';
import { useKnowledgeHubData } from '@/hooks/useKnowledgeHubData';

interface ExerciseSet {
  id: string;
  reps: number;
  repRange?: {
    min: number;
    max: number;
  };
  useRange?: boolean;
}

export const useExerciseSelection = (initialData?: any, isAddingSuperset?: boolean) => {
  const { 
    knowledgeItems, 
    isLoading: isKnowledgeLoading 
  } = useKnowledgeHubData();

  const [searchTerm, setSearchTerm] = useState('');
  const [muscleGroupFilter, setMuscleGroupFilter] = useState('all');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [sets, setSets] = useState<ExerciseSet[]>([
    { id: 'set_1', reps: 12, useRange: false }
  ]);

  // Filter fitness exercises from knowledge hub data
  const fitnessExercises = useMemo(() => {
    if (!knowledgeItems) return [];
    
    return knowledgeItems
      .filter(item => item.category === 'fitness')
      .filter(exercise => {
        const matchesSearch = !searchTerm || 
          exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exercise.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exercise.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        // Handle both string and array subcategories for filtering
        const subcategories = Array.isArray(exercise.subcategory) 
          ? exercise.subcategory 
          : exercise.subcategory ? [exercise.subcategory] : [];
        
        const matchesMuscleGroup = muscleGroupFilter === 'all' || 
          subcategories.some(sub => sub.toLowerCase() === muscleGroupFilter.toLowerCase());
        
        return matchesSearch && matchesMuscleGroup;
      });
  }, [knowledgeItems, searchTerm, muscleGroupFilter]);

  // Initialize data when editing an exercise block
  useEffect(() => {
    if (initialData && !isAddingSuperset && fitnessExercises.length > 0) {
      console.log('Initializing exercise selection with data:', initialData);
      
      // Handle both old and new data structures
      const exerciseData = initialData.data || initialData;
      
      // Initialize sets from initial data
      if (exerciseData.sets && exerciseData.sets.length > 0) {
        const initialSets = exerciseData.sets.map((set: any, index: number) => ({
          id: `set_${index + 1}`,
          reps: set.reps || 12,
          repRange: set.repRange || undefined,
          useRange: set.useRange || false
        }));
        setSets(initialSets);
        console.log('Initialized sets:', initialSets);
      }

      // Find and pre-select the exercise
      const exerciseName = exerciseData.exerciseName || exerciseData.title || exerciseData.name;
      if (exerciseName) {
        console.log('Looking for exercise:', exerciseName);
        const matchingExercise = fitnessExercises.find(
          exercise => exercise.title === exerciseName
        );
        if (matchingExercise) {
          console.log('Found matching exercise:', matchingExercise);
          setSelectedExercise(matchingExercise);
        } else {
          console.log('No matching exercise found in:', fitnessExercises.map(e => e.title));
        }
      }
    }
  }, [initialData, isAddingSuperset, fitnessExercises]);

  const addSet = () => {
    const newSet: ExerciseSet = {
      id: `set_${sets.length + 1}`,
      reps: 12,
      useRange: false
    };
    setSets([...sets, newSet]);
  };

  const removeSet = (setId: string) => {
    if (sets.length > 1) {
      setSets(sets.filter(set => set.id !== setId));
    }
  };

  const updateSet = (setId: string, field: 'reps' | 'repRange' | 'useRange', value: number | { min: number; max: number } | boolean) => {
    setSets(sets.map(set => 
      set.id === setId 
        ? { ...set, [field]: value }
        : set
    ));
  };

  return {
    isLoading: isKnowledgeLoading,
    searchTerm,
    setSearchTerm,
    muscleGroupFilter,
    setMuscleGroupFilter,
    selectedExercise,
    setSelectedExercise,
    sets,
    fitnessExercises,
    addSet,
    removeSet,
    updateSet
  };
};
