
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AddItemFABProps {
  onClick: () => void;
}

export const AddItemFAB = ({ onClick }: AddItemFABProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#FF6B2C] hover:bg-[#e55b22] shadow-lg z-50 p-0"
      size="icon"
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
};
