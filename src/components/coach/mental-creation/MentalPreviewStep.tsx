
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Clock, Tag } from 'lucide-react';
import { MentalExerciseData } from '@/pages/coach/CreateMentalExercise';

interface MentalPreviewStepProps {
  data: MentalExerciseData;
  onNext: () => void;
  onPrevious: () => void;
  onBack: () => void;
  onSaveDraft: () => void;
}

export const MentalPreviewStep = ({ 
  data, 
  onNext, 
  onPrevious, 
  onBack, 
  onSaveDraft 
}: MentalPreviewStepProps) => {
  const getTypeDisplay = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const renderContentBlock = (block: any, index: number) => {
    switch (block.type) {
      case 'text':
        return (
          <div key={index} className="prose prose-sm max-w-none mb-4">
            <p className="whitespace-pre-wrap text-gray-700">{block.content}</p>
          </div>
        );
      
      case 'image':
        return block.imageUrl ? (
          <div key={index} className="mb-4">
            <img 
              src={block.imageUrl} 
              alt="Mental exercise visual" 
              className="w-full h-auto rounded-lg border border-gray-200 max-h-64 object-cover"
            />
          </div>
        ) : null;
      
      case 'video':
        return block.videoUrl ? (
          <div key={index} className="mb-4">
            <video 
              controls 
              className="w-full h-auto rounded-lg border border-gray-200 max-h-64"
            >
              <source src={block.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : null;
      
      case 'audio':
        return block.audioUrl ? (
          <div key={index} className="mb-4">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🎵</span>
                <span className="font-medium text-gray-700">Audio Guide</span>
              </div>
              <audio 
                controls 
                className="w-full"
              >
                <source src={block.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        ) : null;
      
      case 'protip':
        return (
          <div key={index} className="mb-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">💡</span>
                <div>
                  <p className="font-medium text-blue-800 mb-1">Pro Tip</p>
                  <p className="text-blue-700">{block.content}</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-28 md:pb-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="p-2 hover:bg-gray-100"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        🔙 Back to Hub
      </Button>

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
          👁️ Preview Mental Exercise
        </h1>
        <p className="text-gray-600">This is how your clients will see the exercise</p>
      </div>

      {/* Preview Card - Exactly how clients will see it */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl font-bold text-gray-900 mb-2">
            {data.name}
          </CardTitle>
          
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span className="text-lg">🧠</span>
              <span>{getTypeDisplay(data.type)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{data.duration} min</span>
            </div>
          </div>

          {data.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {data.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-4">
          {data.contentBlocks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">🧠</div>
              <p>No content blocks added yet</p>
            </div>
          ) : (
            data.contentBlocks
              .sort((a, b) => a.order - b.order)
              .map((block, index) => renderContentBlock(block, index))
          )}
        </CardContent>
      </Card>

      {/* Bottom Navigation - Updated to match other creation pages */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:relative md:border-t-0 md:bg-transparent md:p-0 z-50">
        <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center md:pt-6">
          <div className="flex gap-3 order-2 md:order-1">
            <Button
              onClick={onPrevious}
              variant="outline"
              className="flex-1 md:flex-none md:px-6"
            >
              ← Previous
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
          
          <Button
            onClick={onNext}
            className="bg-orange-500 hover:bg-orange-600 text-white w-full md:w-auto md:px-8 order-1 md:order-2"
          >
            Finish & Save →
          </Button>
        </div>
      </div>
    </div>
  );
};
