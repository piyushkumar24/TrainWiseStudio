
import React, { useState, useEffect } from 'react';
import { ArrowUp, Zap, Heart } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Maria",
      age: 34,
      tagline: "From tired mom to confident athlete",
      quote: "I never thought I'd stick to a routine again. This gave me structure, motivation, and a coach who actually cares. My energy is back — and so is my smile.",
      result: "Lost 12kg in 3 months",
      icon: ArrowUp,
      gradient: "bg-gradient-to-r from-pink-400 to-pink-500",
      badgeGradient: "bg-gradient-to-r from-pink-400 to-pink-500",
      avatar: "👩🏼"
    },
    {
      id: 2,
      name: "James",
      age: 28,
      tagline: "Gained energy & confidence",
      quote: "The nutrition plans changed everything. I finally understand how to fuel my body properly. My productivity skyrocketed.",
      result: "Gained 8kg muscle",
      icon: Zap,
      gradient: "bg-gradient-to-r from-blue-400 to-blue-500",
      badgeGradient: "bg-gradient-to-r from-blue-400 to-blue-500",
      avatar: "👨🏻"
    },
    {
      id: 3,
      name: "Sofia",
      age: 29,
      tagline: "Transformed my mindset",
      quote: "The mental wellness program was a game-changer. I learned to manage stress, stay focused, and find balance. I'm mentally resilient.",
      result: "Reduced stress by 70%",
      icon: Heart,
      gradient: "bg-gradient-to-r from-purple-400 to-purple-500",
      badgeGradient: "bg-gradient-to-r from-purple-400 to-purple-500",
      avatar: "👩🏽"
    }
  ];

  // Auto-slide every 5-6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="relative py-28 px-6 sm:px-12 bg-[#F1F1F1] overflow-hidden font-dm-sans">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Floating Emojis */}
        <div className="absolute top-20 left-10 text-4xl opacity-30 blur-sm animate-pulse scale-75">💪</div>
        <div className="absolute top-32 right-16 text-3xl opacity-30 blur-sm animate-pulse delay-1000 scale-75">🧠</div>
        <div className="absolute bottom-32 left-20 text-3xl opacity-30 blur-sm animate-pulse delay-2000 scale-75">🥗</div>
        <div className="absolute bottom-20 right-10 text-4xl opacity-30 blur-sm animate-pulse delay-500 scale-75">🧘</div>
        <div className="absolute top-1/2 left-8 text-3xl opacity-30 blur-sm animate-pulse delay-3000 scale-75">✨</div>
        
        {/* Trusted By Badge - Desktop Only */}
        <div className="hidden md:block absolute top-4 right-4 z-10">
          <div className="bg-white text-gray-700 border rounded-full px-3 py-1 shadow-sm text-xs font-medium">
            Trusted by 1,000+ users
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 animate-fade-in">
            What Clients Are Saying
          </h2>
          <p className="text-base text-gray-600 text-center mb-20 animate-fade-in" style={{ animationDelay: '100ms' }}>
            These results are real. So is your potential.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative w-full">
          {/* Unified horizontal scroll for all screen sizes with hidden scrollbar */}
          <div className="flex overflow-x-auto snap-x scroll-smooth gap-6 scrollbar-hide pb-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-3xl shadow-xl p-6 w-[300px] md:w-[340px] flex-shrink-0 snap-center relative mb-4"
              >
                {/* Top gradient border */}
                <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-3xl ${testimonial.gradient}`}></div>
                
                {/* Top section with icon and quote mark */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`rounded-xl p-3 ${testimonial.gradient} w-10 h-10 flex items-center justify-center`}>
                    <testimonial.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-gray-200 text-5xl leading-none">"</div>
                </div>
                
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                </div>
                
                {/* Name and age */}
                <h3 className="font-bold text-lg text-gray-900 text-center mb-1">
                  {testimonial.name}, {testimonial.age}
                </h3>
                
                {/* Tagline */}
                <p className="text-gray-600 text-sm text-center mb-3">
                  {testimonial.tagline}
                </p>
                
                {/* Stars */}
                <div className="flex justify-center mb-4 text-yellow-400">
                  ⭐⭐⭐⭐⭐
                </div>
                
                {/* Quote */}
                <blockquote className="text-gray-700 italic text-sm leading-relaxed text-center mb-4">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Result badge */}
                <div className="text-center">
                  <span className={`${testimonial.badgeGradient} text-white font-semibold rounded-full px-4 py-2 text-sm inline-block shadow`}>
                    ✨ {testimonial.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Note */}
        <div className="text-center text-sm text-gray-500 mt-10 italic animate-fade-in" style={{ animationDelay: '800ms' }}>
          You could be next.
        </div>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Safari and Chrome */
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
