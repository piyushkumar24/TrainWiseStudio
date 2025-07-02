
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brain, CheckCircle, Timer, Check } from 'lucide-react';

interface MentalBlocksProps {
  blocks: any[];
  isExpired: boolean;
}

export const MentalBlocks = ({ blocks, isExpired }: MentalBlocksProps) => {
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
        if (block.type === 'meditation' || block.type === 'breathing') {
          return (
            <Card key={block.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Brain className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{block.title}</CardTitle>
                      <p className="text-sm text-gray-600">{block.exerciseType}</p>
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
                  <Badge variant="outline">
                    <Timer className="h-3 w-3 mr-1" />
                    {block.duration} min
                  </Badge>
                  {exerciseData[block.id]?.duration && (
                    <Badge className="bg-green-100 text-green-700">
                      Completed: {exerciseData[block.id].duration} min
                    </Badge>
                  )}
                </div>

                {!isExpired && (
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleLogExercise(block.id, { completed: true, duration: block.duration })}
                      className="flex-1 bg-green-500 hover:bg-green-600"
                      variant={exerciseData[block.id]?.completed ? "outline" : "default"}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Mark Complete
                    </Button>
                    
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Timer className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="bottom" className="h-[50vh]">
                        <SheetHeader>
                          <SheetTitle>Log Time</SheetTitle>
                        </SheetHeader>
                        <MentalLogForm
                          exercise={block}
                          onSave={(data) => handleLogExercise(block.id, data)}
                          initialData={exerciseData[block.id]}
                        />
                      </SheetContent>
                    </Sheet>
                  </div>
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

const MentalLogForm = ({ exercise, onSave, initialData }: any) => {
  const [duration, setDuration] = useState(initialData?.duration || exercise.duration);
  const [notes, setNotes] = useState(initialData?.notes || '');

  const handleSave = () => {
    onSave({
      duration,
      notes,
      completed: true,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="space-y-6 mt-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="duration">Duration (minutes)</Label>
          <div className="flex items-center gap-4 mt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setDuration(Math.max(1, duration - 1))}
            >
              -
            </Button>
            <Input
              id="duration"
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
              className="text-center w-20"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setDuration(duration + 1)}
            >
              +
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="notes">How did it feel? (optional)</Label>
          <Input
            id="notes"
            placeholder="Calm, focused, restless..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      <div className="sticky bottom-0 bg-white pt-4 border-t">
        <Button onClick={handleSave} className="w-full bg-orange-500 hover:bg-orange-600">
          Log Session
        </Button>
      </div>
    </div>
  );
};
