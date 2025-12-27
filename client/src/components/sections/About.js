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
        // Assuming API returns single object or array with first item
        setAbout(res.data[0] || res.data);
      } catch (err) {
        console.error("Error fetching about:", err);
      }
    };
    fetchAbout();
  }, []);

  if (!about) return null;

  // Parse highlights array (stored as JSON in DB)
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
            <div className="relative bg-[color:var(--color-card)] rounded-3xl p-8 shadow-soft border border-[color:var(--color-border)] overflow-hidden">
              {/* Header Text */}
              <div className="flex justify-between items-start mb-6">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm italic text-[color:var(--color-muted)]"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  A little bit about me
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm italic text-[color:var(--color-muted)]"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  Studio Shostive
                </motion.p>
              </div>

              {/* Name */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl font-serif italic text-center text-[color:var(--color-text)] mb-8 border-b-2 border-[color:var(--color-text)] pb-2"
              >
                {about.title || "Your Name"}
              </motion.h2>

              {/* Profile Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative mx-auto w-64 h-80 mb-6"
              >
                <img
                  src="/profile.jpeg"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-2xl"
                />
                
                {/* Floating Doodle - Top Left */}
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0], y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-6 -left-8 text-sm font-handwriting text-[color:var(--color-text)]"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    <span className="rotate-[-15deg] block">
                      {highlights[0] || "I play hockey in my spare time"}
                    </span>
                  </div>
                </motion.div>

                {/* Floating Doodle - Top Right */}
                <motion.div
                  animate={{ rotate: [0, -5, 5, 0], y: [0, 5, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute -top-4 -right-10 text-sm text-center text-[color:var(--color-text)]"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  <div className="rotate-[10deg]">
                    <span className="text-3xl block">☕</span>
                    <span className="block mt-1">
                      {highlights[1] || "A love story that never ends"}
                    </span>
                  </div>
                </motion.div>

                {/* Floating Doodle - Bottom Left */}
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0], x: [0, -3, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="absolute -bottom-8 -left-10 text-sm text-[color:var(--color-text)]"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  <div className="rotate-[-12deg]">
                    <span className="block">
                      {highlights[2] || "Coffee over tea"}
                    </span>
                    <span className="text-2xl block mt-1">☕💛</span>
                  </div>
                </motion.div>

                {/* Floating Doodle - Bottom Center */}
                <motion.div
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-sm text-[color:var(--color-text)]"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  <div className="rotate-[5deg] flex items-center gap-1">
                    <span className="text-xl">🎉</span>
                    <span>{highlights[3] || "I take 4 holidays a year!"}</span>
                  </div>
                </motion.div>

                {/* Floating Doodle - Bottom Right */}
                <motion.div
                  animate={{ rotate: [0, 6, -6, 0], x: [0, 5, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity }}
                  className="absolute -bottom-6 -right-12 text-sm text-center text-[color:var(--color-text)]"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  <div className="rotate-[8deg]">
                    <span className="block">
                      {highlights[4] || "My favourite colour is yellow"}
                    </span>
                    <span className="text-2xl block mt-1">✨</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Description & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl leading-relaxed text-[color:var(--color-text)]"
            >
              {about.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-black rounded-2xl p-8 flex flex-wrap gap-4 justify-center"
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
