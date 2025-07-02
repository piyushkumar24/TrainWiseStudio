
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UtensilsCrossed, CheckCircle, Plus } from 'lucide-react';

interface NutritionBlocksProps {
  blocks: any[];
  isExpired: boolean;
}

export const NutritionBlocks = ({ blocks, isExpired }: NutritionBlocksProps) => {
  const [mealData, setMealData] = useState<Record<string, any>>({});

  const handleLogMeal = (mealId: string, data: any) => {
    setMealData(prev => ({
      ...prev,
      [mealId]: data
    }));
  };

  return (
    <div className="space-y-4">
      {blocks.map((block) => {
        if (block.type === 'recipe') {
          return (
            <Card key={block.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                      <UtensilsCrossed className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{block.title}</CardTitle>
                      <p className="text-sm text-gray-600">{block.mealType}</p>
                    </div>
                  </div>
                  {mealData[block.id]?.logged > 0 && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-700">{block.description}</p>
                
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="outline">
                    {block.portions.min}-{block.portions.max} portions
                  </Badge>
                  {mealData[block.id]?.logged > 0 && (
                    <Badge className="bg-green-100 text-green-700">
                      Logged: {mealData[block.id].logged} portions
                    </Badge>
                  )}
                </div>

                {!isExpired && (
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button 
                        className="w-full bg-orange-500 hover:bg-orange-600"
                        variant={mealData[block.id]?.logged > 0 ? "outline" : "default"}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        {mealData[block.id]?.logged > 0 ? "Update Portions" : "Log Meal"}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[60vh]">
                      <SheetHeader>
                        <SheetTitle>{block.title}</SheetTitle>
                      </SheetHeader>
                      <MealLogForm
                        meal={block}
                        onSave={(data) => handleLogMeal(block.id, data)}
                        initialData={mealData[block.id]}
                      />
                    </SheetContent>
                  </Sheet>
                )}
              </CardContent>
            </Card>
          );
        }

        return null;
      })}
    </div>
  );
};

const MealLogForm = ({ meal, onSave, initialData }: any) => {
  const [portions, setPortions] = useState(initialData?.logged || 0);
  const [notes, setNotes] = useState(initialData?.notes || '');

  const handleSave = () => {
    onSave({
      logged: portions,
      notes,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="space-y-6 mt-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="portions">Portions Eaten</Label>
          <div className="flex items-center gap-4 mt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setPortions(Math.max(0, portions - 0.5))}
            >
              -
            </Button>
            <Input
              id="portions"
              type="number"
              step="0.5"
              min="0"
              max={meal.portions.max}
              value={portions}
              onChange={(e) => setPortions(parseFloat(e.target.value) || 0)}
              className="text-center w-20"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setPortions(Math.min(meal.portions.max, portions + 0.5))}
            >
              +
            </Button>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Recommended: {meal.portions.min}-{meal.portions.max} portions
          </p>
        </div>

        <div>
          <Label htmlFor="notes">Notes (optional)</Label>
          <Input
            id="notes"
            placeholder="How did it taste? Any modifications?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      <div className="sticky bottom-0 bg-white pt-4 border-t">
        <Button onClick={handleSave} className="w-full bg-orange-500 hover:bg-orange-600">
          Log Meal
        </Button>
      </div>
    </div>
  );
};
