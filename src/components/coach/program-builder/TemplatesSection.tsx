
import React, { useState } from 'react';
import { Edit, Trash2, Eye, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ProgramCategory } from '@/pages/coach/ProgramBuilder';

interface TemplatesSectionProps {
  selectedCategory: ProgramCategory;
}

// Mock data
const mockTemplates = [
  {
    id: 1,
    name: 'Beginner Full Body',
    type: 'fitness',
    icon: '🏋️',
    lastEdited: '2024-06-20',
    usedAsBases: 5,
  },
  {
    id: 2,
    name: 'Advanced Strength',
    type: 'fitness',
    icon: '🏋️',
    lastEdited: '2024-06-18',
    usedAsBases: 2,
  },
  {
    id: 3,
    name: 'Mediterranean Basics',
    type: 'nutrition',
    icon: '🥗',
    lastEdited: '2024-06-15',
    usedAsBases: 8,
  },
  {
    id: 4,
    name: 'Daily Mindfulness',
    type: 'mental',
    icon: '🧘',
    lastEdited: '2024-06-12',
    usedAsBases: 3,
  },
];

export const TemplatesSection = ({ selectedCategory }: TemplatesSectionProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredTemplates = mockTemplates.filter(template => 
    selectedCategory === 'all' || template.type === selectedCategory
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <TooltipProvider>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div 
          className="p-6 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                📋 Template Programs
                {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </h2>
              <p className="text-gray-600 mt-1">Base programs for internal use. Use as starting point when creating tailored or shop programs.</p>
            </div>
            <div className="text-sm text-gray-500">
              {filteredTemplates.length} templates
            </div>
          </div>
        </div>

        <div className={`transition-all duration-300 overflow-hidden ${
          isCollapsed ? 'max-h-0' : 'max-h-[2000px]'
        }`}>
          <div className="p-6">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No template programs found for the selected category.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredTemplates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all hover:border-orange-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{template.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{template.name}</h3>
                          <p className="text-sm text-gray-600">Last edited {formatDate(template.lastEdited)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-xs text-gray-500">
                        Used as base {template.usedAsBases} times
                      </span>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1 hover:bg-green-50 hover:border-green-200">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Use as base</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1 hover:bg-orange-50 hover:border-orange-200">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit template</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1 hover:bg-blue-50 hover:border-blue-200">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View content</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-red-200 text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete template</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
