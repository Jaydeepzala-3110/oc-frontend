"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ParticleAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{x: number; y: number; dx: number; dy: number}> = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
};

export default function Banner() {
  return (
    <section className="relative flex items-center justify-center h-screen bg-gradient-to-br from-teal-600 to-blue-900 text-white overflow-hidden">
      <ParticleAnimation />

      <div className="absolute inset-0 bg-black opacity-20"></div>

      <motion.div
        className="relative z-10 text-center max-w-4xl px-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <motion.h1 
          className="text-6xl font-bold mb-6 font-lexend-deca"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Turn Views into Revenue
        </motion.h1>
        <motion.p 
          className="text-xl mb-12 opacity-90"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          Join the platform where creators meet brands. Transform your influence into income.
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <motion.button
            className="px-8 py-4 bg-[#F25C05] text-white rounded-full font-semibold hover:bg-[#E04E00] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Become a Creator
          </motion.button>
          <motion.button
            className="px-8 py-4 bg-white text-[#0B3D91] rounded-full font-semibold hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Launch Your Campaign
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
