'use client';
import React from 'react';
import { motion } from 'framer-motion';

const goals = [
  {
    title: 'For Brands & Artists',
    subtitle: 'Launch a Campaign. Grow Your Brand.',
    description:
      'Access our 18K+ Creator Network to launch campaigns in minutes - from Content Creation to UGC. Drive real engagement, track performance with real-time analytics, and pay only for verified bot-safe views.',
    buttonText: 'Launch Your First Campaign',
    buttonVariant: 'blue',
    icon: (
      <svg
        className="w-16 h-16 text-blue-500"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L14.09 8.26L22 9L16 14.74L17.18 22.02L12 19L6.82 22.02L8 14.74L2 9L9.91 8.26L12 2Z"
          fill="currentColor"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    ),
    stats: [
      { number: '18K+', label: 'Creators' },
      { number: '99.9%', label: 'Real Views' },
      { number: '24/7', label: 'Analytics' },
    ],
  },
  {
    title: 'Join the Platform',
    subtitle: 'Create, Earn, Go Viral.',
    description:
      'Join our thriving community of 17,000+ passionate Creators. Get paid to make compelling content for top brands and artists, turning your creativity into consistent income. Thousands of Creators are already earning real-time rewards and going viral.',
    buttonText: 'Join as Reeler',
    buttonVariant: 'orange',
    icon: (
      <svg
        className="w-16 h-16 text-orange-500"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2"
          y="3"
          width="20"
          height="14"
          rx="2"
          fill="currentColor"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="m7 21 5-5 5 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 17v4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polygon points="10,8 10,14 16,11" fill="currentColor" />
      </svg>
    ),
    stats: [
      { number: '17K+', label: 'Active Creators' },
      { number: '$2M+', label: 'Paid Out' },
      { number: '100M+', label: 'Views Generated' },
    ],
  },
];

export default function GoalCards() {
  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-20">
        {/* Floating geometric shapes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Grid background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Choose Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400">
              Journey
            </span>
          </h2>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Whether you're a brand looking to grow or a creator ready to earn,
            we've got the perfect path for you.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row flex-wrap justify-center items-start gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full">
          {goals.map((goal, i) => (
            <motion.div
              key={i}
              className="relative group w-full max-w-[320px] sm:max-w-[520px] md:max-w-[600px] lg:max-w-[680px] mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {/* Card Container */}

              {/* <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 shadow-2xl overflow-hidden h-full min-h-[650px] flex flex-col"> */}
              <div
                className="relative h-full flex flex-col justify-between rounded-2xl
                     p-5 sm:p-8 lg:p-6
                     bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg
                     border border-white/20 shadow-2xl overflow-hidden
                     min-h-[420px] sm:min-h-[520px] md:min-h-[560px] lg:min-h-[460px]"
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      goal.buttonVariant === 'blue'
                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))'
                        : 'linear-gradient(135deg, rgba(251, 146, 60, 0.1), rgba(239, 68, 68, 0.1))',
                  }}
                />

                {/* Floating icon */}
                <motion.div
                  className="absolute top-6 right-6 opacity-30"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  {goal.icon}
                </motion.div>

                <div className="relative z-10">
                  {/* Title badge */}
                  <motion.span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
                      goal.buttonVariant === 'blue'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {goal.title}
                  </motion.span>

                  <h3 className="text-3xl font-bold mb-4 text-white leading-tight">
                    {goal.subtitle}
                  </h3>

                  <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                    {goal.description}
                  </p>

                  {/* Added this container */}
                  <motion.button
                    className={`mt-auto px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-white relative overflow-hidden group/btn ${
                      goal.buttonVariant === 'blue'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400'
                    } transition-all duration-300 shadow-lg`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {goal.buttonText}
                  </motion.button>
                </div>

                {/* Card border glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(45deg, transparent, ${
                      goal.buttonVariant === 'blue'
                        ? 'rgba(59, 130, 246, 0.3)'
                        : 'rgba(251, 146, 60, 0.3)'
                    }, transparent)`,
                    padding: '2px',
                    WebkitMask:
                      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'exclude',
                  }}
                />
              </div>

              {/* Floating particles around cards */}
              <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(8)].map((_, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    style={{
                      left: `${25 * (idx % 4)}%`,
                      top: `${25 * Math.floor(idx / 4)}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.1,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Large background decorative elements */}
      <motion.div
        className="absolute top-1/4 -left-20 w-80 h-80 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full filter blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full filter blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </section>
  );
}
