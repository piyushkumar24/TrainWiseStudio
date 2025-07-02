
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { Session } from '@supabase/supabase-js';

interface UserRoleData {
  role: string;
}

export const useUserRole = (session: Session | null) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

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
          navigate('/');
          return;
        }

        const role = roleData?.role;
        setUserRole(role);

        if (role === 'customer') {
          const onboardingComplete = session.user.user_metadata?.onboarding_complete;
          if (!onboardingComplete) {
            navigate('/onboarding');
          } else {
            navigate('/dashboard');
          }
        } else if (role === 'coach') {
          navigate('/coach');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error in role-based redirect:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      handleRoleBasedRedirect();
    } else {
      setIsLoading(false);
    }
  }, [session, navigate]);

  return { isLoading, userRole };
};
