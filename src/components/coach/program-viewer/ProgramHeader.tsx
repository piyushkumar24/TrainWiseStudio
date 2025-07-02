import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign, User, Image } from 'lucide-react';
import { ProgramViewerData } from '@/hooks/useProgramViewer';

interface ProgramHeaderProps {
  program: ProgramViewerData;
}

export const ProgramHeader: React.FC<ProgramHeaderProps> = ({ program }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'fitness': return '🏋️';
      case 'nutrition': return '🥗';
      case 'mental': return '🧘‍♀️';
      default: return '📋';
    }
  };

  const getStateColor = (state: string) => {
    switch (state) {
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in_shop': return 'bg-green-100 text-green-800';
      case 'saved': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  const shouldShowImage = program.header_image && isValidImageUrl(program.header_image) && !imageError;

  return (
    <div className="w-full bg-white">
      {/* Header Image */}
      {program.header_image && (
        <div className="w-full h-48 md:h-64 overflow-hidden bg-gray-100">
          {shouldShowImage ? (
            <>
              {imageLoading && (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <div className="animate-pulse flex flex-col items-center gap-2">
                    <Image className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-500">Loading image...</span>
                  </div>
                </div>
              )}
              <img 
                src={program.header_image} 
                alt={program.title}
                className={`w-full h-full object-cover transition-opacity duration-200 ${imageLoading ? 'opacity-0 absolute' : 'opacity-100'}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center">
                <div className="text-6xl mb-2">{getCategoryEmoji(program.category)}</div>
                <p className="text-gray-500 text-sm">No image available</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="p-4 md:p-6">
        <div className="space-y-4">
          {/* Title and Category */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span>{getCategoryEmoji(program.category)}</span>
              {program.title}
            </h1>
            {program.description && (
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {program.description}
              </p>
            )}
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge className={getStateColor(program.state)}>
              {program.state.charAt(0).toUpperCase() + program.state.slice(1)}
            </Badge>
            <Badge variant="outline">
              {program.category.charAt(0).toUpperCase() + program.category.slice(1)}
            </Badge>
          </div>

          {/* State-specific Information */}
          {program.state === 'assigned' && program.client_name && (
            <div className="flex items-center gap-2 text-blue-600 bg-blue-50 p-3 rounded-lg">
              <User className="h-4 w-4" />
              <span className="font-medium">Assigned to {program.client_name}</span>
              {program.assigned_at && (
                <span className="text-sm text-blue-500">
                  on {formatDate(program.assigned_at)}
                </span>
              )}
            </div>
          )}

          {program.state === 'in_shop' && program.in_shop_price && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
              <DollarSign className="h-4 w-4" />
              <span className="font-medium">Available in shop for ${program.in_shop_price}</span>
            </div>
          )}

          {/* Tags */}
          {program.tags && program.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {program.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Created Date */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar className="h-4 w-4" />
            <span>Created {formatDate(program.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
