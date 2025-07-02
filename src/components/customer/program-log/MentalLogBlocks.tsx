
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Brain, Timer, Check, Play } from 'lucide-react';

interface MentalLogBlocksProps {
  blocks: Array<{
    id: string;
    type: string;
    title: string;
    category: string;
    description: string;
    targetDuration: number;
    completedDuration: number;
    completed: boolean;
  }>;
}

export const MentalLogBlocks = ({ blocks }: MentalLogBlocksProps) => {
  const [activityData, setActivityData] = useState<Record<string, any>>({});

  const updateActivityData = (activityId: string, field: string, value: any) => {
    setActivityData(prev => ({
      ...prev,
      [activityId]: {
        ...prev[activityId],
        [field]: value
      }
    }));
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'meditation': return 'bg-purple-100 text-purple-700';
      case 'breathing': return 'bg-blue-100 text-blue-700';
      case 'journaling': return 'bg-green-100 text-green-700';
      case 'mindfulness': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="space-y-4">
      {blocks.map((activity) => {
        const currentData = activityData[activity.id] || {};
        const duration = currentData.duration ?? activity.targetDuration;
        const completed = currentData.completed ?? false;
        const notes = currentData.notes || '';

        return (
          <Card key={activity.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Brain className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{activity.title}</CardTitle>
                      <Badge className={getCategoryColor(activity.category)}>
                        {activity.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                </div>
                {completed && (
                  <Check className="h-5 w-5 text-green-600 mt-1" />
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Duration Tracker */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4" />
                    <span className="text-sm font-medium">Duration</span>
                  </div>
                  <Badge variant="outline">
                    {formatDuration(duration)} / {formatDuration(activity.targetDuration)}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Slider
                    value={[duration]}
                    onValueChange={(value) => updateActivityData(activity.id, 'duration', value[0])}
                    max={activity.targetDuration * 2}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 min</span>
                    <span>Target: {formatDuration(activity.targetDuration)}</span>
                    <span>{formatDuration(activity.targetDuration * 2)}+</span>
                  </div>
                </div>
              </div>

              {/* Reflection Notes */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Optional Reflection / Notes
                </label>
                <Textarea
                  placeholder="How did it feel? Any insights or thoughts..."
                  value={notes}
                  onChange={(e) => updateActivityData(activity.id, 'notes', e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              {/* Completion Toggle */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Mark as Completed</span>
                </div>
                <Switch
                  checked={completed}
                  onCheckedChange={(checked) => updateActivityData(activity.id, 'completed', checked)}
                />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateActivityData(activity.id, 'duration', Math.floor(activity.targetDuration / 2))}
                  className="text-xs"
                >
                  Half Time
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateActivityData(activity.id, 'duration', activity.targetDuration)}
                  className="text-xs"
                >
                  Target
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    updateActivityData(activity.id, 'duration', activity.targetDuration);
                    updateActivityData(activity.id, 'completed', true);
                  }}
                  className="text-xs bg-green-50 text-green-700 hover:bg-green-100"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Done
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
