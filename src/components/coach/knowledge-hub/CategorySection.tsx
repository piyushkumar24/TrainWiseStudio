
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { KnowledgeItemRow } from './KnowledgeItemRow';
import { SubFilterPills } from './SubFilterPills';
import { KnowledgeItem } from '@/pages/coach/KnowledgeHub';

interface CategorySectionProps {
  title: string;
  items: KnowledgeItem[];
  subFilter: string;
  setSubFilter: (filter: string) => void;
  subFilterOptions: string[];
  emptyMessage: string;
  isVisible: boolean;
  onItemDeleted?: () => void;
  onCreateClick?: () => void;
}

export const CategorySection = ({
  title,
  items,
  subFilter,
  setSubFilter,
  subFilterOptions,
  emptyMessage,
  isVisible,
  onItemDeleted,
  onCreateClick,
}: CategorySectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!isVisible) return null;

  // Separate published content and drafts
  const publishedItems = items.filter(item => item.status === 'published');
  const draftItems = items.filter(item => item.status === 'draft');

  const renderItemList = (itemsToRender: KnowledgeItem[], showEmptyState = false) => {
    if (itemsToRender.length === 0 && showEmptyState) {
      return (
        <div className="p-8 text-center">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-500 mb-4">{emptyMessage}</p>
          <Button
            onClick={onCreateClick}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create First Item
          </Button>
        </div>
      );
    }

    if (itemsToRender.length === 0) {
      return null;
    }

    return (
      <div className="bg-white rounded-lg border border-gray-200">
        {itemsToRender.map((item) => (
          <KnowledgeItemRow 
            key={item.id} 
            item={item} 
            onItemDeleted={onItemDeleted}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-4">
        <div className="px-4 sm:px-6 md:px-8 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                )}
              </button>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">{title}</h2>
              <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full flex-shrink-0">
                {publishedItems.length}
              </span>
              {draftItems.length > 0 && (
                <span className="bg-yellow-100 text-yellow-700 text-sm px-2 py-1 rounded-full flex-shrink-0 flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {draftItems.length} drafts
                </span>
              )}
            </div>
          </div>

          {/* Sub-filter Pills */}
          {isExpanded && (
            <div className="mt-4">
              <SubFilterPills
                options={subFilterOptions}
                activeFilter={subFilter}
                setActiveFilter={setSubFilter}
              />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="space-y-4">
          {/* Published Content */}
          {publishedItems.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3 px-2 flex items-center gap-2">
                Published Content ({publishedItems.length})
              </h3>
              {renderItemList(publishedItems)}
            </div>
          )}

          {/* Drafts Section */}
          {draftItems.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-yellow-700 mb-3 px-2 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Drafts ({draftItems.length})
              </h3>
              <div className="bg-yellow-50 rounded-lg border border-yellow-200">
                {draftItems.map((item) => (
                  <KnowledgeItemRow 
                    key={item.id} 
                    item={item} 
                    onItemDeleted={onItemDeleted}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {publishedItems.length === 0 && draftItems.length === 0 && (
            <div>
              {renderItemList([], true)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
