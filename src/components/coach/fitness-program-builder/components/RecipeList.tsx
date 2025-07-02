
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RecipeListProps {
  recipes: any[];
  onRecipeSelect: (recipe: any) => void;
}

export const RecipeList = ({ recipes, onRecipeSelect }: RecipeListProps) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No recipes found matching your criteria
      </div>
    );
  }

  return (
    <div className="grid gap-3 max-h-96 overflow-y-auto">
      {recipes.map((recipe) => (
        <Card 
          key={recipe.id}
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onRecipeSelect(recipe)}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🥗</div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{recipe.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs capitalize">
                    {recipe.subcategory}
                  </Badge>
                  {recipe.tags && recipe.tags.length > 0 && (
                    <div className="flex gap-1">
                      {recipe.tags.slice(0, 2).map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
