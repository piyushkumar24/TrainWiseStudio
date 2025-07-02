
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { BlogPost, BlogBlock } from '@/pages/coach/CoachBlog';

interface BlogPostViewProps {
  post: BlogPost | null;
  onBack: () => void;
}

export const BlogPostView = ({ post, onBack }: BlogPostViewProps) => {
  if (!post) {
    return (
      <div className="px-4 py-6 md:px-8 md:py-8">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Post not found</h2>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Fitness': return 'bg-blue-100 text-blue-800';
      case 'Nutrition': return 'bg-green-100 text-green-800';
      case 'Mental Health': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderContentBlock = (block: BlogBlock) => {
    switch (block.type) {
      case 'text':
        return (
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {block.content.text}
            </p>
          </div>
        );
      
      case 'image':
        return (
          <div className="my-8">
            <img
              src={block.content.url || '/api/placeholder/800/400'}
              alt={block.content.caption || ''}
              className="w-full rounded-lg shadow-sm"
            />
            {block.content.caption && (
              <p className="text-sm text-gray-600 text-center mt-2 italic">
                {block.content.caption}
              </p>
            )}
          </div>
        );
      
      case 'quote':
        return (
          <blockquote className="my-8 p-6 bg-gray-50 border-l-4 border-[#FF6B2C] rounded-r-lg">
            <p className="text-lg text-gray-800 italic mb-2">
              "{block.content.text}"
            </p>
            {block.content.author && (
              <cite className="text-sm text-gray-600 font-medium">
                — {block.content.author}
              </cite>
            )}
          </blockquote>
        );
      
      case 'video':
        return (
          <div className="my-8">
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Video: {block.content.url}</p>
            </div>
            {block.content.caption && (
              <p className="text-sm text-gray-600 text-center mt-2">
                {block.content.caption}
              </p>
            )}
          </div>
        );
      
      case 'divider':
        return (
          <div className="my-8 flex items-center justify-center">
            <div className="w-32 h-px bg-gray-300"></div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Timeline
        </Button>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative h-64 md:h-96">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:px-8">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Badge className={getCategoryColor(post.category)}>
              {post.category}
            </Badge>
            <div className="flex items-center text-sm text-gray-500 gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(post.createdAt)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                5 min read
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            {post.excerpt}
          </p>
          
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Article Content */}
        <Card>
          <CardContent className="p-8">
            <div className="space-y-6">
              {post.content.length > 0 ? (
                post.content.map((block) => (
                  <div key={block.id}>
                    {renderContentBlock(block)}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">
                    This post doesn't have any content blocks yet.
                  </p>
                  <p className="text-gray-500 mt-2">
                    The content would be displayed here once blocks are added.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Timeline
          </Button>
        </div>
      </div>
    </div>
  );
};
