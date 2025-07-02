
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Check } from 'lucide-react';
import { ExerciseData } from '@/pages/coach/CreateFitnessExercise';
import { BlockDisplay } from './components/BlockDisplay';

interface PreviewStepProps {
  data: ExerciseData;
  onNext: () => void;
  onPrevious: () => void;
  onBack: () => void;
  onSaveDraft: () => void;
}

export const PreviewStep = ({ data, onNext, onPrevious, onBack, onSaveDraft }: PreviewStepProps) => {
  return (
    <div className="space-y-6 pb-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            👁️ Preview Exercise
          </h2>
          <p className="text-gray-600">
            Review your exercise before publishing
          </p>
        </div>

        {/* Exercise Preview */}
        <div className="space-y-6">
          {/* Title and Intro */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{data.title}</h1>
            <p className="text-lg text-gray-700 leading-relaxed">{data.intro}</p>
          </div>

          {/* Tags and Muscle Group */}
          <div className="flex flex-wrap gap-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Target: </span>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {data.muscleGroup.main} - {data.muscleGroup.sub}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h3>
            <div className="space-y-4">
              {data.instructionBlocks.map((block, index) => (
                <div key={block.id} className="border-l-4 border-orange-200 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-orange-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center font-medium">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-600 capitalize">
                      {block.type === 'protip' ? 'Pro Tip' : block.type}
                    </span>
                  </div>
                  <BlockDisplay block={block} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Mobile First Design */}
      <div className="space-y-4 md:space-y-0 md:flex md:justify-between md:items-center pt-6">
        {/* Top row on mobile - Back and Save Draft buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-3">
          <Button 
            onClick={onBack}
            variant="outline"
            className="w-full sm:w-auto px-4 sm:px-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hub
          </Button>
          
          <Button 
            onClick={onSaveDraft}
            variant="outline"
            className="w-full sm:w-auto px-4 sm:px-6 text-orange-600 border-orange-200 hover:bg-orange-50"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
        </div>

        {/* Bottom row on mobile - Previous and Next buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={onPrevious}
            variant="outline"
            className="flex-1 md:flex-none px-4 md:px-6"
          >
            ← Previous
          </Button>
          
          <Button 
            onClick={onNext}
            className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white px-6 md:px-8"
          >
            <Check className="h-4 w-4 mr-2" />
            Publish Exercise
          </Button>
        </div>
      </div>
    </div>
  );
};
