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
      <div className="max-w-5xl mx-auto relative z-10">
        {/* header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[color:var(--color-text)]">
            Achievements
          </h2>
          <p className="mt-3 text-sm md:text-base text-[color:var(--color-muted)]">
            Badges, awards, and milestones earned along the journey.
          </p>
        </div>

        {hasItems ? (
          <div className="relative flex items-center justify-center py-6 gap-4 md:gap-6">
            {/* LEFT BUTTON - SIMPLE ROUND */}
            <motion.button
              onClick={goPrev}
              whileHover={{ scale: 1.15, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
              className={isDark
                ? "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center z-30 bg-[color:var(--color-bg-elevated)] border border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/10 shadow-soft"
                : "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center z-30 bg-white border-2 border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/5 shadow-soft hover:shadow-elevated transition-all"
              }
            >
              <span className="text-lg md:text-xl font-bold text-[color:var(--color-primary)]">‹</span>
            </motion.button>

            {/* left card */}
            <SideCard
              item={items[leftIdx]}
              position="left"
              onClick={goPrev}
              isDark={isDark}
            />

            {/* center card */}
            <div className="relative z-20 mx-3 md:mx-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={items[centerIdx].id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={isDark
                    ? "relative w-[280px] sm:w-[300px] md:w-[340px] h-[400px] sm:h-[420px] md:h-[440px] rounded-[32px] bg-gradient-to-br from-red-900/20 via-red-800/25 to-red-900/20 backdrop-blur-[20px] shadow-[0_26px_70px_rgba(0,0,0,0.7)] flex flex-col items-center justify-between px-6 py-6 overflow-hidden"
                    : "relative w-[280px] sm:w-[300px] md:w-[340px] h-[400px] sm:h-[420px] md:h-[440px] rounded-[32px] bg-gradient-to-br from-blue-50/90 via-white/95 to-purple-50/90 backdrop-blur-[20px] shadow-elevated border border-[color:var(--color-border)] flex flex-col items-center justify-between px-6 py-6 overflow-hidden"
                  }
                >
                  {/* ✅ EVEN BIGGER EMOJI - PERFECTLY CENTERED */}
                  <div className="flex-1 flex items-center justify-center mb-8">
                    <span className="text-7xl md:text-8xl">🏆</span>
                  </div>

                  {/* counter pill - TRUE GLASS */}
                  <div className={isDark
                    ? "px-3 py-1 rounded-full bg-[color:var(--color-bg)]/80 backdrop-blur-[15px] text-[11px] text-[color:var(--color-text)] mb-2 shadow-xl"
                    : "px-3 py-1 rounded-full bg-white/90 backdrop-blur-[15px] text-[11px] text-[color:var(--color-primary)] font-semibold mb-2 shadow-soft border border-[color:var(--color-border)]"
                  }>
                    {centerIdx + 1} / {items.length}
                  </div>

                  {/* text content */}
                  <div className="text-center px-2 space-y-2 mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-[color:var(--color-text)]">
                      {items[centerIdx].achievement_title}
                    </h3>
                    <p className="text-[11px] text-[color:var(--color-muted)]">
                      {items[centerIdx].organization}
                      {items[centerIdx].category &&
                        ` • ${items[centerIdx].category}`}
                      {items[centerIdx].achievement_date &&
                        ` • ${items[centerIdx].achievement_date}`}
                    </p>
                    {items[centerIdx].description && (
                      <p className={isDark
                        ? "text-[11px] text-[color:var(--color-text)]/95 leading-relaxed"
                        : "text-[11px] text-[color:var(--color-text)]/90 leading-relaxed"
                      }>
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

            {/* RIGHT BUTTON - SIMPLE ROUND */}
            <motion.button
              onClick={goNext}
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

  const rotate = position === "left" ? -10 : 10;
  const translateX = position === "left" ? "-16px" : "16px";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="hidden sm:block relative z-10"
      whileHover={{ y: -4 }}
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
        {/* ✅ EVEN BIGGER EMOJI - PERFECTLY CENTERED */}
        <div className="absolute top-10 inset-x-0 flex justify-center opacity-95">
          <span className="text-6xl md:text-7xl">🏆</span>
        </div>

        {/* title - TRUE GLASS */}
        <p className="text-sm md:text-base font-semibold text-[color:var(--color-text)]/95 text-center line-clamp-2 bg-[color:var(--color-bg)]/80 backdrop-blur-[15px] px-5 py-6 rounded-2xl mx-4 shadow-lg h-28 flex items-center justify-center">
  {item.achievement_title}
</p>
      </div>
    </motion.button>
  );
};

export default Achievements;
