
import React, { useState } from 'react';
import { BlogOverview } from '@/components/coach/blog/BlogOverview';
import { CreateBlogPost } from '@/components/coach/blog/CreateBlogPost';
import { BlogTimeline } from '@/components/coach/blog/BlogTimeline';
import { BlogPostView } from '@/components/coach/blog/BlogPostView';
import { DashboardLayout } from '@/components/shared/DashboardLayout';

export type BlogPost = {
  id: string;
  title: string;
  category: 'Fitness' | 'Nutrition' | 'Mental Health';
  tags: string[];
  featuredImage?: string;
  excerpt: string;
  content: BlogBlock[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
};

export type BlogBlock = {
  id: string;
  type: 'text' | 'image' | 'quote' | 'video' | 'divider';
  content: any;
};

type ViewMode = 'overview' | 'create' | 'edit' | 'timeline' | 'view';

const CoachBlog = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('overview');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [viewingPost, setViewingPost] = useState<BlogPost | null>(null);

  const handleCreatePost = () => {
    setEditingPost(null);
    setCurrentView('create');
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setCurrentView('edit');
  };

  const handleViewPost = (post: BlogPost) => {
    setViewingPost(post);
    setCurrentView('view');
  };

  const handleBackToOverview = () => {
    setCurrentView('overview');
    setEditingPost(null);
    setViewingPost(null);
  };

  const handleShowTimeline = () => {
    setCurrentView('timeline');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'create':
      case 'edit':
        return (
          <CreateBlogPost
            editingPost={editingPost}
            onBack={handleBackToOverview}
            onSave={handleBackToOverview}
          />
        );
      case 'timeline':
        return (
          <BlogTimeline
            onBack={handleBackToOverview}
            onViewPost={handleViewPost}
          />
        );
      case 'view':
        return (
          <BlogPostView
            post={viewingPost}
            onBack={() => setCurrentView('timeline')}
          />
        );
      default:
        return (
          <BlogOverview
            onCreatePost={handleCreatePost}
            onEditPost={handleEditPost}
            onShowTimeline={handleShowTimeline}
          />
        );
    }
  };

  // Use DashboardLayout only for overview, timeline, and view modes
  const shouldUseDashboardLayout = ['overview', 'timeline', 'view'].includes(currentView);

  if (shouldUseDashboardLayout) {
    return (
      <DashboardLayout userRole="coach">
        <div className="min-h-screen bg-gray-50">
          {renderCurrentView()}
        </div>
      </DashboardLayout>
    );
  }

  // For create/edit modes, render without DashboardLayout for full-screen experience
  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentView()}
    </div>
  );
};

export default CoachBlog;
