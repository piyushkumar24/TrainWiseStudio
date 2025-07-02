
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { WelcomeHeader } from '@/components/coach/dashboard/WelcomeHeader';
import { TodaysFocus } from '@/components/coach/dashboard/TodaysFocus';
import { QuickCheckins } from '@/components/coach/dashboard/QuickCheckins';
import { DraftsInProgress } from '@/components/coach/dashboard/DraftsInProgress';

const CoachDashboard = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const firstName = session.user.user_metadata?.first_name || 'Coach';
        setUserProfile({ firstName });
      }
    } catch (error) {
      console.error('Error getting user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FF6B2C]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className="px-4 py-6 md:px-10 md:py-8 space-y-8">
        <WelcomeHeader firstName={userProfile?.firstName} />
        <TodaysFocus />
        <QuickCheckins />
        <DraftsInProgress />
      </div>
    </div>
  );
};

export default CoachDashboard;
