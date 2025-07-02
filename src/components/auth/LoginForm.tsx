"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import type { LoginFormData } from '@/types/auth';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<boolean>;
  onForgotPassword: () => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onForgotPassword, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSubmit({ email, password });
    if (success) {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-semibold text-center text-white mb-2">
        Welcome Back
      </h1>
      
      <p className="text-base text-center text-white/90 mb-6">
        Log in securely with your email and password
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white rounded-xl p-4 w-full shadow-md text-black placeholder-gray-500 border-none"
          disabled={isLoading}
        />
        
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white rounded-xl p-4 w-full shadow-md text-black placeholder-gray-500 border-none pr-12"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-white/80 underline mt-2 hover:text-white transition"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orange hover:bg-orange-hover text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 ease-in-out mt-6 hover:scale-105"
        >
          {isLoading ? 'Signing in...' : 'Login'}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
