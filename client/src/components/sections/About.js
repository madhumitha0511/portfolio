// client/src/components/sections/About.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { aboutAPI } from "../../services/api";

const About = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await aboutAPI.get();
        setAbout(res.data[0] || res.data);
      } catch (err) {
        console.error("Error fetching about:", err);
      }
    };
    fetchAbout();
  }, []);

  if (!about) return null;

  const highlights = Array.isArray(about.highlights) 
    ? about.highlights 
    : JSON.parse(about.highlights || "[]");

  return (
    <section
      id="about"
      className="py-20 px-4 bg-[color:var(--color-bg)] border-t border-[color:var(--color-border)]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE - Image with Doodles */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="relative bg-[color:var(--color-card)] rounded-3xl p-8 shadow-soft border border-[color:var(--color-border)] overflow-visible">
            
              {/* Name */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl font-serif italic text-center text-[color:var(--color-text)] mb-8 border-b-2 border-[color:var(--color-text)] pb-2"
              >
                {about.title || "Madhumitha S V"}
              </motion.h2>

              {/* Profile Image - Full size, no background */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative mx-auto w-full max-w-sm"
              >
                <img
                  src="/profile.jpeg"
                  alt="Profile"
                  className="w-full h-auto object-cover rounded-2xl"
                />
                
                {/* Floating Doodle - Top Left with hand-drawn arrow */}
                <motion.div
                  animate={{ rotate: [0, 3, -3, 0], y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-8 -left-12 text-sm text-[color:var(--color-text)]"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  <div className="flex items-start gap-1 rotate-[-10deg]">
                    <svg width="30" height="30" viewBox="0 0 30 30" className="text-[color:var(--color-text)]">
                      <path d="M5 15 L15 5 L13 15 L20 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    </svg>
                    <span className="whitespace-nowrap">
                      {highlights[0] || "I play hockey in\nmy spare time"}
                    </span>
                  </div>
                </motion.div>

                {/* Floating Doodle - Top Right with curved arrow */}
                <motion.div
                  animate={{ rotate: [0, -3, 3, 0], y: [0, 3, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute -top-6 -right-14 text-sm text-center text-[color:var(--color-text)]"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  <div className="rotate-[8deg]">
                    <svg width="40" height="35" viewBox="0 0 40 35" className="text-[color:var(--color-text)] mx-auto mb-1">
                      <path d="M35 5 Q20 15 25 30 L28 25 M25 30 L20 28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    </svg>
                    <span className="block whitespace-nowrap">
                      {highlights[1] || "A love story\nthat never ends"}
                    </span>
                  </div>
                </motion.div>

                {/* Floating Doodle - Bottom Left with squiggle arrow */}
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0], x: [0, -2, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="absolute -bottom-10 -left-12 text-sm text-[color:var(--color-text)]"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  <div className="rotate-[-8deg]">
                    <span className="block whitespace-nowrap">
                      {highlights[2] || "Coffee over tea"}
                    </span>
                    <svg width="35" height="25" viewBox="0 0 35 25" className="text-[color:var(--color-text)] mt-1">
                      <path d="M5 5 Q10 15 15 10 T25 15 L22 18 M25 15 L27 10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    </svg>
                  </div>
                </motion.div>

                {/* Floating Doodle - Bottom Center with straight arrow */}
                <motion.div
                  animate={{ rotate: [0, -4, 4, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-sm text-[color:var(--color-text)]"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  <div className="rotate-[3deg] flex flex-col items-center">
                    <svg width="30" height="30" viewBox="0 0 30 30" className="text-[color:var(--color-text)]">
                      <path d="M15 5 L15 25 M15 25 L10 20 M15 25 L20 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    </svg>
                    <span className="whitespace-nowrap">{highlights[3] || "I take 4 holidays\na year!"}</span>
                  </div>
                </motion.div>

                {/* Floating Doodle - Bottom Right with curved pointer */}
                <motion.div
                  animate={{ rotate: [0, 4, -4, 0], x: [0, 3, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity }}
                  className="absolute -bottom-8 -right-16 text-sm text-center text-[color:var(--color-text)]"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  <div className="rotate-[10deg]">
                    <span className="block whitespace-nowrap">
                      {highlights[4] || "My favourite\ncolour is yellow"}
                    </span>
                    <svg width="40" height="25" viewBox="0 0 40 25" className="text-[color:var(--color-text)] mx-auto mt-1">
                      <path d="M5 5 Q15 10 25 5 T35 15 L32 10 M35 15 L30 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Heading, Description & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* About Heading */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-[color:var(--color-text)]"
            >
              About Madhumitha
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl leading-relaxed text-[color:var(--color-text)]"
            >
              {about.description}
            </motion.p>

            {/* CTA Buttons - No black background */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="px-8 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all"
              >
                View My Work
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-8 py-4 bg-transparent border-2 border-[#FF6B6B] text-[#FF6B6B] font-semibold rounded-xl hover:bg-[#FF6B6B] hover:text-white transition-all"
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
