
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogPost, BlogBlock } from '@/pages/coach/CoachBlog';
import { useToast } from '@/hooks/use-toast';
import { BlogPostBasicInfo } from './BlogPostBasicInfo';
import { BlogContentBuilder } from './BlogContentBuilder';
import { BlogPostNavigation } from './BlogPostNavigation';
import { PageHeader } from '@/components/shared/PageHeader';

interface CreateBlogPostProps {
  editingPost?: BlogPost | null;
  onBack: () => void;
  onSave: () => void;
}

export const CreateBlogPost = ({ editingPost, onBack, onSave }: CreateBlogPostProps) => {
  const [title, setTitle] = useState(editingPost?.title || '');
  const [category, setCategory] = useState(editingPost?.category || '');
  const [tags, setTags] = useState<string[]>(editingPost?.tags || []);
  const [featuredImage, setFeaturedImage] = useState<string | null>(editingPost?.featuredImage || null);
  const [excerpt, setExcerpt] = useState(editingPost?.excerpt || '');
  const [blocks, setBlocks] = useState<BlogBlock[]>(editingPost?.content || []);
  const { toast } = useToast();

  const addBlock = (type: BlogBlock['type']) => {
    const newBlock: BlogBlock = {
      id: Date.now().toString(),
      type,
      content: getDefaultContent(type)
    };
    
    setBlocks([...blocks, newBlock]);
  };

  const getDefaultContent = (type: BlogBlock['type']) => {
    switch (type) {
      case 'text': return { text: '' };
      case 'image': return { url: '', caption: '' };
      case 'quote': return { text: '', author: '' };
      case 'video': return { url: '', caption: '' };
      case 'divider': return {};
      default: return {};
    }
  };

  const updateBlock = (id: string, content: any) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content } : block
    ));
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const duplicateBlock = (id: string) => {
    const blockToDuplicate = blocks.find(block => block.id === id);
    if (blockToDuplicate) {
      const newBlock: BlogBlock = {
        ...blockToDuplicate,
        id: Date.now().toString()
      };
      const index = blocks.findIndex(block => block.id === id);
      const newBlocks = [...blocks];
      newBlocks.splice(index + 1, 0, newBlock);
      setBlocks(newBlocks);
    }
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft saved",
      description: "Your blog post has been saved as a draft.",
    });
    onSave();
  };

  const handlePublish = () => {
    // Debug logging to identify the issue
    console.log('=== PUBLISH DEBUG ===');
    console.log('Title:', `"${title}"`, 'Length:', title.length, 'Trimmed:', `"${title.trim()}"`, 'Trimmed Length:', title.trim().length);
    console.log('Category:', `"${category}"`, 'Length:', category.length, 'Trimmed:', `"${category.trim()}"`, 'Trimmed Length:', category.trim().length);
    console.log('Excerpt:', `"${excerpt}"`, 'Length:', excerpt.length, 'Trimmed:', `"${excerpt.trim()}"`, 'Trimmed Length:', excerpt.trim().length);
    
    const titleValid = title.trim().length > 0;
    const categoryValid = category.trim().length > 0;
    const excerptValid = excerpt.trim().length > 0;
    
    console.log('Validation Results:');
    console.log('- Title valid:', titleValid);
    console.log('- Category valid:', categoryValid);
    console.log('- Excerpt valid:', excerptValid);
    console.log('===================');

    if (!titleValid || !categoryValid || !excerptValid) {
      const missingFields = [];
      if (!titleValid) missingFields.push('title');
      if (!categoryValid) missingFields.push('category');
      if (!excerptValid) missingFields.push('excerpt');
      
      console.log('Missing fields:', missingFields);
      
      toast({
        title: "Missing information",
        description: `Please fill in ${missingFields.join(', ')} before publishing.`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Post published",
      description: "Your blog post has been published successfully.",
    });
    onSave();
  };

  const headerActions = (
    <div className="flex items-center gap-3">
      {editingPost && (
        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
          Edit Mode
        </Badge>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={editingPost ? 'Edit Blog Post' : 'Create Blog Post'}
        description="Share knowledge with your clients"
        showBackButton={true}
        onBack={onBack}
        actions={headerActions}
        stickyOffset="top-0"
      />

      <div className="px-4 sm:px-6 md:px-8 py-6 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Basic Info */}
          <BlogPostBasicInfo
            title={title}
            setTitle={setTitle}
            category={category}
            setCategory={setCategory}
            tags={tags}
            setTags={setTags}
            featuredImage={featuredImage}
            setFeaturedImage={setFeaturedImage}
            excerpt={excerpt}
            setExcerpt={setExcerpt}
          />

          {/* Content Builder */}
          <BlogContentBuilder
            blocks={blocks}
            onAddBlock={addBlock}
            onUpdateBlock={updateBlock}
            onDeleteBlock={deleteBlock}
            onDuplicateBlock={duplicateBlock}
          />
        </div>
      </div>

      {/* Sticky Bottom Navigation */}
      <BlogPostNavigation
        onBack={onBack}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
      />
    </div>
  );
};
