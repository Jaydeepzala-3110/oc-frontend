"use client";
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: "Brands Launch Campaigns in Minutes",
    description: "Brands define their objectives and set transparent, performance-based budgets for Content Creation, UGC, and Marketing campaigns."
  },
  {
    title: "Creators Engage & Create",
    description: "Our 17,000+ vetted Creators discover relevant campaigns, apply, and submit authentic, high-quality content across brands preferred social platforms."
  },
  {
    title: "We Verify Engagement",
    description: "Our proprietary AI-powered technology verifies real human views and engagement, filtering out all fraudulent activity and giving you realtime metrics on organic campaigns."
  },
  {
    title: "Everyone Gets Rewarded",
    description: "Brands pay only for verified results, ensuring guaranteed ROI, while Creators earn real-time, performance-based payouts for their impactful content."
  }
];

export default function Process() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold font-lexend-deca mb-4">
            How OnlyCreators Works
          </h2>
          <p className="text-xl text-gray-600">
            A simple, transparent process for brands and creators
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative z-10">
                <div className="flex items-start gap-6">
                  <span className="text-5xl font-bold text-brand-blue/20">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
              
              {/* Connector line for desktop */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full w-12 h-0.5 bg-brand-blue/20 -translate-y-1/2 z-0"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
