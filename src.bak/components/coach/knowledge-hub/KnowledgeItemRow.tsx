import React, { useState } from 'react';
import { Eye, Edit, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { KnowledgeItem } from '@/pages/coach/KnowledgeHub';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

interface KnowledgeItemRowProps {
  item: KnowledgeItem;
  onItemDeleted?: () => void;
}

export const KnowledgeItemRow = ({ item, onItemDeleted }: KnowledgeItemRowProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const handleView = () => {
    // Navigate to universal viewer instead of showing modal
    const path = `/coach/knowledgeHub/view/${item.id}`;
    navigate(path);
  };

  const handleEdit = () => {
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
      setShowDeleteAlert(false);
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

  const ViewContent = () => (
    <div className="space-y-4">
      {item.imageUrl && (
        <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge {...getStatusBadgeProps(item.status)} className="text-xs">
            {item.status}
          </Badge>
          <Badge variant="outline" className="text-xs capitalize">
            {item.subcategory}
          </Badge>
        </div>
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-blue-50 text-blue-700 border-blue-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {item.description && (
          <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
        )}
        <p className="text-xs text-gray-500">Created on {formatDate(item.createdAt)}</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors">
        {/* Thumbnail */}
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg flex items-center justify-center overflow-hidden">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-xl">
              {item.emoji || (item.category === 'fitness' ? '🏋️' : item.category === 'nutrition' ? '🥗' : '🧘')}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-gray-900 truncate text-sm">{item.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500 capitalize">{item.subcategory}</span>
                <Badge {...getStatusBadgeProps(item.status)} className="text-xs py-0 px-1.5">
                  {item.status}
                </Badge>
              </div>
            </div>

            {/* Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-100 flex-shrink-0"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem onClick={handleView}>
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  {item.status === 'draft' ? 'Resume' : 'Edit'}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setShowDeleteAlert(true)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
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
    </>
  );
};
