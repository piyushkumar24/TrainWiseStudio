
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dumbbell, CheckCircle, Plus } from 'lucide-react';

interface FitnessBlocksProps {
  blocks: any[];
  isExpired: boolean;
}

export const FitnessBlocks = ({ blocks, isExpired }: FitnessBlocksProps) => {
  const [exerciseData, setExerciseData] = useState<Record<string, any>>({});

  const handleLogExercise = (exerciseId: string, data: any) => {
    setExerciseData(prev => ({
      ...prev,
      [exerciseId]: data
    }));
  };

  return (
    <div className="space-y-4">
      {blocks.map((block) => {
        if (block.type === 'exercise') {
          return (
            <Card key={block.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Dumbbell className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{block.title}</CardTitle>
                      <p className="text-sm text-gray-600">{block.muscleGroup}</p>
                    </div>
                  </div>
                  {exerciseData[block.id]?.completed && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-700">{block.description}</p>
                
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="outline">{block.sets} Sets</Badge>
                  <Badge variant="outline">{block.reps} Reps</Badge>
                  {block.weight && <Badge variant="outline">{block.weight} kg</Badge>}
                </div>

                {!isExpired && (
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button 
                        className="w-full bg-orange-500 hover:bg-orange-600"
                        variant={exerciseData[block.id]?.completed ? "outline" : "default"}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        {exerciseData[block.id]?.completed ? "Update Log" : "Log Exercise"}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[80vh]">
                      <SheetHeader>
                        <SheetTitle>{block.title}</SheetTitle>
                      </SheetHeader>
                      <ExerciseLogForm
                        exercise={block}
                        onSave={(data) => handleLogExercise(block.id, data)}
                        initialData={exerciseData[block.id]}
                      />
                    </SheetContent>
                  </Sheet>
                )}
              </CardContent>
            </Card>
          );
        }

        if (block.type === 'text') {
          return (
            <Card key={block.id} className="bg-blue-50 border-blue-200">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                    💡
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">{block.title}</h4>
                    <p className="text-blue-800 mt-1">{block.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        }

        return null;
      })}
    </div>
  );
};

const ExerciseLogForm = ({ exercise, onSave, initialData }: any) => {
  const [sets, setSets] = useState(initialData?.sets || []);

  const addSet = () => {
    setSets([...sets, { reps: exercise.reps, weight: exercise.weight || 0 }]);
  };

  const updateSet = (index: number, field: string, value: number) => {
    const newSets = [...sets];
    newSets[index] = { ...newSets[index], [field]: value };
    setSets(newSets);
  };

  const handleSave = () => {
    onSave({
      sets,
      completed: true,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="space-y-6 mt-6">
      <div className="space-y-4">
        <h3 className="font-semibold">Log Your Sets</h3>
        
        {sets.map((set: any, index: number) => (
          <div key={index} className="flex gap-4 items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium w-12">Set {index + 1}</span>
            <div className="flex-1">
              <Label htmlFor={`reps-${index}`} className="text-xs">Reps</Label>
              <Input
                id={`reps-${index}`}
                type="number"
                value={set.reps}
                onChange={(e) => updateSet(index, 'reps', parseInt(e.target.value))}
                className="h-8"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor={`weight-${index}`} className="text-xs">Weight (kg)</Label>
              <Input
                id={`weight-${index}`}
                type="number"
                value={set.weight}
                onChange={(e) => updateSet(index, 'weight', parseFloat(e.target.value))}
                className="h-8"
              />
            </div>
          </div>
        ))}
        
        <Button onClick={addSet} variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Set
        </Button>
      </div>

      <div className="sticky bottom-0 bg-white pt-4 border-t">
        <Button onClick={handleSave} className="w-full bg-orange-500 hover:bg-orange-600">
          Save Exercise Log
        </Button>
      </div>
    </div>
  );
};
