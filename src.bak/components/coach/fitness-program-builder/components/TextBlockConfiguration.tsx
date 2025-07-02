
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface TextBlockConfigurationProps {
  textBlock: string;
  onUpdateTextBlock: (value: string) => void;
}

export const TextBlockConfiguration = ({ textBlock, onUpdateTextBlock }: TextBlockConfigurationProps) => {
  return (
    <div>
      <Label htmlFor="textBlock" className="text-sm font-medium">
        Optional Guidance Text
      </Label>
      <Textarea
        id="textBlock"
        placeholder="Add guidance, instructions, or notes for this mental exercise..."
        value={textBlock}
        onChange={(e) => onUpdateTextBlock(e.target.value)}
        className="mt-2 min-h-[100px]"
      />
      <p className="text-xs text-gray-500 mt-1">
        This text will be shown alongside the mental exercise to provide additional context or instructions.
      </p>
    </div>
  );
};
