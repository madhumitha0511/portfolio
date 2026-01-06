// client/src/components/sections/Achievements.js
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const Achievements = ({ data }) => {
  const items = data || [];
  const [index, setIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isPaused, setIsPaused] = useState(false);
  
  const intervalRef = useRef(null);
  
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setIsDark(currentTheme === 'dark');

    const observer = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDark(theme === 'dark');
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    if (items.length > 0 && !isPaused) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % items.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [items.length, prefersReducedMotion, isPaused]);

  const hasItems = items.length > 0;
  const centerIdx = index;
  const leftIdx = hasItems ? (centerIdx - 1 + items.length) % items.length : 0;
  const rightIdx = hasItems ? (centerIdx + 1) % items.length : 0;

  const goNext = () => {
    hasItems && setIndex((prev) => (prev + 1) % items.length);
    setIsPaused(true);
  };
  
  const goPrev = () => {
    hasItems && setIndex((prev) => (prev - 1 + items.length) % items.length);
    setIsPaused(true);
  };

  // Resume auto-scroll after 10 seconds of inactivity
  useEffect(() => {
    if (isPaused) {
      const timer = setTimeout(() => {
        setIsPaused(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isPaused]);

  return (
    <section
      id="achievements"
      className="relative py-24 px-4 overflow-hidden"
      style={{
        perspective: "2000px"
      }}
    >
      <motion.div 
        className="max-w-5xl mx-auto relative z-10"
        initial={{ 
          y: prefersReducedMotion ? 0 : 50,
          scale: prefersReducedMotion ? 1 : 0.95
        }}
        whileInView={{ 
          y: 0,
          scale: 1
        }}
        viewport={{ 
          once: isMobile,
          amount: 0.15
        }}
        transition={{ 
          duration: prefersReducedMotion ? 0 : 0.8,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        
        {/* Title */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[color:var(--color-text)]">
            Achievements
          </h2>
        </motion.div>

        {hasItems ? (
          <>
            {/* ✅ DESKTOP LAYOUT - Horizontal with buttons on sides */}
            <div className="hidden sm:flex relative items-center justify-center py-6 gap-4 md:gap-6">
              
              {/* LEFT BUTTON */}
              <motion.button
                onClick={goPrev}
                initial={{ 
                  x: prefersReducedMotion ? 0 : -100,
                  opacity: 0,
                  scale: prefersReducedMotion ? 1 : 0.5
                }}
                whileInView={{ 
                  x: 0,
                  opacity: 1,
                  scale: 1
                }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ 
                  duration: prefersReducedMotion ? 0.3 : 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ scale: 1.15, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
                className={isDark
                  ? "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center z-30 bg-[color:var(--color-bg-elevated)] border border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/10 shadow-soft"
                  : "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center z-30 bg-white border-2 border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/5 shadow-soft hover:shadow-elevated transition-all"
                }
              >
                <span className="text-lg md:text-xl font-bold text-[color:var(--color-primary)]">‹</span>
              </motion.button>

              {/* LEFT CARD */}
              <SideCard
                item={items[leftIdx]}
                position="left"
                onClick={goPrev}
                isDark={isDark}
                prefersReducedMotion={prefersReducedMotion}
                isMobile={isMobile}
              />

              {/* CENTER CARD */}
              <div className="relative z-20 mx-3 md:mx-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={items[centerIdx].id}
                    initial={{ 
                      opacity: 0,
                      scale: 0,
                      rotateY: prefersReducedMotion ? 0 : 180,
                      z: prefersReducedMotion ? 0 : -200
                    }}
                    animate={{ 
                      opacity: 1,
                      scale: 1,
                      rotateY: 0,
                      z: 0
                    }}
                    exit={{ 
                      opacity: 0,
                      scale: 0,
                      rotateY: prefersReducedMotion ? 0 : -180,
                      z: prefersReducedMotion ? 0 : -200
                    }}
                    transition={{ 
                      duration: prefersReducedMotion ? 0.3 : 0.6,
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                    whileHover={!prefersReducedMotion ? {
                      scale: 1.05,
                      rotateY: 5,
                      transition: { duration: 0.3 }
                    } : {}}
                    className={isDark
                      ? "relative w-[280px] sm:w-[300px] md:w-[340px] h-[400px] sm:h-[420px] md:h-[440px] rounded-[32px] bg-gradient-to-br from-red-900/20 via-red-800/25 to-red-900/20 backdrop-blur-[20px] shadow-[0_26px_70px_rgba(0,0,0,0.7)] flex flex-col items-center justify-between px-6 py-6 overflow-hidden"
                      : "relative w-[280px] sm:w-[300px] md:w-[340px] h-[400px] sm:h-[420px] md:h-[440px] rounded-[32px] bg-gradient-to-br from-blue-50/90 via-white/95 to-purple-50/90 backdrop-blur-[20px] shadow-elevated border border-[color:var(--color-border)] flex flex-col items-center justify-between px-6 py-6 overflow-hidden"
                    }
                    style={{
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden"
                    }}
                  >
                    {/* Trophy */}
                    <motion.div 
                      className="flex-1 flex items-center justify-center mb-8"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: prefersReducedMotion ? 0 : 0.3,
                        type: "spring",
                        stiffness: 300
                      }}
                    >
                      <span className="text-7xl md:text-8xl">🏆</span>
                    </motion.div>

                    {/* Counter badge */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: prefersReducedMotion ? 0 : 0.4,
                        type: "spring",
                        stiffness: 400
                      }}
                      className={isDark
                        ? "px-3 py-1 rounded-full bg-[color:var(--color-bg)]/80 backdrop-blur-[15px] text-[11px] text-[color:var(--color-text)] mb-2 shadow-xl"
                        : "px-3 py-1 rounded-full bg-white/90 backdrop-blur-[15px] text-[11px] text-[color:var(--color-primary)] font-semibold mb-2 shadow-soft border border-[color:var(--color-border)]"
                      }
                    >
                      {centerIdx + 1} / {items.length}
                    </motion.div>

                    {/* Text content */}
                    <div className="text-center px-2 space-y-2 mb-4">
                      <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: prefersReducedMotion ? 0 : 0.5 }}
                        className="text-lg md:text-xl font-bold text-[color:var(--color-text)]"
                      >
                        {items[centerIdx].achievement_title}
                      </motion.h3>
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: prefersReducedMotion ? 0 : 0.6 }}
                        className="text-[11px] text-[color:var(--color-muted)]"
                      >
                        {items[centerIdx].organization}
                        {items[centerIdx].category && ` • ${items[centerIdx].category}`}
                        {items[centerIdx].formatted_date && ` • ${items[centerIdx].formatted_date}`}
                      </motion.p>
                      {items[centerIdx].description && (
                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: prefersReducedMotion ? 0 : 0.7 }}
                          className={isDark
                            ? "text-[11px] text-[color:var(--color-text)]/95 leading-relaxed"
                            : "text-[11px] text-[color:var(--color-text)]/90 leading-relaxed"
                          }
                        >
                          {items[centerIdx].description}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* RIGHT CARD */}
              <SideCard
                item={items[rightIdx]}
                position="right"
                onClick={goNext}
                isDark={isDark}
                prefersReducedMotion={prefersReducedMotion}
                isMobile={isMobile}
              />

              {/* RIGHT BUTTON */}
              <motion.button
                onClick={goNext}
                initial={{ 
                  x: prefersReducedMotion ? 0 : 100,
                  opacity: 0,
                  scale: prefersReducedMotion ? 1 : 0.5
                }}
                whileInView={{ 
                  x: 0,
                  opacity: 1,
                  scale: 1
                }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ 
                  duration: prefersReducedMotion ? 0.3 : 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ scale: 1.15, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className={isDark
                  ? "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center z-30 bg-[color:var(--color-bg-elevated)] border border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/10 shadow-soft"
                  : "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center z-30 bg-white border-2 border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/5 shadow-soft hover:shadow-elevated transition-all"
                }
              >
                <span className="text-lg md:text-xl font-bold text-[color:var(--color-primary)]">›</span>
              </motion.button>
            </div>

            {/* ✅ MOBILE LAYOUT - Vertical with buttons below card */}
            <div className="sm:hidden flex flex-col items-center py-6">
              
              {/* CENTER CARD */}
              <div className="relative z-20 mb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={items[centerIdx].id}
                    initial={{ 
                      opacity: 0,
                      scale: 0,
                      rotateY: prefersReducedMotion ? 0 : 180,
                      z: prefersReducedMotion ? 0 : -200
                    }}
                    animate={{ 
                      opacity: 1,
                      scale: 1,
                      rotateY: 0,
                      z: 0
                    }}
                    exit={{ 
                      opacity: 0,
                      scale: 0,
                      rotateY: prefersReducedMotion ? 0 : -180,
                      z: prefersReducedMotion ? 0 : -200
                    }}
                    transition={{ 
                      duration: prefersReducedMotion ? 0.3 : 0.6,
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                    className={isDark
                      ? "relative w-[280px] h-[400px] rounded-[32px] bg-gradient-to-br from-red-900/20 via-red-800/25 to-red-900/20 backdrop-blur-[20px] shadow-[0_26px_70px_rgba(0,0,0,0.7)] flex flex-col items-center justify-between px-6 py-6 overflow-hidden"
                      : "relative w-[280px] h-[400px] rounded-[32px] bg-gradient-to-br from-blue-50/90 via-white/95 to-purple-50/90 backdrop-blur-[20px] shadow-elevated border border-[color:var(--color-border)] flex flex-col items-center justify-between px-6 py-6 overflow-hidden"
                    }
                    style={{
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden"
                    }}
                  >
                    {/* Trophy */}
                    <motion.div 
                      className="flex-1 flex items-center justify-center mb-8"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: prefersReducedMotion ? 0 : 0.3,
                        type: "spring",
                        stiffness: 300
                      }}
                    >
                      <span className="text-7xl">🏆</span>
                    </motion.div>

                    {/* Counter badge */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: prefersReducedMotion ? 0 : 0.4,
                        type: "spring",
                        stiffness: 400
                      }}
                      className={isDark
                        ? "px-3 py-1 rounded-full bg-[color:var(--color-bg)]/80 backdrop-blur-[15px] text-[11px] text-[color:var(--color-text)] mb-2 shadow-xl"
                        : "px-3 py-1 rounded-full bg-white/90 backdrop-blur-[15px] text-[11px] text-[color:var(--color-primary)] font-semibold mb-2 shadow-soft border border-[color:var(--color-border)]"
                      }
                    >
                      {centerIdx + 1} / {items.length}
                    </motion.div>

                    {/* Text content */}
                    <div className="text-center px-2 space-y-2 mb-4">
                      <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: prefersReducedMotion ? 0 : 0.5 }}
                        className="text-lg font-bold text-[color:var(--color-text)]"
                      >
                        {items[centerIdx].achievement_title}
                      </motion.h3>
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: prefersReducedMotion ? 0 : 0.6 }}
                        className="text-[11px] text-[color:var(--color-muted)]"
                      >
                        {items[centerIdx].organization}
                        {items[centerIdx].category && ` • ${items[centerIdx].category}`}
                        {items[centerIdx].formatted_date && ` • ${items[centerIdx].formatted_date}`}
                      </motion.p>
                      {items[centerIdx].description && (
                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: prefersReducedMotion ? 0 : 0.7 }}
                          className={isDark
                            ? "text-[11px] text-[color:var(--color-text)]/95 leading-relaxed"
                            : "text-[11px] text-[color:var(--color-text)]/90 leading-relaxed"
                          }
                        >
                          {items[centerIdx].description}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ✅ BUTTONS BELOW CARD - Horizontal layout */}
              <motion.div 
                className="flex items-center justify-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                {/* LEFT BUTTON */}
                <motion.button
                  onClick={goPrev}
                  whileTap={{ scale: 0.9 }}
                  className={isDark
                    ? "w-14 h-14 rounded-full flex items-center justify-center bg-[color:var(--color-bg-elevated)] border border-[color:var(--color-primary)] shadow-soft active:shadow-none transition-all"
                    : "w-14 h-14 rounded-full flex items-center justify-center bg-white border-2 border-[color:var(--color-primary)] shadow-soft active:shadow-none transition-all"
                  }
                >
                  <span className="text-2xl font-bold text-[color:var(--color-primary)]">‹</span>
                </motion.button>

                {/* RIGHT BUTTON */}
                <motion.button
                  onClick={goNext}
                  whileTap={{ scale: 0.9 }}
                  className={isDark
                    ? "w-14 h-14 rounded-full flex items-center justify-center bg-[color:var(--color-bg-elevated)] border border-[color:var(--color-primary)] shadow-soft active:shadow-none transition-all"
                    : "w-14 h-14 rounded-full flex items-center justify-center bg-white border-2 border-[color:var(--color-primary)] shadow-soft active:shadow-none transition-all"
                  }
                >
                  <span className="text-2xl font-bold text-[color:var(--color-primary)]">›</span>
                </motion.button>
              </motion.div>
            </div>
          </>
        ) : (
          <p className="text-center text-sm text-[color:var(--color-muted)]">
            Achievements will appear here soon.
          </p>
        )}
      </motion.div>
    </section>
  );
};

