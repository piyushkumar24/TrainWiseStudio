import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AlertSection } from '@/components/customer/dashboard/AlertSection';
import { MotivationCard } from '@/components/customer/dashboard/MotivationCard';
import { WelcomeHeader } from '@/components/customer/dashboard/WelcomeHeader';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { 
  Dumbbell, 
  UtensilsCrossed, 
  Brain, 
  Calendar,
  MessageSquare,
  Eye,
  ArrowRight,
  Clock
} from 'lucide-react';

interface Program {
  id: string;
  title: string;
  type: 'fitness' | 'nutrition' | 'mental';
  progress: number;
  expiresIn: number;
  hasFeedback: boolean;
  status: 'active' | 'expired';
  createdAt: string;
  completedPercentage?: number;
}

interface UserProfile {
  firstName: string;
  subscriptionPlan: string;
}

const CustomerPrograms = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({ firstName: 'User', subscriptionPlan: 'trial' });
  const [programs, setPrograms] = useState<Program[]>([]);
  const [expiredPrograms, setExpiredPrograms] = useState<Program[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [motivationMessage, setMotivationMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchUserData();
    fetchPrograms();
    fetchMotivation();
    generateAlerts();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, plan_type')
          .eq('id', user.id)
          .single();

        setUserProfile({
          firstName: profile?.first_name || 'User',
          subscriptionPlan: profile?.plan_type || 'trial'
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchPrograms = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Mock data for now - replace with actual Supabase queries
        const mockActivePrograms: Program[] = [
          {
            id: '1',
            title: 'Full Body Strength Training',
            type: 'fitness',
            progress: 65,
            expiresIn: 12,
            hasFeedback: true,
            status: 'active',
            createdAt: '2024-01-15'
          },
          {
            id: '2',
            title: 'Mediterranean Diet Plan',
            type: 'nutrition',
            progress: 40,
            expiresIn: 20,
            hasFeedback: false,
            status: 'active',
            createdAt: '2024-01-10'
          }
        ];

        const mockExpiredPrograms: Program[] = [
          {
            id: '3',
            title: 'Beginner Cardio Program',
            type: 'fitness',
            progress: 100,
            expiresIn: 0,
            hasFeedback: false,
            status: 'expired',
            createdAt: '2023-12-01',
            completedPercentage: 95
          }
        ];

        // Filter based on subscription plan
        let filteredPrograms = mockActivePrograms;
        if (userProfile.subscriptionPlan === 'standard' || userProfile.subscriptionPlan === 'trial') {
          filteredPrograms = mockActivePrograms.slice(0, 1);
        } else if (userProfile.subscriptionPlan === 'otp') {
          filteredPrograms = mockActivePrograms.slice(0, 1);
        }

        setPrograms(filteredPrograms);
        setExpiredPrograms(mockExpiredPrograms);
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMotivation = () => {
    const motivationalMessages = [
      "Every workout gets you closer to your goals! 💪",
      "Consistency is key - you're doing amazing! 🌟",
      "Your dedication today shapes your tomorrow! 🚀",
      "Small steps lead to big changes! 👏"
    ];
    
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    setMotivationMessage(randomMessage);
  };

  const generateAlerts = () => {
    const mockAlerts = [
      {
        type: 'feedback',
        message: '🧠 New feedback from your coach is available!',
        priority: 1,
        action: { text: 'View Feedback', link: '/feedback' }
      },
      {
        type: 'expiring',
        message: '📅 Your program ends in 3 days — get ready for your next one!',
        priority: 2
      }
    ];
    
    setAlerts(mockAlerts);
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'fitness':
        return <Dumbbell className="h-5 w-5" />;
      case 'nutrition':
        return <UtensilsCrossed className="h-5 w-5" />;
      case 'mental':
        return <Brain className="h-5 w-5" />;
      default:
        return <Dumbbell className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (type: string) => {
    switch (type) {
      case 'fitness':
        return 'text-blue-600 bg-blue-100';
      case 'nutrition':
        return 'text-green-600 bg-green-100';
      case 'mental':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const openProgram = (programId: string) => {
    navigate(`/dashboard/programs/${programId}`);
  };

  const renderEmptyState = () => (
    <Card className="text-center p-8">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
          <Clock className="h-8 w-8 text-orange-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">No Programs Yet</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          You haven't received your {userProfile.subscriptionPlan} program yet. 
          Hang tight! Your coach will assign it soon.
        </p>
        <Button 
          onClick={() => navigate('/dashboard/plan')} 
          className="bg-orange-500 hover:bg-orange-600"
        >
          View My Plan
        </Button>
      </div>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Welcome Header */}
      <WelcomeHeader 
        firstName={userProfile.firstName} 
        subscriptionPlan={userProfile.subscriptionPlan} 
      />

      {/* Alerts Section */}
      {alerts.length > 0 && <AlertSection alerts={alerts} />}

      {/* Daily Motivation */}
      <MotivationCard 
        message={motivationMessage}
        sentAt={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      />

      {/* Active Programs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">My Programs</h2>
          <Badge variant="outline" className="text-orange-600 border-orange-200">
            {userProfile.subscriptionPlan.toUpperCase()} Plan
          </Badge>
        </div>

        {programs.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-lg ${getCategoryColor(program.type)}`}>
                      {getCategoryIcon(program.type)}
                    </div>
                    {program.hasFeedback && (
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Feedback
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight">{program.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{program.progress}%</span>
                    </div>
                    <Progress value={program.progress} className="h-2" />
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    Expires in {program.expiresIn} days
                  </div>
                  
                  <Button 
                    onClick={() => openProgram(program.id)}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Open Program
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Expired Programs Section */}
      {expiredPrograms.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            📜 Past Programs
          </h3>
          
          <div className="space-y-3">
            {expiredPrograms.map((program) => (
              <Card key={program.id} className="bg-gray-50">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(program.type)} opacity-75`}>
                        {getCategoryIcon(program.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{program.title}</h4>
                        <p className="text-sm text-gray-600">
                          Completed {program.completedPercentage}% • 
                          Started {new Date(program.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Summary
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="bottom" className="md:max-w-md md:mx-auto">
                        <SheetHeader>
                          <SheetTitle>{program.title} - Summary</SheetTitle>
                        </SheetHeader>
                        <div className="py-4 space-y-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">
                              {program.completedPercentage}%
                            </div>
                            <p className="text-gray-600">Program Completed</p>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Duration:</span>
                              <span>8 weeks</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Category:</span>
                              <span className="capitalize">{program.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Started:</span>
                              <span>{new Date(program.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPrograms;
