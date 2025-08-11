"use client";
import React from 'react';
import { motion } from 'framer-motion';

const goals = [
  {
    title: "For Brands & Artists",
    subtitle: "Launch a Campaign. Grow Your Brand.",
    description: "Access our 18K+ Creator Network to launch campaigns in minutes - from Content Creation to UGC. Drive real engagement, track performance with real-time analytics, and pay only for verified bot-safe views.",
    buttonText: "Launch Your First Campaign",
    buttonVariant: "blue"
  },
  {
    title: "Join the Platform",
    subtitle: "Create, Earn, Go Viral.",
    description: "Join our thriving community of 17,000+ passionate Creators. Get paid to make compelling content for top brands and artists, turning your creativity into consistent income. Thousands of Creators are already earning real-time rewards and going viral.",
    buttonText: "Join as Creator",
    buttonVariant: "orange"
  }
];

export default function GoalCards() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {goals.map((goal, i) => (
            <motion.div
              key={i}
              className="relative p-12 rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent rounded-3xl"></div>
              
              <div className="relative">
                <span className="text-brand-blue font-medium mb-4 block">
                  {goal.title}
                </span>
                <h3 className="text-3xl font-bold mb-6 font-lexend-deca">
                  {goal.subtitle}
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  {goal.description}
                </p>
                <motion.button
                  className={`px-8 py-4 rounded-full font-semibold text-white
                    ${goal.buttonVariant === 'blue' ? 'bg-brand-blue hover:bg-brand-blue/90' : 'bg-brand-orange hover:bg-brand-orange/90'}
                    transition-all`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {goal.buttonText}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-blue/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-teal/5 rounded-full filter blur-3xl -z-10"></div>
    </section>
  );
}
