// client/src/components/sections/Education.js - DESKTOP 100% ORIGINAL + MOBILE CARDS
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { educationAPI } from "../../services/api";

// ... all your original variants (unchanged)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const cellVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

const TypingText = ({ text, className, speed = 18 }) => {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!text) return;
    let i = 0;
    setDisplay("");
    const id = setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return <span className={className}>{display}</span>;
};

const Education = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await educationAPI.getAll();
        setItems(res.data || []);
      } catch (e) {
        console.error("Education load error", e);
      }
    };
    load();
  }, []);

  return (
    <section id="education" className="relative py-40 px-4 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* HEADER - UNCHANGED */}
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
            className="inline-block px-4 py-2 rounded-full bg-[color:var(--color-primary-soft)] border border-[color:var(--color-primary)]/40 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-primary)] mb-4 backdrop-blur-sm"
          >
            ✦ Academic Records
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-[color:var(--color-text)]">
            Education
          </h2>
          <p className="text-sm md:text-base text-[color:var(--color-muted)] max-w-2xl mx-auto">
            Structured learning experience showcasing academic excellence and specialization in engineering and AI.
          </p>
        </motion.div>

        {/* ✅ ORIGINAL DESKTOP TABLE + MOBILE CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative backdrop-blur-xl rounded-3xl overflow-hidden border border-[color:var(--color-border)] shadow-elevated"
          style={{
            background: "rgba(10, 10, 15, 0.4)",
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
          }}
        >
          {/* ✅ DESKTOP TABLE HEADER - 100% ORIGINAL */}
          <div className="relative z-10 grid grid-cols-10 gap-0 px-6 md:px-8 py-6 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)]/80 backdrop-blur-sm hidden lg:grid">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} className="col-span-3 text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] text-[color:var(--color-primary)]">
              Degree
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.15 }} className="col-span-4 text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] text-[color:var(--color-primary)]">
              Institution
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="col-span-2 text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] text-[color:var(--color-primary)]">
              Year
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.25 }} className="col-span-1 text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] text-[color:var(--color-primary)]">
              CGPA
            </motion.div>
          </div>

          {/* ✅ TABLE BODY - DESKTOP + MOBILE */}
          {items.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="relative z-10 divide-y divide-[color:var(--color-border)]"
            >
              {items.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  variants={rowVariants}
                  whileHover={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    transition: { duration: 0.2 },
                  }}
                  className="group/row"
                >
                  {/* ✅ MOBILE CARD (Hidden on Desktop) */}
                  <div className="lg:hidden px-6 py-5 border-b border-[color:var(--color-border)]/50 hover:bg-[color:var(--color-bg-elevated)]/30 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-12 h-12 rounded-xl backdrop-blur-md border border-[color:var(--color-primary)]/40 bg-[color:var(--color-primary)]/10 flex-shrink-0 flex items-center justify-center mt-1">
                        {item.institution_logo_url ? (
                          <img src={item.institution_logo_url} alt={item.institution_name} className="w-10 h-10 object-cover rounded-lg" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs font-bold text-[color:var(--color-primary)]">
                            {item.institution_name?.charAt(0)?.toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col gap-1">
                          <TypingText text={item.degree} className="text-sm font-bold text-[color:var(--color-text)]" />
                          <TypingText text={item.field_of_study} className="text-xs font-semibold text-[color:var(--color-primary)] uppercase tracking-wide" speed={14} />
                        </div>
                      </div>
                    </div>
                    <div className="pl-16">
                      <TypingText text={item.institution_name} className="text-sm font-semibold text-[color:var(--color-text)] mb-1 block" speed={14} />
                      {item.location && <p className="text-xs text-[color:var(--color-muted)] mb-3">{item.location}</p>}
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg backdrop-blur-sm bg-[color:var(--color-primary)]/12 border border-[color:var(--color-primary)]/35">
                          <span className="text-xs font-bold text-[color:var(--color-primary)]">{item.start_date?.slice(0, 4)}</span>
                          <span className="text-xs text-[color:var(--color-muted)]/60">–</span>
                          <span className="text-xs font-bold text-[color:var(--color-primary)]">{item.end_date?.slice(0, 4) || "Now"}</span>
                        </div>
                        {item.gpa ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm bg-gradient-to-r from-[color:var(--color-primary)]/15 to-[color:var(--color-primary)]/5 border border-[color:var(--color-primary)]/45">
                            <div className="w-2 h-2 rounded-full bg-[color:var(--color-primary)]" />
                            <span className="text-xs font-bold text-[color:var(--color-primary)]">{item.gpa}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-[color:var(--color-muted)]/40">–</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ✅ DESKTOP TABLE ROW - 100% ORIGINAL */}
                  <div className="hidden lg:grid lg:grid-cols-10 lg:gap-0 lg:px-6 lg:px-8 lg:py-5 lg:py-6 lg:items-center lg:transition-colors lg:duration-200 lg:backdrop-blur-sm lg:hover:border-[color:var(--color-primary)]/50 grid-cols-10 gap-0 px-6 py-5 items-center transition-colors duration-200">
                    {/* Degree Column - ORIGINAL */}
                    <motion.div variants={cellVariants} className="col-span-3 flex items-center gap-3">
                      <div className="hidden lg:flex w-10 h-10 rounded-lg backdrop-blur-md border border-[color:var(--color-primary)]/35 bg-[color:var(--color-primary)]/10 overflow-hidden flex-shrink-0">
                        {item.institution_logo_url ? (
                          <img src={item.institution_logo_url} alt={item.institution_name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[11px] font-bold text-[color:var(--color-primary)]">
                            {item.institution_name?.charAt(0)?.toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <TypingText text={item.degree} className="text-xs lg:text-sm font-extrabold text-[color:var(--color-text)]" />
                        <TypingText text={item.field_of_study} className="block text-[9px] lg:text-[10px] font-semibold text-[color:var(--color-primary)] uppercase tracking-[0.1em]" speed={14} />
                      </div>
                    </motion.div>

                    {/* Institution Column - ORIGINAL */}
                    <motion.div variants={cellVariants} className="col-span-4">
                      <TypingText text={item.institution_name} className="text-[10px] lg:text-xs font-semibold text-[color:var(--color-text)] line-clamp-2" speed={14} />
                      {item.location && (
                        <p className="text-[8px] lg:text-[9px] text-[color:var(--color-muted)]/75 mt-1">{item.location}</p>
                      )}
                    </motion.div>

                    {/* Year Column - ORIGINAL */}
                    <motion.div variants={cellVariants} className="col-span-2">
                      <div className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg backdrop-blur-sm bg-[color:var(--color-primary)]/12 border border-[color:var(--color-primary)]/35">
                        <span className="text-[9px] lg:text-xs font-bold text-[color:var(--color-primary)]">{item.start_date?.slice(0, 4)}</span>
                        <span className="text-[8px] text-[color:var(--color-muted)]/60">–</span>
                        <span className="text-[9px] lg:text-xs font-bold text-[color:var(--color-primary)]">{item.end_date?.slice(0, 4) || "Now"}</span>
                      </div>
                    </motion.div>

                    {/* CGPA Column - ORIGINAL */}
                    <motion.div variants={cellVariants} className="col-span-1">
                      {item.gpa ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm bg-gradient-to-r from-[color:var(--color-primary)]/15 to-[color:var(--color-primary)]/5 border border-[color:var(--color-primary)]/45">
                          <div className="w-2 h-2 rounded-full bg-[color:var(--color-primary)]" />
                          <span className="text-[9px] lg:text-xs font-bold text-[color:var(--color-primary)]">{item.gpa}</span>
                        </div>
                      ) : (
                        <span className="text-[9px] text-[color:var(--color-muted)]/40">–</span>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="relative z-10 px-6 lg:px-8 py-16 text-center">
              <p className="text-sm lg:text-base text-[color:var(--color-muted)]">Loading education data...</p>
            </div>
          )}
        </motion.div>

        {/* FOOTER NOTE - UNCHANGED */}
        {items.length > 0 && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center mt-8">
            <p className="text-xs lg:text-sm text-[color:var(--color-muted)] uppercase tracking-[0.12em] font-semibold">
              Click any row to view details
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Education;