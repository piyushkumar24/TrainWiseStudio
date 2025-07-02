"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import FloatingElements from '@/components/FloatingElements';

const GetStarted = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [showValidationError, setShowValidationError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefill email from URL query parameter
  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  // Check auth state and redirect accordingly
  useEffect(() => {
    const checkAuthState = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const onboardingComplete = session.user.user_metadata?.onboarding_complete;
        if (onboardingComplete) {
          router.push('/dashboard');
        } else {
          router.push('/onboarding');
        }
      }
    };

    checkAuthState();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const onboardingComplete = session.user.user_metadata?.onboarding_complete;
          if (onboardingComplete) {
            router.push('/dashboard');
          } else {
            router.push('/onboarding');
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value.length > 0 && !validateEmail(value)) {
      setShowValidationError(true);
    } else {
      setShowValidationError(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setShowValidationError(true);
      return;
    }

    setIsSubmitting(true);
    setShowValidationError(false);

    try {
      // Save email to leads table
      const { error: leadError } = await supabase
        .from('email_leads')
        .insert([{ email }]);

      if (leadError) {
        console.error('Error saving email lead:', leadError);
      }

      // Send magic link
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/get-started`
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Check your email",
        description: "We've sent you a secure sign-in link.",
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden flex flex-col items-center justify-center px-6 py-20">
      {/* Floating Elements */}
      <FloatingElements />
      
      {/* Main Content */}
      <div className="w-full max-w-md mx-auto text-center relative z-10">
        {/* Logo */}
        <div className="mb-8">
          <div className="text-3xl font-bold text-charcoal">
            <span className="text-orange">TrainWise</span>Studio
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-charcoal mb-4 leading-tight">
          Start your transformation today
        </h1>

        {/* Subtext */}
        <p className="text-lg text-gray-600 mb-12">
          Fitness. Nutrition. Mind. One coach, three paths, your journey.
        </p>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              className="bg-white rounded-xl p-4 w-full max-w-md shadow-md h-14 text-lg border-2 border-gray-200 focus:border-orange focus:ring-0 focus:outline-none transition-all duration-200"
              required
              disabled={isSubmitting}
            />
            
            {/* Modern Validation Popup */}
            {showValidationError && (
              <div className="absolute top-full left-0 right-0 mt-2 z-20">
                <div className="bg-red-500/95 backdrop-blur-md text-white px-4 py-3 rounded-lg shadow-lg border border-red-400/30 animate-slide-in">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      Please enter a valid email address
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#FF6B2C] hover:bg-[#e85b22] text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 ease-in-out w-full max-w-md h-14 text-lg disabled:opacity-50"
          >
            {isSubmitting ? "Check your email..." : "Get Started"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GetStarted;
