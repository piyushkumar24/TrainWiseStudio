
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const MentalSuccessStep = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="space-y-4">
          <div className="text-8xl animate-bounce">🎉</div>
          <h2 className="text-3xl font-bold text-gray-900">
            Mental Exercise Created!
          </h2>
          <p className="text-lg text-gray-600">
            Your mental health exercise has been successfully created and is now available in your Knowledge Hub.
          </p>
        </div>

        <div className="flex justify-center space-x-4 text-4xl animate-fade-in delay-150">
          <span className="animate-bounce">🧠</span>
          <span className="animate-bounce delay-75">🧘‍♀️</span>
          <span className="animate-bounce delay-150">💙</span>
          <span className="animate-bounce delay-300">✨</span>
        </div>

        <div className="space-y-3 pt-6">
          <Button
            onClick={() => navigate('/coach/knowledgeHub')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg"
          >
            🏠 Back to Knowledge Hub
          </Button>
          
          <Button
            onClick={() => navigate('/coach/knowledgeHub/mental/create')}
            variant="outline"
            className="w-full py-3 text-lg border-orange-200 text-orange-600 hover:bg-orange-50"
          >
            ➕ Create Another Mental Exercise
          </Button>
        </div>
      </div>
    </div>
  );
};
