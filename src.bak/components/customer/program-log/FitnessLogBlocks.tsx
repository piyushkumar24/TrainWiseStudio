
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dumbbell, ChevronDown, Plus, Check, Timer } from 'lucide-react';

interface FitnessLogBlocksProps {
  blocks: Array<{
    id: string;
    type: string;
    title: string;
    muscleGroup: string;
    description: string;
    image: string;
    previousSets: Array<{ weight: number; reps: number }>;
    targetSets: number;
    targetReps: string;
    completed: boolean;
  }>;
}

export const FitnessLogBlocks = ({ blocks }: FitnessLogBlocksProps) => {
  const [exerciseData, setExerciseData] = useState<Record<string, any>>({});
  const [openExercises, setOpenExercises] = useState<Record<string, boolean>>({});
  const [restTimerEnabled, setRestTimerEnabled] = useState<Record<string, boolean>>({});

  const handleSetUpdate = (exerciseId: string, setIndex: number, field: string, value: any) => {
    setExerciseData(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        sets: {
          ...prev[exerciseId]?.sets,
          [setIndex]: {
            ...prev[exerciseId]?.sets?.[setIndex],
            [field]: value
          }
        }
      }
    }));
  };

  const addSet = (exerciseId: string) => {
    const currentSets = exerciseData[exerciseId]?.sets || {};
    const nextSetIndex = Object.keys(currentSets).length;
    
    setExerciseData(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        sets: {
          ...currentSets,
          [nextSetIndex]: { weight: '', reps: '', completed: false }
        }
      }
    }));
  };

  const toggleExercise = (exerciseId: string) => {
    setOpenExercises(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  const updateNotes = (exerciseId: string, notes: string) => {
    setExerciseData(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        notes
      }
    }));
  };

  return (
    <div className="space-y-4">
      {blocks.map((exercise) => {
        const isOpen = openExercises[exercise.id] ?? true;
        const currentSets = exerciseData[exercise.id]?.sets || {};
        const notes = exerciseData[exercise.id]?.notes || '';
        const restTimer = restTimerEnabled[exercise.id] || false;

        return (
          <Card key={exercise.id} className="overflow-hidden">
            <Collapsible open={isOpen} onOpenChange={() => toggleExercise(exercise.id)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Dumbbell className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{exercise.title}</CardTitle>
                        <p className="text-sm text-gray-600">{exercise.muscleGroup}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {exercise.targetSets} sets × {exercise.targetReps}
                      </Badge>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 text-sm">{exercise.description}</p>

                  {/* Notes Field */}
                  <div>
                    <Textarea
                      placeholder="Add notes..."
                      value={notes}
                      onChange={(e) => updateNotes(exercise.id, e.target.value)}
                      className="min-h-[60px]"
                    />
                  </div>

                  {/* Rest Timer Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4" />
                      <span className="text-sm font-medium">Rest Timer</span>
                    </div>
                    <Switch
                      checked={restTimer}
                      onCheckedChange={(checked) => 
                        setRestTimerEnabled(prev => ({ ...prev, [exercise.id]: checked }))
                      }
                    />
                  </div>

                  {/* Set Table */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 grid grid-cols-5 gap-2 text-sm font-medium text-gray-700">
                      <span>Set</span>
                      <span>Previous</span>
                      <span>Weight (kg)</span>
                      <span>Reps</span>
                      <span>✓</span>
                    </div>
                    
                    {/* Previous sets display */}
                    {exercise.previousSets.slice(0, exercise.targetSets).map((prevSet, index) => {
                      const currentSet = currentSets[index] || {};
                      
                      return (
                        <div key={index} className="px-4 py-3 grid grid-cols-5 gap-2 items-center border-t">
                          <span className="text-sm font-medium">{index + 1}</span>
                          <span className="text-sm text-gray-600">
                            {prevSet.weight} × {prevSet.reps}
                          </span>
                          <Input
                            type="number"
                            placeholder={prevSet.weight.toString()}
                            value={currentSet.weight || ''}
                            onChange={(e) => handleSetUpdate(exercise.id, index, 'weight', e.target.value)}
                            className="h-8"
                          />
                          <Input
                            placeholder={exercise.targetReps}
                            value={currentSet.reps || ''}
                            onChange={(e) => handleSetUpdate(exercise.id, index, 'reps', e.target.value)}
                            className="h-8"
                          />
                          <Button
                            variant={currentSet.completed ? "default" : "outline"}
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleSetUpdate(exercise.id, index, 'completed', !currentSet.completed)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })}

                    {/* Additional sets */}
                    {Object.entries(currentSets).slice(exercise.targetSets).map(([setIndex, setData]: [string, any]) => (
                      <div key={setIndex} className="px-4 py-3 grid grid-cols-5 gap-2 items-center border-t bg-blue-50">
                        <span className="text-sm font-medium">{parseInt(setIndex) + 1}</span>
                        <span className="text-sm text-gray-400">-</span>
                        <Input
                          type="number"
                          placeholder="Weight"
                          value={setData.weight || ''}
                          onChange={(e) => handleSetUpdate(exercise.id, parseInt(setIndex), 'weight', e.target.value)}
                          className="h-8"
                        />
                        <Input
                          placeholder="Reps"
                          value={setData.reps || ''}
                          onChange={(e) => handleSetUpdate(exercise.id, parseInt(setIndex), 'reps', e.target.value)}
                          className="h-8"
                        />
                        <Button
                          variant={setData.completed ? "default" : "outline"}
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleSetUpdate(exercise.id, parseInt(setIndex), 'completed', !setData.completed)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    {/* Add Set Button */}
                    <div className="px-4 py-2 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addSet(exercise.id)}
                        className="w-full text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Set
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        );
      })}
    </div>
  );
};
