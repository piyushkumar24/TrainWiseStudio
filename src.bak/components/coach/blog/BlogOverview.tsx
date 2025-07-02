
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, MoreVertical, Eye, Edit, Trash2, FileText, Clock } from 'lucide-react';
import { BlogPost } from '@/pages/coach/CoachBlog';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Strong Core Muscles',
    category: 'Fitness',
    tags: ['core', 'strength', 'beginners'],
    featuredImage: '/api/placeholder/400/300',
    excerpt: 'Learn the fundamentals of core strengthening with these essential exercises.',
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
    excerpt: 'Discover how mindful eating can transform your relationship with food.',
    content: [],
    status: 'draft',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14'
  }
];

interface BlogOverviewProps {
  onCreatePost: () => void;
  onEditPost: (post: BlogPost) => void;
  onShowTimeline: () => void;
}

export const BlogOverview = ({ onCreatePost, onEditPost, onShowTimeline }: BlogOverviewProps) => {
  const [posts] = useState<BlogPost[]>(mockPosts);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const isMobile = useIsMobile();

  const categories = ['All', 'Fitness', 'Nutrition', 'Mental Health'];
  const statuses = ['All', 'Published', 'Draft'];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = categoryFilter === 'All' || post.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || 
      (statusFilter === 'Published' && post.status === 'published') ||
      (statusFilter === 'Draft' && post.status === 'draft');
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Fitness': return 'bg-blue-100 text-blue-800';
      case 'Nutrition': return 'bg-green-100 text-green-800';
      case 'Mental Health': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-600 mt-1">Share knowledge with your clients</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onShowTimeline}
            className="hidden md:flex"
          >
            <Clock className="h-4 w-4 mr-2" />
            Timeline
          </Button>
          <Button 
            onClick={onCreatePost}
            className="bg-[#FF6B2C] hover:bg-[#e55b22]"
          >
            <Plus className="h-4 w-4 mr-2" />
            {isMobile ? 'Create' : 'Create Post'}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Search */}
            <div className="flex items-center gap-2">
              {!isMobile || showSearch ? (
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSearch(true)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="space-y-3">
              <div className="flex gap-2 overflow-x-auto pb-2">
                <span className="text-sm text-gray-600 whitespace-nowrap">Category:</span>
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
              
              <div className="flex gap-2 overflow-x-auto pb-2">
                <span className="text-sm text-gray-600 whitespace-nowrap">Status:</span>
                {statuses.map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter(status)}
                    className="whitespace-nowrap"
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Button on Mobile */}
      {isMobile && (
        <Button
          variant="outline"
          onClick={onShowTimeline}
          className="w-full"
        >
          <Clock className="h-4 w-4 mr-2" />
          View Timeline
        </Button>
      )}

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-4">
              {posts.length === 0 
                ? "Create your first blog post to share knowledge with your clients"
                : "Try adjusting your filters or search terms"
              }
            </p>
            {posts.length === 0 && (
              <Button onClick={onCreatePost} className="bg-[#FF6B2C] hover:bg-[#e55b22]">
                <Plus className="h-4 w-4 mr-2" />
                Create First Post
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                {post.featuredImage && (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(post.category)}>
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Badge 
                        variant={post.status === 'published' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {post.status === 'published' ? 'Published' : 'Draft'}
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Updated {post.updatedAt}</span>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2"
                        onClick={() => onEditPost(post)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Floating Action Button on Mobile */}
      {isMobile && (
        <Button
          onClick={onCreatePost}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#FF6B2C] hover:bg-[#e55b22] shadow-lg z-50"
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};
