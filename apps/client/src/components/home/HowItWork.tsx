'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Workflow } from 'lucide-react'; // Lucide icon for Pill

const steps = [
  {
    title: 'Choose Campaign',
    desc: 'Browse live deals that fit your style and preferences',
    icon: '📱',
  },
  {
    title: 'Create Content',
    desc: 'Produce engaging short-form video content for your audience',
    icon: '🎥',
  },
  {
    title: 'Submit & Review',
    desc: 'Our team ensures your content meets quality standards',
    icon: '✅',
  },
  {
    title: 'Get Paid',
    desc: 'Earn per 1,000 real views with transparent tracking',
    icon: '💰',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const demoRef = useRef(null);

  useEffect(() => {
    return () => {
      if (demoRef.current) clearInterval(demoRef.current);
    };
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (y - 0.5) * 12;
    const ry = (x - 0.5) * -12;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(12px) ${
      activeIndex === Number(el.dataset.index) ? 'scale(1.02)' : ''
    }`;
    el.style.transition = 'transform .18s cubic-bezier(.2,.9,.3,1)';
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = '';
    el.style.transition = 'transform .28s cubic-bezier(.2,.9,.3,1)';
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-cyan-400 to-fuchsia-500"
    >
      {/* Snake Gradient Background */}
      {/* Snake Gradient Background - horizontal on md+, vertical on mobile */}
      <div className="absolute left-0 right-0 top-0 h-full pointer-events-none z-0">
        {/* Horizontal (desktop / tablet) */}
        <svg
          className="hidden md:block w-full h-full"
          viewBox="0 0 1200 220"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="g1" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#7b61ff" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#ff7ab6" />
            </linearGradient>
          </defs>

          <path
            d="M60 140 C240 30, 360 220, 540 140 C720 60, 840 220, 1140 100"
            stroke="url(#g1)"
            strokeWidth="30"
            fill="none"
            strokeOpacity="0.95"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="filter drop-shadow-[0_12px_18px_rgba(123,97,255,0.25)]"
          />
          <path
            d="M60 140 C240 30, 360 220, 540 140 C720 60, 840 220, 1140 100"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="10"
            fill="none"
            strokeDasharray="30 120"
            strokeLinecap="round"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0; -150; -300"
              dur="6s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1 rounded-full border border-white/30 text-white font-medium shadow-lg">
          <Workflow size={16} />
          Process
        </div>
        <h2
          className="relative mt-10 text-3xl md:text-5xl font-extrabold text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] tracking-wide"
          style={{
            WebkitTextStroke: '1px rgba(255,255,255,0.4)',
            //         textShadow: `
            //   0 0 8px rgba(34,211,238,0.8),
            //   0 0 16px rgba(34,211,238,0.6),
            //   0 0 24px rgba(236,72,153,0.6)
            // `,
          }}
        >
          How <span className="text-cyan-300">OnlyCreator</span> Works
        </h2>
      </div>

      {/* Steps */}
      <div className="max-w-6xl mx-auto px-4 relative z-10 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {steps.map((step, idx) => {
            const isActive = activeIndex === idx;
            return (
              <motion.div
                key={idx}
                data-index={idx}
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
                onMouseEnter={() => setActiveIndex(idx)}
                className="relative overflow-hidden rounded-xl p-6 flex flex-col items-center justify-center text-center bg-black/40 border border-white/20 backdrop-blur-md shadow-xl transition-all w-[260px] h-[280px]"
                style={{
                  transform: isActive
                    ? 'translateY(-8px) scale(1.02)'
                    : undefined,
                  boxShadow: isActive
                    ? '0 20px 50px rgba(34,211,238,0.2), 0 6px 18px rgba(2,6,23,0.6)'
                    : undefined,
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                  style={{
                    background: 'linear-gradient(135deg,#7b61ff,#22d3ee)',
                    boxShadow:
                      '0 6px 18px rgba(0,0,0,0.5), 0 2px 8px rgba(255,255,255,0.05) inset',
                  }}
                >
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-white mt-4 drop-shadow-lg">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed mt-2 drop-shadow-md">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
