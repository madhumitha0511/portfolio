// client/src/components/sections/Testimonials.js
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const Testimonials = ({ data }) => {
  // No API call! Data comes from App.js
  const items = data || [];
  const prefersReducedMotion = useReducedMotion();

  if (!items.length) return null;

  return (
    <section
      id="testimonials"
      className="relative py-24 px-4 overflow-hidden"
      style={{
        perspective: "1500px",
        transformStyle: "preserve-3d"
      }}
    >
      {/* ✅ Container with 3D depth */}
      <motion.div 
        className="max-w-6xl mx-auto relative z-10"
        initial={{ 
          y: prefersReducedMotion ? 0 : 50,
          scale: prefersReducedMotion ? 1 : 0.95
        }}
        whileInView={{ 
          y: 0,
          scale: 1
        }}
        viewport={{ 
          once: false,
          amount: 0.1
        }}
        transition={{ 
          duration: prefersReducedMotion ? 0 : 0.8,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[color:var(--color-text)]">
            Testimonials
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((t, i) => (
            <motion.article
              key={t.id}
              initial={{ 
                scale: 0,
                rotateY: prefersReducedMotion ? 0 : -180,
                z: prefersReducedMotion ? 0 : -200
              }}
              whileInView={{ 
                scale: 1,
                rotateY: 0,
                z: 0
              }}
              viewport={{ 
                once: false,
                amount: 0.3
              }}
              transition={{
                delay: prefersReducedMotion ? 0 : i * 0.1,
                type: "spring",
                stiffness: prefersReducedMotion ? 400 : 260,
                damping: prefersReducedMotion ? 40 : 20,
                mass: 1
              }}
              whileHover={!prefersReducedMotion ? {
                scale: 1.05,
                rotateY: 5,
                z: 50,
                transition: { 
                  type: "spring",
                  stiffness: 400,
                  damping: 15
                }
              } : {}}
              className="relative flex flex-col items-center"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform"
              }}
            >
              {/* ✅ Avatar with pop animation */}
              <motion.div 
                className="relative z-20 mb-[-32px]"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: false }}
                transition={{
                  delay: prefersReducedMotion ? 0 : i * 0.1 + 0.2,
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }}
              >
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
              </motion.div>

              {/* ✅ Card - 100% UNCHANGED CONTENT */}
              <div className="relative w-full rounded-3xl bg-[color:var(--color-card)]/95 backdrop-blur-xl border border-[color:var(--color-border)] px-5 pt-10 pb-6 text-center shadow-[0_18px_40px_rgba(0,0,0,0.7)]">
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
                    "{t.message}"
                  </p>

                  {/* ✅ Rating dots with sequential pop */}
                  <div className="mt-3 flex gap-1.5">
                    {(t.rating ? Array.from({ length: t.rating }) : [1, 2, 3, 4, 5]).map(
                      (_, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: false }}
                          transition={{
                            delay: prefersReducedMotion ? 0 : i * 0.1 + 0.4 + idx * 0.05,
                            type: "spring",
                            stiffness: 500,
                            damping: 15
                          }}
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
      </motion.div>
    </section>
  );
};

export default Testimonials;