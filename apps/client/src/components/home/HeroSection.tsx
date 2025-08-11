'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Play,
  ArrowRight,
  Star,
  TrendingUp,
  Users,
  DollarSign,
  User2Icon,
  ViewIcon,
} from 'lucide-react';
import { Twitter, Instagram, Youtube, Facebook } from 'lucide-react';

import userLogo from '../../../public/images/hero-img-main.png';

export default function HeroSection() {
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
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-70"
          style={{
            background:
              'linear-gradient(90deg, rgba(59,130,246,0.25), rgba(139,92,246,0.25))',
            left: `${mousePosition.x * 0.02}%`,
            top: `${mousePosition.y * 0.02}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 3s ease-out',
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full blur-2xl opacity-60"
          style={{
            background:
              'linear-gradient(90deg, rgba(236,72,153,0.18), rgba(239,68,68,0.12))',
            right: `${mousePosition.x * 0.01}%`,
            bottom: `${mousePosition.y * 0.01}%`,
            transition: 'all 4s ease-out',
          }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-16 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center min-h-[80vh] max-w-[1600px] mx-auto">
          {/* Left Content */}
          <div
            className={`space-y-6 sm:space-y-8 order-2 lg:order-1 ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <div className="mx-auto lg:mx-0 flex justify-center lg:justify-start items-center bg-white/8 backdrop-blur-sm border border-white/10 rounded-full py-2 px-5 text-sm text-white/90 w-fit gap-3">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>Trusted by 10K+ creators worldwide</span>
            </div>

            <div className="space-y-3 sm:space-y-4 flex flex-col lg:items-start justify-center items-center">
              <h1 className="text-center lg:text-start text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                <span className="block text-white">Turn Your</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-400 to-pink-400">
                  Content Into
                </span>
                <span className="block text-white">Revenue</span>
              </h1>

              <div className="lg:flex lg:justify-start">
                <p className="text-base text-center lg:text-start sm:text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed">
                  Join the revolution of creator monetization. Upload clips, get
                  matched with premium brands, and earn money for every view.
                  <span className="text-blue-400 font-semibold">
                    {' '}
                    Get paid instantly.
                  </span>
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center items-center lg:justify-start">
                <button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 h-12 sm:h-14 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 w-fit ">
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Start Creating</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(90deg,#7c3aed,#ec4899)',
                    }}
                  />
                </button>

                <button className="group bg-white/8 backdrop-blur-sm border border-white/10 text-white px-6 sm:px-8 h-12 sm:h-14 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg hover:bg-white/12 transition-all duration-300 flex items-center justify-center space-x-2 w-fit">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>

            <div className="flex lg:justify-start justify-center items-center text-sm text-gray-500">
              <div className="flex items-center mr-6">
                <div className="flex -space-x-2 mr-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-2 border-white"></div>
                </div>
                <span>Join 12,000+ happy customers</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center :flex-row md:items-center">
                <div className="flex items-center mr-2">
                  <svg
                    className="h-4 w-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    className="h-4 w-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    className="h-4 w-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    className="h-4 w-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg
                    className="h-4 w-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span>4.9/5 rating</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-5 md:gap-15 lg:justify-start sm:gap-6  lg:gap-20 pt-6 sm:pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-1" />
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                    1.2M+
                  </span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Monthly Views
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-1" />
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                    98%
                  </span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm">Payout Rate</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-1" />
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                    500+
                  </span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Active Brands
                </p>
              </div>
            </div>
          </div>

          <div
            className={`relative order-1 lg:order-2 ${
              isVisible ? 'animate-fade-in-right' : 'opacity-0'
            }`}
          >
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
              <div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/4 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={userLogo}
                    alt="Creator Studio"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="absolute top-6 left-6 bg-white/12 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/12">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white text-sm font-medium">Live</span>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 rounded-xl px-4 py-3 ">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-white text-sm font-semibold">
                        +$127.80
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10">
                      <User2Icon className="w-4 h-4 text-blue-400" />
                      <span className="text-white text-sm font-semibold">
                        +$127.80
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10">
                      <ViewIcon className="w-4 h-4 text-purple-400" />
                      <span className="text-white text-sm font-semibold">
                        +$127.80
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 pointer-events-none">
                <div className="pointer-events-auto absolute right-4 top-4 md:right-6 md:top-6 lg:right-10 lg:top-10 flex flex-col items-center">
                  <div className="w-12 sm:w-14 md:w-20 lg:w-32 xl:w-36 h-12 sm:h-14 md:h-20 lg:h-32 xl:h-36 rounded-full bg-red-600 ring-2 ring-white/20 shadow-2xl flex items-center justify-center rotate-6 hover:rotate-0 transition-transform">
                    <Youtube className="w-6 sm:w-7 md:w-10 lg:w-14 xl:w-16 h-6 sm:h-7 md:h-10 lg:h-14 xl:h-16 text-white" />
                  </div>
                </div>

                <div className="pointer-events-auto absolute left-4 bottom-4 md:left-6 md:bottom-6 lg:left-10 lg:bottom-10 flex flex-col items-center">
                  <div className="w-12 sm:w-14 md:w-20 lg:w-32 xl:w-36 h-12 sm:h-14 md:h-20 lg:h-32 xl:h-36 rounded-full bg-[#1877F2] ring-2 ring-white/20 shadow-2xl flex items-center justify-center -rotate-6 hover:-rotate-2 transition-transform">
                    <Facebook className="w-6 sm:w-7 md:w-10 lg:w-14 xl:w-16 h-6 sm:h-7 md:h-10 lg:h-14 xl:h-16 text-white" />
                  </div>
                </div>

                <div className="pointer-events-auto absolute left-4 md:left-8 top-28 md:top-36 lg:top-44 flex flex-col items-center">
                  <div className="w-11 sm:w-14 md:w-24 lg:w-28 xl:w-32 h-11 sm:h-14 md:h-24 lg:h-28 xl:h-32 rounded-full bg-[#1DA1F2] ring-2 ring-white/20 shadow-lg flex items-center justify-center rotate-3 hover:rotate-0 transition-transform">
                    <Twitter className="w-5 sm:w-6 md:w-12 lg:w-14 xl:w-16 h-5 sm:h-6 md:h-12 lg:h-14 xl:h-16 text-white" />
                  </div>
                </div>

                <div className="pointer-events-auto absolute md:left-8 md:top-80 lg:bottom-[1px] flex flex-col items-center">
                  <div
                    className="w-11 sm:w-14 md:w-24 lg:w-28 xl:w-25 h-11 sm:h-14 md:h-24 lg:h-28 xl:h-25 rounded-lg ring-2 ring-white/20 shadow-lg flex items-center justify-center -rotate-3 hover:rotate-0 transition-transform"
                    style={{
                      background:
                        'linear-gradient(45deg,#feda75,#d62976,#515bd4)',
                    }}
                  >
                    <Instagram className="w-5 sm:w-6 md:w-12 lg:w-14 xl:w-16 h-5 sm:h-6 md:h-12 lg:h-14 xl:h-16 text-white" />
                  </div>
                </div>

                {/* TikTok - vertically centered right */}
                <div className="pointer-events-auto absolute right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-12 sm:w-16 md:w-20 lg:w-28 xl:w-32 h-12 sm:h-16 md:h-20 lg:h-28 xl:h-32 rounded-full bg-black ring-2 ring-white/20 shadow-2xl flex items-center justify-center rotate-12 hover:rotate-0 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-8 sm:w-10 md:w-12 lg:w-14 xl:w-16 h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16"
                    >
                      <path
                        fill="#2EC6FF"
                        d="M12 3v7.2a3.8 3.8 0 1 0 3.8 3.8V8.6h1.8V5.6h-1.8V3z"
                        transform="translate(-0.6,0.2)"
                      />
                      <path
                        fill="#FF2EA6"
                        d="M12 3v7.2a3.8 3.8 0 1 0 3.8 3.8V8.6h1.8V5.6h-1.8V3z"
                        transform="translate(0.6,0.2)"
                      />
                      <path
                        fill="#FFFFFF"
                        d="M12 3v7.2a3.8 3.8 0 1 0 3.8 3.8V8.6h1.8V5.6h-1.8V3z"
                        transform="scale(1.15) translate(-1,-1)"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="absolute inset-x-0 bottom-6 flex justify-center z-20">
        <a
          href="#next-section"
          className="text-xs text-white/70 px-3 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/6"
        >
          Explore
        </a>
      </div> */}

      <style jsx>{`
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

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out 0.3s both;
        }
      `}</style>
    </section>
  );
}
