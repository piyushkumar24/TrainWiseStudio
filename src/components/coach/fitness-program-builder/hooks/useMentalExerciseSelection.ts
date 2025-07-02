
import { useState, useEffect } from 'react';
import { useKnowledgeHubData } from '@/hooks/useKnowledgeHubData';

export const useMentalExerciseSelection = (initialData?: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [textBlock, setTextBlock] = useState('');

  const { knowledgeItems } = useKnowledgeHubData();

  useEffect(() => {
    if (initialData) {
      setTextBlock(initialData.textBlock || '');
    }
    setIsLoading(false);
  }, [initialData]);

  const mentalExercises = knowledgeItems?.filter(item => 
    item.category === 'mental' &&
    (searchTerm === '' || item.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (typeFilter === 'all' || item.subcategory === typeFilter)
  ) || [];

  const updateTextBlock = (value: string) => {
    setTextBlock(value);
  };

  return {
    isLoading,
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    selectedExercise,
    setSelectedExercise,
    textBlock,
    mentalExercises,
    updateTextBlock
  };
};
