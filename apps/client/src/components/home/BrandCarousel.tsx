'use client';
import React, { useState, useEffect } from 'react';
import { Star, Sparkles, TrendingUp, Globe, CheckCircle } from 'lucide-react';

const brands = [
  { name: 'Nike', color: 'from-orange-500 to-red-600' },
  { name: 'Adidas', color: 'from-blue-600 to-purple-600' },
  { name: 'Puma', color: 'from-yellow-500 to-orange-500' },
  { name: 'Under Armour', color: 'from-gray-600 to-black' },
  { name: 'New Balance', color: 'from-red-500 to-pink-600' },
  { name: 'Reebok', color: 'from-purple-600 to-blue-600' },
  { name: 'ASICS', color: 'from-green-500 to-teal-600' },
  { name: 'Fila', color: 'from-red-600 to-pink-500' },
  { name: 'Converse', color: 'from-black to-gray-700' },
  { name: 'Vans', color: 'from-orange-600 to-red-500' },
  { name: 'Jordan', color: 'from-red-600 to-black' },
  { name: 'Supreme', color: 'from-red-700 to-red-900' },
];

export default function ModernBrandCarousel() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div className="relative w-full">
        <div
          className={
            'relative w-full bg-slate-200 h-[2px] ' +
            'sm:h-[3px] md:h-[4px] ' +
            "before:content-[''] before:absolute before:-left-6 before:top-1/2 before:-translate-y-1/2 before:w-16 before:h-6 before:rounded-full " +
            'before:bg-gradient-to-r before:from-slate-300 before:to-transparent before:blur-xl ' +
            'sm:before:w-20 sm:before:h-8 md:before:w-24 md:before:h-10 ' +
            "after:content-[''] after:absolute after:-right-6 after:top-1/2 after:-translate-y-1/2 after:w-16 after:h-6 after:rounded-full " +
            'after:bg-gradient-to-l after:from-slate-300 after:to-transparent after:blur-xl ' +
            'sm:after:w-20 sm:after:h-8 md:after:w-24 md:after:h-10'
          }
        />
      </div>

      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24  bg-white text-slate-900">
        {/* Animated Background Elements (subtle on white) */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
            style={{
              background:
                'linear-gradient(45deg, rgba(59,130,246,0.18), rgba(139,92,246,0.18), rgba(236,72,153,0.14))',
              left: `${20 + mousePosition.x * 0.02}%`,
              top: `${10 + mousePosition.y * 0.02}%`,
              transition: 'all 4s ease-out',
            }}
          />

          <div
            className="absolute w-80 h-80 rounded-full blur-3xl opacity-22"
            style={{
              background:
                'linear-gradient(135deg, rgba(236,72,153,0.16), rgba(239,68,68,0.14), rgba(245,101,101,0.12))',
              right: `${15 + mousePosition.x * 0.01}%`,
              bottom: `${20 + mousePosition.y * 0.01}%`,
              transition: 'all 5s ease-out',
            }}
          />

          <div
            className="absolute w-64 h-64 rounded-full blur-2xl opacity-18 animate-pulse"
            style={{
              background:
                'radial-gradient(circle, rgba(131,58,180,0.12), rgba(253,29,29,0.1), rgba(252,176,64,0.08))',
              left: `${10 + mousePosition.x * 0.015}%`,
              top: `${60 + mousePosition.y * 0.01}%`,
              animationDuration: '4s',
            }}
          />

          <div
            className="absolute w-48 h-48 rounded-full blur-xl opacity-14 animate-bounce"
            style={{
              background:
                'linear-gradient(45deg, rgba(245,101,101,0.12), rgba(236,72,153,0.14), rgba(168,85,247,0.12))',
              right: `${5 + mousePosition.x * 0.008}%`,
              top: `${30 + mousePosition.y * 0.012}%`,
              animationDuration: '8s',
            }}
          />

          <div className="absolute top-20 left-10 opacity-20">
            <Star
              className="w-8 h-8 text-pink-400 animate-spin"
              style={{ animationDuration: '30s' }}
            />
          </div>
          <div className="absolute top-32 right-20 opacity-18">
            <Sparkles
              className="w-6 h-6 text-purple-300 animate-bounce"
              style={{ animationDelay: '2s' }}
            />
          </div>
          <div className="absolute bottom-20 left-1/4 opacity-20">
            <TrendingUp className="w-7 h-7 text-blue-300 animate-pulse" />
          </div>
          <div className="absolute bottom-32 right-1/3 opacity-16">
            <Globe
              className="w-6 h-6 text-pink-300 animate-spin"
              style={{ animationDuration: '15s' }}
            />
          </div>
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6">
          {/* Header Section */}
          <div
            className={`text-center mb-12 sm:mb-16 ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-2 mb-6 shadow-sm">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-slate-800">
                Trusted Partnership
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-4">
              <span className="block text-slate-900">Partnered with</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Global Brands
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
              Join thousands of creators working with the world's most
              innovative brands.
              <span className="text-pink-600 font-semibold">
                {' '}
                Your content, their campaigns, mutual success.
              </span>
            </p>
          </div>

          {/* Brand Carousel */}
          <div
            className={`relative ${
              isVisible ? 'animate-fade-in-right' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.3s' }}
          >
            <div className="overflow-hidden">
              {/* First Row - Moving Left */}
              <div className="flex animate-scroll-left mb-8">
                {[...brands, ...brands].map((brand, index) => (
                  <div
                    key={`row1-${index}`}
                    className="flex-shrink-0 mx-4 sm:mx-6 group"
                  >
                    <div className="relative w-48 sm:w-56 lg:w-64 h-20 sm:h-24 lg:h-28 bg-slate-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-slate-100 overflow-hidden">
                      {/* Unique gradient badge */}
                      <div
                        className={`absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br ${brand.color} shadow-inner`}
                      ></div>

                      {/* Brand gradient background */}
                      <div
                        className={`absolute inset-0 ${brand.color} opacity-20 group-hover:opacity-32 transition-opacity duration-300 pointer-events-none`}
                      />

                      {/* Centered Brand name */}
                      <div className="relative h-full flex items-center justify-center px-4">
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
                          {brand.name}
                        </span>
                      </div>

                      {/* Hover effect overlay (subtle) */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/30 to-white/0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Second Row - Moving Right */}
              <div className="flex animate-scroll-right">
                {[...brands.slice().reverse(), ...brands.slice().reverse()].map(
                  (brand, index) => (
                    <div
                      key={`row2-${index}`}
                      className="flex-shrink-0 mx-4 sm:mx-6 group"
                    >
                      <div className="relative w-48 sm:w-56 lg:w-64 h-20 sm:h-24 lg:h-28 bg-slate-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-slate-100 overflow-hidden">
                        <div
                          className={`absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br ${brand.color} shadow-inner`}
                        />

                        <div
                          className={`absolute inset-0 ${brand.color} opacity-12 group-hover:opacity-24 transition-opacity duration-300 pointer-events-none`}
                        />

                        <div className="relative h-full flex items-center justify-center px-4">
                          <span className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                            {brand.name}
                          </span>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Fade out edges (match white background) */}
            <div className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          </div>

          {/* Bottom Stats */}
          <div
            className={`mt-16 sm:mt-20 text-center ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.6s' }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto px-4 sm:px-6">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                  500+
                </div>
                <div className="text-sm sm:text-base text-slate-600">
                  Active Brands
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                  10K+
                </div>
                <div className="text-sm sm:text-base text-slate-600">
                  Creators
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                  50M+
                </div>
                <div className="text-sm sm:text-base text-slate-600">
                  Total Views
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                  $2M+
                </div>
                <div className="text-sm sm:text-base text-slate-600">
                  Paid Out
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @keyframes scroll-right {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }

          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fade-in-right {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-scroll-left {
            animation: scroll-left 30s linear infinite;
          }
          .animate-scroll-right {
            animation: scroll-right 30s linear infinite;
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out;
          }
          .animate-fade-in-right {
            animation: fade-in-right 0.8s ease-out;
          }

          .animate-scroll-left:hover,
          .animate-scroll-right:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>
    </>
  );
}
