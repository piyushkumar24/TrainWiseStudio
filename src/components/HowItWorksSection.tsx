
import React, { useState, useEffect } from 'react';

const HowItWorksSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const steps = [
    {
      number: 1,
      emoji: "🎯",
      title: "Tell Me Your Goals",
      description: "Quick onboarding to understand your goals, needs, and any injuries or allergies."
    },
    {
      number: 2,
      emoji: "📦",
      title: "Your Custom Plan",
      description: "You receive a detailed program with pro tips, what to avoid, and step-by-step guidance."
    },
    {
      number: 3,
      emoji: "📊",
      title: "Track Your Journey",
      description: "Log your workouts, meals, and mental check-ins — all in one intuitive dashboard."
    },
    {
      number: 4,
      emoji: "🧠",
      title: "Unlock Your Next Level",
      description: "Get smarter as you go — with insights, adjustments, and support that evolve with your journey."
    }
  ];

  // Auto-slide functionality for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === steps.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section id="how-it-works" className="py-24 px-6 sm:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 animate-fade-in">
            How It Works
          </h2>
          <p className="text-base text-gray-600 text-center mb-16 animate-fade-in">
            Everything starts with your goals — then we build everything around them.
          </p>
        </div>

        {/* Steps Layout - Mobile: scroll, Tablet: 2x2 grid, Desktop: 4-column grid */}
        <div className="md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 overflow-x-auto flex snap-x gap-4 scroll-smooth pb-4 md:overflow-visible">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="min-w-[calc(100vw-3rem)] max-w-[280px] snap-center flex-shrink-0 md:min-w-0 md:max-w-none flex flex-col items-center text-center bg-[#FAFAFA] rounded-2xl p-6 shadow hover:scale-[1.02] transition duration-300 ease-in-out animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Number Circle */}
              <div className="bg-[#FF6B2C] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-4">
                {step.number}
              </div>
              
              {/* Emoji */}
              <div className="text-3xl mb-4">{step.emoji}</div>
              
              {/* Title */}
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                {step.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
