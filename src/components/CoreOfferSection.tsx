"use client"

import React from 'react';

const CoreOfferSection = () => {
  return (
    <section id="core-offer" className="py-24 px-6 sm:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Part 1 - Core Transformation Pillars */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 animate-fade-in">
            Fitness. Nutrition. Mental Health.
          </h2>
          <p className="text-base text-gray-600 text-center mb-12 animate-fade-in">
            Three pillars. One complete transformation.
          </p>
        </div>

        {/* Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Card 1 - Fitness */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-md p-6 text-center hover:scale-[1.02] hover:shadow-lg transition-all duration-300 ease-in-out animate-slide-in">
            <div className="text-5xl mb-4">🏋️</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              Customized Training
            </h3>
            <p className="text-gray-600">
              Workouts that match your goals, past injuries, and lifestyle.
            </p>
          </div>

          {/* Card 2 - Nutrition */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-md p-6 text-center hover:scale-[1.02] hover:shadow-lg transition-all duration-300 ease-in-out animate-slide-in" style={{ animationDelay: '150ms' }}>
            <div className="text-5xl mb-4">🥗</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              Eat With Strategy
            </h3>
            <p className="text-gray-600">
              Personalized meals and recipes based on your real needs.
            </p>
          </div>

          {/* Card 3 - Mental Health */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-md p-6 text-center hover:scale-[1.02] hover:shadow-lg transition-all duration-300 ease-in-out animate-slide-in" style={{ animationDelay: '300ms' }}>
            <div className="text-5xl mb-4">🧘</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              Mind-First Coaching
            </h3>
            <p className="text-gray-600">
              Mental health tools that improve clarity, sleep, and stress.
            </p>
          </div>
        </div>

        {/* Part 2 - Extra Services */}
        <div className="text-center mt-20 mb-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-center text-gray-800">More Than Just a Plan</h3>
        </div>

        {/* Service Cards - Mobile: Horizontal Scroll, Tablet: 2x2 Grid, Desktop: 4x1 Grid */}
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 overflow-x-auto snap-x flex gap-4 scroll-smooth sm:overflow-visible pb-2">
          {/* Card 1 - Knowledge Hub */}
          <div className="min-w-[240px] max-w-[240px] flex-shrink-0 snap-center sm:min-w-0 sm:max-w-none bg-gray-50 border border-gray-200 rounded-2xl p-5 shadow-sm hover:scale-[1.01] hover:shadow-md transition-all duration-300">
            <div className="text-2xl mb-3">📚</div>
            <h4 className="font-bold mb-2 text-gray-900">
              Knowledge Hub
            </h4>
            <p className="text-sm text-gray-600">
              Explore hundreds of guided exercises and recipes.
            </p>
          </div>

          {/* Card 2 - Coach Feedback */}
          <div className="min-w-[240px] max-w-[240px] flex-shrink-0 snap-center sm:min-w-0 sm:max-w-none bg-gray-50 border border-gray-200 rounded-2xl p-5 shadow-sm hover:scale-[1.01] hover:shadow-md transition-all duration-300">
            <div className="text-2xl mb-3">🧠</div>
            <h4 className="font-bold mb-2 text-gray-900">
              Coach Feedback
            </h4>
            <p className="text-sm text-gray-600">
              I review your input and give you real, actionable support.
            </p>
          </div>

          {/* Card 3 - Blog Access */}
          <div className="min-w-[240px] max-w-[240px] flex-shrink-0 snap-center sm:min-w-0 sm:max-w-none bg-gray-50 border border-gray-200 rounded-2xl p-5 shadow-sm hover:scale-[1.01] hover:shadow-md transition-all duration-300">
            <div className="text-2xl mb-3">📰</div>
            <h4 className="font-bold mb-2 text-gray-900">
              Blog Access
            </h4>
            <p className="text-sm text-gray-600">
              My latest tips and insights — always evolving.
            </p>
          </div>

          {/* Card 4 - Daily Check-Ins */}
          <div className="min-w-[240px] max-w-[240px] flex-shrink-0 snap-center sm:min-w-0 sm:max-w-none bg-gray-50 border border-gray-200 rounded-2xl p-5 shadow-sm hover:scale-[1.01] hover:shadow-md transition-all duration-300">
            <div className="text-2xl mb-3">📅</div>
            <h4 className="font-bold mb-2 text-gray-900">
              Reflect & Track
            </h4>
            <p className="text-sm text-gray-600">
              Track mood, energy, and habits as you go.
            </p>
          </div>
        </div>

        {/* Bottom Note */}
        <p className="text-sm text-center text-gray-400 italic mt-10">
          Access may vary based on plan.
        </p>
      </div>
    </section>
  );
};

export default CoreOfferSection;
