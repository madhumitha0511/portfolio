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

  return (
    <section
      id="about"
      className="relative py-20 px-4 bg-[color:var(--color-bg)] border-t border-[color:var(--color-border)] overflow-hidden"
    >
      {/* Subtle Background Mesh Gradient - Theme Adaptive */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[color:var(--color-primary)] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[color:var(--color-secondary)] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE - Premium 3D Image Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
            whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="relative w-full max-w-md mx-auto lg:mx-0"
          >
            <motion.div
              whileHover={{ 
                scale: 1.02, 
                rotateY: 5,
                rotateX: -2,
                transition: { duration: 0.3 }
              }}
              className="relative rounded-3xl overflow-hidden shadow-elevated"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-[color:var(--color-primary)] rounded-3xl blur-xl opacity-20 hover:opacity-40 transition-opacity" />
              
              {/* Image Container */}
              <div className="relative bg-[color:var(--color-bg-elevated)] rounded-3xl p-2 border border-[color:var(--color-border)]">
                <img
                  src="/profile.png"
                  alt="About Madhumitha"
                  className="w-full h-auto object-cover rounded-2xl"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-[color:var(--color-text)]"
            >
              A Little Bit{" "}
              <span className="text-[color:var(--color-primary)]">About Me</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl leading-relaxed text-[color:var(--color-muted)]"
            >
              {about.description}
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4"
            >
              {[
                { label: "Years Experience", value: "3+" },
                { label: "Projects", value: "15+" },
                { label: "Technologies", value: "10+" },
                { label: "Certifications", value: "5+" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  {/* Glow on Hover - Theme Adaptive */}
                  <div className="absolute inset-0 bg-[color:var(--color-primary-soft)] rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Card */}
                  <div className="relative bg-[color:var(--color-card)] rounded-xl p-5 border border-[color:var(--color-border)] shadow-soft text-center">
                    <p className="text-3xl md:text-4xl font-bold text-[color:var(--color-primary)]">
                      {stat.value}
                    </p>
                    <p className="text-xs md:text-sm text-[color:var(--color-muted)] mt-1">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              {/* View My Works */}
              <motion.a
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="group relative px-8 py-4 bg-transparent border-2 border-[color:var(--color-primary)] text-[color:var(--color-primary)] font-semibold rounded-xl overflow-hidden transition-all"
              >
                <div className="absolute inset-0 bg-[color:var(--color-primary)] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 group-hover:text-white transition-colors">
                  View My Works
                </span>
              </motion.a>

              {/* Get In Touch */}
              <motion.a
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="group relative px-8 py-4 bg-transparent border-2 border-[color:var(--color-secondary)] text-[color:var(--color-secondary)] font-semibold rounded-xl overflow-hidden transition-all"
              >
                <div className="absolute inset-0 bg-[color:var(--color-secondary)] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 group-hover:text-white transition-colors">
                  Get In Touch
                </span>
              </motion.a>

              {/* Download Resume */}
              <motion.a
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="/resume.pdf"
                download="Madhumitha_Resume.pdf"
                className="group relative px-8 py-4 bg-[color:var(--color-primary)] text-white font-semibold rounded-xl overflow-hidden transition-all shadow-soft"
              >
                <div className="absolute inset-0 bg-[color:var(--color-secondary)] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                  </svg>
                  Download Resume
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
