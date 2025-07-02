
import React from 'react';
import { ContentBlock } from '@/types/recipe';

interface BlockDisplayProps {
  block: ContentBlock;
}

export const BlockDisplay = ({ block }: BlockDisplayProps) => {
  switch (block.type) {
    case 'text':
      return <p className="text-gray-700 whitespace-pre-wrap">{block.content}</p>;

    case 'ingredients':
      return (
        <ul className="space-y-1">
          {block.items?.map((item, itemIndex) => (
            <li key={itemIndex} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'steps':
      return (
        <ol className="space-y-2">
          {block.items?.map((item, itemIndex) => (
            <li key={itemIndex} className="flex items-start gap-3">
              <span className="bg-orange-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center font-medium flex-shrink-0 mt-0.5">
                {itemIndex + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );

    case 'image':
      return block.imageUrl ? (
        <img src={block.imageUrl} alt="Recipe" className="w-full h-48 object-cover rounded-lg" />
      ) : (
        <div className="text-center py-8 text-gray-500">No image uploaded</div>
      );

    default:
      return null;
  }
};
