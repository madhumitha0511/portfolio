// client/src/components/sections/Certifications.js
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certificationsAPI } from "../../services/api";

const VISIBLE_ROWS = 5; // how many list rows visible at once (odd number keeps active in middle)

const Certifications = () => {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0); // active center index

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

  const count = items.length;

  const wrapIndex = (i) => {
    if (!count) return 0;
    return (i + count) % count;
  };

  const center = useMemo(
    () => (count ? items[wrapIndex(index)] : null),
    [items, index, count]
  );
  const left = useMemo(
    () => (count > 1 ? items[wrapIndex(index - 1)] : null),
    [items, index, count]
  );
  const right = useMemo(
    () => (count > 1 ? items[wrapIndex(index + 1)] : null),
    [items, index, count]
  );

  const goNext = () => count && setIndex((i) => wrapIndex(i + 1));
  const goPrev = () => count && setIndex((i) => wrapIndex(i - 1));

  // Build looping list window for the right side
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
      // REMOVED: bg-[color:var(--color-bg)] and animated background - using global now!
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
          <div className="mt-10 grid lg:grid-cols-[minmax(0,3fr),minmax(0,2fr)] gap-10 items-center">
            {/* LEFT: 3D carousel */}
            <div className="flex items-center justify-center gap-6 md:gap-10">
              {/* left ghost */}
              {left && (
                <motion.div
                  key={left.id}
                  initial={{ opacity: 0, x: -40, scale: 0.8 }}
                  animate={{ opacity: 0.35, x: 0, scale: 0.9 }}
                  exit={{ opacity: 0, x: -40, scale: 0.8 }}
                  className="hidden md:block w-64 h-72 rounded-3xl bg-[color:var(--color-primary-soft)]/40 backdrop-blur-xl border border-[color:var(--color-border)] shadow-soft overflow-hidden"
                >
                  <SideCertCard cert={left} />
                </motion.div>
              )}

              {/* center main card */}
              <AnimatePresence mode="wait">
                {center && (
                  <motion.div
                    key={center.id}
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -40, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative w-full max-w-md h-[380px] rounded-[32px] border-[3px] border-[color:var(--color-bg)] bg-[color:var(--color-primary)] shadow-soft overflow-hidden flex flex-col items-center justify-between"
                    style={{
                      boxShadow:
                        "0 28px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.25)",
                    }}
                  >
                    {/* top label */}
                    <div className="absolute -top-3 px-4 py-1 rounded-full bg-[color:var(--color-bg)] text-[10px] font-semibold tracking-[0.18em] uppercase text-[color:var(--color-primary)] shadow-soft">
                      {center.issue_date
                        ? new Date(center.issue_date).getFullYear()
                        : "Year"}
                    </div>

                    {/* inner content */}
                    <div className="flex flex-col items-center justify-center flex-1 px-8 pt-10 text-center text-[color:var(--color-bg)]">
                      <motion.div
                        initial={{ scale: 0.8, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-24 h-24 mb-6 rounded-full border-[3px] border-[color:var(--color-bg)] flex items-center justify-center overflow-hidden bg-[color:var(--color-primary-soft)]/20"
                      >
                        <img
                          src={
                            center.certificate_image_url ||
                            "https://via.placeholder.com/96"
                          }
                          alt={center.certification_name}
                          className="w-16 h-16 object-cover rounded-full"
                        />
                      </motion.div>

                      <h3 className="text-xl md:text-2xl font-bold mb-2 leading-snug">
                        {center.certification_name}
                      </h3>
                      <p className="text-xs md:text-sm opacity-90 mb-1">
                        {center.issuer}
                      </p>
                      <p className="text-[11px] opacity-80">
                        {center.category || "Certification"}
                      </p>
                    </div>

                    {/* bottom CTA */}
                    <div className="w-full px-8 pb-8">
                      <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-[color:var(--color-bg)] text-[color:var(--color-primary)] text-xs md:text-sm font-semibold shadow-soft"
                        onClick={() => {
                          if (center.credential_url) {
                            window.open(center.credential_url, "_blank");
                          }
                        }}
                      >
                        <span>
                          {center.credential_url
                            ? "View Credential"
                            : "Earned & Verified"}
                        </span>
                        <span className="w-7 h-7 rounded-full bg-[color:var(--color-primary-soft)] flex items-center justify-center">
                          ▶
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* right ghost */}
              {right && (
                <motion.div
                  key={right.id}
                  initial={{ opacity: 0, x: 40, scale: 0.8 }}
                  animate={{ opacity: 0.35, x: 0, scale: 0.9 }}
                  exit={{ opacity: 0, x: 40, scale: 0.8 }}
                  className="hidden md:block w-64 h-72 rounded-3xl bg-[color:var(--color-primary-soft)]/40 backdrop-blur-xl border border-[color:var(--color-border)] shadow-soft overflow-hidden"
                >
                  <SideCertCard cert={right} align="right" />
                </motion.div>
              )}
            </div>

            {/* RIGHT: synced infinite list */}
            <div className="hidden lg:flex flex-col items-stretch h-full">
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                All Certifications
              </div>

              <div className="relative h-[320px] overflow-hidden rounded-3xl bg-[color:var(--color-card)]/90 backdrop-blur-xl border border-[color:var(--color-border)] shadow-soft">
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
                        onClick={() => setIndex(idx)}
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

                  {/* gradient masks top & bottom for nicer loop feel */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[color:var(--color-card)] to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[color:var(--color-card)] to-transparent" />
                </div>
              </div>

              {/* navigation & counter below list */}
              <div className="mt-5 flex items-center justify-between">
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goPrev}
                    className="w-8 h-8 rounded-full bg-[color:var(--color-card)]/90 backdrop-blur-md border border-[color:var(--color-border)] text-[color:var(--color-text)] flex items-center justify-center shadow-soft"
                  >
                    ‹
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goNext}
                    className="w-8 h-8 rounded-full bg-[color:var(--color-card)]/90 backdrop-blur-md border border-[color:var(--color-border)] text-[color:var(--color-text)] flex items-center justify-center shadow-soft"
                  >
                    ›
                  </motion.button>
                </div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
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

// side cards
const SideCertCard = ({ cert }) => (
  <div className="h-full w-full flex flex-col items-center justify-center px-4 text-center">
    <div className="w-16 h-16 mb-4 rounded-2xl bg-[color:var(--color-bg)]/70 flex items-center justify-center overflow-hidden shadow-soft">
      <img
        src={cert.certificate_image_url || "https://via.placeholder.com/64"}
        alt={cert.certification_name}
        className="w-12 h-12 object-cover rounded-xl"
      />
    </div>
    <p className="text-xs font-semibold text-[color:var(--color-text)] mb-1">
      {cert.certification_name}
    </p>
    <p className="text-[10px] text-[color:var(--color-muted)]">
      {cert.issuer}
    </p>
  </div>
);

export default Certifications;