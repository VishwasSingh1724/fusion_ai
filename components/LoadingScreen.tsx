'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export const LoadingScreen: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate random particle positions
  useEffect(() => {
    const generateParticles = () => {
      const tempParticles: Particle[] = Array.from({ length: 50 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.5 + 0.3,
      }));
      setParticles(tempParticles);
    };
    generateParticles();
    window.addEventListener('resize', generateParticles);
    return () => window.removeEventListener('resize', generateParticles);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-indigo-900">
        <motion.div
          className="absolute inset-0"
          style={{ background: 'url(/path-to-stars.png)', backgroundSize: 'cover' }}
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Rotating 3D Object */}
      <motion.div
        className="relative z-10"
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-20"
          style={{
            boxShadow: '0 0 50px 10px rgba(128, 90, 213, 0.7)',
            clipPath: 'polygon(50% 0%, 100% 25%, 75% 100%, 25% 100%, 0% 25%)',
          }}
        />
      </motion.div>

      {/* Glowing Loading Text */}
      <motion.div
        className="absolute bottom-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <h1
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-400 animate-glitch"
        >
          Loading Your Experience...
        </h1>
      </motion.div>

      {/* Floating Particles */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            width: particle.size,
            height: particle.size,
            top: particle.y,
            left: particle.x,
            opacity: particle.opacity,
          }}
          animate={{ y: [particle.y, particle.y - 50] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      ))}
    </motion.div>
  );
};
