// client/src/components/sections/Hackathons.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { hackathonsAPI } from "../../services/api";

const Hackathons = () => {
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await hackathonsAPI.getAll();
        const sorted = res.data.sort(
          (a, b) => new Date(b.event_date) - new Date(a.event_date)
        );
        setItems(sorted);
        if (sorted[0]) setActiveId(sorted[0].id);
      } catch (e) {
        console.error("Hackathons load error", e);
      }
    };
    load();
  }, []);

  return (
    <section
      id="hackathons"
      className="py-24 px-4 bg-[color:var(--color-bg)] border-t border-[color:var(--color-border)] relative overflow-hidden"
    >
      {/* subtle moving tint */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(140,29,24,0.10), transparent 55%)",
            "radial-gradient(circle at 100% 100%, rgba(140,29,24,0.10), transparent 55%)",
            "radial-gradient(circle at 0% 0%, rgba(140,29,24,0.10), transparent 55%)",
          ],
        }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-[color:var(--color-text)] mb-10"
        >
          Hackathons & Events
        </motion.h2>

        <div className="mt-4 rounded-3xl bg-[color:var(--color-card)] shadow-soft border border-[color:var(--color-border)] overflow-hidden">
          {/* header row */}
          <div className="hidden md:grid grid-cols-[70px,1.8fr,1.3fr,1.3fr,40px] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-muted)] bg-[color:var(--color-primary-soft)]/60">
            <span>Year</span>
            <span>Event</span>
            <span>Location</span>
            <span>Category</span>
            <span />
          </div>

          {items.map((h) => {
            const isActive = h.id === activeId;
            const year = h.event_date
              ? new Date(h.event_date).getFullYear()
              : "";

            return (
              <div
                key={h.id}
                className="border-t border-[color:var(--color-border)]"
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveId((prev) => (prev === h.id ? null : h.id))
                  }
                  className={`w-full text-left relative overflow-hidden transition-colors ${
  isActive
    ? "bg-[color:var(--color-bg-elevated)]"
    : "bg-[color:var(--color-card)]"
}`}

                >
                  {isActive && (
  <motion.div
    layoutId="hack-active-row"
    className="absolute inset-0 bg-[color:var(--color-bg-elevated)]"
  />
)}


                  <div className="relative grid grid-cols-1 md:grid-cols-[70px,1.8fr,1.3fr,1.3fr,40px] gap-3 px-5 md:px-8 py-5 items-center">
                    {/* year */}
                    <div className="text-[11px] font-semibold text-[color:var(--color-muted)]">
                      {year}
                    </div>

                    {/* event name + description snippet */}
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex w-10 h-10 rounded-xl bg-[color:var(--color-primary-soft)] items-center justify-center text-[color:var(--color-primary)] text-xs font-bold shadow-soft">
                        {h.event_name?.[0]}
                      </div>
                      <div>
                        <p className="text-sm md:text-base font-semibold text-[color:var(--color-text)]">
                          {h.event_name}
                        </p>
                        <p className="text-[11px] text-[color:var(--color-muted)] line-clamp-1">
                          {h.description}
                        </p>
                      </div>
                    </div>

                    {/* location */}
                    <div className="text-[11px] md:text-xs text-[color:var(--color-muted)]">
                      {h.location}
                    </div>

                    {/* category / role */}
                    <div className="text-[11px] md:text-xs font-medium text-[color:var(--color-primary)]">
                      {h.category ||
                        (h.role_or_achievement &&
                          h.role_or_achievement.slice(0, 40))}
                    </div>

                    {/* arrow */}
                    <div className="flex justify-end">
                      <motion.span
                        animate={{ x: isActive ? 4 : 0 }}
                        className="text-[color:var(--color-primary)] text-lg"
                      >
                        ▸
                      </motion.span>
                    </div>
                  </div>
                </button>

                {/* expanded content */}
{isActive && (
  <motion.div
  initial={{ opacity: 0, y: -6 }}
  animate={{ opacity: 1, y: 0 }}
  className="px-5 md:px-8 pb-6 bg-[color:var(--color-bg-elevated)]"
>

    <div className="rounded-2xl border border-[color:var(--color-border)] bg-[rgba(15,23,42,0.85)]/90 p-4 md:p-5 shadow-soft">
      {/* top row: date + chips */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <span className="inline-flex items-center gap-2 text-[11px] md:text-xs text-[color:var(--color-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-primary)]" />
          {h.event_date} · {h.location}
        </span>

        {h.category && (
          <span className="px-3 py-1 text-[11px] font-semibold rounded-full bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)] uppercase tracking-wide">
            {h.category}
          </span>
        )}
      </div>

      {/* description */}
      <p className="text-[13px] md:text-sm text-[color:var(--color-text)] leading-relaxed mb-4">
        {h.description}
      </p>

      {/* role & outcome as “info tags” */}
      <div className="grid md:grid-cols-2 gap-3 mb-3">
        {h.role_or_achievement && (
          <div className="flex items-start gap-2">
            <span className="mt-[3px] w-5 h-5 rounded-full bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)] flex items-center justify-center text-[10px] font-bold">
              R
            </span>
            <div>
              <p className="text-[11px] font-semibold text-[color:var(--color-muted)] uppercase tracking-[0.18em] mb-1">
                Role
              </p>
              <p className="text-[12px] md:text-[13px] text-[color:var(--color-text)]">
                {h.role_or_achievement}
              </p>
            </div>
          </div>
        )}

        {h.outcome_or_result && (
          <div className="flex items-start gap-2">
            <span className="mt-[3px] w-5 h-5 rounded-full bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)] flex items-center justify-center text-[10px] font-bold">
              ★
            </span>
            <div>
              <p className="text-[11px] font-semibold text-[color:var(--color-muted)] uppercase tracking-[0.18em] mb-1">
                Outcome
              </p>
              <p className="text-[12px] md:text-[13px] text-[color:var(--color-primary)]">
                {h.outcome_or_result}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* bottom chips: links if available */}
      <div className="flex flex-wrap gap-2 pt-1">
        {h.project_link && (
          <a
            href={h.project_link}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] md:text-xs px-3 py-1 rounded-full border border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white transition-colors"
          >
            View project
          </a>
        )}
        {h.event_link && (
          <a
            href={h.event_link}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] md:text-xs px-3 py-1 rounded-full border border-[color:var(--color-border)] text-[color:var(--color-muted)] hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)] transition-colors"
          >
            Event page
          </a>
        )}
      </div>
    </div>
  </motion.div>
)}

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hackathons;