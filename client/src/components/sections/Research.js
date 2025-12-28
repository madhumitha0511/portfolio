// client/src/components/sections/Research.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { researchAPI } from "../../services/api";

const Research = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await researchAPI.getAll();
        setItems(res.data || []);
      } catch (e) {
        console.error("Research load error", e);
      }
    };
    load();
  }, []);

  return (
    <section
      id="research"
      className="py-20 px-4 relative overflow-hidden"
      // REMOVED: bg-[color:var(--color-bg)] and animated background - using global now!
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {/* header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[color:var(--color-text)]">
            Research
          </h2>
          <p className="mt-3 text-sm md:text-base text-[color:var(--color-muted)]">
            Experiments, feasibility studies, and self‑driven explorations behind
            the projects.
          </p>
        </div>

        {/* rectangular cards */}
        <div className="space-y-6">
          {items.map((r, i) => (
            <motion.article
              key={r.id || i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="relative rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)]/88 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.65)] overflow-hidden"
            >
              {/* left accent rail */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[color:var(--color-primary)] via-[color:var(--color-primary)]/60 to-transparent" />

              {/* subtle grid overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  maskImage:
                    "radial-gradient(circle at top left, black 0, transparent 60%)",
                }}
              />

              {/* content */}
              <div className="relative z-10 px-6 py-5 md:px-7 md:py-6 flex flex-col md:flex-row md:items-start md:gap-6">
                {/* meta column */}
                <div className="mb-3 md:mb-0 md:w-40 flex-shrink-0">
                  <p className="text-[11px] font-medium text-[color:var(--color-muted)]">
                    {r.start_date} – {r.end_date || "Ongoing"}
                  </p>
                  {r.research_type && (
                    <span className="mt-2 inline-flex items-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg)]/85 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-primary)]">
                      {r.research_type}
                    </span>
                  )}
                </div>

                {/* main column */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-sm md:text-base font-semibold text-[color:var(--color-text)]">
                    {r.research_title}
                  </h3>

                  {r.description && (
                    <p className="text-xs md:text-[13px] text-[color:var(--color-text)]/85 leading-relaxed">
                      {r.description}
                    </p>
                  )}

                  {r.outcomes && (
                    <p className="text-[11px] text-emerald-300 mt-1">
                      Outcomes: {r.outcomes}
                    </p>
                  )}

                  {/* tags row */}
                  {(r.domain || r.keywords) && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {(r.domain ? [r.domain] : [])
                        .concat(
                          r.keywords && Array.isArray(r.keywords)
                            ? r.keywords
                            : []
                        )
                        .map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg)]/80 backdrop-blur-sm text-[9px] uppercase tracking-[0.14em] text-[color:var(--color-muted)]"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  )}
                </div>

                {/* small CTA badge */}
                <div className="mt-3 md:mt-0 md:self-center">
                  <span className="inline-flex items-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg)]/80 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                    Research project
                  </span>
                </div>
              </div>
            </motion.article>
          ))}

          {items.length === 0 && (
            <p className="text-center text-sm text-[color:var(--color-muted)]">
              Research initiatives will appear here soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Research;