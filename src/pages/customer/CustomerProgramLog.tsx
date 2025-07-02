
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar, Clock, Target, CheckCircle } from 'lucide-react';
import { ProgramLogHeader } from '@/components/customer/program-log/ProgramLogHeader';
import { FitnessLogBlocks } from '@/components/customer/program-log/FitnessLogBlocks';
import { NutritionLogBlocks } from '@/components/customer/program-log/NutritionLogBlocks';
import { MentalLogBlocks } from '@/components/customer/program-log/MentalLogBlocks';
import { FinishDayButton } from '@/components/customer/program-log/FinishDayButton';

// Define specific types for each program type
type FitnessBlock = {
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
};

type NutritionBlock = {
  id: string;
  type: string;
  title: string;
  mealType: string;
  description: string;
  image: string;
  targetPortions: number;
  loggedPortions: number;
  completed: boolean;
};

type MentalBlock = {
  id: string;
  type: string;
  title: string;
  category: string;
  description: string;
  targetDuration: number;
  completedDuration: number;
  completed: boolean;
};

const CustomerProgramLog = () => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  const [program, setProgram] = useState<any>(null);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [dayCompleted, setDayCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProgramData();
  }, [programId]);

  const fetchProgramData = async () => {
    try {
      // Mock data for now - replace with actual Supabase query
      const mockProgram = {
        id: programId,
        title: 'Full Body Strength Training',
        type: 'fitness' as const,
        currentWeek: 2,
        currentDay: 3,
        totalWeeks: 8,
        totalDays: 56,
        startDate: '2024-01-15',
        status: 'active' as const
      };
      
      setProgram(mockProgram);
      setSelectedWeek(mockProgram.currentWeek);
      setSelectedDay(mockProgram.currentDay);
    } catch (error) {
      console.error('Error fetching program:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(`/dashboard/programs/${programId}`);
  };

  const handleDayChange = (week: number, day: number) => {
    setSelectedWeek(week);
    setSelectedDay(day);
    setDayCompleted(false);
  };

  const handleFinishDay = () => {
    setDayCompleted(true);
    // Here you would save the completion status to Supabase
    console.log('Day completed:', { week: selectedWeek, day: selectedDay });
  };

  const generateFitnessBlocks = (dayIndex: number): FitnessBlock[] => {
    return [
      {
        id: '1',
        type: 'exercise',
        title: 'Bench Press',
        muscleGroup: 'Chest',
        description: 'Standard bench press with proper form',
        image: '/placeholder.svg',
        previousSets: [
          { weight: 80, reps: 10 },
          { weight: 80, reps: 8 },
          { weight: 75, reps: 12 }
        ],
        targetSets: 3,
        targetReps: '8-12',
        completed: false
      },
      {
        id: '2',
        type: 'exercise',
        title: 'Shoulder Press',
        muscleGroup: 'Shoulders',
        description: 'Seated dumbbell shoulder press',
        image: '/placeholder.svg',
        previousSets: [
          { weight: 25, reps: 12 },
          { weight: 25, reps: 10 },
          { weight: 22.5, reps: 12 }
        ],
        targetSets: 3,
        targetReps: '10-15',
        completed: false
      }
    ];
  };

  const generateNutritionBlocks = (dayIndex: number): NutritionBlock[] => {
    return [
      {
        id: '1',
        type: 'recipe',
        title: 'Mediterranean Breakfast Bowl',
        mealType: 'Breakfast',
        description: 'Healthy morning meal with proteins and fats',
        image: '/placeholder.svg',
        targetPortions: 1,
        loggedPortions: 0,
        completed: false
      },
      {
        id: '2',
        type: 'recipe',
        title: 'Grilled Chicken Salad',
        mealType: 'Lunch',
        description: 'High protein lunch option',
        image: '/placeholder.svg',
        targetPortions: 1.5,
        loggedPortions: 0,
        completed: false
      }
    ];
  };

  const generateMentalBlocks = (dayIndex: number): MentalBlock[] => {
    return [
      {
        id: '1',
        type: 'meditation',
        title: 'Morning Mindfulness',
        category: 'Meditation',
        description: '10-minute guided meditation to start your day',
        targetDuration: 10,
        completedDuration: 0,
        completed: false
      },
      {
        id: '2',
        type: 'breathing',
        title: 'Box Breathing',
        category: 'Breathing',
        description: 'Calming breathing exercise for stress relief',
        targetDuration: 5,
        completedDuration: 0,
        completed: false
      }
    ];
  };

  const getCurrentDayData = () => {
    if (!program) return null;

    const baseData = {
      week: selectedWeek,
      day: selectedDay,
      dayName: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][selectedDay - 1],
      isCompleted: dayCompleted,
      type: program.type
    };

    return baseData;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Program Not Found</h2>
          <p className="text-gray-600 mb-6">The program you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/dashboard/programs')} className="bg-orange-500 hover:bg-orange-600">
            Back to Programs
          </Button>
        </Card>
      </div>
    );
  }

  const dayData = getCurrentDayData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <ProgramLogHeader
        program={program}
        selectedWeek={selectedWeek}
        selectedDay={selectedDay}
        onBack={handleBack}
        onDayChange={handleDayChange}
        dayCompleted={dayCompleted}
      />

      {/* Main Content */}
      <div className="px-4 pb-24">
        {dayData && (
          <>
            {/* Day Title */}
            <div className="flex items-center justify-between mb-6 mt-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {dayData.dayName} - Week {selectedWeek}, Day {selectedDay}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {program.type === 'fitness' && 'Complete your workout'}
                  {program.type === 'nutrition' && 'Log your meals'}
                  {program.type === 'mental' && 'Practice mindfulness'}
                </p>
              </div>
              {dayCompleted && (
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Completed
                </Badge>
              )}
            </div>

            {/* Content Blocks */}
            {program.type === 'fitness' && (
              <FitnessLogBlocks blocks={generateFitnessBlocks(selectedDay)} />
            )}
            {program.type === 'nutrition' && (
              <NutritionLogBlocks blocks={generateNutritionBlocks(selectedDay)} />
            )}
            {program.type === 'mental' && (
              <MentalLogBlocks blocks={generateMentalBlocks(selectedDay)} />
            )}
          </>
        )}
      </div>

      {/* Finish Day Button */}
      <FinishDayButton
        onFinish={handleFinishDay}
        completed={dayCompleted}
        disabled={!dayData}
      />
    </div>
  );
};

export default CustomerProgramLog;
