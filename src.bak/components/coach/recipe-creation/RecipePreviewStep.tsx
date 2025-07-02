import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Check } from 'lucide-react';
import { RecipeData } from '@/types/recipe';

interface RecipePreviewStepProps {
  data: RecipeData;
  onNext: () => void;
  onPrevious: () => void;
  onBack: () => void;
  onSaveDraft: () => void;
}

export const RecipePreviewStep = ({ data, onNext, onPrevious, onBack, onSaveDraft }: RecipePreviewStepProps) => {
  const renderContentBlock = (block: any, index: number) => {
    switch (block.type) {
      case 'text':
        return (
          <div key={block.id} className="mb-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{block.content}</p>
          </div>
        );

      case 'ingredients':
        return (
          <div key={block.id} className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              🥘 Ingredients
            </h3>
            <ul className="space-y-2">
              {block.items?.map((item: string, itemIndex: number) => (
                <li key={itemIndex} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'steps':
        return (
          <div key={block.id} className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              📋 Instructions
            </h3>
            <ol className="space-y-3">
              {block.items?.map((item: string, itemIndex: number) => (
                <li key={itemIndex} className="flex items-start gap-3">
                  <span className="bg-orange-500 text-white text-sm rounded-full w-7 h-7 flex items-center justify-center font-medium flex-shrink-0 mt-0.5">
                    {itemIndex + 1}
                  </span>
                  <span className="text-gray-700 pt-1">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        );

      case 'image':
        return block.imageUrl ? (
          <div key={block.id} className="mb-6">
            <img 
              src={block.imageUrl} 
              alt="Recipe" 
              className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-sm" 
            />
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            👁️ Preview Recipe
          </h2>
          <p className="text-gray-600">
            Review your recipe before publishing
          </p>
        </div>

        {/* Recipe Preview */}
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center pb-6 border-b border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{data.name}</h1>
            
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {data.category}
              </Badge>
              <Badge variant="outline">
                Serves {data.portionYield}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {data.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Nutrition Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3 text-center">Nutrition per Portion</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-orange-600">{data.nutrition.calories}</p>
                <p className="text-sm text-gray-600">Calories</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{data.nutrition.protein}g</p>
                <p className="text-sm text-gray-600">Protein</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{data.nutrition.carbs}g</p>
                <p className="text-sm text-gray-600">Carbs</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{data.nutrition.fat}g</p>
                <p className="text-sm text-gray-600">Fat</p>
              </div>
            </div>
          </div>

          {/* Content Blocks */}
          <div className="space-y-6">
            {data.contentBlocks
              .sort((a, b) => a.order - b.order)
              .map((block, index) => renderContentBlock(block, index))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="space-y-4 md:space-y-0 md:flex md:justify-between md:items-center pt-6">
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
            Publish Recipe
          </Button>
        </div>
      </div>
    </div>
  );
};
