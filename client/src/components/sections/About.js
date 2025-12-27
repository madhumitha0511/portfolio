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
      {/* Subtle Background Mesh Gradient */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE - Premium 3D Image Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
            whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="relative w-full max-w-md mx-auto lg:mx-0 perspective-1000"
          >
            {/* 3D Card Container */}
            <motion.div
              whileHover={{ 
                scale: 1.02, 
                rotateY: 5,
                rotateX: -2,
                transition: { duration: 0.3 }
              }}
              className="relative rounded-3xl overflow-hidden shadow-2xl transform-gpu"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Glow Effect Behind Card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
              
              {/* Main Image */}
              <div className="relative bg-white rounded-3xl p-2">
                <img
                  src="/profile.png"
                  alt="About Madhumitha"
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 -right-4 bg-gradient-to-br from-pink-500 to-red-500 text-white px-6 py-3 rounded-2xl shadow-lg font-bold text-sm"
              >
                ✨ Available for Projects
              </motion.div>
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
            {/* Gradient Heading */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
            >
              About Madhumitha
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl leading-relaxed text-[color:var(--color-text)] opacity-90"
            >
              {about.description}
            </motion.p>

            {/* Stats/Highlights Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              {[
                { label: "Years Experience", value: "3+" },
                { label: "Projects Completed", value: "15+" },
                { label: "Happy Clients", value: "10+" }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="px-6 py-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 shadow-md"
                >
                  <p className="text-2xl font-bold text-pink-400">{stat.value}</p>
                  <p className="text-xs text-slate-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Premium CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              {/* Primary CTA */}
              <motion.a
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-xl shadow-lg overflow-hidden"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                <span className="relative z-10">View My Work</span>
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="group relative px-8 py-4 bg-transparent border-2 border-pink-500 text-pink-500 font-semibold rounded-xl overflow-hidden transition-all"
              >
                {/* Hover Fill Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 group-hover:text-white transition-colors">
                  Get In Touch
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
