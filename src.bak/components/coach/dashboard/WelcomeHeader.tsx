
import React from 'react';

interface WelcomeHeaderProps {
  firstName?: string;
}

export const WelcomeHeader = ({ firstName = 'Coach' }: WelcomeHeaderProps) => {
  return (
    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-full bg-[#FF6B2C] text-white flex items-center justify-center font-semibold">
          {firstName.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            You have 3 clients waiting for new plans.
          </p>
        </div>
      </div>
    </div>
  );
};
