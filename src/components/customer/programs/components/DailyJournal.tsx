
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, Heart, Activity, Brain } from 'lucide-react';

interface DailyJournalProps {
  programType: 'fitness' | 'nutrition' | 'mental';
  dayId: string;
  isExpired: boolean;
}

export const DailyJournal = ({ programType, dayId, isExpired }: DailyJournalProps) => {
  const [journalEntry, setJournalEntry] = useState('');
  const [checkInData, setCheckInData] = useState<any>({});
  const [showJournal, setShowJournal] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);

  const getCheckInFields = () => {
    switch (programType) {
      case 'fitness':
        return [
          { key: 'weight', label: 'Weight (kg)', type: 'number' },
          { key: 'energy', label: 'Energy Level (1-10)', type: 'number', min: 1, max: 10 },
          { key: 'soreness', label: 'Muscle Soreness (1-10)', type: 'number', min: 1, max: 10 }
        ];
      case 'nutrition':
        return [
          { key: 'energy', label: 'Energy Level (1-10)', type: 'number', min: 1, max: 10 },
          { key: 'digestion', label: 'Digestion (1-10)', type: 'number', min: 1, max: 10 },
          { key: 'cravings', label: 'Cravings Intensity (1-10)', type: 'number', min: 1, max: 10 }
        ];
      case 'mental':
        return [
          { key: 'mood', label: 'Mood (1-10)', type: 'number', min: 1, max: 10 },
          { key: 'stress', label: 'Stress Level (1-10)', type: 'number', min: 1, max: 10 },
          { key: 'sleep', label: 'Sleep Quality (1-10)', type: 'number', min: 1, max: 10 }
        ];
      default:
        return [];
    }
  };

  const handleSaveJournal = () => {
    // Save journal entry logic
    console.log('Saving journal:', journalEntry);
    setShowJournal(false);
  };

  const handleSaveCheckIn = () => {
    // Save check-in data logic
    console.log('Saving check-in:', checkInData);
    setShowCheckIn(false);
  };

  if (isExpired) return null;

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Daily Reflection</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Journal Card */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <Sheet open={showJournal} onOpenChange={setShowJournal}>
            <SheetTrigger asChild>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Daily Journal</h4>
                    <p className="text-sm text-gray-600">Write your thoughts</p>
                  </div>
                </div>
              </CardContent>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh]">
              <SheetHeader>
                <SheetTitle>Daily Journal</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="journal">How was your day?</Label>
                  <Textarea
                    id="journal"
                    placeholder="Reflect on your progress, challenges, and wins..."
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                    className="min-h-32 mt-2"
                  />
                </div>
                <div className="sticky bottom-0 bg-white pt-4 border-t">
                  <Button onClick={handleSaveJournal} className="w-full bg-orange-500 hover:bg-orange-600">
                    Save Journal Entry
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </Card>

        {/* Check-in Card */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <Sheet open={showCheckIn} onOpenChange={setShowCheckIn}>
            <SheetTrigger asChild>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    {programType === 'fitness' && <Activity className="h-5 w-5 text-blue-600" />}
                    {programType === 'nutrition' && <Heart className="h-5 w-5 text-blue-600" />}
                    {programType === 'mental' && <Brain className="h-5 w-5 text-blue-600" />}
                  </div>
                  <div>
                    <h4 className="font-medium">Daily Check-in</h4>
                    <p className="text-sm text-gray-600">Track your metrics</p>
                  </div>
                </div>
              </CardContent>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh]">
              <SheetHeader>
                <SheetTitle>Daily Check-in</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                {getCheckInFields().map((field) => (
                  <div key={field.key}>
                    <Label htmlFor={field.key}>{field.label}</Label>
                    <Input
                      id={field.key}
                      type={field.type}
                      min={field.min}
                      max={field.max}
                      value={checkInData[field.key] || ''}
                      onChange={(e) => setCheckInData(prev => ({
                        ...prev,
                        [field.key]: field.type === 'number' ? parseFloat(e.target.value) : e.target.value
                      }))}
                      className="mt-1"
                    />
                  </div>
                ))}
                <div className="sticky bottom-0 bg-white pt-4 border-t">
                  <Button onClick={handleSaveCheckIn} className="w-full bg-orange-500 hover:bg-orange-600">
                    Save Check-in
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </Card>
      </div>
    </div>
  );
};
