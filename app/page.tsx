"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import NavbarLanding from "@/components/NavbarLanding";
import { Brand } from "@/components/shared/Brand";

export default function LandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [showValidationError, setShowValidationError] = useState(false);

  // Hero background images
  const heroImages = [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Gym workout
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Running/cardio
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Yoga/flexibility
  ];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Show validation error if there's text but it's not a valid email
    if (value.length > 0 && !validateEmail(value)) {
      setShowValidationError(true);
    } else {
      setShowValidationError(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Background Images for Hero Section */}
      <div className="fixed inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.5), rgba(34, 34, 34, 0.3)), url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              minHeight: '100vh',
              width: '100%'
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <NavbarLanding />

      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          {/* Floating Elements */}
          <div className="absolute inset-0 z-10 overflow-hidden">
            {/* Floating Avatar 1 */}
            <div className="absolute top-20 left-10 animate-float">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg blur-sm opacity-70 transform scale-95">
                JD
              </div>
            </div>

            {/* Floating Avatar 2 */}
            <div className="absolute top-32 right-8 animate-float-reverse delay-1000">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-400 to-red-500 flex items-center justify-center text-white font-bold shadow-lg blur-sm opacity-60 transform scale-90">
                SM
              </div>
            </div>

            {/* Testimonial Card 1 */}
            <div className="absolute top-1/3 left-4 animate-float delay-2000 transform rotate-[-5deg]">
              <div className="bg-white/80 backdrop-blur-md p-3 rounded-lg shadow-lg max-w-[200px] blur-sm opacity-70 scale-95">
                <p className="text-xs text-gray-600 mb-2">"Lost 25lbs in 3 months!"</p>
                <p className="text-xs font-semibold text-gray-800">- Sarah M.</p>
              </div>
            </div>

            {/* Testimonial Card 2 */}
            <div className="absolute bottom-1/3 right-6 animate-float-reverse delay-3000 transform rotate-[3deg]">
              <div className="bg-white/80 backdrop-blur-md p-3 rounded-lg shadow-lg max-w-[180px] blur-sm opacity-60 scale-90">
                <p className="text-xs text-gray-600 mb-2">"Best coach ever!"</p>
                <p className="text-xs font-semibold text-gray-800">- Mike R.</p>
              </div>
            </div>

            {/* Success Tag */}
            <div className="absolute bottom-20 left-8 animate-float delay-4000">
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg blur-sm opacity-80 transform scale-95">
                🔥 Success Unlocked
              </div>
            </div>

            {/* Floating Avatar 3 */}
            <div className="absolute bottom-32 right-20 animate-float-reverse delay-500">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg blur-sm opacity-50 transform scale-85">
                AL
              </div>
            </div>

            {/* Additional Success Tag */}
            <div className="absolute top-1/2 right-4 animate-float delay-1500 transform rotate-[8deg]">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg blur-sm opacity-70 transform scale-90">
                ✨ Transformed
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 text-center mt-16">
            <div className="animate-slide-in">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Transform Your Life.{' '}
                <span className="text-red-500">One Plan</span> at a Time.
              </h2>
              
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                Fitness, Nutrition & Mental Clarity — Personalized by a Real Coach.
              </p>

              {/* CTA Form */}
              <form className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <div className="w-full sm:flex-1 relative">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleEmailChange}
                      className="h-14 px-6 text-lg rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-md text-white placeholder:text-white/70 focus:border-red-500 focus:ring-0 focus:outline-none transition-all duration-200"
                      required
                    />
                    
                    {/* Validation Popup */}
                    {showValidationError && (
                      <div className="absolute top-full left-0 right-0 mt-2 z-20">
                        <div className="bg-red-500/95 backdrop-blur-md text-white px-4 py-3 rounded-lg shadow-lg border border-red-400/30 animate-slide-in">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm font-medium">
                              Please enter a valid email address
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <Link href={validateEmail(email) ? `/get-started?email=${encodeURIComponent(email)}` : "/get-started"}>
                    <Button 
                      className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-bold text-lg px-8 py-4 h-14 rounded-xl transition-all duration-200 hover:scale-105 shadow-2xl transform-gpu"
                    >
                      Start Free Trial
                    </Button>
                  </Link>
                </div>
              </form>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white relative z-10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose TrainWise Studio</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-red-100 text-red-700 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Programs</h3>
                <p className="text-gray-600">
                  Custom fitness, nutrition, and mental health programs tailored to your specific needs and goals.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-red-100 text-red-700 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Coaches</h3>
                <p className="text-gray-600">
                  Work with certified professionals who provide guidance, feedback, and motivation throughout your journey.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-red-100 text-red-700 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Approach</h3>
                <p className="text-gray-600">
                  Holistic wellness that integrates physical fitness, nutrition, and mental wellbeing for optimal results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-gray-50 py-20 relative z-10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold mb-2">Trial</h3>
                <p className="text-3xl font-bold mb-4">Free</p>
                <p className="text-gray-600 mb-6">14-day access to basic features</p>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> 1 program
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Library preview
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Blog access
                  </li>
                </ul>
                <Link href="/get-started" className="block">
                  <Button className="w-full">Start Free Trial</Button>
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-red-500 transform scale-105">
                <div className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2">POPULAR</div>
                <h3 className="text-xl font-semibold mb-2">Standard</h3>
                <p className="text-3xl font-bold mb-4">$49.99<span className="text-lg font-normal">/mo</span></p>
                <p className="text-gray-600 mb-6">Monthly subscription with standard features</p>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Full library access
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Blog access
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Shop access
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> 1 program at a time
                  </li>
                </ul>
                <Link href="/get-started" className="block">
                  <Button className="w-full bg-red-500 hover:bg-red-600">Get Started</Button>
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold mb-2">Premium</h3>
                <p className="text-3xl font-bold mb-4">$99.99<span className="text-lg font-normal">/mo</span></p>
                <p className="text-gray-600 mb-6">Monthly subscription with all features</p>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Full access to everything
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> All 3 program types
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Progress tracking
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> Coach feedback
                  </li>
                </ul>
                <Link href="/get-started" className="block">
                  <Button className="w-full">Get Premium</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-red-600 text-white py-16 relative z-10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your fitness journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients who have achieved their fitness goals with TrainWise Studio.
            </p>
            <Link href="/get-started">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="mb-4">
                <Brand size="md" textClassName="text-white" />
              </div>
              <p className="text-gray-300">
                Professional fitness coaching and personalized programs to help you achieve your goals.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/login" className="text-gray-300 hover:text-white">Login</Link></li>
                <li><Link href="/get-started" className="text-gray-300 hover:text-white">Get Started</Link></li>
                <li><a href="#features" className="text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#pricing" className="text-gray-300 hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-300">
                Email: support@trainwisestudio.com<br />
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} TrainWise Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 