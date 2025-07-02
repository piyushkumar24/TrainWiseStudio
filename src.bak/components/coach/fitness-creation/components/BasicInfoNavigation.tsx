
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, ChevronLeft } from 'lucide-react';

interface BasicInfoNavigationProps {
  onBack: () => void;
  onSaveDraft: () => void;
  onNext: () => void;
  onPrevious?: () => void;
  showPrevious?: boolean;
  isFirstStep?: boolean;
}

export const BasicInfoNavigation = ({ 
  onBack, 
  onSaveDraft, 
  onNext, 
  onPrevious,
  showPrevious = false,
  isFirstStep = true 
}: BasicInfoNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:relative md:border-t-0 md:bg-transparent md:p-0 z-50">
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center md:pt-6">
        {/* Mobile: First row - Back and Save Draft */}
        <div className="flex gap-2 order-2 md:order-1">
          <Button 
            onClick={onBack}
            variant="outline"
            className="flex-1 md:flex-none md:px-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Back to Hub</span>
            <span className="sm:hidden">Back</span>
          </Button>
          
          <Button 
            onClick={onSaveDraft}
            variant="outline"
            className="flex-1 md:flex-none md:px-6 text-orange-600 border-orange-200 hover:bg-orange-50"
          >
            <Save className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Save Draft</span>
            <span className="sm:hidden">Save</span>
          </Button>
        </div>

        {/* Mobile: Second row - Previous and Next */}
        <div className="flex gap-2 order-1 md:order-2">
          {showPrevious && (
            <Button 
              onClick={onPrevious}
              variant="outline"
              disabled={isFirstStep}
              className="w-24 md:flex-none md:px-6 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
          )}
          
          <Button 
            onClick={onNext}
            className="bg-orange-500 hover:bg-orange-600 text-white flex-1 md:w-auto md:px-8"
          >
            <span className="hidden sm:inline">Next: Instructions →</span>
            <span className="sm:hidden">Next →</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
