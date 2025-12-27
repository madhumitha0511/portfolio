// client/src/components/sections/Hero.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { portfolioAPI } from "../../services/api";

const Hero = () => {
  const [owner, setOwner] = useState(null);
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ownerRes, heroRes] = await Promise.all([
          portfolioAPI.getOwner(),
          portfolioAPI.getHero(),
        ]);
        setOwner(ownerRes.data[0] || ownerRes.data);
        setHero(heroRes.data[0] || heroRes.data);
      } catch (err) {
        console.error("Error fetching hero data:", err);
      }
    };
    fetchData();
  }, []);

  if (!owner || !hero) return null;

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center bg-[color:var(--color-bg)] relative overflow-hidden"
    >
      {/* Decorative background blob */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full bg-gradient-to-br from-[color:var(--color-primary)]/20 to-[color:var(--color-primary)]/5 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* LEFT SIDE - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Role/Tag */}
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-sm font-semibold uppercase tracking-wider text-[color:var(--color-primary)]"
          >
            {hero.subtitle || "Software Developer"}
          </motion.span>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[color:var(--color-text)]"
          >
            Hello, my name is <br />
           <span className="text-[color:var(--color-primary)]">{owner.first_name} {owner.last_name}</span>
          </motion.h1>

          {/* Bio/Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-[color:var(--color-muted)] leading-relaxed max-w-lg"
          >
            {owner.bio || hero.title}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-4"
          >
           
          </motion.div>

          {/* Icon Buttons Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 pt-2"
          >
            {/* Resume Download */}
            {owner.resume_url && (
              <motion.a
                href={owner.resume_url}
                download
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-[color:var(--color-bg-elevated)] border-2 border-[color:var(--color-border)] shadow-soft hover:border-[color:var(--color-primary)] transition-all"
                title="Download Resume"
              >
                <svg className="w-5 h-5 text-[color:var(--color-text)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </motion.a>
            )}

            {/* Email */}
            {owner.email && (
              <motion.a
                href={`mailto:${owner.email}`}
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-[color:var(--color-bg-elevated)] border-2 border-[color:var(--color-border)] shadow-soft hover:border-[color:var(--color-primary)] transition-all"
                title="Send Email"
              >
                <svg className="w-5 h-5 text-[color:var(--color-text)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.a>
            )}
{/* LinkedIn */}
{owner.linkedin_url && (
  <motion.a
    href={owner.linkedin_url}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
    className="w-12 h-12 flex items-center justify-center rounded-full bg-[color:var(--color-bg-elevated)] border-2 border-[color:var(--color-border)] shadow-soft hover:border-[color:var(--color-primary)] transition-all"
    title="LinkedIn Profile"
  >
    <svg className="w-5 h-5 text-[color:var(--color-text)]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  </motion.a>
)}

            {/* GitHub */}
            {owner.github_url && (
              <motion.a
                href={owner.github_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-[color:var(--color-bg-elevated)] border-2 border-[color:var(--color-border)] shadow-soft hover:border-[color:var(--color-primary)] transition-all"
                title="GitHub Profile"
              >
                <svg className="w-5 h-5 text-[color:var(--color-text)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>
            )}
          </motion.div>
        </motion.div>


{/* RIGHT SIDE - Image with Organic Blob Background (Exact Reference Match) */}
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="relative flex justify-center lg:justify-end items-center"
>
  {/* Large Organic Blob Background - Extends Right Like Reference */}
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    className="absolute -right-20 top-1/2 -translate-y-1/2 max-w-[450px] md:max-w-[500px] bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E]"
    style={{
      borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%",
      filter: "blur(1px)",
    }}
  />

  {/* Profile Image - Positioned Over Blob */}
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="relative z-10 w-full max-w-[450px] md:max-w-[500px]"
  >
    <img
      src="/profile-1.png"
      alt={`${owner.first_name} ${owner.last_name}`}
      className="w-full h-auto object-contain relative z-20"
    />
  </motion.div>
</motion.div>

      </div>

     
    </section>
  );
};

export default Hero;
