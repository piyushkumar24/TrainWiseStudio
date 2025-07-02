"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FinalCTASection = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleGetStarted = () => {
    if (email) {
      router.push(`/get-started?email=${encodeURIComponent(email)}`);
    } else {
      router.push('/get-started');
    }
  };

  return (
    <section className="bg-[#FF6B2C] text-white py-20 px-6 animate-fade-in">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Ready to transform your life?
        </h2>
        
        <p className="text-base md:text-lg text-center opacity-90 mb-6">
          Get started today with your fitness, nutrition, or mental health journey — guided by one real coach.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl px-4 py-3 text-black w-full sm:max-w-xs"
          />
          <Button
            onClick={handleGetStarted}
            className="bg-white text-[#FF6B2C] font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
