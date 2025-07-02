
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Target, Utensils } from 'lucide-react';
import { ContentData, ContentType } from '@/config/contentTypes';

interface ContentMetadataProps {
  data: ContentData;
  contentType: ContentType;
}

export const ContentMetadata = ({ data, contentType }: ContentMetadataProps) => {
  const renderFitnessMetadata = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.intro && (
        <Card className="animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-orange-600" />
              <h3 className="text-sm font-semibold text-gray-900">What it's good for</h3>
            </div>
            <p className="text-sm text-gray-600">{data.intro}</p>
          </CardContent>
        </Card>
      )}
      
      {data.target && (
        <Card className="animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-orange-600" />
              <h3 className="text-sm font-semibold text-gray-900">Target</h3>
            </div>
            <p className="text-sm text-gray-600">{data.target}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderNutritionMetadata = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.metrics && (
        <Card className="animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Utensils className="h-4 w-4 text-green-600" />
              <h3 className="text-sm font-semibold text-gray-900">Nutrition Facts</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Calories:</span>
                <span className="font-medium">{data.metrics.kcal || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Protein:</span>
                <span className="font-medium">{data.metrics.protein || 0}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Carbs:</span>
                <span className="font-medium">{data.metrics.carbs || 0}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fat:</span>
                <span className="font-medium">{data.metrics.fat || 0}g</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {data.allergies && data.allergies.length > 0 && (
        <Card className="animate-fade-in">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Allergies</h3>
            <div className="flex flex-wrap gap-1">
              {data.allergies.map((allergy, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                  {allergy}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderMentalMetadata = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="animate-fade-in">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-purple-600" />
            <h3 className="text-sm font-semibold text-gray-900">Duration</h3>
          </div>
          <p className="text-sm text-gray-600">5-10 minutes recommended</p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-4">
      {contentType === 'fitness' && renderFitnessMetadata()}
      {contentType === 'nutrition' && renderNutritionMetadata()}
      {contentType === 'mental' && renderMentalMetadata()}
    </div>
  );
};
