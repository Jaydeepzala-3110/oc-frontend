"use client";
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { title: "Apply through the form", description: "Apply in under 2 minutes through the form." },
  { title: "Get an expert campaign strategy & setup call", description: "Get a personalized strategy call with our team within 24 hours. We'll help you define your goals and set up your first campaign brief." },
  { title: "Go Live & Get Results", description: "Launch your campaign immediately after. Watch content flow in and pay only for verified, bot-safe views and get a full refund if campaign goals are not met!" }
];

export default function GetStarted() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left side - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold font-lexend-deca mb-6">
                Start Your First Campaign<br />
                Within Hours
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Fill out the form to apply for platform access, create your campaign brief, and start earning verified views or write us an email to hello@onlycreators.com
              </p>
            </motion.div>

            <div className="space-y-8">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  className="flex gap-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-brand-blue">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side - Form */}
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Get Started Now</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                  rows={4}
                  placeholder="Tell us about your campaign goals..."
                ></textarea>
              </div>
              <motion.button
                className="w-full px-8 py-4 bg-brand-blue text-white rounded-full font-semibold hover:bg-brand-blue/90 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Application
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
