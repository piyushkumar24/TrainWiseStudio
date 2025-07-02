"use client"

import React from 'react';
import LandingLayout from '@/components/LandingLayout';
import HeroSection from '@/components/HeroSection';
import CoreOfferSection from '@/components/CoreOfferSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PricingSection from '@/components/PricingSection';
import FinalCTASection from '@/components/FinalCTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <LandingLayout>
      <HeroSection />
      <CoreOfferSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FinalCTASection />
      <Footer />
    </LandingLayout>
  );
};

export default Index;
