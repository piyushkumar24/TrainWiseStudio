
import React from 'react';
import { MentalExerciseData } from '@/pages/coach/CreateMentalExercise';
import { MentalExerciseBasicForm } from './components/MentalExerciseBasicForm';
import { MentalExerciseTagSelector } from './components/MentalExerciseTagSelector';
import { MentalExerciseHeaderImageUpload } from './components/MentalExerciseHeaderImageUpload';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, ChevronLeft } from 'lucide-react';

interface MentalInfoStepProps {
  data: MentalExerciseData;
  onUpdate: (updates: Partial<MentalExerciseData>) => void;
  onNext: () => void;
  onBack: () => void;
  onSaveDraft: () => void;
  onPrevious?: () => void;
}

export const MentalInfoStep = ({ data, onUpdate, onNext, onBack, onSaveDraft, onPrevious }: MentalInfoStepProps) => {
  const canProceed = data.name.trim() && data.type.trim();

  return (
    <div className="space-y-6 pb-28 md:pb-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            🧘‍♀️ Mental Health Exercise
          </h2>
          <p className="text-gray-600">
            Create a mindfulness or mental wellness exercise
          </p>
        </div>

        <MentalExerciseBasicForm 
          name={data.name}
          type={data.type}
          duration={data.duration}
          onNameChange={(name) => onUpdate({ name })}
          onTypeChange={(type) => onUpdate({ type })}
          onDurationChange={(duration) => onUpdate({ duration })}
        />
        
        <MentalExerciseTagSelector 
          selectedTags={data.tags}
          onTagToggle={(tag) => {
            const isSelected = data.tags.includes(tag);
            if (isSelected) {
              onUpdate({ tags: data.tags.filter(t => t !== tag) });
            } else {
              onUpdate({ tags: [...data.tags, tag] });
            }
          }}
        />
        
        <MentalExerciseHeaderImageUpload 
          headerImageUrl={data.headerImageUrl}
          onImageUpload={(imageUrl) => onUpdate({ headerImageUrl: imageUrl })}
          onImageRemove={() => onUpdate({ headerImageUrl: undefined })}
        />
      </div>

      {/* Mobile-optimized Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:relative md:border-t-0 md:bg-transparent md:p-0 z-50">
        <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center md:pt-6">
          {/* Mobile: First row - Back and Save */}
          <div className="flex gap-2 order-2 md:order-1">
            <Button 
              onClick={onBack}
              variant="outline"
              size="sm"
              className="flex-1 md:flex-none md:px-6"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Back to Hub</span>
              <span className="sm:hidden">Back</span>
            </Button>
            
            <Button 
              onClick={onSaveDraft}
              variant="outline"
              size="sm"
              className="flex-1 md:flex-none md:px-6 text-orange-600 border-orange-200 hover:bg-orange-50"
            >
              <Save className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Save Draft</span>
              <span className="sm:hidden">Save</span>
            </Button>
          </div>

          {/* Mobile: Second row - Previous and Next */}
          <div className="flex gap-2 order-1 md:order-2">
            <Button 
              onClick={onPrevious}
              variant="outline"
              size="sm"
              disabled={true}
              className="w-20 md:flex-none md:px-6 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden xs:inline ml-1">Prev</span>
            </Button>
            
            <Button 
              onClick={onNext}
              disabled={!canProceed}
              size="sm"
              className="bg-orange-500 hover:bg-orange-600 text-white flex-1 md:w-auto md:px-8 disabled:opacity-50"
            >
              <span className="hidden sm:inline">Next: Content →</span>
              <span className="sm:hidden">Next →</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
