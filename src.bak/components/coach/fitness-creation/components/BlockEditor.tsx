
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { InstructionBlock } from '@/pages/coach/CreateFitnessExercise';

interface BlockEditorProps {
  block: InstructionBlock;
  tempContent: string;
  setTempContent: (content: string) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BlockEditor = ({ 
  block, 
  tempContent, 
  setTempContent, 
  handleFileChange 
}: BlockEditorProps) => {
  switch (block.type) {
    case 'text':
      return (
        <Textarea
          value={tempContent}
          onChange={(e) => setTempContent(e.target.value)}
          placeholder="Enter step-by-step instructions..."
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
    
    case 'link':
      return (
        <div className="space-y-3">
          <Input
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
            placeholder="Enter video URL (YouTube, Vimeo, etc.)"
            className="w-full"
          />
        </div>
      );
    
    case 'protip':
      return (
        <Textarea
          value={tempContent}
          onChange={(e) => setTempContent(e.target.value)}
          placeholder="Share a helpful tip or important safety note..."
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
