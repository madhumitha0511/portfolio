// client/src/components/sections/About.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioAPI } from '../../services/api';

export const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await portfolioAPI.getAbout();
        setAboutData(res.data);
      } catch (err) {
        console.error('Error fetching about:', err);
      }
    };
    fetchAbout();
  }, []);

  // Hardcoded keywords exactly like the reference image style
  const keywords = [
    'AI Engineer',
    'Team Lead',
    'Full Stack Developer',
    'Student Coordinator',
    'Freelancer',
  ];

  // Floating positions matching reference layout
  const floatingItems = [
    { top: '8%', right: '105%', rotate: -6, doodle: 'sparkles' },      // Top-left
    { top: '10%', left: '105%', rotate: 8, doodle: 'swirl' },          // Top-right  
    { top: '45%', right: '108%', rotate: -5, doodle: 'hearts' },       // Middle-left
    { bottom: '25%', left: '106%', rotate: 6, doodle: 'leaves' },      // Bottom-right
    { bottom: '10%', right: '110%', rotate: -8, doodle: 'star' },      // Bottom-left
  ];

  // Hand-drawn doodle decorations
  const Doodles = {
    sparkles: (
      <svg className="w-6 h-6 absolute -top-2 -left-2 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M8.757 15.243l-2.121 2.121m12.728 0l-2.121-2.121M8.757 8.757L6.636 6.636" strokeLinecap="round"/>
      </svg>
    ),
    swirl: (
      <svg className="w-8 h-8 absolute -bottom-3 -right-3 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12c0 5-4 9-9 9s-9-4-9-9 4-9 9-9c2 0 3.8.8 5.1 2.1" strokeLinecap="round"/>
      </svg>
    ),
    hearts: (
      <svg className="w-5 h-5 absolute -top-2 -right-1 opacity-70" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        <path d="M8 8c.5-.5 1-1 2-1 0 0 1 0 1.5.5" fill="none" stroke="white" strokeWidth="1.5"/>
      </svg>
    ),
    leaves: (
      <svg className="w-6 h-6 absolute -bottom-2 -left-2 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 3v4m-4-2l2.5 2.5M7 7l2.5 2.5" strokeLinecap="round"/>
      </svg>
    ),
    star: (
      <svg className="w-5 h-5 absolute -top-2 -right-2 opacity-70" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.7-6.3 4.7 2.3-7-6-4.6h7.6z"/>
      </svg>
    ),
  };

  return (
    <section id="about" className="py-24 px-4 bg-[color:var(--color-bg)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - exactly like reference */}
        <div className="text-center mb-20 space-y-3">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm text-[color:var(--color-muted)] italic tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A little bit about me
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-[color:var(--color-text)]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Madhumitha S V
          </motion.h2>
          <div className="w-64 h-px bg-[color:var(--color-text)] mx-auto" />
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-20 items-center">
          {/* LEFT - Image with floating notes */}
          <div className="lg:col-span-2 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-sm"
            >
              {/* Main image */}
              <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-[color:var(--color-bg-elevated)] shadow-2xl border-4 border-[color:var(--color-border)]">
                <img
                  src={aboutData?.image_url || '/profile.jpeg'}
                  alt="Madhumitha S V"
                  className="w-full h-full object-cover object-center"
                 
                />
              </div>

              {/* Floating handwritten notes - exactly like reference */}
              {keywords.map((keyword, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.15, duration: 0.4 }}
                  style={{
                    position: 'absolute',
                    ...floatingItems[idx],
                    zIndex: 10,
                  }}
                  className="hidden xl:block"
                >
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                      rotate: [
                        floatingItems[idx]?.rotate,
                        floatingItems[idx]?.rotate + 3,
                        floatingItems[idx]?.rotate,
                      ],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative bg-[color:var(--color-bg)] border-2 border-[color:var(--color-text)] rounded-2xl px-4 py-2 shadow-xl"
                  >
                    <p
                      className="text-base md:text-lg text-[color:var(--color-text)] whitespace-nowrap font-bold leading-tight"
                      style={{ 
                        fontFamily: "'Caveat', cursive",
                        letterSpacing: '0.02em'
                      }}
                    >
                      {keyword}
                    </p>
                    <div className="text-[color:var(--color-primary)]">
                      {Doodles[floatingItems[idx]?.doodle]}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT - Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3 space-y-8"
          >
            <p className="text-base md:text-lg text-[color:var(--color-text)] leading-relaxed">
              {aboutData?.description }
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="px-8 py-3 text-sm font-semibold rounded-full bg-[color:var(--color-primary)] text-white shadow-lg hover:shadow-xl transition-all"
              >
                View My Work
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-8 py-3 text-sm font-semibold rounded-full border-2 border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white transition-all"
              >
                Get In Touch
              </motion.a>
            </div>

            {/* Mobile: show keywords as grid */}
            <div className="xl:hidden grid grid-cols-2 gap-3 pt-6">
              {keywords.map((keyword, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-3 bg-[color:var(--color-primary-soft)] border border-[color:var(--color-primary)]/30 rounded-xl text-center"
                >
                  <p 
                    className="text-sm text-[color:var(--color-primary)] font-semibold"
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    {keyword}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
