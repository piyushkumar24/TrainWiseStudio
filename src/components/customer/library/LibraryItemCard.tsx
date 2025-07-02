
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Clock } from 'lucide-react';
import type { KnowledgeItem } from '@/hooks/useKnowledgeHubData';

interface LibraryItemCardProps {
  item: KnowledgeItem;
  onClick: () => void;
}

export const LibraryItemCard = ({ item, onClick }: LibraryItemCardProps) => {
  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'fitness':
        return { 
          color: 'bg-blue-50 text-blue-700 border-blue-200', 
          emoji: '🏋️',
          bgGradient: 'from-blue-50 to-blue-100'
        };
      case 'nutrition':
        return { 
          color: 'bg-green-50 text-green-700 border-green-200', 
          emoji: '🍽️',
          bgGradient: 'from-green-50 to-green-100'
        };
      case 'mental':
        return { 
          color: 'bg-purple-50 text-purple-700 border-purple-200', 
          emoji: '🧘',
          bgGradient: 'from-purple-50 to-purple-100'
        };
      default:
        return { 
          color: 'bg-gray-50 text-gray-700 border-gray-200', 
          emoji: '📄',
          bgGradient: 'from-gray-50 to-gray-100'
        };
    }
  };

  const categoryConfig = getCategoryConfig(item.category);

  const formatSubcategory = (subcategory: string) => {
    if (!subcategory || subcategory === 'general') return null;
    return subcategory.charAt(0).toUpperCase() + subcategory.slice(1).replace('_', ' ');
  };

  return (
    <Card 
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 overflow-hidden bg-white"
      onClick={onClick}
    >
      {/* Image/Thumbnail Section */}
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${categoryConfig.bgGradient}`}>
            <span className="text-3xl">{categoryConfig.emoji}</span>
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
            <Eye className="h-4 w-4 text-gray-700" />
          </div>
        </div>

        {/* Category badge - positioned on image */}
        <div className="absolute top-2 left-2">
          <Badge className={`text-xs font-medium border ${categoryConfig.color}`}>
            <span className="mr-1">{categoryConfig.emoji}</span>
            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3 space-y-2">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight group-hover:text-orange-600 transition-colors">
          {item.title}
        </h3>

        {/* Subcategory and Tags */}
        <div className="flex flex-wrap gap-1.5 min-h-[20px]">
          {formatSubcategory(item.subcategory) && (
            <Badge variant="outline" className="text-xs font-normal border-gray-300 text-gray-600">
              {formatSubcategory(item.subcategory)}
            </Badge>
          )}
          {item.tags && item.tags.length > 0 && (
            <>
              {item.tags.slice(0, 1).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {item.tags.length > 1 && (
                <span className="text-xs text-gray-400 px-1">
                  +{item.tags.length - 1}
                </span>
              )}
            </>
          )}
        </div>

        {/* Description preview */}
        {item.description && (
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}

        {/* Footer with meta info */}
        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="h-3 w-3" />
            <span>Quick read</span>
          </div>
          <div className="text-xs text-gray-400">
            Tap to view
          </div>
        </div>
      </div>
    </Card>
  );
};
