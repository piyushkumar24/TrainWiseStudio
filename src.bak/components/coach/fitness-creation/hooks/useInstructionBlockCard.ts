
import { useState } from 'react';
import { InstructionBlock } from '@/pages/coach/CreateFitnessExercise';

interface UseInstructionBlockCardProps {
  block: InstructionBlock;
  onUpdate: (updates: Partial<InstructionBlock>) => void;
  onDelete: () => void;
}

export const useInstructionBlockCard = ({ 
  block, 
  onUpdate, 
  onDelete 
}: UseInstructionBlockCardProps) => {
  const [isEditing, setIsEditing] = useState(!block.content && !block.imageUrl && !block.videoUrl);
  const [tempContent, setTempContent] = useState(block.content);

  const handleSave = () => {
    // For image/video blocks, we don't require content text
    if (block.type === 'image' || block.type === 'video') {
      if (tempContent.trim()) {
        onUpdate({ content: tempContent });
      }
      setIsEditing(false);
    } else {
      // For other block types, content is required
      onUpdate({ content: tempContent });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTempContent(block.content);
    setIsEditing(false);
    if (!block.content && !block.imageUrl && !block.videoUrl) {
      onDelete();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (block.type === 'image') {
        onUpdate({ imageUrl: url });
        setIsEditing(false); // Auto-save when file is uploaded
      } else if (block.type === 'video') {
        onUpdate({ videoUrl: url });
        setIsEditing(false); // Auto-save when file is uploaded
      }
    }
  };

  return {
    isEditing,
    tempContent,
    setIsEditing,
    setTempContent,
    handleSave,
    handleCancel,
    handleFileChange
  };
};
