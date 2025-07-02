
import React from 'react';

interface WelcomeHeaderProps {
  firstName: string;
  subscriptionPlan: string;
}

export const WelcomeHeader = ({ firstName, subscriptionPlan }: WelcomeHeaderProps) => {
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  const getSubtext = (plan: string) => {
    switch (plan) {
      case 'premium':
        return "Let's build your day!";
      case 'trial':
      case 'standard':
        return "Ready for your next step?";
      case 'otp':
        return "Remember to fill in today's plan.";
      default:
        return "Ready for your next step?";
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Good {getTimeOfDay()}, {firstName} 👋
        </h1>
        <p className="text-gray-600 text-lg">
          {getSubtext(subscriptionPlan)}
        </p>
      </div>
    </div>
  );
};
