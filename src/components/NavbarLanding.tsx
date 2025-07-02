"use client"

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Brand } from '@/components/shared/Brand';

const NavbarLanding = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleGetStarted = () => {
    router.push('/get-started');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Brand size="md" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#core-offer" className="text-charcoal hover:text-orange transition-colors duration-200 font-medium">
                Features
              </a>
              <a href="#pricing" className="text-charcoal hover:text-orange transition-colors duration-200 font-medium">
                Pricing
              </a>
              <button
                onClick={handleLogin}
                className="text-charcoal hover:text-orange transition-colors duration-200 font-medium"
              >
                Login
              </button>
              <Button 
                onClick={handleGetStarted}
                className="bg-orange hover:bg-orange-hover text-white font-semibold px-6 py-2 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile menu button - now with higher z-index to ensure it stays on top */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-charcoal hover:text-orange focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange transition-colors duration-200 relative z-60"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
              <a href="#core-offer" className="block px-3 py-2 text-charcoal hover:text-orange transition-colors duration-200 font-medium">
                Features
              </a>
              <a href="#pricing" className="block px-3 py-2 text-charcoal hover:text-orange transition-colors duration-200 font-medium">
                Pricing
              </a>
              <button
                onClick={handleLogin}
                className="block px-3 py-2 text-charcoal hover:text-orange transition-colors duration-200 font-medium w-full text-left"
              >
                Login
              </button>
              <div className="px-3 py-2">
                <Button 
                  onClick={handleGetStarted}
                  className="w-full bg-orange hover:bg-orange-hover text-white font-semibold py-2 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarLanding;
