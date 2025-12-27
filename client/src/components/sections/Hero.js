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
      {/* Decorative Coral Blob Background */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] md:w-[900px] md:h-[900px] rounded-full bg-gradient-to-br from-[#FF6B6B] via-[#FF8E8E] to-[#FFB6B6] blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
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
            className="inline-block text-sm md:text-base font-semibold uppercase tracking-wider text-[#FF8E8E]"
          >
            {hero.subtitle || "Software Developer"}
          </motion.span>

          {/* Name Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[color:var(--color-text)]"
          >
            Hello, my name <br />
            is <span className="text-[#FF6B6B]">{owner.first_name} {owner.last_name}</span>
          </motion.h1>

          {/* Bio/Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-[color:var(--color-muted)] leading-relaxed max-w-lg"
          >
            {owner.bio || hero.title}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-6"
          >
            {/* Projects Button - Filled */}
            <motion.a
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              Projects
            </motion.a>

            {/* LinkedIn Button - Outline */}
            {owner.linkedin_url && (
              <motion.a
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href={owner.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent border-2 border-[color:var(--color-text)] text-[color:var(--color-text)] font-semibold rounded-xl hover:bg-[color:var(--color-text)] hover:text-[color:var(--color-bg)] transition-all"
              >
                LinkedIn
              </motion.a>
            )}
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE - Image with Blob Background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Coral Blob Behind Image */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div 
              className="w-[450px] h-[450px] md:w-[550px] md:h-[550px] rounded-[40%_60%_70%_30%/60%_30%_70%_40%] bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E] opacity-80"
              style={{
                clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
              }}
            />
          </motion.div>

          {/* Profile Image */}
          <motion.div
            whileHover={{ scale: 1.03, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative z-10 w-full max-w-md"
          >
            <img
              src="/profile-1.png"
              alt={`${owner.first_name} ${owner.last_name}`}
              className="w-full h-auto object-cover rounded-3xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
