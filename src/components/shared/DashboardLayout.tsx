
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AppSidebar } from './AppSidebar';
import { DashboardHeader } from './DashboardHeader';
import { User } from '@supabase/supabase-js';
import { SidebarProvider } from '@/components/ui/sidebar';

interface DashboardLayoutProps {
  children?: React.ReactNode;
  userRole?: 'customer' | 'coach';
  title?: string;
  headerChildren?: React.ReactNode;
}

export const DashboardLayout = ({ 
  children, 
  userRole = 'customer',
  title,
  headerChildren
}: DashboardLayoutProps) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    getCurrentUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const getCurrentUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setUser(session.user);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AppSidebar userRole={userRole} onLogout={handleLogout} />

        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader 
            user={user}
            userRole={userRole}
            onLogout={handleLogout}
            title={title}
          >
            {headerChildren}
          </DashboardHeader>

          <main className="flex-1 p-4 lg:p-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
