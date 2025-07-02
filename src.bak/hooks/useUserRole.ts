"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';
import type { Session } from '@supabase/supabase-js';

interface UserRoleData {
  role: string;
}

export const useUserRole = (session: Session | null) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleRoleBasedRedirect = async () => {
      if (!session?.user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single() as { data: UserRoleData | null, error: any };

        if (roleError) {
          console.error('Error fetching user role:', roleError);
          router.push('/');
          return;
        }

        const role = roleData?.role;
        setUserRole(role);

        if (role === 'customer') {
          const onboardingComplete = session.user.user_metadata?.onboarding_complete;
          if (!onboardingComplete) {
            router.push('/onboarding');
          } else {
            router.push('/dashboard');
          }
        } else if (role === 'coach') {
          router.push('/coach');
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error in role-based redirect:', error);
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      handleRoleBasedRedirect();
    } else {
      setIsLoading(false);
    }
  }, [session, router]);

  return { isLoading, userRole };
};
