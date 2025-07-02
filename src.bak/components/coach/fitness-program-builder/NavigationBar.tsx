
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, ArrowRight } from 'lucide-react';
import { ProgramStep } from '@/pages/coach/CreateProgram';

interface NavigationBarProps {
  currentStep: ProgramStep;
  onPrevious: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
  canProceed: boolean;
  isLoading: boolean;
}

export const NavigationBar = ({
  currentStep,
  onPrevious,
  onNext,
  onSaveDraft,
  canProceed,
  isLoading
}: NavigationBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:px-8">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <Button
          variant="ghost"
          onClick={onSaveDraft}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
          disabled={isLoading || !canProceed}
        >
          <Save className="h-4 w-4" />
          Save Draft
        </Button>

        <Button
          onClick={onNext}
          disabled={!canProceed || isLoading}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600"
        >
          <span className="hidden sm:inline">Next</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
