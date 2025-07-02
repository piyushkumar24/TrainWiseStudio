
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CategoryFilter } from '@/pages/coach/KnowledgeHub';

interface KnowledgeHubHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: CategoryFilter;
  setCategoryFilter: (filter: CategoryFilter) => void;
}

export const KnowledgeHubHeader = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
}: KnowledgeHubHeaderProps) => {
  const navigate = useNavigate();
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);

  const categoryTabs = [
    { key: 'all' as const, label: 'All Categories', emoji: '📚' },
    { key: 'fitness' as const, label: 'Fitness', emoji: '🏋️' },
    { key: 'nutrition' as const, label: 'Nutrition', emoji: '🥗' },
    { key: 'mental' as const, label: 'Mental', emoji: '🧘' },
  ];

  const createOptions = [
    {
      type: 'fitness',
      label: 'Fitness Exercise',
      emoji: '🏋️‍♂️',
      description: 'Create workout exercises',
      path: '/coach/knowledgeHub/fitness/create'
    },
    {
      type: 'nutrition',
      label: 'Nutrition Recipe',
      emoji: '🥗',
      description: 'Add healthy recipes',
      path: '/coach/knowledgeHub/recipes/create'
    },
    {
      type: 'mental',
      label: 'Mental Health Exercise',
      emoji: '🧘‍♀️',
      description: 'Mental wellness activities',
      path: '/coach/knowledgeHub/mental/create'
    },
  ];

  const handleCreateClick = (path: string) => {
    navigate(path);
    setShowCreateDropdown(false);
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-20 z-20 -mx-4 md:mx-0">
      {/* Full-width container on mobile, constrained on larger screens */}
      <div className="w-full">
        <div className="px-4 sm:px-6 md:px-8 py-6 space-y-6 max-w-none">
          {/* Title and Create Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Knowledge Hub</h1>
              <p className="text-gray-600 mt-1">Manage your fitness exercises, recipes, and mental health tools</p>
            </div>
            
            {/* Create Dropdown */}
            <div className="relative">
              <Button
                onClick={() => setShowCreateDropdown(!showCreateDropdown)}
                className="bg-orange-500 hover:bg-orange-600 text-white gap-2"
              >
                <Plus className="h-4 w-4" />
                Create
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              {showCreateDropdown && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fade-in">
                  <div className="p-2">
                    {createOptions.map((option) => (
                      <button
                        key={option.type}
                        onClick={() => handleCreateClick(option.path)}
                        className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-xl">{option.emoji}</span>
                          <div>
                            <p className="font-medium text-gray-900">{option.label}</p>
                            <p className="text-sm text-gray-500">{option.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search exercises, recipes, tips..."
              className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>

          {/* Category Tabs - Horizontal scroll on mobile */}
          <div className="overflow-x-auto">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit min-w-full sm:min-w-0">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setCategoryFilter(tab.key)}
                  className={`
                    px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap
                    ${categoryFilter === tab.key
                      ? 'bg-white text-orange-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <span>{tab.emoji}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showCreateDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowCreateDropdown(false)}
        />
      )}
    </div>
  );
};
