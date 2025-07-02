"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle } from 'lucide-react';

const HeroSection = () => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [showValidationError, setShowValidationError] = useState(false);

  // Hero background images
  const heroImages = [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Gym workout
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Running/cardio
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Yoga/flexibility
  ];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Show validation error if there's text but it's not a valid email
    if (value.length > 0 && !validateEmail(value)) {
      setShowValidationError(true);
    } else {
      setShowValidationError(false);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setShowValidationError(true);
      return;
    }
    setShowValidationError(false);
    
    // Navigate to get-started page with email as query parameter
    router.push(`/get-started?email=${encodeURIComponent(email)}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.5), rgba(34, 34, 34, 0.3)), url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              minHeight: '100vh',
              width: '100%'
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-slide-in">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Transform Your Life.{' '}
            <span className="text-orange">One Plan</span> at a Time.
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Fitness, Nutrition & Mental Clarity — Personalized by a Real Coach.
          </p>

          {/* CTA Form */}
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="w-full sm:flex-1 relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  className="h-14 px-6 text-lg rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-md text-white placeholder:text-white/70 focus:border-orange focus:ring-0 focus:outline-none transition-all duration-200"
                  required
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
                className="w-full sm:w-auto bg-orange hover:bg-orange-hover text-white font-bold text-lg px-8 py-4 h-14 rounded-xl transition-all duration-200 hover:scale-105 shadow-2xl transform-gpu"
              >
                Start Free Trial
              </Button>
            </div>
          </form>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange rounded-full"></div>
              <span className="text-sm font-medium">14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange rounded-full"></div>
              <span className="text-sm font-medium">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange rounded-full"></div>
              <span className="text-sm font-medium">Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
