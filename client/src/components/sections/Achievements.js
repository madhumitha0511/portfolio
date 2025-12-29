// client/src/components/sections/Achievements.js
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { achievementsAPI } from "../../services/api";

const Achievements = () => {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
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

  // AUTO-SCROLL (15s per achievement)
  useEffect(() => {
    const interval = setInterval(() => {
      if (items.length > 0) {
        setIndex((prev) => (prev + 1) % items.length);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await achievementsAPI.getAll();
        setItems(res.data || []);
      } catch (e) {
        console.error("Achievements load error", e);
      }
    };
    load();
  }, []);

  const hasItems = items.length > 0;
  const centerIdx = index;
  const leftIdx = hasItems ? (centerIdx - 1 + items.length) % items.length : 0;
  const rightIdx = hasItems ? (centerIdx + 1) % items.length : 0;

  const goNext = () =>
    hasItems && setIndex((prev) => (prev + 1) % items.length);
  const goPrev = () =>
    hasItems && setIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <section
      id="achievements"
      className="relative py-24 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[color:var(--color-text)]">
            Achievements
          </h2>
          <p className="mt-3 text-sm md:text-base text-[color:var(--color-muted)]">
            Badges, awards, and milestones earned along the journey.
          </p>
        </div>

        {hasItems ? (
          <div className="relative flex items-center justify-center gap-6 md:gap-8">
            {/* LEFT BUTTON */}
            <motion.button
              onClick={goPrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={isDark
                ? "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center z-30 bg-[color:var(--color-card)] border-2 border-[color:var(--color-border)] hover:border-[color:var(--color-primary)] shadow-soft transition-all"
                : "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center z-30 bg-white border-2 border-[color:var(--color-border)] hover:border-[color:var(--color-primary)] shadow-soft hover:shadow-elevated transition-all"
              }
            >
              <span className="text-xl md:text-2xl font-bold text-[color:var(--color-text)]">‹</span>
            </motion.button>

            {/* CARDS CONTAINER */}
            <div className="relative flex items-center justify-center gap-0">
              {/* left card */}
              <SideCard
                item={items[leftIdx]}
                position="left"
                onClick={goPrev}
                isDark={isDark}
              />

              {/* center card */}
              <div className="relative z-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={items[centerIdx].id}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={isDark
                      ? "relative w-[320px] sm:w-[360px] md:w-[400px] min-h-[440px] rounded-[28px] bg-gradient-to-br from-slate-800/40 via-slate-900/50 to-slate-800/40 backdrop-blur-xl shadow-2xl border border-[color:var(--color-border)] flex flex-col items-center px-8 py-8"
                      : "relative w-[320px] sm:w-[360px] md:w-[400px] min-h-[440px] rounded-[28px] bg-white/95 backdrop-blur-xl shadow-2xl border border-[color:var(--color-border)] flex flex-col items-center px-8 py-8"
                    }
                  >
                    {/* emoji */}
                    <div className="mb-6">
                      <span className="text-8xl">🏆</span>
                    </div>

                    {/* counter pill */}
                    <div className={isDark
                      ? "px-4 py-1.5 rounded-full bg-[color:var(--color-primary)]/20 backdrop-blur-md text-xs text-[color:var(--color-primary)] font-semibold mb-6 border border-[color:var(--color-primary)]/30"
                      : "px-4 py-1.5 rounded-full bg-[color:var(--color-primary)]/10 backdrop-blur-md text-xs text-[color:var(--color-primary)] font-semibold mb-6 border border-[color:var(--color-primary)]/20"
                    }>
                      {centerIdx + 1} / {items.length}
                    </div>

                    {/* text content */}
                    <div className="text-center space-y-3 flex-1 flex flex-col justify-center">
                      <h3 className="text-xl md:text-2xl font-bold text-[color:var(--color-text)] leading-tight">
                        {items[centerIdx].achievement_title}
                      </h3>
                      <p className="text-xs text-[color:var(--color-muted)] leading-relaxed">
                        {items[centerIdx].organization}
                        {items[centerIdx].category &&
                          ` • ${items[centerIdx].category}`}
                        {items[centerIdx].achievement_date &&
                          ` • ${items[centerIdx].achievement_date}`}
                      </p>
                      {items[centerIdx].description && (
                        <p className="text-sm text-[color:var(--color-text)]/80 leading-relaxed pt-2">
                          {items[centerIdx].description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* right card */}
              <SideCard
                item={items[rightIdx]}
                position="right"
                onClick={goNext}
                isDark={isDark}
              />
            </div>

            {/* RIGHT BUTTON */}
            <motion.button
              onClick={goNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={isDark
                ? "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center z-30 bg-[color:var(--color-card)] border-2 border-[color:var(--color-border)] hover:border-[color:var(--color-primary)] shadow-soft transition-all"
                : "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center z-30 bg-white border-2 border-[color:var(--color-border)] hover:border-[color:var(--color-primary)] shadow-soft hover:shadow-elevated transition-all"
              }
            >
              <span className="text-xl md:text-2xl font-bold text-[color:var(--color-text)]">›</span>
            </motion.button>
          </div>
        ) : (
          <p className="text-center text-sm text-[color:var(--color-muted)]">
            Achievements will appear here soon.
          </p>
        )}
      </div>
    </section>
  );
};

const SideCard = ({ item, position, onClick, isDark }) => {
  if (!item) return null;

  const rotate = position === "left" ? -8 : 8;
  const scale = "0.75"; // ✅ Reduced from 0.85 to 0.75

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="hidden lg:block relative z-10"
      whileHover={{ scale: 0.78, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={isDark
          ? "w-[240px] h-[380px] rounded-[28px] bg-gradient-to-br from-slate-800/30 via-slate-900/40 to-slate-800/30 backdrop-blur-lg shadow-xl border border-[color:var(--color-border)]/50 flex flex-col items-center justify-center px-5 py-6 overflow-hidden"
          : "w-[240px] h-[380px] rounded-[28px] bg-white/60 backdrop-blur-lg shadow-lg border border-[color:var(--color-border)] flex flex-col items-center justify-center px-5 py-6 overflow-hidden"
        }
        style={{
          transform: `rotate(${rotate}deg) scale(${scale})`,
        }}
      >
        {/* emoji */}
        <div className="mb-4 opacity-80">
          <span className="text-6xl">🏆</span>
        </div>

        {/* title */}
        <div className={isDark
          ? "bg-[color:var(--color-card)]/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[color:var(--color-border)]"
          : "bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[color:var(--color-border)]"
        }>
          <p className="text-xs font-semibold text-[color:var(--color-text)] text-center line-clamp-3">
            {item.achievement_title}
          </p>
        </div>
      </div>
    </motion.button>
  );
};

export default Achievements;
