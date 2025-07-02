
import React, { useState, useMemo } from 'react';
import { LibraryHeader } from '@/components/customer/library/LibraryHeader';
import { LibraryFilters } from '@/components/customer/library/LibraryFilters';
import { LibraryGrid } from '@/components/customer/library/LibraryGrid';
import { LibraryItemModal } from '@/components/customer/library/LibraryItemModal';
import { useKnowledgeHubData } from '@/hooks/useKnowledgeHubData';
import type { KnowledgeItem } from '@/hooks/useKnowledgeHubData';

type CategoryFilter = 'all' | 'fitness' | 'nutrition' | 'mental';
type SubcategoryFilter = string | 'all';

const CustomerLibrary = () => {
  const { knowledgeItems, isLoading } = useKnowledgeHubData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<SubcategoryFilter>('all');
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);

  // Get available subcategories for the active filter
  const availableSubcategories = useMemo(() => {
    if (activeFilter === 'all') return [];
    
    const subcats = knowledgeItems
      .filter(item => item.category === activeFilter && item.status === 'published')
      .map(item => item.subcategory)
      .filter(sub => sub && sub !== 'general');
    
    return [...new Set(subcats)].sort();
  }, [knowledgeItems, activeFilter]);

  // Enhanced filter items based on search, category, and subcategory
  const filteredItems = useMemo(() => {
    let filtered = knowledgeItems.filter(item => item.status === 'published');

    // Apply search filter with enhanced search capabilities
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(search);
        const categoryMatch = item.category.toLowerCase().includes(search);
        const subcategoryMatch = item.subcategory.toLowerCase().includes(search);
        const tagMatch = item.tags.some(tag => tag.toLowerCase().includes(search));
        const descriptionMatch = item.description ? item.description.toLowerCase().includes(search) : false;
        
        const categoryKeywords = {
          'fitness': ['workout', 'exercise', 'training', 'gym', 'muscle', 'strength', 'cardio', 'stretch', 'warmup'],
          'nutrition': ['food', 'recipe', 'meal', 'diet', 'cooking', 'healthy', 'breakfast', 'lunch', 'dinner', 'snack'],
          'mental': ['mindfulness', 'meditation', 'relaxation', 'stress', 'anxiety', 'breathing', 'yoga', 'breathwork']
        };
        
        const keywordMatch = Object.entries(categoryKeywords).some(([category, keywords]) => {
          return item.category === category && keywords.some(keyword => keyword.includes(search) || search.includes(keyword));
        });
        
        return titleMatch || categoryMatch || subcategoryMatch || tagMatch || descriptionMatch || keywordMatch;
      });
    }

    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(item => item.category === activeFilter);
    }

    // Apply subcategory filter
    if (activeSubcategory !== 'all' && activeFilter !== 'all') {
      filtered = filtered.filter(item => item.subcategory === activeSubcategory);
    }

    return filtered;
  }, [knowledgeItems, searchTerm, activeFilter, activeSubcategory]);

  const handleFilterChange = (filter: CategoryFilter) => {
    setActiveFilter(filter);
    setActiveSubcategory('all'); // Reset subcategory when changing main category
  };

  const handleOpenItem = (item: KnowledgeItem) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-6 lg:px-8">
      <LibraryHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <LibraryFilters
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        activeSubcategory={activeSubcategory}
        onSubcategoryChange={setActiveSubcategory}
        availableSubcategories={availableSubcategories}
        itemCounts={{
          all: knowledgeItems.filter(item => item.status === 'published').length,
          fitness: knowledgeItems.filter(item => item.category === 'fitness' && item.status === 'published').length,
          nutrition: knowledgeItems.filter(item => item.category === 'nutrition' && item.status === 'published').length,
          mental: knowledgeItems.filter(item => item.category === 'mental' && item.status === 'published').length,
        }}
      />

      <LibraryGrid
        items={filteredItems}
        onItemClick={handleOpenItem}
        isLoading={isLoading}
      />

      {selectedItem && (
        <LibraryItemModal
          item={selectedItem}
          open={!!selectedItem}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CustomerLibrary;
