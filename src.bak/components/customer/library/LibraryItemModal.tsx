
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Heart, Share2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import type { KnowledgeItem } from '@/hooks/useKnowledgeHubData';

interface LibraryItemModalProps {
  item: KnowledgeItem;
  open: boolean;
  onClose: () => void;
}

export const LibraryItemModal = ({ item, open, onClose }: LibraryItemModalProps) => {
  const isMobile = useIsMobile();

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'fitness':
        return { color: 'bg-blue-50 text-blue-700 border-blue-200', emoji: '🏋️' };
      case 'nutrition':
        return { color: 'bg-green-50 text-green-700 border-green-200', emoji: '🍽️' };
      case 'mental':
        return { color: 'bg-purple-50 text-purple-700 border-purple-200', emoji: '🧘' };
      default:
        return { color: 'bg-gray-50 text-gray-700 border-gray-200', emoji: '📄' };
    }
  };

  const categoryConfig = getCategoryConfig(item.category);

  const renderContent = () => (
    <div className="space-y-6">
      {/* Header Image */}
      {item.imageUrl && (
        <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Title and Categories */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className={`font-medium border ${categoryConfig.color}`}>
            <span className="mr-1">{categoryConfig.emoji}</span>
            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </Badge>
          {item.subcategory && item.subcategory !== 'general' && (
            <Badge variant="outline" className="border-gray-300">
              {item.subcategory.charAt(0).toUpperCase() + item.subcategory.slice(1).replace('_', ' ')}
            </Badge>
          )}
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
          {item.title}
        </h1>

        {item.description && (
          <p className="text-gray-600 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 text-sm">Related Topics</h3>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Content Preview */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Content</h3>
        <div className="bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center gap-3 text-blue-700 mb-3">
            <Clock className="h-5 w-5" />
            <span className="font-semibold">Coming Soon</span>
          </div>
          <p className="text-blue-600 text-sm leading-relaxed">
            Detailed step-by-step instructions, tips, and guidance will be available here once content blocks are fully integrated. 
            This will include interactive elements, videos, and personalized recommendations.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
        <Button 
          variant="outline" 
          className="flex-1 border-gray-300 hover:bg-gray-50" 
          onClick={onClose}
        >
          Close
        </Button>
        <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
          <Heart className="h-4 w-4 mr-2" />
          Add to Favorites
        </Button>
        <Button variant="outline" size="icon" className="sm:w-10 border-gray-300 hover:bg-gray-50">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto bg-white">
          <SheetHeader className="text-left pb-4">
            <SheetTitle className="sr-only">{item.title}</SheetTitle>
          </SheetHeader>
          {renderContent()}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="sr-only">{item.title}</DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};
