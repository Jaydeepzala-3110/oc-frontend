"use client";
import React from 'react';
import { motion } from 'framer-motion';

const campaigns = [
  {
    title: 'Sports Wear Promotion',
    brand: 'Athletic Co.',
    reward: '$50 per 1k views',
    image: '/campaign1.jpg'
  },
  {
    title: 'Healthy Lifestyle',
    brand: 'Wellness Brand',
    reward: '$45 per 1k views',
    image: '/campaign2.jpg'
  },
  {
    title: 'Tech Review',
    brand: 'Tech Giant',
    reward: '$60 per 1k views',
    image: '/campaign3.jpg'
  }
];

export default function FeaturedCampaigns() {
  return (
    <section className="py-section bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-lexend-deca text-center mb-12">Featured Campaigns</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {campaigns.map((campaign, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-lg"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                <p className="text-gray-600 mb-4">By {campaign.brand}</p>
                <div className="text-brand-orange font-semibold">{campaign.reward}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
