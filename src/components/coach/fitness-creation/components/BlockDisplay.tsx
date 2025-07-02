
import React from 'react';
import { InstructionBlock } from '@/pages/coach/CreateFitnessExercise';

interface BlockDisplayProps {
  block: InstructionBlock;
}

export const BlockDisplay = ({ block }: BlockDisplayProps) => {
  if (!block.content && !block.imageUrl && !block.videoUrl) {
    return <p className="text-gray-400 italic">Click edit to add content...</p>;
  }

  switch (block.type) {
    case 'image':
      return (
        <div className="space-y-2">
          {block.imageUrl && (
            <img 
              src={block.imageUrl} 
              alt="Exercise demonstration" 
              className="w-full h-auto rounded-lg border border-gray-200 max-h-64 object-cover"
            />
          )}
        </div>
      );
    
    case 'video':
      return (
        <div className="space-y-2">
          {block.videoUrl && (
            <video 
              controls 
              className="w-full h-auto rounded-lg border border-gray-200 max-h-64"
            >
              <source src={block.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      );
    
    case 'protip':
      return (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <div className="flex items-start">
            <span className="text-blue-500 mr-2">💡</span>
            <p className="text-blue-800">{block.content}</p>
          </div>
        </div>
      );
    
    case 'link':
      return (
        <div className="p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <span>🔗</span>
            <span className="font-medium">Video Link</span>
          </div>
          <a 
            href={block.content} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {block.content}
          </a>
        </div>
      );
    
    default:
      return (
        <div className="prose prose-sm max-w-none">
          <p className="whitespace-pre-wrap">{block.content}</p>
        </div>
      );
  }
};
