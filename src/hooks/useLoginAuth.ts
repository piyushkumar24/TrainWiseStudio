
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { LoginFormData, ResetFormData } from '@/types/auth';

export const useLoginAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = useCallback(async (formData: LoginFormData) => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in both email and password",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword(formData);

      if (error) {
        toast({
          title: "Invalid credentials",
          description: "Please check your email and password and try again",
          variant: "destructive",
        });
        return false;
      }

      if (data.user) {
        // Role-based redirect will be handled by useUserRole hook
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
    return false;
  }, [toast]);

  const handlePasswordReset = useCallback(async (formData: ResetFormData) => {
    if (!formData.email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    setIsResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Password reset email sent",
        description: "Check your email for a link to reset your password. It may take a few minutes to arrive.",
      });
      return true;
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResetLoading(false);
    }
    return false;
  }, [toast]);

  return {
    isLoading,
    isResetLoading,
    handleLogin,
    handlePasswordReset,
  };
};
