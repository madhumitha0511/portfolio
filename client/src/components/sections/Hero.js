// ============================================
// HERO SECTION - Hero.js with 3D Animation
// ============================================
// Save as: src/components/sections/Hero.js

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { portfolioAPI } from '../../services/api';

// 3D Animated Sphere Component
const AnimatedSphere = () => {
  return (
    <Sphere args={[1, 100, 200]} scale={2}>
      <meshStandardMaterial
        color="#3B82F6"
        emissive="#1e40af"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
        wireframe={false}
      />
    </Sphere>
  );
};

const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [portfolioOwner, setPortfolioOwner] = useState(null);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const heroRes = await portfolioAPI.getHero();
      const ownerRes = await portfolioAPI.getOwner();
      setHeroData(heroRes.data);
      setPortfolioOwner(ownerRes.data);
    } catch (error) {
      console.error('Error fetching hero data:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-slate-900 via-blue-900 to-black flex items-center justify-center"
    >
      {/* 3D Background Animation */}
      <div className="absolute inset-0 opacity-40 z-0">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedSphere />
          <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} />
        </Canvas>
      </div>

      {/* Animated Background Circles */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 z-0"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 z-0"
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
      >
        {/* Greeting Animation */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-400 rounded-full text-blue-300 text-sm font-semibold"
          >
            👋 Welcome to my portfolio
          </motion.span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          {portfolioOwner?.first_name} {portfolioOwner?.last_name}
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          variants={itemVariants}
          className="text-xl md:text-2xl text-slate-300 mb-8"
        >
          {portfolioOwner?.bio || 'AI Engineer | Full Stack Developer'}
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Building innovative solutions with cutting-edge technology. Specialized
          in AI, Machine Learning, and Full-Stack Development.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
            }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition"
          >
            View My Work
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={portfolioOwner?.resume_url || '#'}
            className="px-8 py-4 bg-slate-800 border border-blue-500 text-blue-300 rounded-lg font-semibold hover:bg-slate-700 transition"
          >
            Download Resume
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex items-center justify-center">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-blue-400 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
