"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

interface AuthCardProps {
  children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 animate-slide-in">
        <div className="text-center mb-8">
          <div className="text-2xl font-bold text-white">
            <span className="text-orange">TrainWise</span>Studio
          </div>
        </div>

        {children}

        <div className="mt-6 text-center">
          <p className="text-white/80 text-sm">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/get-started')}
              className="text-orange hover:text-orange-hover font-medium underline"
            >
              Get Started
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
