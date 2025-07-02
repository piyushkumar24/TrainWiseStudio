
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Dumbbell, Apple, Brain, AlertTriangle, Calendar, CheckCircle } from 'lucide-react';
import { ClientDetail } from '@/hooks/useClientDetail';

interface ProgramsSummaryProps {
  client: ClientDetail;
}

export const ProgramsSummary = ({ client }: ProgramsSummaryProps) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);

  const programTypes = [
    { id: 'fitness', label: 'Fitness', icon: Dumbbell, emoji: '🏋️' },
    { id: 'nutrition', label: 'Nutrition', icon: Apple, emoji: '🥗' },
    { id: 'mental', label: 'Mental', icon: Brain, emoji: '🧘' }
  ];

  const hasActiveSubscription = ['standard', 'premium'].includes(client.program_type.toLowerCase());
  const assignments = client.programAssignments || [];

  const getAssignmentsByType = (type: string) => {
    return assignments.filter(assignment => {
      // For now, we'll treat all assignments as fitness type
      // In the future, you could join with programs table to get actual type
      return type === 'fitness';
    });
  };

  const calculateProgress = (assignmentList: any[]) => {
    if (assignmentList.length === 0) return 0;
    
    const mostRecent = assignmentList[0];
    if (!mostRecent.expires_at) return client.progress_percentage || 50;

    const now = new Date();
    const startDate = new Date(mostRecent.assigned_at);
    const endDate = new Date(mostRecent.expires_at);
    
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsed = Math.max(0, now.getTime() - startDate.getTime());
    
    const percentage = Math.min((elapsed / totalDuration) * 100, 100);
    return Math.round(percentage);
  };

  const isExpired = (assignment: any) => {
    if (!assignment.expires_at) return false;
    return new Date(assignment.expires_at) < new Date();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="bg-white rounded-xl shadow-md">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <Dumbbell className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-900">📦 Program(s) Summary</h3>
          </div>
          <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        
        <CollapsibleContent className="overflow-hidden transition-all duration-200">
          <div className="px-6 pb-6">
            {assignments.length === 0 ? (
              <div className="text-center py-8">
                <Dumbbell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No Programs Assigned</h4>
                <p className="text-gray-600">This client doesn't have any programs assigned yet.</p>
              </div>
            ) : (
              <Tabs defaultValue="fitness" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  {programTypes.map((type) => (
                    <TabsTrigger key={type.id} value={type.id} className="flex items-center gap-2">
                      <span>{type.emoji}</span>
                      <span className="hidden sm:inline">{type.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {programTypes.map((type) => {
                  const typeAssignments = getAssignmentsByType(type.id);
                  const progress = calculateProgress(typeAssignments);
                  
                  return (
                    <TabsContent key={type.id} value={type.id} className="space-y-4">
                      {typeAssignments.length === 0 ? (
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <type.icon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">No {type.label.toLowerCase()} programs assigned</p>
                        </div>
                      ) : (
                        typeAssignments.map((assignment) => (
                          <div key={assignment.id} className="bg-gray-50 p-4 rounded-lg">
                            {/* Program Header */}
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-gray-900">{type.label} Program</h4>
                              <div className="flex gap-2">
                                {assignment.status === 'active' && !isExpired(assignment) && (
                                  <Badge className="bg-green-100 text-green-800 text-xs">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Active
                                  </Badge>
                                )}
                                {isExpired(assignment) && (
                                  <Badge className="bg-red-100 text-red-800 text-xs">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    Expired
                                  </Badge>
                                )}
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Progress</span>
                                <span className="font-medium">{progress}%</span>
                              </div>
                              <Progress value={progress} className="h-2" />
                            </div>

                            {/* Assignment Details */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Assigned:</span>
                                <span className="ml-2 font-medium">{formatDate(assignment.assigned_at)}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Status:</span>
                                <span className="ml-2 font-medium capitalize">{assignment.status}</span>
                              </div>
                              {assignment.expires_at && (
                                <>
                                  <div>
                                    <span className="text-gray-600">Expires:</span>
                                    <span className="ml-2 font-medium">{formatDate(assignment.expires_at)}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Days left:</span>
                                    <span className="ml-2 font-medium">
                                      {Math.max(0, Math.ceil((new Date(assignment.expires_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))}
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>

                            {/* Warnings */}
                            {isExpired(assignment) && hasActiveSubscription && (
                              <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                <div className="flex items-center gap-2 text-sm">
                                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                                  <span className="text-orange-800">
                                    Program has expired. Consider assigning a new program.
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </TabsContent>
                  );
                })}
              </Tabs>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
