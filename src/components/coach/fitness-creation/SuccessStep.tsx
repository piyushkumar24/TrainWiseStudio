
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Sparkles } from 'lucide-react';

export const SuccessStep = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add confetti animation class to body
    document.body.classList.add('animate-pulse');
    
    return () => {
      document.body.classList.remove('animate-pulse');
    };
  }, []);

  return (
    <div className="text-center space-y-8 py-12">
      {/* Success Animation */}
      <div className="relative">
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <div className="absolute -top-2 -right-2 animate-bounce">
          <Sparkles className="h-8 w-8 text-yellow-500" />
        </div>
        <div className="absolute -bottom-1 -left-1 animate-bounce delay-150">
          <Sparkles className="h-6 w-6 text-orange-500" />
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 animate-fade-in">
          🎉 Exercise Created!
        </h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto animate-fade-in delay-75">
          Your fitness exercise has been successfully saved to your Knowledge Hub
        </p>
      </div>

      {/* Celebration Emojis */}
      <div className="flex justify-center space-x-4 text-4xl animate-fade-in delay-150">
        <span className="animate-bounce">🏋️‍♂️</span>
        <span className="animate-bounce delay-75">💪</span>
        <span className="animate-bounce delay-150">🎯</span>
        <span className="animate-bounce delay-300">⭐</span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in delay-300">
        <Button
          onClick={() => navigate('/coach/knowledgeHub')}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
        >
          Back to Knowledge Hub
        </Button>
        
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="px-8 py-3 text-lg border-2 hover:bg-gray-50"
        >
          Create Another Exercise
        </Button>
      </div>

      {/* Additional Info */}
      <div className="pt-8 space-y-2 text-sm text-gray-500 animate-fade-in delay-500">
        <p>✅ Exercise saved as published</p>
        <p>🔍 Searchable in your Knowledge Hub</p>
        <p>👥 Ready to assign to clients</p>
      </div>
    </div>
  );
};
