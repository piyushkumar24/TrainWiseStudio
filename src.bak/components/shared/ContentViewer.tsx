
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Target, Heart, Users } from 'lucide-react';
import { ViewerLayout } from '@/components/coach/knowledge-hub/ViewerLayout';
import { ContentMetadata } from './content-viewer/ContentMetadata';
import { ContentBlockRenderer } from './content-viewer/ContentBlockRenderer';
import { ContentData, ContentType, contentTypeConfigs } from '@/config/contentTypes';

interface ContentViewerProps {
  data: ContentData | null;
  contentType: ContentType;
  isLoading?: boolean;
  error?: any;
  notFoundMessage?: string;
}

export const ContentViewer = ({ 
  data, 
  contentType, 
  isLoading, 
  error, 
  notFoundMessage 
}: ContentViewerProps) => {
  const config = contentTypeConfigs[contentType];

  console.log('ContentViewer - data:', data);
  console.log('ContentViewer - contentType:', contentType);
  console.log('ContentViewer - config:', config);

  if (error) {
    console.error('ContentViewer - error:', error);
    return (
      <ViewerLayout title="Content Not Found" category={contentType}>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">{config.icon}</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Not Found</h2>
          <p className="text-gray-600">
            {notFoundMessage || `The ${contentType} content you're looking for doesn't exist.`}
          </p>
        </div>
      </ViewerLayout>
    );
  }

  if (!data) {
    console.log('ContentViewer - no data, showing loading...');
    return (
      <ViewerLayout title="Loading..." category={contentType} isLoading={true}>
        <div></div>
      </ViewerLayout>
    );
  }

  // Handle type conversion for tags and blocks from Supabase Json type
  const tags = Array.isArray(data.tags) ? data.tags : [];
  const blocks = Array.isArray(data.blocks) ? data.blocks : (data.blocks ? [data.blocks] : []);

  console.log('ContentViewer - processed tags:', tags);
  console.log('ContentViewer - processed blocks:', blocks);

  const renderCategoryBadges = () => {
    const badges = [];

    // Primary category/type
    if (contentType === 'fitness' && data.muscle_group_main) {
      badges.push(
        <Badge key="main" className="bg-orange-100 text-orange-700 border-orange-200 flex items-center gap-1">
          <ChevronRight className="h-3 w-3" />
          {data.muscle_group_main}
        </Badge>
      );
    }

    if (contentType === 'nutrition' && data.category) {
      badges.push(
        <Badge key="category" className="bg-green-100 text-green-700 border-green-200 capitalize">
          {data.category}
        </Badge>
      );
    }

    if (contentType === 'mental' && data.exercise_type) {
      badges.push(
        <Badge key="type" className="bg-purple-100 text-purple-700 border-purple-200 flex items-center gap-1 capitalize">
          <Heart className="h-3 w-3" />
          {data.exercise_type.replace('_', ' ')}
        </Badge>
      );
    }

    // Secondary category/subcategory - now handles multiple subcategories
    if (contentType === 'fitness' && data.muscle_group_sub && Array.isArray(data.muscle_group_sub)) {
      data.muscle_group_sub.forEach((subGroup, index) => {
        badges.push(
          <Badge key={`sub-${index}`} variant="outline" className="flex items-center gap-1">
            <Target className="h-3 w-3" />
            {subGroup}
          </Badge>
        );
      });
    }

    if (contentType === 'nutrition' && data.portion_count) {
      badges.push(
        <Badge key="portions" variant="outline" className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          {data.portion_count} servings
        </Badge>
      );
    }

    return badges;
  };

  return (
    <ViewerLayout title={data.name} category={contentType} isLoading={isLoading}>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center animate-fade-in">
          <div className="text-6xl mb-4">{config.icon}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {data.name}
          </h1>
          
          {/* Category Badges */}
          {renderCategoryBadges().length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {renderCategoryBadges()}
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {tags.map((tag: string, index: number) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Hero Image */}
        {data.header_image && (
          <div className="animate-fade-in">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={data.header_image}
                alt={data.name}
                className="w-full h-64 md:h-80 object-cover"
                onError={(e) => {
                  console.error('Failed to load header image:', data.header_image);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        )}

        {/* Dynamic Metadata */}
        <ContentMetadata data={data} contentType={contentType} />

        {/* Content Blocks */}
        <ContentBlockRenderer blocks={blocks} contentType={contentType} />

        {/* Motivational Footer */}
        {contentType === 'mental' && (
          <Card className="animate-fade-in bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">💜</div>
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Remember</h3>
              <p className="text-purple-700">
                Mental health exercises work best when practiced regularly. Be patient with yourself and focus on progress, not perfection.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-200 animate-fade-in">
          <p className="text-gray-500 text-sm">
            Created on {new Date(data.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
    </ViewerLayout>
  );
};
