"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import type { ResetFormData } from '@/types/auth';

interface PasswordResetFormProps {
  onSubmit: (data: ResetFormData) => Promise<boolean>;
  onBack: () => void;
  isLoading: boolean;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ onSubmit, onBack, isLoading }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSubmit({ email });
    if (success) {
      setEmail('');
      onBack();
    }
  };

  return (
    <>
      <div className="text-center mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center text-white/80 hover:text-white mb-4 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </button>
        <h1 className="text-2xl font-semibold text-white mb-2">
          Reset Password
        </h1>
        <p className="text-white/90 text-sm">
          Enter your email address and we'll send you a reset link
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white rounded-xl p-4 w-full shadow-md text-black placeholder-gray-500 border-none"
          disabled={isLoading}
          required
        />

        <Button
          type="submit"
          disabled={isLoading || !email}
          className="w-full bg-orange hover:bg-orange-hover text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 ease-in-out"
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
    </>
  );
};

export default PasswordResetForm;
