"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function CtaBanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-brand-teal to-brand-blue">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center text-white space-y-8"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-lexend-deca font-bold">
            Ready to Start Earning?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of creators who are turning their passion into profit.
          </p>
          <motion.button
            className="px-8 py-4 bg-brand-orange text-white rounded-full font-semibold text-lg hover:bg-opacity-90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
