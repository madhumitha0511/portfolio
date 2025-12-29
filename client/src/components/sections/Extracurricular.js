// client/src/components/sections/Extracurricular.js - MOBILE BUTTONS + BIGGER CIRCLE
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { extracurricularAPI } from "../../services/api";

const Extracurricular = () => {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await extracurricularAPI.getAll();
        setItems(res.data || []);
      } catch (e) {
        console.error("Extracurricular load error", e);
      }
    };
    load();
  }, []);

  // Auto-advance every 3 seconds (faster)
  useEffect(() => {
    if (!autoPlay || items.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [autoPlay, items.length]);

  const hasItems = items.length > 0;

  // ✅ Side card click handlers
  const goNext = () => {
    if (!hasItems) return;
    setIndex((prev) => (prev + 1) % items.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 2500);
  };

  const goPrev = () => {
    if (!hasItems) return;
    setIndex((prev) => (prev - 1 + items.length) % items.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 2500);
  };

  const getItem = (offset) => {
    if (!hasItems) return null;
    return items[(index + offset + items.length) % items.length];
  };

  const main = getItem(0);
  const left = getItem(-1);
  const right = getItem(1);

  return (
    <section
      id="extracurricular"
      className="py-40 px-4 relative overflow-hidden"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* Content - positioned above background */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER SECTION - UNCHANGED */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 rounded-full bg-[color:var(--color-primary-soft)] border border-[color:var(--color-primary)]/40 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-primary)] mb-4 backdrop-blur-sm"
          >
            ✦ Leadership & Impact
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-[color:var(--color-text)]">
            Extracurricular & Clubs
          </h2>
          <p className="text-center text-[color:var(--color-muted)] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Leadership, cultural coordination, technical communities, and impact
            beyond the classroom.
          </p>
        </motion.div>

        {/* ✅ MOBILE: Single Card WITH BUTTONS + BIGGER CIRCLE | DESKTOP: 3-Card Carousel */}
        <div className="relative flex items-center justify-center">
          {/* Carousel Container */}
          <div className="w-full flex justify-center items-center relative h-[480px] md:h-[540px]">
            
            {/* ✅ MOBILE CARD (Hidden on Desktop) */}
            <div className="lg:hidden w-full max-w-sm mx-auto relative">
              <AnimatePresence mode="wait">
                {main && (
                  <motion.article
                    key={main.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative w-full h-[420px] rounded-[1.5rem] overflow-hidden z-20 mx-auto"
                    onHoverStart={() => setAutoPlay(false)}
                    onHoverEnd={() => setAutoPlay(true)}
                  >
                    {/* Solid background */}
                    <div className="absolute inset-0 bg-[color:var(--color-primary-soft)] -z-10" />

                    {/* Premium glow border */}
                    <motion.div
                      animate={{
                        boxShadow: [
                          "inset 0 0 40px rgba(140,29,24,0.15), 0 0 0 1px rgba(140,29,24,0.3)",
                          "inset 0 0 60px rgba(140,29,24,0.25), 0 0 0 2px rgba(140,29,24,0.4)",
                          "inset 0 0 40px rgba(140,29,24,0.15), 0 0 0 1px rgba(140,29,24,0.3)",
                        ],
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="absolute inset-0 rounded-[1.5rem] pointer-events-none"
                    />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col p-6">
                      {/* Year badge */}
                      <motion.div
                        initial={{ y: -15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        className="self-center mb-4 px-4 py-1.5 rounded-full bg-[color:var(--color-card)]/90 backdrop-blur-md border border-[color:var(--color-border)] text-[10px] font-extrabold uppercase tracking-[0.18em] text-[color:var(--color-muted)] shadow-soft"
                      >
                        {main.start_date?.slice(0, 4) || "Active"}
                      </motion.div>

                      {/* Center animated circle - BIGGER */}
                      <div className="flex-1 flex items-center justify-center mb-6">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 150,
                            damping: 20,
                          }}
                          className="relative"
                        >
                          {/* Outer rotating ring - BIGGER */}
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 20,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[color:var(--color-primary)]/40 border-r-[color:var(--color-primary)]/20 w-32 h-32" // BIGGER: w-32 h-32
                          />

                          {/* Main circle - BIGGER */}
                          <div className="w-28 h-28 rounded-full border-[3px] border-[color:var(--color-text)]/15 flex items-center justify-center bg-[color:var(--color-bg)] shadow-soft"> {/* BIGGER: w-28 h-28 */}
                            <span className="text-center text-base font-bold text-[color:var(--color-primary)] px-2 leading-tight"> {/* BIGGER text */}
                              {main.organization_name
                                ?.split(" ")
                                .slice(0, 2)
                                .join(" ") || "Club"}
                            </span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Title & Description */}
                      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2">
                        <motion.h3
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-lg font-extrabold text-[color:var(--color-text)] leading-snug line-clamp-2"
                        >
                          {main.activity_title}
                        </motion.h3>

                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.35 }}
                          className="text-xs text-[color:var(--color-muted)] leading-relaxed line-clamp-2 px-2"
                        >
                          {main.description}
                        </motion.p>

                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[color:var(--color-text)]"
                        >
                          {main.position || "Contributor"}
                        </motion.p>
                      </div>

                      {/* ✅ MOBILE NAVIGATION BUTTONS */}
                      <div className="flex items-center justify-center gap-4 pt-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={goPrev}
                          className="w-10 h-10 rounded-full bg-[color:var(--color-card)]/90 backdrop-blur-md border border-[color:var(--color-border)] text-[color:var(--color-text)] flex items-center justify-center shadow-soft text-lg"
                        >
                          ‹
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={goNext}
                          className="w-10 h-10 rounded-full bg-[color:var(--color-card)]/90 backdrop-blur-md border border-[color:var(--color-border)] text-[color:var(--color-text)] flex items-center justify-center shadow-soft text-lg"
                        >
                          ›
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                )}
              </AnimatePresence>
            </div>

            {/* ✅ DESKTOP 3-CARD CAROUSEL (100% UNCHANGED) */}
            {/* Left Card - UNCHANGED */}
            {left && (
              <motion.div
                initial={{ opacity: 0, x: -100, scale: 0.65 }}
                animate={{ opacity: 0.5, x: -580, scale: 0.8 }}
                exit={{ opacity: 0, x: -100, scale: 0.65 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="hidden lg:flex absolute left-1/2 top-1/2 -translate-y-1/2 w-64 rounded-2xl overflow-hidden z-15 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={goPrev}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--color-primary-soft)]/30 via-[color:var(--color-card)]/50 to-[color:var(--color-bg)]/70 backdrop-blur-xl" />
                <div className="absolute inset-0 border border-[color:var(--color-primary)]/30 rounded-2xl" />
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-5 py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[color:var(--color-primary)]/20 flex items-center justify-center border border-[color:var(--color-primary)]/40">
                    <span className="text-[18px]">←</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] font-extrabold text-[color:var(--color-muted)] uppercase tracking-[0.15em]">
                      Previous
                    </p>
                    <p className="text-[12px] font-bold text-[color:var(--color-text)] line-clamp-2 leading-tight">
                      {left.activity_title}
                    </p>
                    <p className="text-[10px] font-medium text-[color:var(--color-muted)]">
                      {left.organization_name}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Desktop Main Card - UNCHANGED */}
            <AnimatePresence mode="wait">
              {main && (
                <motion.article
                  key={main.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="hidden lg:block relative w-full max-w-md h-96 md:h-[480px] rounded-[3rem] overflow-hidden z-20"
                  onHoverStart={() => setAutoPlay(false)}
                  onHoverEnd={() => setAutoPlay(true)}
                >
                  <div className="absolute inset-0 bg-[color:var(--color-primary-soft)] -z-10" />
                  <motion.div
                    animate={{
                      boxShadow: [
                        "inset 0 0 40px rgba(140,29,24,0.15), 0 0 0 1px rgba(140,29,24,0.3)",
                        "inset 0 0 60px rgba(140,29,24,0.25), 0 0 0 2px rgba(140,29,24,0.4)",
                        "inset 0 0 40px rgba(140,29,24,0.15), 0 0 0 1px rgba(140,29,24,0.3)",
                      ],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute inset-0 rounded-[3rem] pointer-events-none"
                  />
                  <div className="relative z-10 h-full flex flex-col">
                    <motion.div
                      initial={{ y: -15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.25 }}
                      className="self-center mt-5 px-5 py-1.5 rounded-full bg-[color:var(--color-card)]/90 backdrop-blur-md border border-[color:var(--color-border)] text-[9px] font-extrabold uppercase tracking-[0.2em] text-[color:var(--color-muted)] shadow-soft"
                    >
                      {main.start_date?.slice(0, 4) || "Active"}
                    </motion.div>
                    <div className="flex-1 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.2,
                          type: "spring",
                          stiffness: 150,
                          damping: 20,
                        }}
                        className="relative"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[color:var(--color-primary)]/40 border-r-[color:var(--color-primary)]/20 w-32 h-32"
                        />
                        <div className="w-28 h-28 rounded-full border-[3px] border-[color:var(--color-text)]/15 flex items-center justify-center bg-[color:var(--color-bg)] shadow-soft">
                          <span className="text-center text-[12px] font-bold text-[color:var(--color-primary)] px-3 leading-tight">
                            {main.organization_name
                              ?.split(" ")
                              .slice(0, 2)
                              .join(" ") || "Club"}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center space-y-3 pb-8">
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-2xl font-extrabold text-[color:var(--color-text)] leading-snug"
                      >
                        {main.activity_title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className="text-[11px] md:text-[12px] text-[color:var(--color-muted)] leading-relaxed line-clamp-2"
                      >
                        {main.description}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[color:var(--color-text)]"
                      >
                        {main.position || "Contributor"}
                      </motion.p>
                    </div>
                  </div>
                </motion.article>
              )}
            </AnimatePresence>

            {/* Right Card - UNCHANGED */}
            {right && (
              <motion.div
                initial={{ opacity: 0, x: 100, scale: 0.65 }}
                animate={{ opacity: 0.5, x: 580, scale: 0.8 }}
                exit={{ opacity: 0, x: 100, scale: 0.65 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="hidden lg:flex absolute right-1/2 top-1/2 -translate-y-1/2 w-64 rounded-2xl overflow-hidden z-15 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={goNext}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--color-primary-soft)]/30 via-[color:var(--color-card)]/50 to-[color:var(--color-bg)]/70 backdrop-blur-xl" />
                <div className="absolute inset-0 border border-[color:var(--color-primary)]/30 rounded-2xl" />
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-5 py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[color:var(--color-primary)]/20 flex items-center justify-center border border-[color:var(--color-primary)]/40">
                    <span className="text-[18px]">→</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] font-extrabold text-[color:var(--color-muted)] uppercase tracking-[0.15em]">
                      Next
                    </p>
                    <p className="text-[12px] font-bold text-[color:var(--color-text)] line-clamp-2 leading-tight">
                      {right.activity_title}
                    </p>
                    <p className="text-[10px] font-medium text-[color:var(--color-muted)]">
                      {right.organization_name}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Progress Dots - UNCHANGED */}
        <div className="flex justify-center items-center gap-4 mt-14">
          <div className="flex gap-3">
            {items.map((item, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  setIndex(i);
                  setAutoPlay(false);
                  setTimeout(() => setAutoPlay(true), 2500);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  width: i === index ? 32 : 10,
                  opacity: i === index ? 1 : 0.4,
                }}
                transition={{ duration: 0.3 }}
                className="h-2.5 rounded-full bg-[color:var(--color-primary)] shadow-soft"
              />
            ))}
          </div>

          <span className="text-[11px] font-semibold text-[color:var(--color-muted)] tracking-[0.12em] uppercase ml-4">
            {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Extracurricular;