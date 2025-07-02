
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const PricingSection = () => {
  const navigate = useNavigate();

  const pricingPlans = [
    {
      name: "Premium",
      price: "€29/mo",
      summary: "Full access to everything",
      ctaText: "Choose Premium – €29/mo",
      planKey: "premium",
      features: [
        { text: "Fitness, Nutrition & Mental Plans", included: true, highlighted: true },
        { text: "Full Knowledge Hub", included: true },
        { text: "Recipe + Exercise Library", included: true },
        { text: "Blog Access", included: true },
        { text: "Progress Tracking", included: true, highlighted: true },
        { text: "Coach Feedback", included: true, highlighted: true },
        { text: "Monthly Plan Updates", included: true }
      ]
    },
    {
      name: "Standard",
      price: "Free Trial",
      summary: "Perfect for getting started",
      ctaText: "Try Standard – 14 Days Free",
      planKey: "standard",
      features: [
        { text: "One monthly plan (choose fitness, nutrition or mental)", included: true, highlighted: true },
        { text: "Knowledge Hub", included: true },
        { text: "Recipe/Exercise Library", included: true },
        { text: "Blog Access", included: true },
        { text: "Progress Tracking", included: false },
        { text: "Feedback", included: false },
        { text: "✨ 14-Day Free Trial included", included: true, highlighted: true }
      ]
    },
    {
      name: "Basic",
      price: "€12 One-Time",
      summary: "Essential plan to get started",
      ctaText: "Buy Basic – €12 One-Time",
      planKey: "basic",
      features: [
        { text: "One 1-month plan", included: true, highlighted: true },
        { text: "Blog Access", included: true },
        { text: "Knowledge Hub", included: false },
        { text: "Library", included: false },
        { text: "Tracking or Feedback", included: false },
        { text: "Plan updates", included: false }
      ]
    }
  ];

  const handlePlanClick = async (planKey: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      navigate(`/checkout?plan=${planKey}`);
    } else {
      navigate(`/get-started?plan=${planKey}`);
    }
  };

  return (
    <section id="pricing" className="py-28 px-6 sm:px-12 bg-white font-dm-sans">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 animate-fade-in">
            Choose Your Plan
          </h2>
          <p className="text-base text-gray-600 text-center mb-20 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Tailored support for every level. All plans start with your goals.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mb-24">
          {/* Mobile: Horizontal scroll */}
          <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory sm:hidden pb-4">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                className="bg-[#FAFAFA] border border-gray-200 rounded-2xl p-6 shadow-lg text-center flex flex-col justify-between min-w-[280px] snap-center flex-shrink-0 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-2xl font-bold text-gray-800 mb-2">{plan.price}</div>
                  <p className="text-sm text-gray-600 mb-4">{plan.summary}</p>
                </div>
                <Button 
                  onClick={() => handlePlanClick(plan.planKey)}
                  className="bg-[#FF6B2C] text-white font-semibold py-3 px-3 rounded-full hover:bg-[#e85b22] transition-all duration-300 ease-in-out mt-4 hover:scale-105 text-xs leading-tight w-full break-words whitespace-normal h-auto min-h-[48px]"
                >
                  {plan.ctaText}
                </Button>
              </div>
            ))}
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden sm:grid sm:grid-cols-3 sm:gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                className="bg-[#FAFAFA] border border-gray-200 rounded-2xl p-6 shadow-lg text-center flex flex-col justify-between animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-2xl font-bold text-gray-800 mb-2">{plan.price}</div>
                  <p className="text-sm text-gray-600 mb-4">{plan.summary}</p>
                </div>
                <Button 
                  onClick={() => handlePlanClick(plan.planKey)}
                  className="bg-[#FF6B2C] text-white font-semibold py-3 px-3 rounded-full hover:bg-[#e85b22] transition-all duration-300 ease-in-out mt-4 hover:scale-105 text-sm leading-tight w-full break-words whitespace-normal h-auto min-h-[48px]"
                >
                  {plan.ctaText}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Plan Feature Comparison */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mt-24 animate-fade-in">
              What's Included in Each Plan
            </h3>
            <p className="text-base text-gray-600 text-center mb-10 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Feature access depends on your plan.
            </p>
          </div>

          {/* Mobile: Horizontal scroll */}
          <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory sm:hidden pb-4">
            {pricingPlans.map((plan, index) => (
              <div
                key={`features-${plan.name}`}
                className="bg-white border border-gray-200 rounded-2xl shadow p-6 min-w-[280px] snap-center flex-shrink-0 flex flex-col justify-between animate-fade-in"
                style={{ animationDelay: `${(index + 3) * 150}ms` }}
              >
                <div>
                  <h4 className="text-xl font-semibold text-center text-gray-900 mb-4">{plan.name}</h4>
                  <div className="text-sm space-y-3 text-gray-700">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-2">
                        <span className="flex-shrink-0 mt-0.5">
                          {feature.included ? '✅' : '🚫'}
                        </span>
                        <span className={feature.highlighted ? 'font-semibold' : ''}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden sm:grid sm:grid-cols-3 sm:gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={`features-${plan.name}`}
                className="bg-white border border-gray-200 rounded-2xl shadow p-6 flex flex-col justify-between animate-fade-in"
                style={{ animationDelay: `${(index + 3) * 150}ms` }}
              >
                <div>
                  <h4 className="text-xl font-semibold text-center text-gray-900 mb-4">{plan.name}</h4>
                  <div className="text-sm space-y-3 text-gray-700">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-2">
                        <span className="flex-shrink-0 mt-0.5">
                          {feature.included ? '✅' : '🚫'}
                        </span>
                        <span className={feature.highlighted ? 'font-semibold' : ''}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Note */}
        <div className="text-center text-xs text-gray-500 italic mt-10 animate-fade-in" style={{ animationDelay: '800ms' }}>
          ✨ Standard includes a 14-day free trial. Upgrade anytime.
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
