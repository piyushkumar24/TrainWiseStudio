import React, { useState, useEffect, useMemo } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { CategorySection } from '@/components/coach/knowledge-hub/CategorySection';
import { SubFilterPills } from '@/components/coach/knowledge-hub/SubFilterPills';
import { KnowledgeHubCreationModal } from '@/components/coach/knowledge-hub/KnowledgeHubCreationModal';
import { useKnowledgeHubData } from '@/hooks/useKnowledgeHubData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';

export type KnowledgeItem = {
  id: string;
  title: string;
  category: 'fitness' | 'nutrition' | 'mental';
  subcategory: string;
  status: 'draft' | 'published';
  tags: string[];
  imageUrl?: string;
  emoji?: string;
  createdAt: string;
  description?: string;
};

export type CategoryFilter = 'all' | 'fitness' | 'nutrition' | 'mental';

// Helper function to check if a subcategory belongs to a muscle group
const isSubcategoryOfMuscleGroup = (subcategory: string, muscleGroup: string): boolean => {
  const subcategoryLower = subcategory.toLowerCase();
  const muscleGroupLower = muscleGroup.toLowerCase();
  
  // If it's an exact match, return true
  if (subcategoryLower === muscleGroupLower) {
    return true;
  }
  
  // Define muscle group hierarchies
  const muscleGroupHierarchy: Record<string, string[]> = {
    'legs': ['quads', 'quadriceps', 'hamstring', 'hamstrings', 'calves', 'glutes', 'thighs'],
    'arms': ['biceps', 'triceps', 'forearms'],
    'back': ['lats', 'latissimus', 'rhomboids', 'traps', 'trapezius', 'lower back'],
    'chest': ['pecs', 'pectorals', 'upper chest', 'lower chest'],
    'shoulders': ['delts', 'deltoids', 'front delts', 'rear delts', 'side delts'],
    'core': ['abs', 'abdominals', 'obliques', 'lower abs', 'upper abs'],
  };
  
  // Check if the subcategory belongs to the muscle group
  const subCategories = muscleGroupHierarchy[muscleGroupLower] || [];
  return subCategories.some(subCat => subcategoryLower.includes(subCat) || subCat.includes(subcategoryLower));
};

const KnowledgeHub = () => {
  const { knowledgeItems, isLoading, refetch } = useKnowledgeHubData();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [fitnessSubFilter, setFitnessSubFilter] = useState<string>('all');
  const [nutritionSubFilter, setNutritionSubFilter] = useState<string>('all');
  const [mentalSubFilter, setMentalSubFilter] = useState<string>('all');
  const [showCreationModal, setShowCreationModal] = useState(false);

  // Handle item deletion refresh
  const handleItemDeleted = () => {
    refetch();
  };

  // Handle creation modal open
  const handleCreateClick = () => {
    setShowCreationModal(true);
  };

  // Filter items based on search and category
  const filteredItems = useMemo(() => {
    let filtered = knowledgeItems;

    // Apply search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(search) ||
        item.tags.some(tag => tag.toLowerCase().includes(search)) ||
        item.subcategory.toLowerCase().includes(search)
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    return filtered;
  }, [knowledgeItems, searchTerm, categoryFilter]);

  // Separate items by category with improved filtering
  const fitnessItems = useMemo(() => {
    const items = filteredItems.filter(item => item.category === 'fitness');
    if (fitnessSubFilter !== 'all') {
      return items.filter(item => 
        isSubcategoryOfMuscleGroup(item.subcategory, fitnessSubFilter)
      );
    }
    return items;
  }, [filteredItems, fitnessSubFilter]);

  const nutritionItems = useMemo(() => {
    const items = filteredItems.filter(item => item.category === 'nutrition');
    if (nutritionSubFilter !== 'all') {
      return items.filter(item => item.subcategory.toLowerCase() === nutritionSubFilter.toLowerCase());
    }
    return items;
  }, [filteredItems, nutritionSubFilter]);

  const mentalItems = useMemo(() => {
    const items = filteredItems.filter(item => item.category === 'mental');
    if (mentalSubFilter !== 'all') {
      return items.filter(item => item.subcategory.toLowerCase() === mentalSubFilter.toLowerCase());
    }
    return items;
  }, [filteredItems, mentalSubFilter]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Create a wrapper function to handle the type conversion
  const handleCategoryFilterChange = (filter: string) => {
    setCategoryFilter(filter as CategoryFilter);
  };

  const searchFilters = (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search exercises, recipes, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <SubFilterPills
        options={['all', 'fitness', 'nutrition', 'mental']}
        activeFilter={categoryFilter}
        setActiveFilter={handleCategoryFilterChange}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Knowledge Hub"
        description="Manage your fitness exercises, nutrition recipes, and mental health content"
        filters={searchFilters}
      />

      {/* Content area */}
      <div className="pt-4 pb-8 space-y-8">
        {/* Fitness Exercises Section */}
        <CategorySection
          title="🏋️ Fitness Exercises"
          items={fitnessItems}
          subFilter={fitnessSubFilter}
          setSubFilter={setFitnessSubFilter}
          subFilterOptions={['all', 'chest', 'back', 'legs', 'core', 'shoulders', 'arms', 'full body']}
          emptyMessage="No fitness exercises found. Create your first exercise!"
          isVisible={categoryFilter === 'all' || categoryFilter === 'fitness'}
          onItemDeleted={handleItemDeleted}
          onCreateClick={handleCreateClick}
        />

        {/* Nutrition Recipes Section */}
        <CategorySection
          title="🥗 Nutrition Recipes"
          items={nutritionItems}
          subFilter={nutritionSubFilter}
          setSubFilter={setNutritionSubFilter}
          subFilterOptions={['all', 'breakfast', 'lunch', 'dinner', 'snack', 'smoothie']}
          emptyMessage="No recipes found. Create your first recipe!"
          isVisible={categoryFilter === 'all' || categoryFilter === 'nutrition'}
          onItemDeleted={handleItemDeleted}
          onCreateClick={handleCreateClick}
        />

        {/* Mental Health Section */}
        <CategorySection
          title="🧘 Mental Health"
          items={mentalItems}
          subFilter={mentalSubFilter}
          setSubFilter={setMentalSubFilter}
          subFilterOptions={['all', 'meditation', 'journaling', 'breathwork', 'mental exercises']}
          emptyMessage="No mental health exercises found. Create your first mental exercise!"
          isVisible={categoryFilter === 'all' || categoryFilter === 'mental'}
          onItemDeleted={handleItemDeleted}
          onCreateClick={handleCreateClick}
        />
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={handleCreateClick}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 z-40"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Creation Modal */}
      <KnowledgeHubCreationModal
        open={showCreationModal}
        onOpenChange={setShowCreationModal}
      />
    </div>
  );
};

export default KnowledgeHub;
