'use client';
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { title: 'Choose Campaign', desc: 'Browse live deals that fit your style.' },
  { title: 'Create Content', desc: 'Produce engaging short-form video.' },
  { title: 'Get Paid', desc: 'Earn per 1,000 real views.' },
];

export default function HowItWork() {
  return (
    <section
      className="py-20 bg-white"
      style={{
        background:
          'linear-gradient(90deg, #60A5FA 0%, #4F46E5 30%, #DB2777 60%, #7F1D1D 100%)',
      }}
    >
      <h2 className="text-3xl font-semibold text-center mb-12">How It Works</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-6">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="p-6 bg-indigo-50 rounded-2xl text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 * i, duration: 0.5 }}
          >
            <div className="text-4xl font-bold mb-4">{i + 1}</div>
            <h3 className="text-xl font-medium mb-2">{step.title}</h3>
            <p>{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
