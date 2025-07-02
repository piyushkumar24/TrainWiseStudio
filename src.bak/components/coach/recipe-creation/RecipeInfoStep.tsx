
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, ChevronLeft, X, Plus } from 'lucide-react';
import { RecipeData } from '@/types/recipe';

interface RecipeInfoStepProps {
  data: RecipeData;
  onUpdate: (updates: Partial<RecipeData>) => void;
  onNext: () => void;
  onBack: () => void;
  onSaveDraft: () => void;
  onPrevious?: () => void;
}

const categories = [
  'Breakfast',
  'Lunch', 
  'Dinner',
  'Snack',
  'Dessert',
  'Beverage',
  'Appetizer',
  'Side Dish'
];

export const RecipeInfoStep = ({ data, onUpdate, onNext, onBack, onSaveDraft, onPrevious }: RecipeInfoStepProps) => {
  const [newTag, setNewTag] = React.useState('');

  const addTag = () => {
    if (newTag.trim() && !data.tags.includes(newTag.trim())) {
      onUpdate({ tags: [...data.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onUpdate({ tags: data.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-6 pb-28 md:pb-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            🍽️ Recipe Information
          </h2>
          <p className="text-gray-600">
            Let's start with the basics of your nutrition recipe
          </p>
        </div>

        {/* Recipe Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Recipe Name *</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="e.g., Protein-Packed Quinoa Bowl"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category *</Label>
          <Select value={data.category} onValueChange={(value) => onUpdate({ category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Portion Yield */}
        <div className="space-y-2">
          <Label htmlFor="portions">Number of Portions *</Label>
          <Input
            id="portions"
            type="number"
            min="1"
            value={data.portionYield}
            onChange={(e) => onUpdate({ portionYield: parseInt(e.target.value) || 1 })}
          />
        </div>

        {/* Nutritional Information */}
        <div className="space-y-4">
          <Label>Nutritional Information (per portion)</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="calories" className="text-sm">Calories</Label>
              <Input
                id="calories"
                type="number"
                placeholder="0"
                value={data.nutrition?.calories || ''}
                onChange={(e) => onUpdate({ 
                  nutrition: { ...data.nutrition, calories: parseInt(e.target.value) || 0 }
                })}
              />
            </div>
            <div>
              <Label htmlFor="protein" className="text-sm">Protein (g)</Label>
              <Input
                id="protein"
                type="number"
                placeholder="0"
                value={data.nutrition?.protein || ''}
                onChange={(e) => onUpdate({ 
                  nutrition: { ...data.nutrition, protein: parseInt(e.target.value) || 0 }
                })}
              />
            </div>
            <div>
              <Label htmlFor="carbs" className="text-sm">Carbs (g)</Label>
              <Input
                id="carbs"
                type="number"
                placeholder="0"
                value={data.nutrition?.carbs || ''}
                onChange={(e) => onUpdate({ 
                  nutrition: { ...data.nutrition, carbs: parseInt(e.target.value) || 0 }
                })}
              />
            </div>
            <div>
              <Label htmlFor="fat" className="text-sm">Fat (g)</Label>
              <Input
                id="fat"
                type="number"
                placeholder="0"
                value={data.nutrition?.fat || ''}
                onChange={(e) => onUpdate({ 
                  nutrition: { ...data.nutrition, fat: parseInt(e.target.value) || 0 }
                })}
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-3">
          <Label>Tags</Label>
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a tag..."
              className="flex-1"
            />
            <Button 
              type="button"
              onClick={addTag}
              size="sm"
              variant="outline"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <Badge key={tag} className="bg-orange-100 text-orange-700 border-orange-200">
                  {tag}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Updated Navigation - Mobile-responsive layout */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:relative md:border-t-0 md:bg-transparent md:p-0 z-50">
        <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center md:pt-6">
          {/* Mobile: First row - Back and Save Draft */}
          <div className="flex gap-2 order-2 md:order-1">
            <Button 
              onClick={onBack}
              variant="outline"
              className="flex-1 md:flex-none md:px-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Back to Hub</span>
              <span className="sm:hidden">Back</span>
            </Button>
            
            <Button 
              onClick={onSaveDraft}
              variant="outline"
              className="flex-1 md:flex-none md:px-6 text-orange-600 border-orange-200 hover:bg-orange-50"
            >
              <Save className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Save Draft</span>
              <span className="sm:hidden">Save</span>
            </Button>
          </div>

          {/* Mobile: Second row - Previous and Next */}
          <div className="flex gap-2 order-1 md:order-2">
            <Button 
              onClick={onPrevious}
              variant="outline"
              disabled={true}
              className="w-24 md:flex-none md:px-6 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            <Button 
              onClick={onNext}
              className="bg-orange-500 hover:bg-orange-600 text-white flex-1 md:w-auto md:px-8"
            >
              <span className="hidden sm:inline">Next: Content →</span>
              <span className="sm:hidden">Next →</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
