import React from 'react';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIsMobileDrawer } from '@/hooks/use-mobile-drawer';

interface BlogPost {
  id: string;
  title: string;
  category: 'Fitness' | 'Nutrition' | 'Mental Health';
  tags: string[];
  date: string;
  excerpt: string;
  coverImage: string;
  content: string;
  author: string;
  readTime: string;
}

interface ResponsiveBlogPostReaderProps {
  post: BlogPost;
  open: boolean;
  onClose: () => void;
}

export const ResponsiveBlogPostReader = ({ post, open, onClose }: ResponsiveBlogPostReaderProps) => {
  const isMobileDrawer = useIsMobileDrawer();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'Fitness':
        return '🏋️';
      case 'Nutrition':
        return '🥗';
      case 'Mental Health':
        return '🧠';
      default:
        return '📝';
    }
  };

  const BlogContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Blog</span>
        </Button>
        
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-orange-50 text-orange-700">
            {getCategoryEmoji(post.category)} {post.category}
          </Badge>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto -webkit-overflow-scrolling-touch">
        <div className="w-full px-4 md:px-6 py-4 pb-8">
          {/* Cover Image */}
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6 w-full">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Header */}
          <div className="mb-6">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight break-words">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4 flex-shrink-0" />
                <span className="break-words">{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span className="whitespace-nowrap">Published {formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span className="whitespace-nowrap">{post.readTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs border-orange-200 text-orange-700 hover:bg-orange-50"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-gray w-full max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-sm md:prose-base prose-p:break-words prose-headings:break-words"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {post.author.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-gray-900 break-words">{post.author}</h4>
                  <p className="text-sm text-gray-600 break-words">
                    Your personal coach and fitness expert
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobileDrawer) {
    return (
      <Drawer open={open} onOpenChange={onClose}>
        <DrawerContent className="h-[85vh] flex flex-col">
          <BlogContent />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 gap-0 z-50">
        <BlogContent />
      </DialogContent>
    </Dialog>
  );
};
