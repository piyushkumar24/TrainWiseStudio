
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgramCategory } from '@/pages/coach/ProgramBuilder';

interface ProgramBuilderHeaderProps {
  selectedCategory: ProgramCategory;
  onCategoryChange: (category: ProgramCategory) => void;
  onNewProgram: () => void;
}

const categoryFilters = [
  { id: 'all', label: 'All', icon: '📋' },
  { id: 'fitness', label: 'Fitness', icon: '🏋️' },
  { id: 'nutrition', label: 'Nutrition', icon: '🥗' },
  { id: 'mental', label: 'Mental Health', icon: '🧘' },
];

export const ProgramBuilderHeader = ({ 
  selectedCategory, 
  onCategoryChange, 
  onNewProgram 
}: ProgramBuilderHeaderProps) => {
  return (
    <div className="space-y-4">
      {/* Title and Description */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Program Builder</h1>
          <p className="text-gray-600 mt-1">Manage templates, tailored programs, shop-ready content, and drafts.</p>
        </div>
        
        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button 
            onClick={onNewProgram}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Program
          </Button>
        </div>
      </div>

      {/* Category Filters - Sticky on mobile */}
      <div className="sticky top-0 z-10 bg-white pb-2 -mx-6 px-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categoryFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onCategoryChange(filter.id as ProgramCategory)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === filter.id
                  ? 'bg-orange-100 text-orange-700 border-2 border-orange-300'
                  : 'bg-white text-gray-600 border-2 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span>{filter.icon}</span>
              <span className="font-medium">{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Button 
          onClick={onNewProgram}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg"
          size="lg"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
