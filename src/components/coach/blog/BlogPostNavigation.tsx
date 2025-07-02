
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Eye } from 'lucide-react';

interface BlogPostNavigationProps {
  onBack: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
}

export const BlogPostNavigation = ({ onBack, onSaveDraft, onPublish }: BlogPostNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
      <div className="flex gap-2 max-w-md mx-auto">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          variant="outline"
          onClick={onSaveDraft}
          className="flex-1"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
        <Button
          onClick={onPublish}
          className="flex-1 bg-[#FF6B2C] hover:bg-[#e55b22]"
        >
          <Eye className="h-4 w-4 mr-2" />
          Publish
        </Button>
      </div>
    </div>
  );
};
