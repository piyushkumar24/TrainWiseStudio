import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Goal = 'get-fit' | 'build-muscle' | 'get-stronger' | 'burn-fat' | 'get-toned' | 
           'eat-healthier' | 'weight-loss' | 'improve-habits' | 'more-energy' | 'reduce-cravings' |
           'reduce-stress' | 'improve-sleep' | 'build-mindfulness' | 'emotional-balance' | 'boost-focus';

interface OnboardingData {
  goals: Goal[];
  height_cm: number;
  weight_kg: number;
  age: number;
  gender: string;
  country: string;
}

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form data
  const [selectedGoals, setSelectedGoals] = useState<Goal[]>([]);
  const [formData, setFormData] = useState<OnboardingData>({
    goals: [],
    height_cm: 0,
    weight_kg: 0,
    age: 0,
    gender: '',
    country: '',
  });

  useEffect(() => {
    checkAuthAndOnboarding();
  }, []);

  const checkAuthAndOnboarding = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/login');
      return;
    }

    setUser(session.user);

    // Check if onboarding is already complete
    const { data: profileData } = await supabase
      .from('profiles')
      .select('onboarding_completed')
      .eq('id', session.user.id)
      .single();

    if (profileData?.onboarding_completed) {
      navigate('/dashboard');
      return;
    }
  };

  const goalCategories = {
    fitness: {
      title: '🏋️ Fitness Goals',
      color: 'bg-orange/10 border-orange/20',
      goals: [
        {
          id: 'get-fit' as Goal,
          emoji: '🏃',
          title: 'Get Fit',
          description: 'Improve stamina, energy and daily activity level',
        },
        {
          id: 'build-muscle' as Goal,
          emoji: '🏋️',
          title: 'Build Muscle',
          description: 'Gain size, strength, and confidence',
        },
        {
          id: 'get-stronger' as Goal,
          emoji: '💪',
          title: 'Get Stronger',
          description: 'Push past limits and lift heavier',
        },
        {
          id: 'burn-fat' as Goal,
          emoji: '🔥',
          title: 'Burn Fat',
          description: 'Reduce body fat and improve definition',
        },
        {
          id: 'get-toned' as Goal,
          emoji: '💃',
          title: 'Get Toned',
          description: 'Shape lean muscle and tighten physique',
        },
      ],
    },
    nutrition: {
      title: '🥗 Nutrition Goals',
      color: 'bg-green-50 border-green-200',
      goals: [
        {
          id: 'eat-healthier' as Goal,
          emoji: '🍎',
          title: 'Eat Healthier',
          description: 'Make better food choices for life',
        },
        {
          id: 'weight-loss' as Goal,
          emoji: '🥗',
          title: 'Weight Loss',
          description: 'Slim down through smart meals',
        },
        {
          id: 'improve-habits' as Goal,
          emoji: '🍱',
          title: 'Improve Habits',
          description: 'Build sustainable food routines',
        },
        {
          id: 'more-energy' as Goal,
          emoji: '🥑',
          title: 'More Energy',
          description: 'Use nutrition to fuel your day',
        },
        {
          id: 'reduce-cravings' as Goal,
          emoji: '💧',
          title: 'Reduce Cravings',
          description: 'Stabilize hunger and feel full',
        },
      ],
    },
    mental: {
      title: '🧠 Mental Health Goals',
      color: 'bg-blue-50 border-blue-200',
      goals: [
        {
          id: 'reduce-stress' as Goal,
          emoji: '😌',
          title: 'Reduce Stress',
          description: 'Calm your mind and body',
        },
        {
          id: 'improve-sleep' as Goal,
          emoji: '😴',
          title: 'Improve Sleep',
          description: 'Get deeper, more restorative rest',
        },
        {
          id: 'build-mindfulness' as Goal,
          emoji: '🧘',
          title: 'Build Mindfulness',
          description: 'Be present and self-aware',
        },
        {
          id: 'emotional-balance' as Goal,
          emoji: '❤️',
          title: 'Emotional Balance',
          description: 'Regulate mood and mental clarity',
        },
        {
          id: 'boost-focus' as Goal,
          emoji: '🧠',
          title: 'Boost Focus',
          description: 'Improve attention and mental sharpness',
        },
      ],
    },
  };

  const toggleGoal = (goal: Goal) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setFormData(prev => ({ ...prev, goals: selectedGoals }));
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleInputChange = (field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const completeOnboarding = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Update user profile with onboarding data
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          onboarding_completed: true,
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      toast({
        title: "Welcome aboard! 🎉",
        description: "Your onboarding is complete. Let's start your journey!",
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Onboarding error:', error);
      toast({
        title: "Error",
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange/10 via-cream to-orange/5 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of 4</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / 4) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Goal Selection */}
        {currentStep === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">What's your main focus?</h1>
              <p className="text-gray-600 text-lg">Select one or more goals — we'll build your plan around them.</p>
            </div>

            <div className="space-y-8 mb-8">
              {Object.entries(goalCategories).map(([categoryKey, category]) => (
                <div key={categoryKey} className="space-y-4">
                  {/* Category Header */}
                  <div className={`p-4 rounded-xl border-2 ${category.color}`}>
                    <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
                  </div>

                  {/* Category Goals */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.goals.map((goal) => (
                      <Card
                        key={goal.id}
                        className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                          selectedGoals.includes(goal.id)
                            ? 'ring-2 ring-orange bg-orange/5 shadow-lg'
                            : 'bg-white hover:bg-gray-50'
                        }`}
                        onClick={() => toggleGoal(goal.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <span className="text-2xl">{goal.emoji}</span>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">{goal.title}</h3>
                              <p className="text-sm text-gray-600 leading-relaxed">{goal.description}</p>
                            </div>
                          </div>
                          {selectedGoals.includes(goal.id) && (
                            <div className="text-orange text-xl ml-2">✓</div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="max-w-md mx-auto">
              <Button
                onClick={handleNext}
                disabled={selectedGoals.length === 0}
                className="w-full bg-orange hover:bg-orange-hover text-white py-3 text-lg font-semibold"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Personal Information */}
        {currentStep === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Let's get to know your body</h1>
              <p className="text-gray-600">We'll tailor your plan based on this info</p>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                <Input
                  type="number"
                  placeholder="170"
                  value={formData.height_cm || ''}
                  onChange={(e) => handleInputChange('height_cm', parseInt(e.target.value) || 0)}
                  className="text-lg py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <Input
                  type="number"
                  placeholder="70"
                  value={formData.weight_kg || ''}
                  onChange={(e) => handleInputChange('weight_kg', parseInt(e.target.value) || 0)}
                  className="text-lg py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <Input
                  type="number"
                  placeholder="25"
                  value={formData.age || ''}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                  className="text-lg py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <Select onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className="text-lg py-3">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleNext}
              disabled={!formData.height_cm || !formData.weight_kg || !formData.age || !formData.gender}
              className="w-full bg-orange hover:bg-orange-hover text-white py-3 text-lg font-semibold"
            >
              Next
            </Button>
          </div>
        )}

        {/* Step 3: Contact Info */}
        {currentStep === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Almost there!</h1>
              <p className="text-gray-600">Just a few more details to complete your profile</p>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <Select onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger className="text-lg py-3">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleNext}
              disabled={!formData.country}
              className="w-full bg-orange hover:bg-orange-hover text-white py-3 text-lg font-semibold"
            >
              Complete Onboarding
            </Button>
          </div>
        )}

        {/* Step 4: Welcome Screen */}
        {currentStep === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center max-w-md mx-auto">
            <div className="mb-8">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to your journey!</h1>
              <p className="text-gray-600 text-lg">You're all set. Let's start transforming.</p>
            </div>

            <div className="bg-white rounded-xl p-6 mb-8 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Your Selected Goals:</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {formData.goals.map((goalId) => {
                  // Find the goal details from all categories
                  let goalDetails = null;
                  Object.values(goalCategories).forEach(category => {
                    const found = category.goals.find(g => g.id === goalId);
                    if (found) goalDetails = found;
                  });
                  
                  return goalDetails ? (
                    <span key={goalId} className="inline-flex items-center gap-1 bg-orange/10 text-orange px-3 py-1 rounded-full text-sm">
                      {goalDetails.emoji} {goalDetails.title}
                    </span>
                  ) : null;
                })}
              </div>
            </div>

            <Button
              onClick={completeOnboarding}
              disabled={isLoading}
              className="w-full bg-orange hover:bg-orange-hover text-white py-3 text-lg font-semibold"
            >
              {isLoading ? 'Setting up your account...' : 'Go to Dashboard'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
