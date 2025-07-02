
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';
import { ProgressionHeader } from '@/components/customer/progression/ProgressionHeader';
import { FeedbackSection } from '@/components/customer/progression/FeedbackSection';
import { ProgressGraphs } from '@/components/customer/progression/ProgressGraphs';
import { CheckInHistory } from '@/components/customer/progression/CheckInHistory';
import { ProgramStats } from '@/components/customer/progression/ProgramStats';
import { PremiumRequired } from '@/components/customer/progression/PremiumRequired';

export default function CustomerProgression() {
  const [user, setUser] = useState<User | null>(null);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkUserAndSubscription();
  }, []);

  const checkUserAndSubscription = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      setUser(session.user);

      // Check if user has premium subscription - now using profiles table
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('plan_type')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to check subscription status",
          variant: "destructive",
        });
        return;
      }

      setIsPremium(profile?.plan_type === 'premium');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!isPremium) {
    return <PremiumRequired />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <ProgressionHeader />
        <FeedbackSection userId={user?.id} />
        <ProgressGraphs userId={user?.id} />
        <CheckInHistory userId={user?.id} />
        <ProgramStats userId={user?.id} />
      </div>
    </div>
  );
}
