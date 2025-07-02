
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, TrendingUp, Calendar, Dumbbell, Apple, Brain } from 'lucide-react';
import { Client } from '@/types/client';

interface ProgressMetricsProps {
  client: Client;
}

export const ProgressMetrics = ({ client }: ProgressMetricsProps) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);

  const isPremium = client.program_type.toLowerCase() === 'premium';
  
  // Mock activity data for the week
  const weeklyActivity = [
    { day: 'Mon', fitness: true, nutrition: true, mental: false },
    { day: 'Tue', fitness: false, nutrition: true, mental: true },
    { day: 'Wed', fitness: true, nutrition: false, mental: false },
    { day: 'Thu', fitness: true, nutrition: true, mental: true },
    { day: 'Fri', fitness: false, nutrition: true, mental: false },
    { day: 'Sat', fitness: true, nutrition: false, mental: true },
    { day: 'Sun', fitness: false, nutrition: false, mental: false }
  ];

  const mockLogs = {
    fitness: [
      { exercise: 'Push-ups', sets: 3, reps: 15, weight: 'Bodyweight' },
      { exercise: 'Squats', sets: 4, reps: 12, weight: '20kg' }
    ],
    nutrition: [
      { recipe: 'Protein Smoothie', completed: true },
      { recipe: 'Grilled Chicken Salad', completed: true }
    ],
    mental: [
      { activity: 'Meditation', time: '10 min' },
      { activity: 'Journaling', time: '5 min' }
    ]
  };

  return (
    <Card className="bg-white rounded-xl shadow-md">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-900">📈 Progress & Metrics</h3>
          </div>
          <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        
        <CollapsibleContent className="overflow-hidden transition-all duration-200">
          <div className="px-6 pb-6 space-y-6">
            {/* Weekly Activity Calendar */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Weekly Activity</h4>
              <div className="grid grid-cols-7 gap-2">
                {weeklyActivity.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-gray-600 mb-1">{day.day}</div>
                    <div className="space-y-1">
                      <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center ${day.fitness ? 'bg-blue-500' : 'bg-gray-200'}`}>
                        <Dumbbell className={`h-3 w-3 ${day.fitness ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                      <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center ${day.nutrition ? 'bg-green-500' : 'bg-gray-200'}`}>
                        <Apple className={`h-3 w-3 ${day.nutrition ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                      <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center ${day.mental ? 'bg-purple-500' : 'bg-gray-200'}`}>
                        <Brain className={`h-3 w-3 ${day.mental ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Logs */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Recent Logs</h4>
              
              {/* Fitness Logs */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                  <Dumbbell className="h-4 w-4" />
                  Fitness
                </h5>
                <div className="space-y-1 text-sm">
                  {mockLogs.fitness.map((log, index) => (
                    <div key={index} className="text-blue-800">
                      {log.exercise}: {log.sets} sets × {log.reps} reps ({log.weight})
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutrition Logs */}
              <div className="bg-green-50 p-3 rounded-lg">
                <h5 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                  <Apple className="h-4 w-4" />
                  Nutrition
                </h5>
                <div className="space-y-1 text-sm">
                  {mockLogs.nutrition.map((log, index) => (
                    <div key={index} className="text-green-800">
                      ✅ {log.recipe}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mental Logs */}
              <div className="bg-purple-50 p-3 rounded-lg">
                <h5 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Mental
                </h5>
                <div className="space-y-1 text-sm">
                  {mockLogs.mental.map((log, index) => (
                    <div key={index} className="text-purple-800">
                      {log.activity}: {log.time}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Premium Metrics */}
            {isPremium && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Premium Metrics</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">-2.3kg</div>
                    <div className="text-xs text-blue-700">Weight trend</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-900">-1.8%</div>
                    <div className="text-xs text-green-700">Body fat</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-900">+5%</div>
                    <div className="text-xs text-purple-700">Muscle mass</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
