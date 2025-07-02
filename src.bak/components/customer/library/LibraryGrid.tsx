
import React from 'react';
import { LibraryItemCard } from './LibraryItemCard';
import { BookOpen, Filter } from 'lucide-react';
import type { KnowledgeItem } from '@/hooks/useKnowledgeHubData';

interface LibraryGridProps {
  items: KnowledgeItem[];
  onItemClick: (item: KnowledgeItem) => void;
  isLoading: boolean;
}

export const LibraryGrid = ({ items, onItemClick, isLoading }: LibraryGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse"
          >
            <div className="aspect-[4/3] bg-gray-200"></div>
            <div className="p-3 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16">
        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="h-10 w-10 text-orange-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No content found</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-4">
          We couldn't find any content matching your search. Try adjusting your filters or search terms.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Filter className="h-4 w-4" />
          <span>Try different keywords or categories</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {items.length} {items.length === 1 ? 'item' : 'items'} found
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item) => (
          <LibraryItemCard
            key={item.id}
            item={item}
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>
    </div>
  );
};
