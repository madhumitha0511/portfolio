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

  // Dynamic positioning configurations based on index
  const getHighlightConfig = (index, total) => {
    const configs = [
      // Top Left
      {
        position: "absolute -top-12 -left-16 text-base",
        rotation: "rotate-[-10deg]",
        flexDirection: "flex items-start gap-2",
        arrow: <svg width="35" height="35" viewBox="0 0 35 35" className="text-[color:var(--color-text)] flex-shrink-0">
          <path d="M5 20 L18 5 L15 20 L25 15" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </svg>,
        arrowPosition: "before",
        animate: { rotate: [0, 3, -3, 0], y: [0, -3, 0] },
        duration: 3
      },
      // Top Right
      {
        position: "absolute -top-10 -right-20 text-base text-center",
        rotation: "rotate-[8deg]",
        flexDirection: "flex flex-col items-center",
        arrow: <svg width="45" height="40" viewBox="0 0 45 40" className="text-[color:var(--color-text)] mt-1">
          <path d="M40 5 Q25 20 30 35 L33 30 M30 35 L25 33" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </svg>,
        arrowPosition: "after",
        animate: { rotate: [0, -3, 3, 0], y: [0, 3, 0] },
        duration: 2.5
      },
      // Middle Right
      {
        position: "absolute top-1/3 -right-24 text-base text-center",
        rotation: "rotate-[6deg]",
        flexDirection: "flex flex-col items-center",
        arrow: <svg width="40" height="35" viewBox="0 0 40 35" className="text-[color:var(--color-text)] mb-1">
          <path d="M35 10 L15 15 L25 20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </svg>,
        arrowPosition: "before",
        animate: { rotate: [0, 4, -4, 0], x: [0, 4, 0] },
        duration: 2.8
      },
      // Bottom Left
      {
        position: "absolute -bottom-14 -left-20 text-base",
        rotation: "rotate-[-8deg]",
        flexDirection: "flex flex-col items-start",
        arrow: <svg width="40" height="30" viewBox="0 0 40 30" className="text-[color:var(--color-text)] mt-1 ml-2">
          <path d="M5 5 Q12 18 20 12 T32 20 L28 23 M32 20 L34 15" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </svg>,
        arrowPosition: "after",
        animate: { rotate: [0, 5, -5, 0], x: [0, -2, 0] },
        duration: 3.5
      },
      // Bottom Right
      {
        position: "absolute -bottom-12 -right-24 text-base text-center",
        rotation: "rotate-[10deg]",
        flexDirection: "flex flex-col items-center",
        arrow: <svg width="45" height="30" viewBox="0 0 45 30" className="text-[color:var(--color-text)] mb-1">
          <path d="M5 10 Q18 15 30 8 T40 20 L37 15 M40 20 L35 23" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </svg>,
        arrowPosition: "before",
        animate: { rotate: [0, 4, -4, 0], x: [0, 3, 0] },
        duration: 3.2
      },
      // Middle Left
      {
        position: "absolute top-1/2 -left-24 text-base",
        rotation: "rotate-[-12deg]",
        flexDirection: "flex items-center gap-2",
        arrow: <svg width="40" height="30" viewBox="0 0 40 30" className="text-[color:var(--color-text)]">
          <path d="M5 15 L25 10 L20 20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </svg>,
        arrowPosition: "before",
        animate: { rotate: [0, -5, 5, 0], x: [0, -3, 0] },
        duration: 3.3
      },
      // Bottom Center
      {
        position: "absolute -bottom-16 left-1/2 -translate-x-1/2 text-base text-center",
        rotation: "rotate-[4deg]",
        flexDirection: "flex flex-col items-center",
        arrow: <svg width="30" height="35" viewBox="0 0 30 35" className="text-[color:var(--color-text)] mt-1">
          <path d="M15 5 L15 30 M15 30 L10 25 M15 30 L20 25" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </svg>,
        arrowPosition: "after",
        animate: { rotate: [0, -3, 3, 0], y: [0, 2, 0] },
        duration: 2.9
      },
      // Top Center
      {
        position: "absolute -top-16 left-1/2 -translate-x-1/2 text-base text-center",
        rotation: "rotate-[-5deg]",
        flexDirection: "flex flex-col items-center",
        arrow: <svg width="30" height="35" viewBox="0 0 30 35" className="text-[color:var(--color-text)] mb-1">
          <path d="M15 30 L15 5 M15 5 L10 10 M15 5 L20 10" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </svg>,
        arrowPosition: "before",
        animate: { rotate: [0, 3, -3, 0], y: [0, -2, 0] },
        duration: 3.1
      }
    ];

    return configs[index % configs.length];
  };

  return (
    <section
      id="about"
      className="py-20 px-4 bg-[color:var(--color-bg)] border-t border-[color:var(--color-border)]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE - Image with Dynamic Doodles */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
          >
            {/* Profile Image Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative w-full max-w-md"
            >
              <img
                src="/profile.jpeg"
                alt="Madhumitha S V"
                className="w-full h-auto object-cover rounded-3xl shadow-soft"
              />
              
              {/* Dynamic Floating Doodles */}
              {highlights.map((highlight, index) => {
                const config = getHighlightConfig(index, highlights.length);
                
                return (
                  <motion.div
                    key={index}
                    animate={config.animate}
                    transition={{ duration: config.duration, repeat: Infinity }}
                    className={config.position}
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    <div className={`${config.rotation} ${config.flexDirection}`}>
                      {config.arrowPosition === "before" && config.arrow}
                      
                      <span className="bg-[color:var(--color-bg)]/95 px-3 py-2 rounded-lg shadow-md text-[color:var(--color-text)] font-semibold whitespace-pre-line leading-tight text-sm">
                        {highlight}
                      </span>
                      
                      {config.arrowPosition === "after" && config.arrow}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
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

            {/* CTA Buttons */}
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
