
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowLeft, Plus } from 'lucide-react';
import { ProgramCategory } from '@/pages/coach/CreateProgram';

interface SuccessStepProps {
  programCategory: ProgramCategory;
  onCreateAnother: () => void;
  onReturnToLibrary: () => void;
}

export const SuccessStep = ({ programCategory, onCreateAnother, onReturnToLibrary }: SuccessStepProps) => {
  useEffect(() => {
    // Trigger confetti animation
    const timer = setTimeout(() => {
      // You can add confetti library here
      console.log('🎉 Confetti animation would play here');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getCategoryEmoji = () => {
    switch (programCategory) {
      case 'fitness': return '🏋️';
      case 'nutrition': return '🥗';
      case 'mental': return '🧘‍♀️';
      default: return '📋';
    }
  };

  const getCategoryTitle = () => {
    switch (programCategory) {
      case 'fitness': return 'Fitness';
      case 'nutrition': return 'Nutrition';
      case 'mental': return 'Mental Health';
      default: return 'Program';
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card className="text-center">
        <CardContent className="p-8">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {getCategoryEmoji()} Program Created Successfully!
            </h2>
            <p className="text-gray-600">
              Your {getCategoryTitle().toLowerCase()} program has been created and is ready to use.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onReturnToLibrary}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Library
            </Button>
            <Button
              onClick={onCreateAnother}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600"
            >
              <Plus className="h-4 w-4" />
              Create Another Program
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
