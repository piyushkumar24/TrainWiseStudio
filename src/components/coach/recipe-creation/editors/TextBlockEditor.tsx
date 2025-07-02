
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Check, X } from 'lucide-react';

interface TextBlockEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const TextBlockEditor = ({ 
  content, 
  onContentChange, 
  onSave, 
  onCancel 
}: TextBlockEditorProps) => {
  return (
    <div className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="Enter your text content..."
        rows={4}
        className="w-full"
      />
      <div className="flex gap-2">
        <Button onClick={onSave} size="sm" className="bg-green-600 hover:bg-green-700">
          <Check className="h-4 w-4 mr-1" />
          Save
        </Button>
        <Button onClick={onCancel} size="sm" variant="outline">
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
      </div>
    </div>
  );
};
