
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CheckInData {
  // Fitness
  energyLevel: number;
  weight: string;
  bodyImage: File | null;
  injuries: string;
  
  // Nutrition
  protein: string;
  carbs: string;
  fats: string;
  stomachIssues: string;
  hydration: number;
  
  // Mental Health
  mood: number;
  sleepQuality: number;
  stressLevel: number;
  mindfulnessTime: string;
  
  // Shared
  journalEntry: string;
  anonymous: boolean;
}

const CustomerCheckIn = () => {
  const [checkInData, setCheckInData] = useState<CheckInData>({
    energyLevel: 5,
    weight: '',
    bodyImage: null,
    injuries: '',
    protein: '',
    carbs: '',
    fats: '',
    stomachIssues: '',
    hydration: 5,
    mood: 3,
    sleepQuality: 5,
    stressLevel: 5,
    mindfulnessTime: '',
    journalEntry: '',
    anonymous: false,
  });

  const [userPlan, setUserPlan] = useState<string>('');
  const [focusArea, setFocusArea] = useState<string>('');
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkUserPlanAndTodaySubmission();
  }, []);

  const checkUserPlanAndTodaySubmission = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Mock user plan and focus area - replace with actual logic
      setUserPlan('premium'); // 'premium', 'standard', 'trial', 'otp'
      setFocusArea('fitness'); // 'fitness', 'nutrition', 'mental'
      
      // Check if user has already submitted today
      const today = new Date().toISOString().split('T')[0];
      // Mock check - replace with actual database query
      setHasSubmittedToday(false);
    } catch (error) {
      console.error('Error checking user plan:', error);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Mock submission - replace with actual database insert
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      toast({
        title: "✅ Check-in submitted",
        description: "Great job! Keep up the excellent work.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit check-in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateCheckInData = (field: keyof CheckInData, value: any) => {
    setCheckInData(prev => ({ ...prev, [field]: value }));
  };

  const getEnergyEmoji = (level: number) => {
    const emojis = ['😴', '😪', '😐', '🙂', '😊', '😃', '💪', '🔥', '⚡', '🚀', '🌟'];
    return emojis[level] || '😐';
  };

  const getMoodEmoji = (mood: number) => {
    const emojis = ['😢', '😔', '😐', '🙂', '😊'];
    return emojis[mood - 1] || '😐';
  };

  const showFitnessSection = userPlan === 'premium' || focusArea === 'fitness';
  const showNutritionSection = userPlan === 'premium' || focusArea === 'nutrition';
  const showMentalSection = userPlan === 'premium' || focusArea === 'mental';
  const isPremium = userPlan === 'premium';

  if (hasSubmittedToday) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Check-In</h1>
          <p className="text-gray-600">Keep your coach updated and track your journey.</p>
        </div>

        <Card className="max-w-2xl mx-auto border-green-200 bg-green-50">
          <CardContent className="flex items-center gap-3 p-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-800">Check-in Complete!</h3>
              <p className="text-green-700">You've already completed your check-in today.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Check-In</h1>
          <p className="text-gray-600">Keep your coach updated and track your journey.</p>
        </div>

        <Card className="max-w-2xl mx-auto border-green-200 bg-green-50">
          <CardContent className="text-center p-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-800 mb-2">Awesome Work! 🎉</h3>
            <p className="text-green-700 mb-4">Your check-in has been submitted successfully.</p>
            <p className="text-sm text-green-600">Your coach will review this and provide feedback soon.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Check-In</h1>
        <p className="text-gray-600">Keep your coach updated and track your journey.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fitness Section */}
        {showFitnessSection && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🏋️ Fitness Check-In
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Energy Level */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Energy Level {getEnergyEmoji(checkInData.energyLevel)} ({checkInData.energyLevel}/10)
                </Label>
                <Slider
                  value={[checkInData.energyLevel]}
                  onValueChange={(value) => updateCheckInData('energyLevel', value[0])}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70.5"
                  value={checkInData.weight}
                  onChange={(e) => updateCheckInData('weight', e.target.value)}
                />
              </div>

              {/* Body Image Upload - Premium only */}
              {isPremium && (
                <div className="space-y-2">
                  <Label>Body Progress Photo (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-300 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload progress photo</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => updateCheckInData('bodyImage', e.target.files?.[0] || null)}
                    />
                  </div>
                </div>
              )}

              {/* Injuries */}
              <div className="space-y-2">
                <Label htmlFor="injuries">Injuries or Pain (Optional)</Label>
                <Textarea
                  id="injuries"
                  placeholder="Any injuries, soreness, or pain to note..."
                  value={checkInData.injuries}
                  onChange={(e) => updateCheckInData('injuries', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Nutrition Section */}
        {showNutritionSection && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🥗 Nutrition Check-In
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Macros */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="protein">Protein (g)</Label>
                  <Input
                    id="protein"
                    type="number"
                    placeholder="120"
                    value={checkInData.protein}
                    onChange={(e) => updateCheckInData('protein', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carbs">Carbs (g)</Label>
                  <Input
                    id="carbs"
                    type="number"
                    placeholder="200"
                    value={checkInData.carbs}
                    onChange={(e) => updateCheckInData('carbs', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fats">Fats (g)</Label>
                  <Input
                    id="fats"
                    type="number"
                    placeholder="80"
                    value={checkInData.fats}
                    onChange={(e) => updateCheckInData('fats', e.target.value)}
                  />
                </div>
              </div>

              {/* Stomach Issues */}
              <div className="space-y-2">
                <Label>Stomach Issues</Label>
                <Select value={checkInData.stomachIssues} onValueChange={(value) => updateCheckInData('stomachIssues', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select any issues" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="bloating">Bloating</SelectItem>
                    <SelectItem value="pain">Pain</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Hydration */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Hydration Level 💧 ({checkInData.hydration}/10)
                </Label>
                <Slider
                  value={[checkInData.hydration]}
                  onValueChange={(value) => updateCheckInData('hydration', value[0])}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mental Health Section */}
        {showMentalSection && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🧠 Mental Health Check-In
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mood */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Mood {getMoodEmoji(checkInData.mood)} ({checkInData.mood}/5)
                </Label>
                <Slider
                  value={[checkInData.mood]}
                  onValueChange={(value) => updateCheckInData('mood', value[0])}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Sleep Quality */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Sleep Quality 😴 ({checkInData.sleepQuality}/10)
                </Label>
                <Slider
                  value={[checkInData.sleepQuality]}
                  onValueChange={(value) => updateCheckInData('sleepQuality', value[0])}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Stress Level */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Stress Level 😰 ({checkInData.stressLevel}/10)
                </Label>
                <Slider
                  value={[checkInData.stressLevel]}
                  onValueChange={(value) => updateCheckInData('stressLevel', value[0])}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Mindfulness Time */}
              <div className="space-y-2">
                <Label htmlFor="mindfulness">Time spent on mindfulness (minutes)</Label>
                <Input
                  id="mindfulness"
                  type="number"
                  placeholder="15"
                  value={checkInData.mindfulnessTime}
                  onChange={(e) => updateCheckInData('mindfulnessTime', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Journal Section - Full Width */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📝 Daily Reflection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="journal">Want to reflect on today?</Label>
              <Textarea
                id="journal"
                placeholder="How was your day? Any thoughts, challenges, or wins you'd like to share..."
                value={checkInData.journalEntry}
                onChange={(e) => updateCheckInData('journalEntry', e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Anonymous Toggle - Premium only */}
            {isPremium && (
              <div className="flex items-center space-x-2">
                <Switch
                  id="anonymous"
                  checked={checkInData.anonymous}
                  onCheckedChange={(checked) => updateCheckInData('anonymous', checked)}
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Keep this check-in anonymous (hide from coach)
                </Label>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          size="lg"
        >
          {isLoading ? 'Submitting...' : 'Submit Check-In'}
        </Button>
      </div>
    </div>
  );
};

export default CustomerCheckIn;
