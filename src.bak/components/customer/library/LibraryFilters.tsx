
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type CategoryFilter = 'all' | 'fitness' | 'nutrition' | 'mental';

interface LibraryFiltersProps {
  activeFilter: CategoryFilter;
  onFilterChange: (filter: CategoryFilter) => void;
  activeSubcategory: string;
  onSubcategoryChange: (subcategory: string) => void;
  availableSubcategories: string[];
  itemCounts: Record<CategoryFilter, number>;
}

export const LibraryFilters = ({ 
  activeFilter, 
  onFilterChange, 
  activeSubcategory,
  onSubcategoryChange,
  availableSubcategories,
  itemCounts 
}: LibraryFiltersProps) => {
  const filters = [
    { key: 'all' as const, label: 'All', emoji: '📚', color: 'text-gray-700' },
    { key: 'fitness' as const, label: 'Fitness', emoji: '🏋️', color: 'text-blue-700' },
    { key: 'nutrition' as const, label: 'Nutrition', emoji: '🍽️', color: 'text-green-700' },
    { key: 'mental' as const, label: 'Mental Health', emoji: '🧘', color: 'text-purple-700' },
  ];

  const formatSubcategoryLabel = (subcategory: string) => {
    return subcategory.charAt(0).toUpperCase() + subcategory.slice(1).replace('_', ' ');
  };

  return (
    <div className="space-y-4">
      {/* Main Category Filters */}
      <div className="sticky top-20 sm:top-16 z-10 bg-white/95 backdrop-blur-sm py-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:bg-transparent sm:py-0">
        <Tabs value={activeFilter} onValueChange={(value) => onFilterChange(value as CategoryFilter)}>
          <TabsList className="w-full sm:w-auto h-12 bg-gray-50 border border-gray-200 p-1 rounded-lg">
            <div className="flex overflow-x-auto scrollbar-hide w-full sm:w-auto gap-1">
              {filters.map((filter) => (
                <TabsTrigger
                  key={filter.key}
                  value={filter.key}
                  className="flex-shrink-0 px-3 sm:px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200 hover:bg-white/50"
                >
                  <span className="mr-1.5 text-base">{filter.emoji}</span>
                  <span className={filter.color}>{filter.label}</span>
                  <span className="ml-2 text-xs bg-gray-100 px-1.5 py-0.5 rounded-full text-gray-600">
                    {itemCounts[filter.key]}
                  </span>
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
        </Tabs>
      </div>

      {/* Subcategory Dropdown - Only show when a specific category is selected and has subcategories */}
      {activeFilter !== 'all' && availableSubcategories.length > 0 && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by:</span>
            <Select value={activeSubcategory} onValueChange={onSubcategoryChange}>
              <SelectTrigger className="w-48 h-9 bg-white border-gray-200 focus:border-orange-500 focus:ring-orange-500">
                <SelectValue placeholder="All subcategories" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="all" className="hover:bg-gray-50">
                  All subcategories
                </SelectItem>
                {availableSubcategories.map((subcategory) => (
                  <SelectItem 
                    key={subcategory} 
                    value={subcategory}
                    className="hover:bg-gray-50"
                  >
                    {formatSubcategoryLabel(subcategory)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};
