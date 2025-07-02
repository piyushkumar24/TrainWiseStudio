
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface ShopFiltersProps {
  filters: {
    category: string;
    type: string;
    sortBy: string;
    search: string;
  };
  onFiltersChange: (filters: any) => void;
}

export const ShopFilters = ({ filters, onFiltersChange }: ShopFiltersProps) => {
  const categories = ['All', 'Fitness', 'Nutrition', 'Mental Health'];
  const types = ['All', 'Program', 'Product'];
  const sortOptions = ['Newest', 'Most Purchased', 'Price ↑', 'Price ↓'];

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 py-4 mb-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search programs and products..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 font-medium flex-shrink-0">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filters:</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            {/* Category Filter */}
            <div className="flex-1 min-w-0">
              <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Type Filter */}
            <div className="flex-1 min-w-0">
              <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort Filter */}
            <div className="flex-1 min-w-0">
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((sort) => (
                    <SelectItem key={sort} value={sort}>
                      {sort}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
