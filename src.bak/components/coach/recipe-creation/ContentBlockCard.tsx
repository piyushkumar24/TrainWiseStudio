
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ContentBlock } from '@/types/recipe';
import { BlockHeader } from './components/BlockHeader';
import { BlockDisplay } from './displays/BlockDisplay';
import { TextBlockEditor } from './editors/TextBlockEditor';
import { ListBlockEditor } from './editors/ListBlockEditor';
import { ImageBlockEditor } from './editors/ImageBlockEditor';

interface ContentBlockCardProps {
  block: ContentBlock;
  index: number;
  totalBlocks: number;
  onUpdate: (updates: Partial<ContentBlock>) => void;
  onDelete: () => void;
  onMove: (direction: 'up' | 'down') => void;
}

export const ContentBlockCard = ({ 
  block, 
  index, 
  totalBlocks, 
  onUpdate, 
  onDelete, 
  onMove 
}: ContentBlockCardProps) => {
  const [isEditing, setIsEditing] = useState(!block.content && !block.items?.length && !block.imageUrl);
  const [tempContent, setTempContent] = useState(block.content);
  const [tempItems, setTempItems] = useState(block.items || []);

  const handleSave = () => {
    if (block.type === 'ingredients' || block.type === 'steps') {
      onUpdate({ items: tempItems, content: tempContent });
    } else if (block.type === 'text') {
      onUpdate({ content: tempContent });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempContent(block.content);
    setTempItems(block.items || []);
    setIsEditing(false);
    if (!block.content && !block.items?.length && !block.imageUrl) {
      onDelete();
    }
  };

  const handleImageUpload = (url: string) => {
    onUpdate({ imageUrl: url });
    setIsEditing(false);
  };

  const renderContent = () => {
    if (isEditing) {
      switch (block.type) {
        case 'text':
          return (
            <TextBlockEditor
              content={tempContent}
              onContentChange={setTempContent}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          );

        case 'ingredients':
        case 'steps':
          return (
            <ListBlockEditor
              items={tempItems}
              blockType={block.type}
              onItemsChange={setTempItems}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          );

        case 'image':
          return (
            <ImageBlockEditor
              blockId={block.id}
              imageUrl={block.imageUrl}
              onImageUpload={handleImageUpload}
              onCancel={handleCancel}
            />
          );

        default:
          return null;
      }
    }

    return <BlockDisplay block={block} />;
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-3">
        <BlockHeader
          block={block}
          index={index}
          totalBlocks={totalBlocks}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onDelete={onDelete}
          onMove={onMove}
        />
      </CardHeader>
      
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
};
