
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { WelcomeHeader } from '@/components/customer/dashboard/WelcomeHeader';
import { MotivationCard } from '@/components/customer/dashboard/MotivationCard';
import { AlertSection } from '@/components/customer/dashboard/AlertSection';
import { TodaysProgram } from '@/components/customer/dashboard/TodaysProgram';
import { QuickStats } from '@/components/customer/dashboard/QuickStats';
import { QuickActions } from '@/components/customer/dashboard/QuickActions';

interface CustomerProfile {
  first_name: string;
  plan_type: string;
  onboarding_completed: boolean;
}

interface ProgramData {
  id: string;
  title: string;
  type: string;
  status: string;
  expires_at: string;
  current_day: number;
  total_days: number;
}

interface AlertData {
  type: 'payment' | 'no_plan' | 'expiring' | 'expired' | 'missed_checkins' | 'feedback';
  message: string;
  priority: number;
  action?: {
    text: string;
    link: string;
  };
}

const Dashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [program, setProgram] = useState<ProgramData | null>(null);
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [motivationCard, setMotivationCard] = useState<{
    message: string;
    sent_at: string;
  } | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch user profile (now contains all the customer details)
      const { data: profileData } = await supabase
        .from('profiles')
        .select('first_name, plan_type, onboarding_completed')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile({
          first_name: profileData.first_name || 'there',
          plan_type: profileData.plan_type || 'trial',
          onboarding_completed: profileData.onboarding_completed || false
        });
      }

      // Fetch active program
      const { data: programData } = await supabase
        .from('program_assignments')
        .select(`
          *,
          programs (
            id,
            title,
            type
          )
        `)
        .eq('client_id', user.id)
        .eq('status', 'active')
        .single();

      if (programData?.programs) {
        const expiresAt = new Date(programData.expires_at);
        const now = new Date();
        const daysUntilExpiry = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 3600 * 24));

        setProgram({
          id: programData.programs.id,
          title: programData.programs.title,
          type: programData.programs.type,
          status: programData.status,
          expires_at: programData.expires_at,
          current_day: Math.floor(Math.random() * 25) + 1, // Mock data - replace with actual
          total_days: 30 // Mock data - replace with actual
        });

        // Check for expiring program
        if (daysUntilExpiry <= 5 && daysUntilExpiry > 0) {
          setAlerts(prev => [...prev, {
            type: 'expiring',
            message: `Your program expires in ${daysUntilExpiry} days. A new one will be assigned soon.`,
            priority: 3
          }]);
        }
      }

      // Generate alerts based on customer state
      const newAlerts: AlertData[] = [];

      // Check if no plan selected
      if (!profileData?.plan_type || profileData.plan_type === 'trial') {
        newAlerts.push({
          type: 'no_plan',
          message: "You haven't selected a plan yet.",
          priority: 2,
          action: {
            text: 'Choose a Plan',
            link: '/select-plan'
          }
        });
      }

      // Mock: Check for unread feedback
      const hasUnreadFeedback = Math.random() > 0.7; // 30% chance
      if (hasUnreadFeedback) {
        newAlerts.push({
          type: 'feedback',
          message: "You've received new feedback from your coach.",
          priority: 6,
          action: {
            text: 'View Feedback',
            link: '/progression'
          }
        });
      }

      // Mock: Check for missed check-ins
      const missedCheckins = Math.random() > 0.8; // 20% chance
      if (missedCheckins) {
        newAlerts.push({
          type: 'missed_checkins',
          message: "Looks like you've missed a few check-ins. Let's get back on track!",
          priority: 5,
          action: {
            text: "Fill Today's Check-In",
            link: '/checkin'
          }
        });
      }

      setAlerts(newAlerts.sort((a, b) => a.priority - b.priority));

      // Fetch today's motivation card (mock data)
      setMotivationCard({
        message: "You got this! One step at a time. 💪",
        sent_at: "05:00"
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <WelcomeHeader 
        firstName={profile?.first_name || 'there'}
        subscriptionPlan={profile?.plan_type || 'trial'}
      />

      <MotivationCard 
        message={motivationCard?.message || ''}
        sentAt={motivationCard?.sent_at || ''}
      />

      {alerts.length > 0 && (
        <AlertSection alerts={alerts} />
      )}

      <TodaysProgram 
        program={program}
        subscriptionPlan={profile?.plan_type || 'trial'}
      />

      {profile?.plan_type === 'premium' && (
        <QuickStats />
      )}

      <QuickActions 
        subscriptionPlan={profile?.plan_type || 'trial'}
      />
    </div>
  );
};

export default Dashboard;
