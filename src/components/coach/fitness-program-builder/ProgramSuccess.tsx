
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ProgramCategory } from '@/pages/coach/CreateProgram';

interface ProgramSuccessProps {
  programCategory: ProgramCategory;
}

export const ProgramSuccess = ({ programCategory }: ProgramSuccessProps) => {
  const navigate = useNavigate();

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
      <div className="text-center space-y-6">
        <div className="text-6xl mb-4">🎉</div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Program Created Successfully!
          </h2>
          <p className="text-gray-600">
            Your {getCategoryTitle().toLowerCase()} program has been created and is ready to use.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => navigate('/coach/programBuilder')}
            className="w-full bg-orange-500 hover:bg-orange-600"
            size="lg"
          >
            View All Programs
          </Button>
          
          <Button
            onClick={() => navigate('/coach/create-program')}
            variant="outline"
            className="w-full"
            size="lg"
          >
            Create Another Program
          </Button>
        </div>
      </div>
    </div>
  );
};
