
import React from 'react';

interface ContentBlock {
  type: string;
  title?: string;
  content?: string;
  imageUrl?: string;
  caption?: string;
  videoUrl?: string;
}

interface FitnessContentBlocksProps {
  blocks: ContentBlock[];
}

export const FitnessContentBlocks = ({ blocks }: FitnessContentBlocksProps) => {
  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'text':
        return (
          <div key={index} className="mb-6 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{block.title}</h3>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">{block.content}</p>
            </div>
          </div>
        );
      case 'image':
        return (
          <div key={index} className="mb-6 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            {block.title && (
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{block.title}</h3>
            )}
            <div className="rounded-lg overflow-hidden shadow-sm">
              <img
                src={block.imageUrl}
                alt={block.title || 'Exercise image'}
                className="w-full h-auto max-h-96 object-cover"
                onError={(e) => {
                  console.error('Failed to load image:', block.imageUrl);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            {block.caption && (
              <p className="text-sm text-gray-600 mt-2 italic">{block.caption}</p>
            )}
          </div>
        );
      case 'video':
        return (
          <div key={index} className="mb-6 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            {block.title && (
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{block.title}</h3>
            )}
            <div className="rounded-lg overflow-hidden shadow-sm bg-gray-100 aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🎥</div>
                <p className="text-gray-600">Video: {block.videoUrl}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Exercise Instructions</h2>
      <div className="grid gap-6">
        {blocks.map((block, index) => renderContentBlock(block, index))}
      </div>
    </div>
  );
};
