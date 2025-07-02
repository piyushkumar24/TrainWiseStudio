
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { BlogPost } from '@/pages/coach/CoachBlog';

// Mock data
const mockTimelinePosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Strong Core Muscles',
    category: 'Fitness',
    tags: ['core', 'strength', 'beginners'],
    featuredImage: '/api/placeholder/400/300',
    excerpt: 'Learn the fundamentals of core strengthening with these essential exercises that will help you build a solid foundation.',
    content: [],
    status: 'published',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Mindful Eating for Better Health',
    category: 'Nutrition',
    tags: ['mindfulness', 'nutrition', 'health'],
    excerpt: 'Discover how mindful eating can transform your relationship with food and improve your overall well-being.',
    content: [],
    status: 'published',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14'
  },
  {
    id: '3',
    title: 'Stress Management Techniques',
    category: 'Mental Health',
    tags: ['stress', 'mental health', 'wellness'],
    excerpt: 'Effective strategies to manage stress and maintain mental wellness in your daily life.',
    content: [],
    status: 'published',
    createdAt: '2024-01-13',
    updatedAt: '2024-01-13'
  },
  {
    id: '4',
    title: 'Protein Power: Complete Guide',
    category: 'Nutrition',
    tags: ['protein', 'nutrition', 'muscle building'],
    excerpt: 'Everything you need to know about protein intake for optimal health and muscle development.',
    content: [],
    status: 'published',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  }
];

interface BlogTimelineProps {
  onBack: () => void;
  onViewPost: (post: BlogPost) => void;
}

export const BlogTimeline = ({ onBack, onViewPost }: BlogTimelineProps) => {
  const [posts] = useState<BlogPost[]>(mockTimelinePosts);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', 'Fitness', 'Nutrition', 'Mental Health'];

  const filteredPosts = posts.filter(post => 
    categoryFilter === 'All' || post.category === categoryFilter
  );

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

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Timeline</h1>
          <p className="text-gray-600">Browse all published posts</p>
        </div>
      </div>

      {/* Sticky Category Filter */}
      <div className="sticky top-0 bg-gray-50 py-4 z-10 -mx-4 px-4 md:-mx-8 md:px-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={categoryFilter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Timeline Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post, index) => (
          <Card 
            key={post.id} 
            className="hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => onViewPost(post)}
          >
            <CardContent className="p-0">
              <div className="md:flex">
                {post.featuredImage && (
                  <div className="md:w-80 flex-shrink-0">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                    />
                  </div>
                )}
                
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={getCategoryColor(post.category)}>
                      {post.category}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-[#FF6B2C] transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-[#FF6B2C] hover:text-white hover:border-[#FF6B2C]"
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600">
              No published posts match the selected category filter.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
