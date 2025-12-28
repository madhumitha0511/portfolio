// client/src/components/sections/Achievements.js
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { achievementsAPI } from "../../services/api";

const Achievements = () => {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);

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
      // REMOVED: bg-[color:var(--color-bg)] and animated background - using global now!
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
          <div className="relative flex items-center justify-center py-6">
            {/* left card */}
            <SideCard
              item={items[leftIdx]}
              position="left"
              onClick={goPrev}
            />

            {/* center card */}
            <div className="relative z-20 mx-3 md:mx-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={items[centerIdx].id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-[260px] sm:w-[280px] md:w-[320px] h-[380px] sm:h-[380px] md:h-[400px] rounded-[32px] bg-[color:var(--color-card)]/95 backdrop-blur-xl shadow-[0_26px_70px_rgba(0,0,0,0.8)] flex flex-col items-center justify-between px-6 py-6 overflow-hidden"
                >
                  {/* circular glow ring behind icon */}
                  <div className="mt-4 mb-6 relative flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-[color:var(--color-bg)] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                      <div
                        className="relative w-32 h-32 rounded-full flex items-center justify-center"
                        style={{
                          background:
                            "conic-gradient(from 220deg, #facc15, #f97316, #fb923c, #facc15)",
                        }}
                      >
                        <div className="w-24 h-24 rounded-full bg-[color:var(--color-bg)] flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-amber-400 flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.6)] overflow-hidden">
                            <img
                              src={
                                items[centerIdx].badge_icon_url ||
                                "https://via.placeholder.com/64"
                              }
                              alt={items[centerIdx].achievement_title}
                              className="w-10 h-10 object-contain"
                            />
                          </div>
                        </div>
                      </div>
                      {/* inner soft glow */}
                      <div className="absolute w-40 h-40 rounded-full bg-amber-400/20 blur-2xl" />
                    </div>
                  </div>

                  {/* counter pill */}
                  <div className="px-3 py-1 rounded-full bg-[color:var(--color-bg)]/80 text-[11px] text-[color:var(--color-text)] mb-2 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
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
                      <p className="text-[11px] text-[color:var(--color-text)]/85 leading-relaxed">
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
            />
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

const SideCard = ({ item, position, onClick }) => {
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
        className={`w-44 md:w-52 h-[320px] rounded-[32px] bg-[color:var(--color-card)]/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.75)] flex flex-col items-center justify-end pb-10 px-4 overflow-hidden`}
        style={{
          transform: `rotate(${rotate}deg) translateX(${translateX})`,
        }}
      >
        {/* dimmed icon circle */}
        <div className="absolute top-8 inset-x-0 flex justify-center opacity-70">
          <div className="w-28 h-28 rounded-full bg-[color:var(--color-bg)] flex items-center justify-center">
            <div className="w-18 h-18 rounded-full bg-[color:var(--color-border)]/50 flex items-center justify-center overflow-hidden">
              <img
                src={item.badge_icon_url || "https://via.placeholder.com/48"}
                alt={item.achievement_title}
                className="w-8 h-8 object-contain opacity-80"
              />
            </div>
          </div>
        </div>

        <p className="text-sm font-semibold text-[color:var(--color-text)]/80 text-center line-clamp-1">
          {item.achievement_title}
        </p>
      </div>
    </motion.button>
  );
};

export default Achievements;