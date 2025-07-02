import React from 'react';
import { Eye, Edit, Trash2, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { KnowledgeItem } from '@/pages/coach/KnowledgeHub';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface KnowledgeItemCardProps {
  item: KnowledgeItem;
  onItemDeleted?: () => void;
}

export const KnowledgeItemCard = ({ item, onItemDeleted }: KnowledgeItemCardProps) => {
  const navigate = useNavigate();

  const handleView = () => {
    console.log('KnowledgeItemCard - handleView clicked for:', item);
    
    // Navigate to universal viewer
    const path = `/coach/knowledgeHub/view/${item.id}`;
    console.log('KnowledgeItemCard - navigating to universal path:', path);
    navigate(path);
  };

  const handleEdit = () => {
    // Navigate to edit page with item ID
    const editPaths = {
      fitness: `/coach/knowledgeHub/fitness/edit/${item.id}`,
      nutrition: `/coach/knowledgeHub/nutrition/edit/${item.id}`,
      mental: `/coach/knowledgeHub/mental/edit/${item.id}`,
    };
    
    const path = editPaths[item.category];
    if (path) {
      navigate(path);
    } else {
      toast.error('Edit functionality not available for this content type');
    }
  };

  const handleDelete = async () => {
    try {
      let error;

      // Use specific table queries instead of dynamic table names
      if (item.category === 'fitness') {
        const result = await supabase
          .from('fitness_exercises')
          .delete()
          .eq('id', item.id);
        error = result.error;
      } else if (item.category === 'nutrition') {
        const result = await supabase
          .from('recipes')
          .delete()
          .eq('id', item.id);
        error = result.error;
      } else if (item.category === 'mental') {
        const result = await supabase
          .from('mental_health_exercises')
          .delete()
          .eq('id', item.id);
        error = result.error;
      } else {
        toast.error('Invalid content type');
        return;
      }

      if (error) throw error;

      toast.success(`${item.title} deleted successfully! 🗑️`);
      onItemDeleted?.();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusBadgeProps = (status: string) => {
    if (status === 'draft') {
      return {
        variant: 'secondary' as const,
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      };
    }
    return {
      variant: 'default' as const,
      className: 'bg-green-100 text-green-700 border-green-200',
    };
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-orange-200 overflow-hidden group">
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Icon/Emoji */}
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg flex items-center justify-center">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-2xl">
                {item.emoji || (item.category === 'fitness' ? '🏋️' : item.category === 'nutrition' ? '🥗' : '🧘')}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title and Status */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 line-clamp-2 leading-snug flex-1">
                {item.title}
              </h3>
              <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Badges and Metadata */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge {...getStatusBadgeProps(item.status)} className="text-xs">
                {item.status}
              </Badge>
              <Badge variant="outline" className="text-xs capitalize">
                {item.subcategory}
              </Badge>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(item.createdAt)}
              </div>
            </div>

            {/* Tags */}
            {item.tags.length > 0 && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 4).map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 4 && (
                    <Badge variant="outline" className="text-xs text-gray-500">
                      +{item.tags.length - 4}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleView}
                className="flex-1 sm:flex-none h-8 text-xs hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
              >
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={handleEdit}
                className="flex-1 sm:flex-none h-8 text-xs hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200"
              >
                <Edit className="h-3 w-3 mr-1" />
                {item.status === 'draft' ? 'Resume' : 'Edit'}
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-700 hover:border-red-200 flex-shrink-0"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete {item.status === 'draft' ? 'Draft' : 'Content'}</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{item.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
