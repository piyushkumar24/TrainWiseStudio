
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLoginAuth } from '@/hooks/useLoginAuth';
import { useUserRole } from '@/hooks/useUserRole';
import BackgroundSlider from '@/components/auth/BackgroundSlider';
import AuthCard from '@/components/auth/AuthCard';
import LoginForm from '@/components/auth/LoginForm';
import PasswordResetForm from '@/components/auth/PasswordResetForm';
import type { Session } from '@supabase/supabase-js';

const Login = () => {
  const [showResetForm, setShowResetForm] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { isLoading, isResetLoading, handleLogin, handlePasswordReset } = useLoginAuth();
  const { isLoading: isRoleLoading } = useUserRole(session);

  // Memoize background images to prevent recreation on every render
  const backgroundImages = useMemo(() => [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ] as const, []);

  // Set up auth state listener and check for existing session
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show loading state while role is being determined
  if (isRoleLoading && session) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-cream">
        <BackgroundSlider images={backgroundImages} />
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
          <AuthCard>
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
              <p>Setting up your dashboard...</p>
            </div>
          </AuthCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-cream">
      <BackgroundSlider images={backgroundImages} />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
        <AuthCard>
          {!showResetForm ? (
            <LoginForm
              onSubmit={handleLogin}
              onForgotPassword={() => setShowResetForm(true)}
              isLoading={isLoading}
            />
          ) : (
            <PasswordResetForm
              onSubmit={handlePasswordReset}
              onBack={() => setShowResetForm(false)}
              isLoading={isResetLoading}
            />
          )}
        </AuthCard>
      </div>
    </div>
  );
};

export default Login;
