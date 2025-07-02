"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">TrainWise Studio</h1>
          <nav className="flex gap-6">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Link href="/get-started">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Transform Your Fitness Journey</h2>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              Professional coaching, personalized programs, and expert guidance to help you achieve your fitness goals.
            </p>
            <Link href="/get-started">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose TrainWise Studio</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 text-blue-700 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Programs</h3>
                <p className="text-gray-600">
                  Custom fitness, nutrition, and mental health programs tailored to your specific needs and goals.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 text-blue-700 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Coaches</h3>
                <p className="text-gray-600">
                  Work with certified professionals who provide guidance, feedback, and motivation throughout your journey.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-blue-100 text-blue-700 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
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
        <section className="bg-gray-50 py-20">
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
              
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-500 transform scale-105">
                <div className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2">POPULAR</div>
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
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">Get Started</Button>
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
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your fitness journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients who have achieved their fitness goals with TrainWise Studio.
            </p>
            <Link href="/get-started">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TrainWise Studio</h3>
              <p className="text-gray-300">
                Professional fitness coaching and personalized programs to help you achieve your goals.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/login" className="text-gray-300 hover:text-white">Login</Link></li>
                <li><Link href="/get-started" className="text-gray-300 hover:text-white">Get Started</Link></li>
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