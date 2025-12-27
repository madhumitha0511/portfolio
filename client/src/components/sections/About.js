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

  // Position mapping for floating highlights (like in the inspo image)
  const highlightPositions = [
    { top: '10%', left: '-8%', rotate: -5 },    // Top-left
    { top: '15%', right: '-10%', rotate: 8 },   // Top-right
    { bottom: '35%', left: '-12%', rotate: -8 }, // Middle-left
    { bottom: '15%', right: '-8%', rotate: 5 },  // Bottom-right
  ];

  return (
    <section id="about" className="py-24 px-4 bg-[color:var(--color-bg)] relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[color:var(--color-primary)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[color:var(--color-primary)]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-[color:var(--color-text)]"
        >
          A little bit about me
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE - Image with floating highlights */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main image container */}
            <div className="relative mx-auto max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-soft border-4 border-[color:var(--color-border)] bg-[color:var(--color-card)]">
              <img
                  src={aboutData?.image_url || '/profile.jpeg'}
                  alt="Madhumitha S V"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x533/F5E6D3/1F2933?text=Madhumitha+S+V';
                  }}
                />
            </div>

            {/* Floating highlight bubbles around image */}
            {aboutData?.highlights?.slice(0, 4).map((highlight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 0 }}
                style={{
                  position: 'absolute',
                  ...highlightPositions[idx],
                  transform: `rotate(${highlightPositions[idx].rotate}deg)`,
                }}
                className="hidden lg:block bg-[color:var(--color-bg-elevated)] border-2 border-[color:var(--color-primary)] rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm"
              >
                <p className="text-[11px] md:text-xs font-handwriting text-[color:var(--color-text)] whitespace-nowrap max-w-[160px]">
                  {highlight}
                </p>
                {/* Hand-drawn arrow or doodle */}
                <svg
                  className="absolute -bottom-2 -right-2 w-6 h-6 text-[color:var(--color-primary)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.div>
            ))}

            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-12 h-12 opacity-20"
            >
              <svg viewBox="0 0 100 100" className="text-[color:var(--color-primary)]">
                <circle cx="50" cy="50" r="40" fill="currentColor" />
              </svg>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Detailed description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-base md:text-lg text-[color:var(--color-text)] leading-relaxed mb-6">
                {aboutData?.description}
              </p>
            </motion.div>

            {/* Mobile-only highlights (grid below on small screens) */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {aboutData?.highlights?.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 bg-[color:var(--color-primary-soft)] border border-[color:var(--color-primary)]/30 rounded-xl"
                >
                  <p className="text-xs md:text-sm text-[color:var(--color-primary)] font-medium">
                    {highlight}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Optional: Stats or CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 pt-6"
            >
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
