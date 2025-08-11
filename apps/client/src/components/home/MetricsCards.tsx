"use client";
import React from 'react';
import { motion } from 'framer-motion';

const metrics = [
  { title: 'Paid Out to Creators', value: '$2.5M+' },
  { title: 'Active Creators', value: '18K+' },
  { title: 'Organic Views', value: '500M+' },
  { title: 'Leading Brands', value: '200+' }
];

export default function MetricsCards() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold text-brand-blue mb-2">
                {metric.value}
              </h3>
              <p className="text-gray-600">{metric.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
