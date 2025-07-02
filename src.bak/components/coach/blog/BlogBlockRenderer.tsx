
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Image, X } from 'lucide-react';
import { BlogBlock } from '@/pages/coach/CoachBlog';

interface BlogBlockRendererProps {
  block: BlogBlock;
  onUpdateBlock: (id: string, content: any) => void;
}

export const BlogBlockRenderer = ({ block, onUpdateBlock }: BlogBlockRendererProps) => {
  const handleImageBlockUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUpdateBlock(block.id, { url, caption: block.content.caption || '' });
    }
  };

  const removeImageFromBlock = () => {
    onUpdateBlock(block.id, { url: '', caption: block.content.caption || '' });
  };

  switch (block.type) {
    case 'text':
      return (
        <Textarea
          value={block.content.text || ''}
          onChange={(e) => onUpdateBlock(block.id, { text: e.target.value })}
          placeholder="Write your content..."
          className="min-h-[100px] resize-none"
        />
      );
    
    case 'image':
      return (
        <div className="space-y-2">
          {block.content.url ? (
            <div className="space-y-3">
              <div className="relative">
                <img 
                  src={block.content.url} 
                  alt="Block image" 
                  className="w-full h-48 object-cover rounded-lg" 
                />
                <Button
                  onClick={removeImageFromBlock}
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageBlockUpload}
                  className="hidden"
                  id={`replace-image-${block.id}`}
                />
                <label
                  htmlFor={`replace-image-${block.id}`}
                  className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer underline"
                >
                  Replace image
                </label>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-300 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageBlockUpload}
                className="hidden"
                id={`image-upload-${block.id}`}
              />
              <label
                htmlFor={`image-upload-${block.id}`}
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Image className="h-8 w-8 text-gray-400" />
                <p className="text-gray-600 font-medium">Click to upload image</p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </label>
            </div>
          )}
          <Input
            value={block.content.caption || ''}
            onChange={(e) => onUpdateBlock(block.id, { ...block.content, caption: e.target.value })}
            placeholder="Image caption (optional)"
          />
        </div>
      );
    
    case 'quote':
      return (
        <div className="space-y-2">
          <Textarea
            value={block.content.text || ''}
            onChange={(e) => onUpdateBlock(block.id, { ...block.content, text: e.target.value })}
            placeholder="Enter quote text..."
            className="resize-none"
            rows={3}
          />
          <Input
            value={block.content.author || ''}
            onChange={(e) => onUpdateBlock(block.id, { ...block.content, author: e.target.value })}
            placeholder="Quote author (optional)"
          />
        </div>
      );
    
    case 'video':
      return (
        <div className="space-y-2">
          <Input
            value={block.content.url || ''}
            onChange={(e) => onUpdateBlock(block.id, { ...block.content, url: e.target.value })}
            placeholder="Video URL (YouTube, Vimeo, etc.)"
          />
          <Input
            value={block.content.caption || ''}
            onChange={(e) => onUpdateBlock(block.id, { ...block.content, caption: e.target.value })}
            placeholder="Video caption (optional)"
          />
        </div>
      );
    
    case 'divider':
      return (
        <div className="flex items-center justify-center py-4">
          <div className="w-full h-px bg-gray-300"></div>
        </div>
      );
    
    default:
      return null;
  }
};
