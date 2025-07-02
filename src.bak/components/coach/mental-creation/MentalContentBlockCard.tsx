
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Edit, Save, X, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { MentalContentBlock } from '@/pages/coach/CreateMentalExercise';

interface MentalContentBlockCardProps {
  block: MentalContentBlock;
  index: number;
  totalBlocks: number;
  onUpdate: (updates: Partial<MentalContentBlock>) => void;
  onDelete: () => void;
  onMove: (direction: 'up' | 'down') => void;
}

export const MentalContentBlockCard = ({
  block,
  index,
  totalBlocks,
  onUpdate,
  onDelete,
  onMove
}: MentalContentBlockCardProps) => {
  const [isEditing, setIsEditing] = useState(!block.content && !block.imageUrl && !block.videoUrl && !block.audioUrl);
  const [tempContent, setTempContent] = useState(block.content);

  const getBlockIcon = (type: string) => {
    switch (type) {
      case 'text': return '📝';
      case 'image': return '🖼️';
      case 'video': return '🎥';
      case 'audio': return '🎵';
      case 'protip': return '💡';
      default: return '📄';
    }
  };

  const getBlockTitle = (type: string) => {
    switch (type) {
      case 'text': return 'Text Block';
      case 'image': return 'Image Block';
      case 'video': return 'Video Block';
      case 'audio': return 'Audio Block';
      case 'protip': return 'Pro Tip';
      default: return 'Content Block';
    }
  };

  const handleSave = () => {
    onUpdate({ content: tempContent });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempContent(block.content);
    setIsEditing(false);
    if (!block.content && !block.imageUrl && !block.videoUrl && !block.audioUrl) {
      onDelete();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (block.type === 'image') {
        onUpdate({ imageUrl: url });
      } else if (block.type === 'video') {
        onUpdate({ videoUrl: url });
      } else if (block.type === 'audio') {
        onUpdate({ audioUrl: url });
      }
      setIsEditing(false);
    }
  };

  const renderEditor = () => {
    switch (block.type) {
      case 'text':
        return (
          <Textarea
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
            placeholder="Enter instructions, guidance, or mindfulness prompts..."
            rows={4}
            className="w-full"
          />
        );
      
      case 'image':
        return (
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
        );
      
      case 'video':
        return (
          <Input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full"
          />
        );
      
      case 'audio':
        return (
          <Input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="w-full"
          />
        );
      
      case 'protip':
        return (
          <Textarea
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
            placeholder="Share a helpful tip, best practice, or motivational insight..."
            rows={3}
            className="w-full"
          />
        );
      
      default:
        return (
          <Textarea
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
            placeholder="Enter content..."
            rows={3}
          />
        );
    }
  };

  const renderContent = () => {
    if (!block.content && !block.imageUrl && !block.videoUrl && !block.audioUrl) {
      return <p className="text-gray-400 italic">Click edit to add content...</p>;
    }

    switch (block.type) {
      case 'image':
        return block.imageUrl ? (
          <img 
            src={block.imageUrl} 
            alt="Mental exercise visual" 
            className="w-full h-auto rounded-lg border border-gray-200 max-h-64 object-cover"
          />
        ) : null;
      
      case 'video':
        return block.videoUrl ? (
          <video 
            controls 
            className="w-full h-auto rounded-lg border border-gray-200 max-h-64"
          >
            <source src={block.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : null;
      
      case 'audio':
        return block.audioUrl ? (
          <audio 
            controls 
            className="w-full"
          >
            <source src={block.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ) : null;
      
      case 'protip':
        return (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <div className="flex items-start">
              <span className="text-blue-500 mr-2">💡</span>
              <p className="text-blue-800">{block.content}</p>
            </div>
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

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getBlockIcon(block.type)}</span>
            <h3 className="font-medium text-gray-900">{getBlockTitle(block.type)}</h3>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {index + 1}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            {/* Move buttons */}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onMove('up')}
              disabled={index === 0}
              className="p-1 h-7 w-7"
            >
              <ChevronUp className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onMove('down')}
              disabled={index === totalBlocks - 1}
              className="p-1 h-7 w-7"
            >
              <ChevronDown className="h-3 w-3" />
            </Button>
            
            {/* Edit/Delete buttons */}
            {!isEditing && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="p-1 h-7 w-7"
              >
                <Edit className="h-3 w-3" />
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={onDelete}
              className="p-1 h-7 w-7 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            {renderEditor()}
            <div className="flex gap-2 justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={block.type !== 'image' && block.type !== 'video' && block.type !== 'audio' && !tempContent.trim()}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
        ) : (
          renderContent()
        )}
      </CardContent>
    </Card>
  );
};
