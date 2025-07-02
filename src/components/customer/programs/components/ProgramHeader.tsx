import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, MessageSquare, Dumbbell, UtensilsCrossed, Brain, Image } from 'lucide-react';

interface ProgramHeaderProps {
  program: {
    id: string;
    title: string;
    type: 'fitness' | 'nutrition' | 'mental';
    progress: number;
    hasFeedback: boolean;
    headerImage?: string;
  };
  onBack: () => void;
  onShowFeedback: () => void;
}

export const ProgramHeader = ({ program, onBack, onShowFeedback }: ProgramHeaderProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'fitness':
        return <Dumbbell className="h-5 w-5" />;
      case 'nutrition':
        return <UtensilsCrossed className="h-5 w-5" />;
      case 'mental':
        return <Brain className="h-5 w-5" />;
      default:
        return <Dumbbell className="h-5 w-5" />;
    }
  };

  const getCategoryEmoji = (type: string) => {
    switch (type) {
      case 'fitness': return '🏋️';
      case 'nutrition': return '🥗';
      case 'mental': return '🧘‍♀️';
      default: return '📋';
    }
  };

  const getCategoryColor = (type: string) => {
    switch (type) {
      case 'fitness':
        return 'text-blue-600 bg-blue-100';
      case 'nutrition':
        return 'text-green-600 bg-green-100';
      case 'mental':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const isValidImageUrl = (url: string) => {
    // Check if it's a Supabase Storage URL (permanent)
    if (url.includes('supabase.co/storage/v1/object/public/')) {
      return true;
    }
    // Check if it's a valid HTTP/HTTPS URL
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const shouldShowImage = program.headerImage && isValidImageUrl(program.headerImage) && !imageError;

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Header Image */}
      {program.headerImage && (
        <div className="w-full h-32 overflow-hidden bg-gray-100">
          {shouldShowImage ? (
            <>
              {imageLoading && (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <div className="animate-pulse flex items-center gap-2">
                    <Image className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500">Loading...</span>
                  </div>
                </div>
              )}
              <img 
                src={program.headerImage} 
                alt={program.title}
                className={`w-full h-full object-cover transition-opacity duration-200 ${imageLoading ? 'opacity-0 absolute' : 'opacity-100'}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center">
                <div className="text-3xl mb-1">{getCategoryEmoji(program.type)}</div>
                <p className="text-gray-500 text-xs">No image</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <Button variant="ghost" onClick={onBack} size="sm" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          {program.hasFeedback && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onShowFeedback}
              className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Feedback
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg ${getCategoryColor(program.type)}`}>
            {getCategoryIcon(program.type)}
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">{program.title}</h1>
            <p className="text-sm text-gray-600 capitalize">{program.type} Program</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Overall Progress</span>
            <span className="font-medium">{program.progress}%</span>
          </div>
          <Progress value={program.progress} className="h-2" />
        </div>
      </div>
    </div>
  );
};
