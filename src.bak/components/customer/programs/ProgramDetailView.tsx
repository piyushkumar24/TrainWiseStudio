
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ProgramHeader } from './components/ProgramHeader';
import { ProgramNavigation } from './components/ProgramNavigation';
import { DayContent } from './components/DayContent';
import { DailyJournal } from './components/DailyJournal';
import { BottomNavigation } from './components/BottomNavigation';
import { CoachFeedbackModal } from './components/CoachFeedbackModal';
import { 
  Dumbbell, 
  UtensilsCrossed, 
  Brain, 
  Calendar,
  MessageSquare,
  ArrowLeft,
  Play,
  CheckCircle
} from 'lucide-react';

interface Program {
  id: string;
  title: string;
  type: 'fitness' | 'nutrition' | 'mental';
  progress: number;
  expiresIn: number;
  hasFeedback: boolean;
  description: string;
  weeks: number;
  currentWeek: number;
  status: 'active' | 'expired';
  startDate: string;
}

interface ProgramDetailProps {
  program: Program;
  onBack: () => void;
}

export const ProgramDetailView = ({ program, onBack }: ProgramDetailProps) => {
  const [selectedWeek, setSelectedWeek] = useState(program.currentWeek);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() || 1); // Default to Monday if Sunday
  const [showCoachFeedback, setShowCoachFeedback] = useState(false);
  const [programData, setProgramData] = useState<any>(null);

  // Mock program data - replace with actual Supabase queries
  useEffect(() => {
    fetchProgramData();
  }, [program.id]);

  const fetchProgramData = async () => {
    // Mock data structure based on program type
    const mockData = {
      weeks: Array.from({ length: program.weeks }, (_, weekIndex) => ({
        week: weekIndex + 1,
        days: Array.from({ length: 7 }, (_, dayIndex) => ({
          day: dayIndex + 1,
          dayName: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][dayIndex],
          isCompleted: weekIndex + 1 < program.currentWeek || 
                      (weekIndex + 1 === program.currentWeek && dayIndex < 3),
          isActive: weekIndex + 1 === program.currentWeek && dayIndex === selectedDay - 1,
          blocks: generateMockBlocks(program.type, dayIndex)
        }))
      }))
    };
    
    setProgramData(mockData);
  };

  const generateMockBlocks = (type: string, dayIndex: number) => {
    switch (type) {
      case 'fitness':
        return [
          {
            id: '1',
            type: 'exercise',
            title: 'Push-ups',
            muscleGroup: 'Chest',
            description: 'Standard push-up with proper form',
            sets: 3,
            reps: 12,
            weight: null,
            image: '/placeholder.svg',
            completed: false
          },
          {
            id: '2',
            type: 'exercise',
            title: 'Squats',
            muscleGroup: 'Legs',
            description: 'Bodyweight squats focusing on form',
            sets: 3,
            reps: 15,
            weight: null,
            image: '/placeholder.svg',
            completed: false
          },
          {
            id: '3',
            type: 'text',
            title: 'Pro Tip',
            content: 'Focus on controlled movements and proper breathing'
          }
        ];
      case 'nutrition':
        return [
          {
            id: '1',
            type: 'recipe',
            title: 'Mediterranean Breakfast Bowl',
            mealType: 'Breakfast',
            description: 'Healthy morning meal with proteins and fats',
            portions: { min: 1, max: 1.5, logged: 0 },
            image: '/placeholder.svg'
          },
          {
            id: '2',
            type: 'recipe',
            title: 'Grilled Chicken Salad',
            mealType: 'Lunch',
            description: 'High protein lunch option',
            portions: { min: 1, max: 2, logged: 0 },
            image: '/placeholder.svg'
          }
        ];
      case 'mental':
        return [
          {
            id: '1',
            type: 'meditation',
            title: 'Morning Mindfulness',
            exerciseType: 'Meditation',
            description: '10-minute guided meditation to start your day',
            duration: 10,
            completed: false
          },
          {
            id: '2',
            type: 'breathing',
            title: 'Box Breathing',
            exerciseType: 'Breathing',
            description: 'Calming breathing exercise for stress relief',
            duration: 5,
            completed: false
          }
        ];
      default:
        return [];
    }
  };

  const getCurrentDay = () => {
    if (!programData) return null;
    return programData.weeks[selectedWeek - 1]?.days[selectedDay - 1];
  };

  const handlePreviousDay = () => {
    if (selectedDay > 1) {
      setSelectedDay(selectedDay - 1);
    } else if (selectedWeek > 1) {
      setSelectedWeek(selectedWeek - 1);
      setSelectedDay(7);
    }
  };

  const handleNextDay = () => {
    if (selectedDay < 7) {
      setSelectedDay(selectedDay + 1);
    } else if (selectedWeek < program.weeks) {
      setSelectedWeek(selectedWeek + 1);
      setSelectedDay(1);
    }
  };

  const isNextDayDisabled = () => {
    const today = new Date();
    const programStart = new Date(program.startDate);
    const daysDiff = Math.floor((today.getTime() - programStart.getTime()) / (1000 * 60 * 60 * 24));
    const currentProgramDay = (selectedWeek - 1) * 7 + selectedDay;
    return currentProgramDay > daysDiff + 1;
  };

  if (!programData) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const currentDay = getCurrentDay();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <ProgramHeader 
        program={program}
        onBack={onBack}
        onShowFeedback={() => setShowCoachFeedback(true)}
      />

      {/* Program Navigation */}
      <ProgramNavigation
        weeks={program.weeks}
        selectedWeek={selectedWeek}
        selectedDay={selectedDay}
        onWeekChange={setSelectedWeek}
        onDayChange={setSelectedDay}
        currentWeek={program.currentWeek}
      />

      {/* Main Content */}
      <div className="px-4 pb-24">
        {currentDay && (
          <>
            {/* Day Content */}
            <DayContent
              day={currentDay}
              programType={program.type}
              isExpired={program.status === 'expired'}
            />

            {/* Daily Journal */}
            <DailyJournal
              programType={program.type}
              dayId={`${selectedWeek}-${selectedDay}`}
              isExpired={program.status === 'expired'}
            />
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        onPreviousDay={handlePreviousDay}
        onNextDay={handleNextDay}
        isNextDisabled={isNextDayDisabled()}
        isPreviousDisabled={selectedWeek === 1 && selectedDay === 1}
        selectedWeek={selectedWeek}
        selectedDay={selectedDay}
      />

      {/* Coach Feedback Modal */}
      <CoachFeedbackModal
        open={showCoachFeedback}
        onClose={() => setShowCoachFeedback(false)}
        feedback={program.hasFeedback ? "Great progress this week! Keep focusing on form." : null}
      />
    </div>
  );
};
