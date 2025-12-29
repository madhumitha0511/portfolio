// client/src/components/sections/Certifications.js - AUTO SCROLL ADDED
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certificationsAPI } from "../../services/api";

const VISIBLE_ROWS = 5;
const AUTO_SCROLL_INTERVAL = 4000; // 4 seconds

const Certifications = () => {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
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
        const res = await certificationsAPI.getAll();
        const sorted = [...res.data].sort(
          (a, b) =>
            new Date(b.issue_date || "1970-01-01") -
            new Date(a.issue_date || "1970-01-01")
        );
        setItems(sorted);
      } catch (e) {
        console.error("Certifications load error", e);
      }
    };
    load();
  }, []);

  // ✅ AUTO SCROLL EFFECT
  useEffect(() => {
    if (!items.length || !isAutoScrolling) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const count = items.length;
        return (prevIndex + 1) % count;
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [items.length, isAutoScrolling]);

  const count = items.length;

  const wrapIndex = (i) => {
    if (!count) return 0;
    return (i + count) % count;
  };

  const center = useMemo(
    () => (count ? items[wrapIndex(index)] : null),
    [items, index, count]
  );

  const goNext = useCallback(() => {
    if (count) {
      setIndex((i) => wrapIndex(i + 1));
      setIsAutoScrolling(false);
    }
  }, [count]);

  const goPrev = useCallback(() => {
    if (count) {
      setIndex((i) => wrapIndex(i - 1));
      setIsAutoScrolling(false);
    }
  }, [count]);

  // ✅ RESUME AUTO-SCROLL after inactivity
  const handleUserInteraction = useCallback(() => {
    setIsAutoScrolling(false);
  }, []);

  // ✅ RESUME AUTO-SCROLL after 8 seconds of inactivity
  useEffect(() => {
    if (!isAutoScrolling) {
      const timeout = setTimeout(() => {
        setIsAutoScrolling(true);
      }, 8000);

      return () => clearTimeout(timeout);
    }
  }, [isAutoScrolling]);

  // Build looping list window
  const half = Math.floor(VISIBLE_ROWS / 2);
  const listWindow = useMemo(() => {
    if (!count) return [];
    const windowItems = [];
    for (let offset = -half; offset <= half; offset++) {
      const idx = wrapIndex(index + offset);
      windowItems.push({
        cert: items[idx],
        idx,
        isActive: idx === wrapIndex(index),
        key: `${idx}-${offset}`,
        offset,
      });
    }
    return windowItems;
  }, [items, index, count, half]);

  return (
    <section
      id="certifications"
      className="py-20 px-4 relative overflow-hidden"
      onMouseEnter={handleUserInteraction}
      onTouchStart={handleUserInteraction}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-[color:var(--color-text)] mb-10"
        >
          Certifications
        </motion.h2>

        {count === 0 ? (
          <p className="text-center text-[color:var(--color-muted)] text-sm">
            Certifications will appear here soon.
          </p>
        ) : (
          <div className="mt-10 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
            {/* CENTER: Main 3D card ONLY - NO SIDE CARDS */}
            <AnimatePresence mode="wait">
              {center && (
             <motion.div
  key={center.id}
  initial={{ opacity: 0, y: 40, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: -40, scale: 0.95 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
  className={isDark
    ? "relative w-full max-w-md min-h-[260px] rounded-[32px] border-[3px] border-[color:var(--color-bg)] bg-[color:var(--color-primary)] shadow-soft overflow-hidden flex flex-col items-center justify-between px-8 py-6"
    : "relative w-full max-w-md min-h-[260px] rounded-[32px] border-[3px] border-white/50 bg-[color:var(--color-primary)] shadow-elevated overflow-hidden flex flex-col items-center justify-between px-8 py-6"
  }
  style={isDark ? {
    boxShadow:
      "0 24px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.25)",
  } : {
    boxShadow:
      "0 24px 70px rgba(31,58,138,0.35), 0 0 0 1px rgba(31,58,138,0.15)",
  }}
>

                {/* top label */}
<div className={isDark
  ? "absolute top-5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[color:var(--color-bg)] text-[10px] font-semibold tracking-[0.18em] uppercase text-[color:var(--color-primary)] shadow-soft z-10"
  : "absolute top-5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white text-[10px] font-semibold tracking-[0.18em] uppercase text-[color:var(--color-primary)] shadow-soft z-10"
}>
  {center.issue_date
    ? new Date(center.issue_date).getFullYear()
    : "Year"}
</div>

{/* inner content */}
<div className={isDark
  ? "flex flex-col items-center justify-center flex-1 text-center text-[color:var(--color-bg)] gap-3 py-6"
  : "flex flex-col items-center justify-center flex-1 text-center text-white gap-3 py-6"
}>
  <h3 className="text-lg md:text-xl font-bold leading-snug">
    {center.certification_name}
  </h3>
  <p className="text-xs md:text-sm opacity-90">
    {center.issuer}
  </p>
  <p className="text-[11px] opacity-80">
    {center.category || "Cyber Security"}
  </p>
</div>

{/* ✅ FIXED: Smaller button width with more breathing room */}
<div className="w-full px-8 pb-8 flex justify-center">
  <motion.button
    whileHover={{ scale: 1.02, y: -1 }}
    whileTap={{ scale: 0.98 }}
    disabled={!center.certificate_image_url}
    className={isDark
      ? "inline-flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-[color:var(--color-bg)] text-[color:var(--color-primary)] text-sm font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      : "inline-flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white text-[color:var(--color-primary)] text-sm font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    }
    onClick={() => {
      if (center.certificate_image_url) {
        window.open(center.certificate_image_url, "_blank", "noopener,noreferrer");
      }
    }}
  >
    <span>View Certificate</span>
    <span className="flex items-center justify-center text-base">
      ▶
    </span>
  </motion.button>
</div>

                </motion.div>
              )}
            </AnimatePresence>

            {/* FULL GLASS LIST - CENTERED */}
            <div className="w-full lg:w-[400px] flex flex-col items-stretch">
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-muted)] text-center lg:text-left">
                All Certifications
                {/* ✅ Auto-scroll indicator */}
                {isAutoScrolling && (
                  <span className="ml-2 inline-flex items-center gap-1 text-[9px] bg-[color:var(--color-primary)]/20 px-2 py-0.5 rounded-full border border-[color:var(--color-primary)]/30">
                    ↻ Auto
                  </span>
                )}
              </div>

              <div className={isDark
                ? "relative h-[320px] overflow-hidden rounded-3xl bg-[color:var(--color-card)]/90 backdrop-blur-xl border border-[color:var(--color-border)] shadow-soft"
                : "relative h-[320px] overflow-hidden rounded-3xl bg-[color:var(--color-card)] backdrop-blur-xl border border-[color:var(--color-border)] shadow-soft hover:shadow-elevated transition-shadow"
              }>
                <div className="absolute inset-0 overflow-hidden">
                  <ul className="absolute inset-0 flex flex-col items-stretch">
                    {listWindow.map(({ cert, idx, isActive, key, offset }) => (
                      <motion.li
                        key={key}
                        layout
                        transition={{ type: "spring", stiffness: 260, damping: 26 }}
                        className={`px-4 py-3 flex items-center justify-between gap-3 cursor-pointer ${
                          isActive ? "z-10" : "opacity-70"
                        }`}
                        onClick={() => {
                          setIndex(idx);
                          setIsAutoScrolling(false);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-2xl flex items-center justify-center text-[10px] font-semibold border ${
                              isActive
                                ? "bg-[color:var(--color-primary-soft)] border-[color:var(--color-primary)] text-[color:var(--color-primary)]"
                                : "bg-[color:var(--color-bg)] border-[color:var(--color-border)] text-[color:var(--color-muted)]"
                            }`}
                          >
                            {cert.issuer?.[0] || "C"}
                          </div>
                          <div>
                            <p
                              className={`text-[12px] font-semibold ${
                                isActive
                                  ? "text-[color:var(--color-text)]"
                                  : "text-[color:var(--color-muted)]"
                              }`}
                            >
                              {cert.certification_name}
                            </p>
                            <p className="text-[10px] text-[color:var(--color-muted)]">
                              {cert.issuer}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-[color:var(--color-muted)]">
                            {cert.issue_date
                              ? new Date(cert.issue_date).getFullYear()
                              : ""}
                          </span>
                          {isActive && (
                            <span className="mt-1 inline-flex px-2 py-0.5 rounded-full bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)] text-[9px] font-semibold uppercase tracking-[0.16em]">
                              Active
                            </span>
                          )}
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* navigation & counter */}
              <div className="mt-5 flex items-center justify-center lg:justify-between gap-4">
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goPrev}
                    className={isDark
                      ? "w-10 h-10 rounded-full bg-[color:var(--color-card)]/90 backdrop-blur-md border border-[color:var(--color-border)] text-[color:var(--color-text)] flex items-center justify-center shadow-soft"
                      : "w-10 h-10 rounded-full bg-[color:var(--color-card)] backdrop-blur-md border border-[color:var(--color-border)] text-[color:var(--color-text)] flex items-center justify-center shadow-soft hover:shadow-elevated transition-shadow"
                    }
                  >
                    ‹
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goNext}
                    className={isDark
                      ? "w-10 h-10 rounded-full bg-[color:var(--color-card)]/90 backdrop-blur-md border border-[color:var(--color-border)] text-[color:var(--color-text)] flex items-center justify-center shadow-soft"
                      : "w-10 h-10 rounded-full bg-[color:var(--color-card)] backdrop-blur-md border border-[color:var(--color-border)] text-[color:var(--color-text)] flex items-center justify-center shadow-soft hover:shadow-elevated transition-shadow"
                    }
                  >
                    ›
                  </motion.button>
                </div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-muted)] hidden lg:block">
                  {String(wrapIndex(index) + 1).padStart(2, "0")} /{" "}
                  {String(count).padStart(2, "0")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
