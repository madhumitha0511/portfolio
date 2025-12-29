// client/src/components/sections/Extracurricular.js - NO IMAGE BORDER + MAX PIC + SMALLER TEXT
// ✅ Clean image, 95% pic size, compact content

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { extracurricularAPI } from "../../services/api";

const Extracurricular = () => {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isDark, setIsDark] = useState(false);

  // Detect theme
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

  // Auto-advance every 3 seconds
  useEffect(() => {
    if (!autoPlay || items.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [autoPlay, items.length]);

  const hasItems = items.length > 0;

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
      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER SECTION */}
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
            className={isDark
              ? "inline-block px-4 py-2 rounded-full bg-[color:var(--color-primary-soft)] border border-[color:var(--color-primary)]/40 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-primary)] mb-4 backdrop-blur-sm"
              : "inline-block px-4 py-2 rounded-full bg-[color:var(--color-primary)]/10 border border-[color:var(--color-primary)]/30 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-primary)] mb-4 backdrop-blur-sm"
            }
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

        {/* 60/40 CAROUSEL */}
        <div className="relative flex items-center justify-center">
          <div className="w-full flex justify-center items-center relative h-[520px] md:h-[600px]">
            
            {/* ✅ MOBILE: CLEAN MAX IMAGE + COMPACT CONTENT */}
            <div className="lg:hidden w-full max-w-md mx-auto relative">
              <AnimatePresence mode="wait">
                {main && (
                  <motion.article
                    key={main.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative w-full h-[460px] rounded-[2rem] overflow-hidden z-20 mx-auto"
                    onHoverStart={() => setAutoPlay(false)}
                    onHoverEnd={() => setAutoPlay(true)}
                  >
                    {/* Background - UNCHANGED */}
                    <div className={isDark
                      ? "absolute inset-0 bg-[color:var(--color-primary-soft)] -z-10"
                      : "absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10"
                    } />

                    {/* Glow border - UNCHANGED */}
                    <motion.div
                      animate={isDark ? {
                        boxShadow: [
                          "inset 0 0 50px rgba(140,29,24,0.2), 0 0 0 2px rgba(140,29,24,0.4)",
                          "inset 0 0 70px rgba(140,29,24,0.3), 0 0 0 3px rgba(140,29,24,0.5)",
                          "inset 0 0 50px rgba(140,29,24,0.2), 0 0 0 2px rgba(140,29,24,0.4)",
                        ],
                      } : {
                        boxShadow: [
                          "inset 0 0 40px rgba(59,130,246,0.15), 0 0 0 2px rgba(59,130,246,0.3)",
                          "inset 0 0 60px rgba(59,130,246,0.2), 0 0 0 3px rgba(59,130,246,0.4)",
                          "inset 0 0 40px rgba(59,130,246,0.15), 0 0 0 2px rgba(59,130,246,0.3)",
                        ],
                      }}
                      transition={{ duration: 6, repeat: Infinity }}
                      className="absolute inset-0 rounded-[2rem] pointer-events-none"
                    />

                    {/* ✅ 60% MAX IMAGE - NO BORDER */}
                    <div className="relative z-10 h-[60%] w-full">
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        {/* Rotating frame only */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 35,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className={isDark
                            ? "absolute inset-2 rounded-3xl border-[1px] border-transparent border-t-[color:var(--color-primary)]/40 border-r-[color:var(--color-primary)]/20"
                            : "absolute inset-2 rounded-3xl border-[1px] border-transparent border-t-[color:var(--color-primary)]/50 border-r-[color:var(--color-primary)]/30"
                          }
                        />
                        
                        {/* ✅ NO BORDER - FULL SIZE IMAGE */}
                        <div className={isDark
  ? "w-[95%] h-[95%] rounded-3xl overflow-hidden shadow-2xl shadow-[color:var(--color-primary)]/20 flex items-center justify-center bg-[color:var(--color-card)]/90 backdrop-blur-md"
  : "w-[95%] h-[95%] rounded-3xl overflow-hidden shadow-3xl shadow-[color:var(--color-primary)]/30 flex items-center justify-center"
}>

                          <motion.img
                            src={main.image_url || "/api/placeholder/500/500"}
                            alt={main.organization_name || "Club"}
                            className="w-full h-full object-contain object-center"
                            whileHover={{ scale: 1.02, y: -1 }}
                            transition={{ type: "spring", stiffness: 600, damping: 25 }}
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* ✅ 40% COMPACT CONTENT - SMALLER TEXT */}
                    <div className="relative z-20 h-[40%] px-5 pt-2 pb-5 flex flex-col justify-between">
                      {/* Title & Organization - SMALLER */}
                      <div className="space-y-1 mb-2">
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-base font-black text-[color:var(--color-text)] leading-tight line-clamp-1 tracking-tight"
                        >
                          {main.activity_title}
                        </motion.h3>
                        
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35 }}
                          className="text-xs font-semibold text-[color:var(--color-muted)] leading-tight line-clamp-1 tracking-wide"
                        >
                          {main.organization_name}
                        </motion.p>
                      </div>

                      {/* Description - SMALLER */}
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-[11px] text-[color:var(--color-muted)] leading-relaxed line-clamp-3 mb-3 tracking-tight"
                      >
                        {main.description}
                      </motion.p>

                      {/* Position & Year - SMALLER & TIGHTER */}
                      <div className="flex items-center justify-between pt-1 border-t border-[color:var(--color-border)]/40">
                        <motion.p
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.45 }}
                          className={isDark
                            ? "px-2.5 py-1 rounded-full bg-[color:var(--color-card)]/95 backdrop-blur-md border border-[color:var(--color-border)] text-[9px] font-bold uppercase tracking-[0.15em] text-[color:var(--color-muted)]"
                            : "px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[color:var(--color-border)] text-[9px] font-bold uppercase tracking-[0.15em] text-[color:var(--color-primary)]"
                          }
                        >
                          {main.start_date?.slice(0, 4) || "Active"}
                        </motion.p>
                        
                        <motion.p
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 }}
                          className={isDark
                            ? "px-3 py-1 rounded-full bg-[color:var(--color-primary-soft)] border border-[color:var(--color-primary)] text-[9px] font-black uppercase tracking-[0.15em] text-[color:var(--color-primary)] shadow-soft"
                            : "px-3 py-1 rounded-full bg-[color:var(--color-primary)]/20 border border-[color:var(--color-primary)] text-[9px] font-black uppercase tracking-[0.15em] text-[color:var(--color-primary)] shadow-soft"
                          }
                        >
                          {main.position || "Team Lead"}
                        </motion.p>
                      </div>

                      {/* Nav buttons - bottom center */}
                      <div className="flex items-center justify-center gap-3 mt-2 pt-2 border-t border-[color:var(--color-border)]/30">
                        <motion.button
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={goPrev}
                          className={isDark
                            ? "w-10 h-10 rounded-full bg-[color:var(--color-card)]/90 backdrop-blur-md border-2 border-[color:var(--color-border)] text-[color:var(--color-text)] flex items-center justify-center shadow-soft text-lg font-bold"
                            : "w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border-2 border-[color:var(--color-border)] text-[color:var(--color-text)] flex items-center justify-center shadow-soft hover:shadow-elevated text-lg font-bold"
                          }
                        >
                          ‹
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={goNext}
                          className={isDark
                            ? "w-10 h-10 rounded-full bg-[color:var(--color-card)]/90 backdrop-blur-md border-2 border-[color:var(--color-border)] text-[color:var(--color-text)] flex items-center justify-center shadow-soft text-lg font-bold"
                            : "w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border-2 border-[color:var(--color-border)] text-[color:var(--color-text)] flex items-center justify-center shadow-soft hover:shadow-elevated text-lg font-bold"
                          }
                        >
                          ›
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                )}
              </AnimatePresence>
            </div>

            {/* DESKTOP - SAME CHANGES */}
            <AnimatePresence mode="wait">
              {main && (
                <motion.article
                  key={main.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="hidden lg:block relative w-full max-w-xl h-[520px] rounded-[3rem] overflow-hidden z-20"
                  onHoverStart={() => setAutoPlay(false)}
                  onHoverEnd={() => setAutoPlay(true)}
                >
                  {/* Background - UNCHANGED */}
                  <div className={isDark
                    ? "absolute inset-0 bg-[color:var(--color-primary-soft)] -z-10"
                    : "absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10"
                  } />
                  
                  <motion.div
                    animate={isDark ? {
                      boxShadow: [
                        "inset 0 0 50px rgba(140,29,24,0.2), 0 0 0 2px rgba(140,29,24,0.4)",
                        "inset 0 0 70px rgba(140,29,24,0.3), 0 0 0 3px rgba(140,29,24,0.5)",
                        "inset 0 0 50px rgba(140,29,24,0.2), 0 0 0 2px rgba(140,29,24,0.4)",
                      ],
                    } : {
                      boxShadow: [
                        "inset 0 0 40px rgba(59,130,246,0.15), 0 0 0 2px rgba(59,130,246,0.3)",
                        "inset 0 0 60px rgba(59,130,246,0.2), 0 0 0 3px rgba(59,130,246,0.4)",
                        "inset 0 0 40px rgba(59,130,246,0.15), 0 0 0 2px rgba(59,130,246,0.3)",
                      ],
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute inset-0 rounded-[3rem] pointer-events-none"
                  />

                  {/* Desktop 60% MAX IMAGE - NO BORDER */}
                  <div className="relative z-10 h-[60%] w-full">
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.8 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                        className={isDark
                          ? "absolute inset-3 rounded-[2rem] border-[1px] border-transparent border-t-[color:var(--color-primary)]/40 border-r-[color:var(--color-primary)]/20"
                          : "absolute inset-3 rounded-[2rem] border-[1px] border-transparent border-t-[color:var(--color-primary)]/50 border-r-[color:var(--color-primary)]/30"
                        }
                      />
                      <div className={isDark
  ? "w-[95%] h-[95%] rounded-[2rem] overflow-hidden shadow-3xl shadow-[color:var(--color-primary)]/25 flex items-center justify-center bg-[color:var(--color-card)]/90 backdrop-blur-md"
  : "w-[95%] h-[95%] rounded-[2rem] overflow-hidden shadow-3xl shadow-[color:var(--color-primary)]/40 flex items-center justify-center"
}>

                        <motion.img
                          src={main.image_url || "/api/placeholder/600/600"}
                          alt={main.organization_name || "Club"}
                          className="w-full h-full object-contain object-center"
                          whileHover={{ scale: 1.02, y: -1 }}
                          transition={{ type: "spring", stiffness: 600, damping: 25 }}
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Desktop 40% COMPACT CONTENT - SMALLER TEXT */}
                  <div className="relative z-20 h-[40%] px-8 pt-4 pb-8 flex flex-col justify-between">
                    <div className="space-y-2 mb-3">
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl font-black text-[color:var(--color-text)] leading-tight line-clamp-1 tracking-tight"
                      >
                        {main.activity_title}
                      </motion.h3>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="text-sm font-semibold text-[color:var(--color-muted)] leading-tight line-clamp-1 tracking-wide"
                      >
                        {main.organization_name}
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-[13px] text-[color:var(--color-muted)] leading-relaxed line-clamp-3 tracking-tight"
                      >
                        {main.description}
                      </motion.p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[color:var(--color-border)]/50">
                      <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.45 }}
                        className={isDark
                          ? "px-3 py-1.5 rounded-full bg-[color:var(--color-card)]/95 backdrop-blur-md border border-[color:var(--color-border)] text-sm font-bold uppercase tracking-wider text-[color:var(--color-muted)]"
                          : "px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[color:var(--color-border)] text-sm font-bold uppercase tracking-wider text-[color:var(--color-primary)]"
                        }
                      >
                        {main.start_date?.slice(0, 4) || "Active"}
                      </motion.p>
                      
                      <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className={isDark
                          ? "px-5 py-2 rounded-full bg-[color:var(--color-primary-soft)] border-2 border-[color:var(--color-primary)] text-sm font-black uppercase tracking-[0.18em] text-[color:var(--color-primary)] shadow-lg"
                          : "px-5 py-2 rounded-full bg-[color:var(--color-primary)]/20 border-2 border-[color:var(--color-primary)] text-sm font-black uppercase tracking-[0.18em] text-[color:var(--color-primary)] shadow-lg"
                        }
                      >
                        {main.position || "Team Lead"}
                      </motion.p>
                    </div>
                  </div>
                </motion.article>
              )}
            </AnimatePresence>

            {/* Left & Right cards unchanged */}
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
                <div className={isDark
                  ? "absolute inset-0 bg-gradient-to-br from-[color:var(--color-primary-soft)]/30 via-[color:var(--color-card)]/50 to-[color:var(--color-bg)]/70 backdrop-blur-xl"
                  : "absolute inset-0 bg-gradient-to-br from-blue-50/70 via-white/80 to-purple-50/70 backdrop-blur-xl"
                } />
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-5 py-8 text-center space-y-4">
                  <div className={isDark
                    ? "w-14 h-14 rounded-2xl bg-[color:var(--color-primary)]/20 flex items-center justify-center border border-[color:var(--color-primary)]/40 shadow-lg"
                    : "w-14 h-14 rounded-2xl bg-[color:var(--color-primary)]/10 flex items-center justify-center border border-[color:var(--color-primary)]/30 shadow-lg"
                  }>
                    <span className="text-xl font-bold">←</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] font-extrabold text-[color:var(--color-muted)] uppercase tracking-[0.15em]">Previous</p>
                    <p className="text-[12px] font-bold text-[color:var(--color-text)] line-clamp-2 leading-tight">{left.activity_title}</p>
                    <p className="text-[10px] font-medium text-[color:var(--color-muted)]">{left.organization_name}</p>
                  </div>
                </div>
              </motion.div>
            )}

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
                <div className={isDark
                  ? "absolute inset-0 bg-gradient-to-br from-[color:var(--color-primary-soft)]/30 via-[color:var(--color-card)]/50 to-[color:var(--color-bg)]/70 backdrop-blur-xl"
                  : "absolute inset-0 bg-gradient-to-br from-blue-50/70 via-white/80 to-purple-50/70 backdrop-blur-xl"
                } />
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-5 py-8 text-center space-y-4">
                  <div className={isDark
                    ? "w-14 h-14 rounded-2xl bg-[color:var(--color-primary)]/20 flex items-center justify-center border border-[color:var(--color-primary)]/40 shadow-lg"
                    : "w-14 h-14 rounded-2xl bg-[color:var(--color-primary)]/10 flex items-center justify-center border border-[color:var(--color-primary)]/30 shadow-lg"
                  }>
                    <span className="text-xl font-bold">→</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] font-extrabold text-[color:var(--color-muted)] uppercase tracking-[0.15em]">Next</p>
                    <p className="text-[12px] font-bold text-[color:var(--color-text)] line-clamp-2 leading-tight">{right.activity_title}</p>
                    <p className="text-[10px] font-medium text-[color:var(--color-muted)]">{right.organization_name}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center items-center gap-4 mt-16">
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