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
      className="relative py-20 px-4 overflow-hidden" // ✅ REMOVED bg/border-t
    >
      {/* ✅ GLASS CONTENT CONTAINER */}
      <div className="relative max-w-7xl mx-auto backdrop-blur-xl bg-[color:var(--color-card)]/10 border border-[color:var(--color-border)]/40 rounded-4xl p-8 md:p-12 mx-4 shadow-2xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE - Glass Image Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotateY: -10 }}
            whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.25 }}
            className="relative w-full max-w-md mx-auto lg:mx-0"
          >
            <motion.div
              whileHover={{
                scale: 1.02,
                rotateY: 4,
                rotateX: -2,
                transition: { duration: 0.3 },
              }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-[color:var(--color-border)]/50 bg-[color:var(--color-card)]/80 backdrop-blur-xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Glass accent top bar */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[color:var(--color-primary)]/80 via-[color:var(--color-secondary)]/80 to-[color:var(--color-accent)]/80 backdrop-blur-sm" />

              <div className="relative p-3">
                <img
                  src="/profile.png"
                  alt="About"
                  className="w-full h-auto object-cover rounded-2xl border border-white/10"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Glass Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Glass Heading */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-accent)] bg-clip-text text-transparent drop-shadow-lg"
            >
              A Little Bit About Me...
            </motion.h2>

            {/* Glass Description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl leading-relaxed text-[color:var(--color-text)] opacity-95 bg-[color:var(--color-card)]/5 backdrop-blur-sm rounded-2xl p-6 border border-[color:var(--color-border)]/20"
            >
              {about.description}
            </motion.p>

            {/* Glass Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4"
            >
              {[
                { label: "Years Experience", value: "3+" },
                { label: "Projects", value: "15+" },
                { label: "Technologies", value: "10+" },
                { label: "Certifications", value: "5+" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="group"
                >
                  <div className="relative rounded-2xl p-6 border border-[color:var(--color-border)]/40 bg-[color:var(--color-card)]/70 backdrop-blur-xl text-center shadow-xl group-hover:shadow-2xl transition-all hover:-translate-y-1 hover:bg-[color:var(--color-card)]/80">
                    <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-accent)] bg-clip-text text-transparent drop-shadow-md">
                      {stat.value}
                    </p>
                    <p className="text-sm font-semibold text-[color:var(--color-muted)] mt-2 tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Glass CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-6"
            >
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#projects"
                className="relative px-8 py-4 rounded-2xl border-2 border-[color:var(--color-primary)]/70 text-[color:var(--color-primary)] font-bold bg-[color:var(--color-card)]/50 backdrop-blur-md shadow-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-bg)] hover:shadow-xl hover:border-[color:var(--color-primary)] transition-all"
              >
                View My Works
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                className="relative px-8 py-4 rounded-2xl border-2 border-[color:var(--color-primary)]/70 text-[color:var(--color-primary)] font-bold bg-[color:var(--color-card)]/50 backdrop-blur-md shadow-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-bg)] hover:shadow-xl hover:border-[color:var(--color-primary)] transition-all"
              >
                Get In Touch
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="/resume.pdf"
                download="Madhumitha_Resume.pdf"
                className="relative px-8 py-4 rounded-2xl border-2 border-[color:var(--color-primary)]/70 text-[color:var(--color-primary)] font-bold bg-[color:var(--color-card)]/50 backdrop-blur-md shadow-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-bg)] hover:shadow-xl hover:border-[color:var(--color-primary)] transition-all flex items-center gap-2"
              >
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
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;