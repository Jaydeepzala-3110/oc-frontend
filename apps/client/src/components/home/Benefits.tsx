"use client";
import React from 'react';
import { motion } from 'framer-motion';

const benefits = [
  {
    title: 'For Creators',
    items: [
      'Monetize your content directly',
      'Work with top brands',
      'Flexible campaign options',
      'Real-time analytics'
    ]
  },
  {
    title: 'For Brands',
    items: [
      'Access top creators',
      'Performance-based pricing',
      'Detailed campaign metrics',
      'Brand safety controls'
    ]
  }
];

export default function Benefits() {
  return (
    <section className="py-section bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              className="space-y-6"
              initial={{ x: i === 0 ? -50 : 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-lexend-deca font-semibold text-brand-blue">
                {benefit.title}
              </h3>
              <ul className="space-y-4">
                {benefit.items.map((item, j) => (
                  <motion.li
                    key={j}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: j * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <svg
                      className="w-5 h-5 text-brand-teal"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
