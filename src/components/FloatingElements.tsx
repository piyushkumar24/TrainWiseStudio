"use client"

import React from 'react';

const FloatingElements = () => {
  return (
    <>
      {/* Floating Avatar 1 */}
      <div className="absolute top-20 left-10 animate-pulse">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg blur-sm opacity-70 transform scale-95">
          JD
        </div>
      </div>

      {/* Floating Avatar 2 */}
      <div className="absolute top-32 right-8 animate-pulse delay-1000">
        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-400 to-red-500 flex items-center justify-center text-white font-bold shadow-lg blur-sm opacity-60 transform scale-90">
          SM
        </div>
      </div>

      {/* Testimonial Card 1 */}
      <div className="absolute top-1/3 left-4 animate-pulse delay-2000 transform rotate-[-5deg]">
        <div className="bg-white/80 backdrop-blur-md p-3 rounded-lg shadow-lg max-w-[200px] blur-sm opacity-70 scale-95">
          <p className="text-xs text-gray-600 mb-2">"Lost 25lbs in 3 months!"</p>
          <p className="text-xs font-semibold text-charcoal">- Sarah M.</p>
        </div>
      </div>

      {/* Testimonial Card 2 */}
      <div className="absolute bottom-1/3 right-6 animate-pulse delay-3000 transform rotate-[3deg]">
        <div className="bg-white/80 backdrop-blur-md p-3 rounded-lg shadow-lg max-w-[180px] blur-sm opacity-60 scale-90">
          <p className="text-xs text-gray-600 mb-2">"Best coach ever!"</p>
          <p className="text-xs font-semibold text-charcoal">- Mike R.</p>
        </div>
      </div>

      {/* Success Tag */}
      <div className="absolute bottom-20 left-8 animate-pulse delay-4000">
        <div className="bg-gradient-to-r from-orange to-orange-hover text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg blur-sm opacity-80 transform scale-95">
          🔥 Success Unlocked
        </div>
      </div>

      {/* Floating Avatar 3 */}
      <div className="absolute bottom-32 right-20 animate-pulse delay-500">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg blur-sm opacity-50 transform scale-85">
          AL
        </div>
      </div>

      {/* Additional Success Tag */}
      <div className="absolute top-1/2 right-4 animate-pulse delay-1500 transform rotate-[8deg]">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg blur-sm opacity-70 transform scale-90">
          ✨ Transformed
        </div>
      </div>
    </>
  );
};

export default FloatingElements;
