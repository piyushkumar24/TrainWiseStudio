import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, PlayCircle, Image as ImageIcon } from 'lucide-react';
import { ContentType } from '@/config/contentTypes';

interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'video' | 'link' | 'protip' | 'audio' | 'steps' | 'ingredients';
  content: string;
  order: number;
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  items?: string[];
}

interface ContentBlockRendererProps {
  blocks: ContentBlock[];
  contentType: ContentType;
}

export const ContentBlockRenderer = ({ blocks, contentType }: ContentBlockRendererProps) => {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  const sortedBlocks = [...blocks].sort((a, b) => (a.order || 0) - (b.order || 0));

  const renderBlock = (block: ContentBlock, index: number) => {
    const key = block.id || `block-${index}`;

    switch (block.type) {
      case 'text':
        return (
          <Card key={key} className="animate-fade-in">
            <CardContent className="p-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {block.content}
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 'steps':
        return (
          <Card key={key} className="animate-fade-in">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                📋 Instructions
              </h3>
              <ol className="space-y-4">
                {block.items?.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-4">
                    <span className="bg-orange-500 text-white text-sm rounded-full w-8 h-8 flex items-center justify-center font-medium flex-shrink-0 mt-0.5">
                      {itemIndex + 1}
                    </span>
                    <span className="text-gray-700 pt-1 leading-relaxed flex-1">{item}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        );

      case 'ingredients':
        return (
          <Card key={key} className="animate-fade-in">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                🥘 Ingredients
              </h3>
              <ul className="space-y-3">
                {block.items?.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-4">
                    <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></span>
                    <span className="text-gray-700 leading-relaxed flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        );

      case 'image':
        return (
          <Card key={key} className="animate-fade-in overflow-hidden">
            <CardContent className="p-0">
              {block.imageUrl ? (
                <div className="relative">
                  <img
                    src={block.imageUrl}
                    alt={block.content || 'Content image'}
                    className="w-full h-64 md:h-80 object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {block.content && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <p className="text-white text-sm">{block.content}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">{block.content || 'Image not available'}</p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'video':
        return (
          <Card key={key} className="animate-fade-in">
            <CardContent className="p-6">
              {block.videoUrl ? (
                <div className="space-y-3">
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <video
                      controls
                      className="w-full h-full object-cover"
                      poster={block.imageUrl}
                    >
                      <source src={block.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  {block.content && (
                    <p className="text-gray-700 text-sm">{block.content}</p>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <PlayCircle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">{block.content || 'Video not available'}</p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'protip':
        return (
          <Card key={key} className="animate-fade-in bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                </div>
                <div className="flex-1">
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-2">
                    Pro Tip
                  </Badge>
                  <p className="text-blue-800 leading-relaxed">{block.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'audio':
        return (
          <Card key={key} className="animate-fade-in">
            <CardContent className="p-6">
              {block.audioUrl ? (
                <div className="space-y-3">
                  <audio controls className="w-full">
                    <source src={block.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  {block.content && (
                    <p className="text-gray-700 text-sm">{block.content}</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">
                  {block.content || 'Audio not available'}
                </p>
              )}
            </CardContent>
          </Card>
        );

      default:
        return (
          <Card key={key} className="animate-fade-in">
            <CardContent className="p-6">
              <p className="text-gray-700">{block.content}</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Content</h2>
        <Badge variant="outline" className="text-xs">
          {sortedBlocks.length} {sortedBlocks.length === 1 ? 'block' : 'blocks'}
        </Badge>
      </div>
      
      <div className="space-y-6">
        {sortedBlocks.map((block, index) => renderBlock(block, index))}
      </div>
    </div>
  );
};
