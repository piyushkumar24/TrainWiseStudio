
import React, { useState } from 'react';
import { Play, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgramCategory } from '@/pages/coach/ProgramBuilder';

interface DraftsSectionProps {
  selectedCategory: ProgramCategory;
}

// Mock data
const mockDrafts = [
  {
    id: 1,
    name: 'HIIT Cardio Blast',
    type: 'fitness',
    icon: '🏋️',
    programType: 'Template',
    lastEdited: '2024-06-20',
  },
  {
    id: 2,
    name: 'Plant-Based Nutrition',
    type: 'nutrition',
    icon: '🥗',
    programType: 'Shop',
    lastEdited: '2024-06-18',
  },
  {
    id: 3,
    name: 'Stress Management Course',
    type: 'mental',
    icon: '🧘',
    programType: 'Tailored',
    lastEdited: '2024-06-15',
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Template':
      return 'bg-gray-100 text-gray-700';
    case 'Tailored':
      return 'bg-orange-100 text-orange-700';
    case 'Shop':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const DraftsSection = ({ selectedCategory }: DraftsSectionProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Default collapsed

  const filteredDrafts = mockDrafts.filter(draft => 
    selectedCategory === 'all' || draft.type === selectedCategory
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div 
        className="p-6 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              📝 Drafts
              {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </h2>
            <p className="text-gray-600 mt-1">Programs in progress. Resume or delete.</p>
          </div>
          <div className="text-sm text-gray-500">
            {filteredDrafts.length} drafts
          </div>
        </div>
      </div>

      <div className={`transition-all duration-300 overflow-hidden ${
        isCollapsed ? 'max-h-0' : 'max-h-[2000px]'
      }`}>
        <div className="p-6">
          {filteredDrafts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No draft programs found for the selected category.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDrafts.map((draft) => (
                <div key={draft.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-2xl flex-shrink-0">{draft.icon}</span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 truncate">{draft.name}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(draft.programType)}`}>
                          {draft.programType}
                        </span>
                        <span className="text-sm text-gray-600">Last edited {formatDate(draft.lastEdited)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 flex-shrink-0 ml-2">
                    <Button variant="outline" size="sm" className="hover:bg-green-50 hover:border-green-200 min-w-0">
                      <Play className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">Resume</span>
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-red-200 text-red-600 min-w-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
