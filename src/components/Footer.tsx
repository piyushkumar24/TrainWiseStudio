"use client"

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1C1C1C] text-white text-sm py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 - Logo & Mission */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-orange">TrainWise</span>Studio
            </div>
            <p className="mb-2">
              One coach. One mission. Helping you master fitness, nutrition, and mind.
            </p>
            <p className="text-gray-400">
              Your transformation starts here.
            </p>
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <a href="#core-offer" className="text-gray-300 hover:text-orange transition-colors duration-200">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-300 hover:text-orange transition-colors duration-200">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/get-started" className="text-gray-300 hover:text-orange transition-colors duration-200">
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact & Legal */}
          <div>
            <h3 className="font-semibold mb-4">Contact & Support</h3>
            <ul className="space-y-3">
              <li>
                <div className="text-gray-300">
                  <div className="font-medium">Instagram</div>
                  <a href="https://instagram.com/trainwisestudio" className="text-gray-400 hover:text-orange transition-colors duration-200">
                    @trainwisestudio
                  </a>
                </div>
              </li>
              <li>
                <div className="text-gray-300">
                  <div className="font-medium">Messenger</div>
                  <a href="#" className="text-gray-400 hover:text-orange transition-colors duration-200">
                    Chat with us
                  </a>
                </div>
              </li>
              <li>
                <div className="text-gray-300">
                  <div className="font-medium">Email</div>
                  <a href="mailto:hello@trainwisestudio.com" className="text-gray-400 hover:text-orange transition-colors duration-200">
                    hello@trainwisestudio.com
                  </a>
                </div>
              </li>
              <li className="pt-2 border-t border-gray-700">
                <a href="/terms" className="text-gray-300 hover:text-orange transition-colors duration-200 block mb-2">
                  Terms of Service
                </a>
                <a href="/privacy" className="text-gray-300 hover:text-orange transition-colors duration-200 block">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center text-xs text-gray-400 mt-12">
          © TrainwiseStudio 2025. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
