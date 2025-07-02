
import React, { useState } from 'react';
import { Edit, Eye, Ban, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ProgramCategory } from '@/pages/coach/ProgramBuilder';

interface FinalizedProgramsSectionProps {
  selectedCategory: ProgramCategory;
}

// Mock data
const mockFinalizedPrograms = [
  {
    id: 1,
    name: 'Complete Beginner Fitness',
    type: 'fitness',
    icon: '🏋️',
    lastEdited: '2024-06-25',
    purchased: 24,
    views: 156,
  },
  {
    id: 2,
    name: 'Keto Kickstart Guide',
    type: 'nutrition',
    icon: '🥗',
    lastEdited: '2024-06-22',
    purchased: 18,
    views: 203,
  },
  {
    id: 3,
    name: 'Anxiety Relief Program',
    type: 'mental',
    icon: '🧘',
    lastEdited: '2024-06-20',
    purchased: 31,
    views: 89,
  },
];

export const FinalizedProgramsSection = ({ selectedCategory }: FinalizedProgramsSectionProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredPrograms = mockFinalizedPrograms.filter(program => 
    selectedCategory === 'all' || program.type === selectedCategory
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
                🛒 Finalized Programs (Shop-Ready)
                {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </h2>
              <p className="text-gray-600 mt-1">Programs ready to be listed in shop. These are not assignable to clients.</p>
            </div>
            <div className="text-sm text-gray-500">
              {filteredPrograms.length} programs
            </div>
          </div>
        </div>

        <div className={`transition-all duration-300 overflow-hidden ${
          isCollapsed ? 'max-h-0' : 'max-h-[2000px]'
        }`}>
          <div className="p-6">
            {filteredPrograms.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No finalized programs found for the selected category.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="flex gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 pb-4 md:pb-0">
                  {filteredPrograms.map((program) => (
                    <div key={program.id} className="min-w-[280px] md:min-w-0 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all hover:border-blue-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{program.icon}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900">{program.name}</h3>
                            <p className="text-sm text-gray-600">Last edited {formatDate(program.lastEdited)}</p>
                          </div>
                        </div>
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                          Shop Program
                        </span>
                      </div>

                      <div className="mb-4 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Purchased:</span>
                          <span className="font-medium text-green-600">{program.purchased}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Views:</span>
                          <span className="font-medium text-blue-600">{program.views}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1 hover:bg-orange-50 hover:border-orange-200">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit program</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1 hover:bg-blue-50 hover:border-blue-200">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>View program</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-red-200 text-red-600">
                              <Ban className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Remove from shop</TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
