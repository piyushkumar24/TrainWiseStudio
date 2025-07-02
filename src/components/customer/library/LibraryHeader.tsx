
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, BookOpen } from 'lucide-react';

interface LibraryHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const LibraryHeader = ({ searchTerm, onSearchChange }: LibraryHeaderProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
          <div className="p-2 bg-orange-100 rounded-lg">
            <BookOpen className="h-6 w-6 text-orange-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Library</h1>
        </div>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
          Explore your knowledge base — exercises, recipes, and wellness tools
        </p>
      </div>

      {/* Search Bar */}
      <div className="sticky top-4 z-20 bg-white/95 backdrop-blur-sm py-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:bg-transparent sm:py-0">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search exercises, recipes, or tools…"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-3 w-full bg-white border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};
