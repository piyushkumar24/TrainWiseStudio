
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Utensils, Brain, Calendar, CheckCircle, XCircle, Clock, Target } from 'lucide-react';

interface ProgramStat {
  id: string;
  name: string;
  type: 'fitness' | 'nutrition' | 'mental';
  completion: number;
  totalDays: number;
  completedDays: number;
  missedDays: number;
  exercisesCompleted: number;
  lastActivity: string;
  streak?: number;
  avgSessionTime?: number;
}

interface ProgramStatsProps {
  userId?: string;
}

export const ProgramStats = ({ userId }: ProgramStatsProps) => {
  const [programs, setPrograms] = useState<ProgramStat[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'fitness' | 'nutrition' | 'mental'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProgramStats();
  }, [userId]);

  const fetchProgramStats = async () => {
    try {
      // Enhanced mock data with realistic program statistics
      const mockPrograms: ProgramStat[] = [
        {
          id: '1',
          name: 'Full Body Strength Training',
          type: 'fitness',
          completion: 78,
          totalDays: 30,
          completedDays: 23,
          missedDays: 2,
          exercisesCompleted: 67,
          lastActivity: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          streak: 5,
          avgSessionTime: 52
        },
        {
          id: '2',
          name: 'HIIT Cardio Challenge',
          type: 'fitness',
          completion: 45,
          totalDays: 21,
          completedDays: 9,
          missedDays: 4,
          exercisesCompleted: 27,
          lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          streak: 2,
          avgSessionTime: 28
        },
        {
          id: '3',
          name: 'Healthy Meal Planning',
          type: 'nutrition',
          completion: 85,
          totalDays: 28,
          completedDays: 24,
          missedDays: 1,
          exercisesCompleted: 42,
          lastActivity: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          streak: 8,
          avgSessionTime: 35
        },
        {
          id: '4',
          name: 'Macro Tracking Mastery',
          type: 'nutrition',
          completion: 62,
          totalDays: 21,
          completedDays: 13,
          missedDays: 3,
          exercisesCompleted: 26,
          lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          streak: 3,
          avgSessionTime: 15
        },
        {
          id: '5',
          name: 'Daily Mindfulness Practice',
          type: 'mental',
          completion: 92,
          totalDays: 14,
          completedDays: 13,
          missedDays: 0,
          exercisesCompleted: 28,
          lastActivity: new Date().toISOString(),
          streak: 13,
          avgSessionTime: 12
        },
        {
          id: '6',
          name: 'Stress Management Toolkit',
          type: 'mental',
          completion: 38,
          totalDays: 21,
          completedDays: 8,
          missedDays: 5,
          exercisesCompleted: 15,
          lastActivity: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          streak: 1,
          avgSessionTime: 18
        }
      ];
      
      setPrograms(mockPrograms);
    } catch (error) {
      console.error('Error fetching program stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeIcon = (type: ProgramStat['type']) => {
    switch (type) {
      case 'fitness': return Dumbbell;
      case 'nutrition': return Utensils;
      case 'mental': return Brain;
    }
  };

  const getTypeColor = (type: ProgramStat['type']) => {
    switch (type) {
      case 'fitness': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'nutrition': return 'text-green-600 bg-green-50 border-green-200';
      case 'mental': return 'text-purple-600 bg-purple-50 border-purple-200';
    }
  };

  const getCompletionColor = (completion: number) => {
    if (completion >= 80) return 'text-green-600';
    if (completion >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const filteredPrograms = activeTab === 'all' 
    ? programs 
    : programs.filter(p => p.type === activeTab);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">📅 Program Activity</h2>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="space-y-4">
                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="flex gap-4">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-900">📅 Program Activity</h2>

      <Tabs value={activeTab} onValueChange={(value: typeof activeTab) => setActiveTab(value)}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="fitness" className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            <span className="hidden sm:inline">Fitness</span>
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            <span className="hidden sm:inline">Nutrition</span>
          </TabsTrigger>
          <TabsTrigger value="mental" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Mental</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredPrograms.length === 0 ? (
            <Card className="p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No programs found</h3>
              <p className="text-gray-600">
                {activeTab === 'all' 
                  ? 'You haven\'t started any programs yet.' 
                  : `No ${activeTab} programs found.`
                }
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredPrograms.map((program) => {
                const Icon = getTypeIcon(program.type);
                return (
                  <Card key={program.id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={`border ${getTypeColor(program.type)}`}>
                              <Icon className="h-3 w-3 mr-1" />
                              {program.type.charAt(0).toUpperCase() + program.type.slice(1)}
                            </Badge>
                            {program.streak && program.streak > 0 && (
                              <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
                                🔥 {program.streak} day streak
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1">{program.name}</h3>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getCompletionColor(program.completion)}`}>
                            {program.completion}%
                          </div>
                          <div className="text-xs text-gray-500">Complete</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <Progress value={program.completion} className="h-2" />
                        <div className="text-xs text-gray-600">
                          {program.completedDays} of {program.totalDays} days completed
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <div>
                            <div className="font-medium text-gray-900">{program.completedDays}</div>
                            <div className="text-xs text-gray-500">Completed</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          <div>
                            <div className="font-medium text-gray-900">{program.missedDays}</div>
                            <div className="text-xs text-gray-500">Missed</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-blue-500" />
                          <div>
                            <div className="font-medium text-gray-900">{program.exercisesCompleted}</div>
                            <div className="text-xs text-gray-500">Activities</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-purple-500" />
                          <div>
                            <div className="font-medium text-gray-900">{program.avgSessionTime}m</div>
                            <div className="text-xs text-gray-500">Avg. Time</div>
                          </div>
                        </div>
                      </div>

                      {/* Last Activity */}
                      <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t">
                        <Calendar className="h-3 w-3" />
                        <span>
                          Last activity: {new Date(program.lastActivity).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
