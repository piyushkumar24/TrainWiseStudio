
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { UtensilsCrossed, Check } from 'lucide-react';

interface NutritionLogBlocksProps {
  blocks: Array<{
    id: string;
    type: string;
    title: string;
    mealType: string;
    description: string;
    image: string;
    targetPortions: number;
    loggedPortions: number;
    completed: boolean;
  }>;
}

export const NutritionLogBlocks = ({ blocks }: NutritionLogBlocksProps) => {
  const [mealData, setMealData] = useState<Record<string, any>>({});

  const updateMealData = (mealId: string, field: string, value: any) => {
    setMealData(prev => ({
      ...prev,
      [mealId]: {
        ...prev[mealId],
        [field]: value
      }
    }));
  };

  const getMealTypeColor = (mealType: string) => {
    switch (mealType.toLowerCase()) {
      case 'breakfast': return 'bg-yellow-100 text-yellow-700';
      case 'lunch': return 'bg-green-100 text-green-700';
      case 'dinner': return 'bg-blue-100 text-blue-700';
      case 'snack': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      {blocks.map((meal) => {
        const currentData = mealData[meal.id] || {};
        const portions = currentData.portions ?? meal.targetPortions;
        const completed = currentData.completed ?? false;
        const notes = currentData.notes || '';

        return (
          <Card key={meal.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <UtensilsCrossed className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{meal.title}</CardTitle>
                      <Badge className={getMealTypeColor(meal.mealType)}>
                        {meal.mealType}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{meal.description}</p>
                  </div>
                </div>
                {completed && (
                  <Check className="h-5 w-5 text-green-600 mt-1" />
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Portion Tracker */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Portions</span>
                  <Badge variant="outline">
                    {portions} / {meal.targetPortions}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Slider
                    value={[portions]}
                    onValueChange={(value) => updateMealData(meal.id, 'portions', value[0])}
                    max={meal.targetPortions * 2}
                    min={0}
                    step={0.25}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>Target: {meal.targetPortions}</span>
                    <span>{meal.targetPortions * 2}+</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <Textarea
                  placeholder="Add personal notes (optional)..."
                  value={notes}
                  onChange={(e) => updateMealData(meal.id, 'notes', e.target.value)}
                  className="min-h-[60px]"
                />
              </div>

              {/* Completion Toggle */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Mark as Eaten</span>
                </div>
                <Switch
                  checked={completed}
                  onCheckedChange={(checked) => updateMealData(meal.id, 'completed', checked)}
                />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateMealData(meal.id, 'portions', 0)}
                  className="text-xs"
                >
                  Skip
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateMealData(meal.id, 'portions', meal.targetPortions)}
                  className="text-xs"
                >
                  Target
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    updateMealData(meal.id, 'portions', meal.targetPortions);
                    updateMealData(meal.id, 'completed', true);
                  }}
                  className="text-xs bg-green-50 text-green-700 hover:bg-green-100"
                >
                  Complete
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
