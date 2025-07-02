
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

interface ProgramData {
  id: string;
  title: string;
  type: string;
  status: string;
  expires_at: string;
  current_day: number;
  total_days: number;
}

interface TodaysProgramProps {
  program: ProgramData | null;
  subscriptionPlan: string;
}

export const TodaysProgram = ({ program, subscriptionPlan }: TodaysProgramProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('fitness');

  if (!program) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📋</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Active Program
            </h3>
            <p className="text-gray-600 mb-6">
              {subscriptionPlan === 'trial' || !subscriptionPlan ? 
                "Choose a plan to get started with your personalized program." :
                "Waiting for your coach to assign your program."
              }
            </p>
            {(subscriptionPlan === 'trial' || !subscriptionPlan) && (
              <Button
                onClick={() => navigate('/select-plan')}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Choose a Plan
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const mockBlocks = {
    fitness: [
      { name: 'Warm-up Routine', completed: true },
      { name: 'Strength Training', completed: false },
      { name: 'Cool-down Stretches', completed: false }
    ],
    nutrition: [
      { name: 'Breakfast Recipe', completed: true },
      { name: 'Lunch Prep', completed: false },
      { name: 'Evening Snack', completed: false }
    ],
    mental: [
      { name: 'Morning Meditation', completed: true },
      { name: 'Breathing Exercise', completed: false },
      { name: 'Evening Reflection', completed: false }
    ]
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Today's Program</span>
            <span className="text-sm font-medium text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
              Day {program.current_day} of {program.total_days}
            </span>
          </CardTitle>
          <p className="text-gray-600">{program.title}</p>
        </CardHeader>
        
        <CardContent>
          {subscriptionPlan === 'premium' ? (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="fitness">Fitness</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="mental">Mental</TabsTrigger>
              </TabsList>
              
              {(['fitness', 'nutrition', 'mental'] as const).map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="space-y-3 mb-6">
                    {mockBlocks[category].map((block, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          block.completed ? 'bg-green-500 text-white' : 'bg-gray-200'
                        }`}>
                          {block.completed ? '✓' : '⏳'}
                        </div>
                        <span className={`flex-1 ${block.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                          {block.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="space-y-3 mb-6">
              {mockBlocks.fitness.map((block, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    block.completed ? 'bg-green-500 text-white' : 'bg-gray-200'
                  }`}>
                    {block.completed ? '✓' : '⏳'}
                  </div>
                  <span className={`flex-1 ${block.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {block.name}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex gap-3">
            <Button
              onClick={() => navigate(`/dashboard/programs`)}
              className="bg-orange-500 hover:bg-orange-600 text-white flex-1"
            >
              Start Program
            </Button>
            <Button
              onClick={() => navigate('/dashboard/programs')}
              variant="outline"
              className="flex-1"
            >
              View Full Program
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
