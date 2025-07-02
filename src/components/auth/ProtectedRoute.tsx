
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'coach' | 'customer' | 'both';
  fallbackPath?: string;
}

export const ProtectedRoute = ({ 
  children, 
  requiredRole, 
  fallbackPath = '/login' 
}: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuthAndRole();
  }, [requiredRole]);

  const checkAuthAndRole = async () => {
    try {
      // Check authentication
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate(fallbackPath);
        return;
      }

      setUser(session.user);

      // If no specific role required, just check authentication
      if (!requiredRole) {
        setIsAuthorized(true);
        return;
      }

      // Check user role
      const { data: roleData, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single();

      if (error || !roleData) {
        toast({
          title: "Access Denied",
          description: `You don't have permission to access this area.`,
          variant: "destructive",
        });
        
        navigate('/dashboard');
        return;
      }

      // Handle 'both' role requirement (for shared pages like shop)
      if (requiredRole === 'both') {
        if (roleData.role === 'coach' || roleData.role === 'customer') {
          setIsAuthorized(true);
          return;
        }
      } else if (roleData.role === requiredRole) {
        setIsAuthorized(true);
        return;
      }

      // If role doesn't match
      toast({
        title: "Access Denied",
        description: `You don't have permission to access this area.`,
        variant: "destructive",
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Authorization check failed:', error);
      navigate(fallbackPath);
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

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};