const SideCard = ({ item, position, onClick, isDark, prefersReducedMotion, isMobile }) => {
  if (!item) return null;

  const rotate = position === "left" ? -10 : 10;
  const translateX = position === "left" ? "-16px" : "16px";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="relative z-10"
      initial={{ 
        x: position === "left" ? (prefersReducedMotion ? 0 : -150) : (prefersReducedMotion ? 0 : 150),
        opacity: 0,
        rotate: position === "left" ? (prefersReducedMotion ? 0 : -45) : (prefersReducedMotion ? 0 : 45),
        scale: prefersReducedMotion ? 1 : 0.5
      }}
      whileInView={{ 
        x: 0,
        opacity: 1,
        rotate: 0,
        scale: 1
      }}
      viewport={{ once: isMobile, amount: 0.3 }}
      transition={{ 
        duration: prefersReducedMotion ? 0.3 : 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0 : 0.1
      }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <div
        className={isDark
          ? "w-52 md:w-60 h-[360px] md:h-[380px] rounded-[32px] bg-gradient-to-br from-black/20 to-slate-900/20 backdrop-blur-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col items-center justify-end pb-10 px-5 overflow-hidden"
          : "w-52 md:w-60 h-[360px] md:h-[380px] rounded-[32px] bg-gradient-to-br from-slate-50/80 to-gray-100/80 backdrop-blur-[20px] shadow-soft border border-[color:var(--color-border)] flex flex-col items-center justify-end pb-10 px-5 overflow-hidden"
        }
        style={{
          transform: `rotate(${rotate}deg) translateX(${translateX})`,
        }}
      >
        <div className="absolute top-10 inset-x-0 flex justify-center opacity-95">
          <span className="text-6xl md:text-7xl">🏆</span>
        </div>

        <p className="text-sm md:text-base font-semibold text-[color:var(--color-text)]/95 text-center line-clamp-2 bg-[color:var(--color-bg)]/80 backdrop-blur-[15px] px-5 py-6 rounded-2xl mx-4 shadow-lg h-28 flex items-center justify-center">
          {item.achievement_title}
        </p>
      </div>
    </motion.button>
  );
};

export default Achievements;
