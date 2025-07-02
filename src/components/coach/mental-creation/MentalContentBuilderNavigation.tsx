
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';

interface MentalContentBuilderNavigationProps {
  onBack: () => void;
  onSaveDraft: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const MentalContentBuilderNavigation = ({
  onBack,
  onSaveDraft,
  onPrevious,
  onNext
}: MentalContentBuilderNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:relative md:border-t-0 md:bg-transparent md:p-0 z-50">
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center md:pt-6">
        <div className="flex gap-3 order-2 md:order-1">
          <Button 
            onClick={onBack}
            variant="outline"
            className="flex-1 md:flex-none md:px-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hub
          </Button>
          
          <Button 
            onClick={onSaveDraft}
            variant="outline"
            className="flex-1 md:flex-none md:px-6 text-orange-600 border-orange-200 hover:bg-orange-50"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
        </div>

        <div className="flex gap-3 order-1 md:order-2">
          <Button 
            onClick={onPrevious}
            variant="outline"
            className="flex-1 md:flex-none md:px-6"
          >
            ← Previous
          </Button>
          
          <Button 
            onClick={onNext}
            className="flex-1 md:flex-none bg-orange-500 hover:bg-orange-600 text-white md:px-8"
          >
            Next: Preview →
          </Button>
        </div>
      </div>
    </div>
  );
};
