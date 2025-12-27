// client/src/components/sections/Testimonials.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { testimonialsAPI } from "../../services/api";

const Testimonials = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await testimonialsAPI.getAll();
        setItems(res.data || []);
      } catch (e) {
        console.error("Testimonials load error", e);
      }
    };
    load();
  }, []);

  if (!items.length) return null;

  return (
    <section
      id="testimonials"
      className="relative py-24 px-4 bg-[color:var(--color-bg)] overflow-hidden"
    >
      {/* soft backdrop */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 0%, rgba(140,29,24,0.15), transparent 60%)",
            "radial-gradient(circle at 80% 100%, rgba(140,29,24,0.2), transparent 60%)",
            "radial-gradient(circle at 20% 0%, rgba(140,29,24,0.15), transparent 60%)",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[color:var(--color-text)]">
            Testimonials
          </h2>
          <p className="mt-3 text-sm md:text-base text-[color:var(--color-muted)]">
            Feedback from mentors, clients, and collaborators.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((t, i) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="relative flex flex-col items-center"
            >
              {/* avatar circle */}
              <div className="relative z-20 mb-[-32px]">
                <div className="w-16 h-16 rounded-full border-2 border-[color:var(--color-bg)] bg-[color:var(--color-card)] overflow-hidden shadow-[0_8px_18px_rgba(0,0,0,0.6)]">
                  <img
                    src={
                      t.avatar_url ||
                      "https://api.dicebear.com/7.x/initials/svg?seed=" +
                        encodeURIComponent(t.name || "User")
                    }
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* card */}
              <div className="relative w-full rounded-3xl bg-[color:var(--color-card)]/95 border border-[color:var(--color-border)] px-5 pt-10 pb-6 text-center shadow-[0_18px_40px_rgba(0,0,0,0.7)]">
                {/* light overlay like reference */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-60"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(248,250,252,0.16), transparent)",
                  }}
                />

                <div className="relative z-10 flex flex-col items-center gap-2">
                  <h3 className="text-sm font-semibold text-[color:var(--color-text)]">
                    {t.name}
                  </h3>
                  <p className="text-[11px] text-[color:var(--color-muted)]">
                    {t.title}
                    {t.company_or_organization && ` • ${t.company_or_organization}`}
                  </p>

                  <p className="mt-3 text-[11px] text-[color:var(--color-text)]/85 leading-relaxed">
                    “{t.message}”
                  </p>

                  {/* rating dots (static 5 or from t.rating if exists) */}
                  <div className="mt-3 flex gap-1.5">
                    {(t.rating ? Array.from({ length: t.rating }) : [1, 2, 3, 4, 5]).map(
                      (_, idx) => (
                        <span
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full ${
                            idx < (t.rating || 4)
                              ? "bg-[color:var(--color-primary)]"
                              : "bg-[color:var(--color-border)]"
                          }`}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;