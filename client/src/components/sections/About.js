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

  // Default meaningful keywords about Madhumitha (max 2 words)
  const defaultKeywords = [
    'AI Engineer',
    'Full Stack',
    'SEO Expert',
    'Event Lead',
    'Freelancer',
  ];

  // Extract or use defaults
  const getKeywords = () => {
    if (aboutData?.highlights && aboutData.highlights.length > 0) {
      return aboutData.highlights.slice(0, 5).map(h => {
        const words = h.split(' ').slice(0, 2);
        return words.join(' ');
      });
    }
    return defaultKeywords;
  };

  const keywords = getKeywords();

  // Floating positions - FAR from image
  const floatingItems = [
    { top: '5%', left: '-18%', rotate: -8, doodle: 'sparkles' },
    { top: '15%', right: '-20%', rotate: 5, doodle: 'arrow' },
    { top: '50%', left: '-22%', rotate: -5, doodle: 'heart' },
    { bottom: '20%', right: '-18%', rotate: 8, doodle: 'star' },
    { bottom: '5%', left: '-16%', rotate: -10, doodle: 'underline' },
  ];

  // Doodle SVGs
  const Doodles = {
    sparkles: (
      <svg className="w-5 h-5 absolute -top-3 -right-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 2L12 6M12 18L12 22M6 12L2 12M22 12L18 12M6.34 6.34L3.51 3.51M20.49 20.49L17.66 17.66M6.34 17.66L3.51 20.49M20.49 3.51L17.66 6.34" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    arrow: (
      <svg className="w-6 h-6 absolute -bottom-2 -right-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M5 12h14m0 0l-7-7m7 7l-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    heart: (
      <svg className="w-4 h-4 absolute -top-2 -left-2" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
    star: (
      <svg className="w-5 h-5 absolute -top-2 -right-2" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.7-6.3 4.7 2.3-7-6-4.6h7.6z"/>
      </svg>
    ),
    underline: (
      <svg className="w-8 h-2 absolute -bottom-1 left-0" viewBox="0 0 40 8" fill="none" stroke="currentColor">
        <path d="M2 4 Q 10 6, 20 4 T 38 4" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  };

  return (
    <section id="about" className="py-24 px-4 bg-[color:var(--color-bg)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-2">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm md:text-base text-[color:var(--color-muted)] italic font-serif"
          >
            A little bit about me
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[color:var(--color-text)] font-serif"
          >
            Madhumitha S V
          </motion.h2>
          <div className="w-48 h-0.5 bg-[color:var(--color-text)] mx-auto" />
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 items-center">
          {/* LEFT - Image container */}
          <div className="lg:col-span-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto w-full max-w-sm"
            >
              {/* Main image - FIXED PATH */}
              <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-[color:var(--color-bg-elevated)] shadow-2xl">
                <img
                  src={aboutData?.image_url || '/profile.jpeg'}
                  alt="Madhumitha S V"
                  className="w-full h-full object-cover object-center"
                
                />
              </div>

              {/* Floating handwritten notes */}
              {keywords.map((keyword, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.15, duration: 0.5 }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  style={{
                    position: 'absolute',
                    ...floatingItems[idx],
                    zIndex: 10,
                  }}
                  className="hidden xl:block"
                >
                  <motion.div
                    animate={{
                      rotate: [
                        floatingItems[idx]?.rotate || 0,
                        (floatingItems[idx]?.rotate || 0) + 4,
                        floatingItems[idx]?.rotate || 0,
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative bg-[color:var(--color-bg)] border-2 border-[color:var(--color-text)] rounded-2xl px-4 py-2 shadow-lg"
                  >
                    <p
                      className="text-sm md:text-base text-[color:var(--color-text)] whitespace-nowrap font-semibold"
                      style={{ fontFamily: "'Caveat', cursive" }}
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
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 space-y-8"
          >
            <p className="text-base md:text-lg text-[color:var(--color-text)] leading-relaxed">
              {aboutData?.description}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="px-6 py-3 text-sm font-semibold rounded-xl bg-[color:var(--color-primary)] text-white shadow-lg hover:shadow-xl transition-shadow"
              >
                View My Work
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-6 py-3 text-sm font-semibold rounded-xl border-2 border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white transition-all"
              >
                Get In Touch
              </motion.a>
            </div>

            {/* Mobile highlights */}
            <div className="xl:hidden grid grid-cols-2 gap-3 pt-4">
              {keywords.map((keyword, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-3 bg-[color:var(--color-primary-soft)] border border-[color:var(--color-primary)]/30 rounded-xl text-center"
                >
                  <p className="text-xs text-[color:var(--color-primary)] font-medium">
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
