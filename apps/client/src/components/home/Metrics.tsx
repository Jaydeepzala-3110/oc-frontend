"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const metrics = [
  { value: 1000000, label: 'Creator Earnings', prefix: '$' },
  { value: 500, label: 'Active Campaigns', prefix: '' },
  { value: 10000, label: 'Content Creators', prefix: '' },
];

function AnimatedCounter({ value, prefix }: { value: number, prefix: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = value / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={countRef} className="text-4xl font-bold text-brand-blue">
      {prefix}{new Intl.NumberFormat().format(count)}
    </div>
  );
}

export default function Metrics() {
  return (
    <section className="py-section bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {metrics.map((metric, i) => (
            <div key={i} className="space-y-4">
              <AnimatedCounter value={metric.value} prefix={metric.prefix} />
              <div className="text-gray-600 font-medium">{metric.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
