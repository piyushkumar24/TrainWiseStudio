
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, GripVertical, Copy, Trash2, Image, Quote, Video, Minus } from 'lucide-react';
import { BlogBlock } from '@/pages/coach/CoachBlog';
import { BlogBlockRenderer } from './BlogBlockRenderer';
import { useIsMobile } from '@/hooks/use-mobile';

interface BlogContentBuilderProps {
  blocks: BlogBlock[];
  onAddBlock: (type: BlogBlock['type']) => void;
  onUpdateBlock: (id: string, content: any) => void;
  onDeleteBlock: (id: string) => void;
  onDuplicateBlock: (id: string) => void;
}

export const BlogContentBuilder = ({
  blocks,
  onAddBlock,
  onUpdateBlock,
  onDeleteBlock,
  onDuplicateBlock
}: BlogContentBuilderProps) => {
  const isMobile = useIsMobile();

  const getBlockIcon = (type: BlogBlock['type']) => {
    switch (type) {
      case 'text': return 'T';
      case 'image': return <Image className="h-4 w-4" />;
      case 'quote': return <Quote className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'divider': return <Minus className="h-4 w-4" />;
      default: return '';
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Content Builder</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <Card key={block.id} className="border-l-4 border-l-[#FF6B2C]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {!isMobile && <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />}
                    <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded text-xs">
                      {getBlockIcon(block.type)}
                    </div>
                    <span className="text-sm font-medium capitalize">{block.type} Block</span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDuplicateBlock(block.id)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteBlock(block.id)}
                      className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <BlogBlockRenderer
                  block={block}
                  onUpdateBlock={onUpdateBlock}
                />
              </CardContent>
            </Card>
          ))}

          {/* Add Block Buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddBlock('text')}
            >
              <Plus className="h-3 w-3 mr-1" />
              Text
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddBlock('image')}
            >
              <Image className="h-3 w-3 mr-1" />
              Image
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddBlock('quote')}
            >
              <Quote className="h-3 w-3 mr-1" />
              Quote
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddBlock('video')}
            >
              <Video className="h-3 w-3 mr-1" />
              Video
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddBlock('divider')}
            >
              <Minus className="h-3 w-3 mr-1" />
              Divider
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
