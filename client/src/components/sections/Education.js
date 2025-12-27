// client/src/components/sections/Education.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { educationAPI } from "../../services/api";

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

// Simple typing effect for any text
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
  const [expandedRow, setExpandedRow] = useState(null);

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
    <section
      id="education"
      className="relative py-40 px-4 md:px-8 bg-[color:var(--color-bg)] overflow-hidden"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <motion.div
          animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(140,29,24,0.5), transparent 70%)",
          }}
        />

        <motion.div
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(140,29,24,0.3), transparent 60%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* HEADER */}
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
            className="inline-block px-4 py-2 rounded-full bg-[color:var(--color-primary-soft)] border border-[color:var(--color-primary)]/40 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-primary)] mb-4"
          >
            ✦ Academic Records
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-[color:var(--color-text)]">
            Education
          </h2>
          <p className="text-sm md:text-base text-[color:var(--color-muted)] max-w-2xl mx-auto">
            Structured learning experience showcasing academic excellence and
            specialization in engineering and AI.
          </p>
        </motion.div>

        {/* GLASSMORPHIC TABLE CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative backdrop-blur-3xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(15, 15, 25, 0.55) 0%, rgba(18, 18, 28, 0.6) 100%)",
          }}
        >
          {/* Inner glow */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              boxShadow: "inset 0 1px 50px rgba(140,29,24,0.08)",
            }}
          />

          {/* TABLE HEADER */}
          <div className="relative z-10 grid grid-cols-12 gap-0 px-6 md:px-8 py-6 border-b border-white/12 bg-gradient-to-r from-[color:var(--color-primary)]/8 via-transparent to-transparent">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="col-span-3 text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] text-[color:var(--color-primary)]"
            >
              Degree
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="col-span-3 text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] text-[color:var(--color-primary)]"
            >
              Institution
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="col-span-2 text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] text-[color:var(--color-primary)]"
            >
              Year
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="col-span-2 text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] text-[color:var(--color-primary)]"
            >
              CGPA
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="col-span-2 text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] text-[color:var(--color-primary)] text-right"
            >
              Action
            </motion.div>
          </div>

          {/* TABLE BODY */}
          {items.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="relative z-10 divide-y divide-white/5"
            >
              {items.map((item, idx) => (
                <React.Fragment key={item.id || idx}>
                  {/* MAIN ROW */}
                  <motion.div
                    variants={rowVariants}
                    whileHover={{
                      backgroundColor: "rgba(140, 29, 24, 0.08)",
                      transition: { duration: 0.2 },
                    }}
                    className="grid grid-cols-12 gap-0 px-6 md:px-8 py-5 md:py-6 items-center cursor-pointer transition-colors duration-200 group/row"
                    onClick={() =>
                      setExpandedRow(expandedRow === idx ? null : idx)
                    }
                  >
                    {/* Degree Column */}
                    <motion.div
                      variants={cellVariants}
                      className="col-span-3 flex items-center gap-3"
                    >
                      <div className="hidden md:flex w-10 h-10 rounded-lg backdrop-blur-md border border-[color:var(--color-primary)]/35 bg-[color:var(--color-primary)]/10 overflow-hidden flex-shrink-0">
                        {item.institution_logo_url ? (
                          <img
                            src={item.institution_logo_url}
                            alt={item.institution_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[11px] font-bold text-[color:var(--color-primary)]">
                            {item.institution_name
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <TypingText
                          text={item.degree}
                          className="text-xs md:text-sm font-extrabold text-[color:var(--color-text)]"
                        />
                        <TypingText
                          text={item.field_of_study}
                          className="block text-[9px] md:text-[10px] font-semibold text-[color:var(--color-primary)] uppercase tracking-[0.1em]"
                          speed={14}
                        />
                      </div>
                    </motion.div>

                    {/* Institution Column */}
                    <motion.div
                      variants={cellVariants}
                      className="col-span-3"
                    >
                      <TypingText
                        text={item.institution_name}
                        className="text-[10px] md:text-xs font-semibold text-[color:var(--color-text)] line-clamp-2"
                        speed={14}
                      />
                      {item.location && (
                        <p className="text-[8px] md:text-[9px] text-[color:var(--color-muted)]/75 mt-1">
                          {item.location}
                        </p>
                      )}
                    </motion.div>

                    {/* Year Column */}
                    <motion.div
                      variants={cellVariants}
                      className="col-span-2"
                    >
                      <div className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg backdrop-blur-sm bg-[color:var(--color-primary)]/12 border border-[color:var(--color-primary)]/35">
                        <span className="text-[9px] md:text-xs font-bold text-[color:var(--color-primary)]">
                          {item.start_date?.slice(0, 4)}
                        </span>
                        <span className="text-[8px] text-[color:var(--color-muted)]/60">
                          –
                        </span>
                        <span className="text-[9px] md:text-xs font-bold text-[color:var(--color-primary)]">
                          {item.end_date?.slice(0, 4) || "Now"}
                        </span>
                      </div>
                    </motion.div>

                    {/* CGPA Column */}
                    <motion.div
                      variants={cellVariants}
                      className="col-span-2"
                    >
                      {item.gpa ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm bg-gradient-to-r from-[#ff6b35]/15 to-[#ff6b35]/5 border border-[#ff6b35]/45">
                          <div className="w-2 h-2 rounded-full bg-[#ff6b35]" />
                          <span className="text-[9px] md:text-xs font-bold text-[#ff6b35]">
                            {item.gpa}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[9px] text-[color:var(--color-muted)]/40">
                          –
                        </span>
                      )}
                    </motion.div>

                    {/* Action Column */}
                    <motion.div
                      variants={cellVariants}
                      className="col-span-2 flex justify-end"
                    >
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300 group/btn border backdrop-blur-sm"
                        style={{
                          background:
                            expandedRow === idx
                              ? "rgba(140, 29, 24, 0.25)"
                              : "rgba(140, 29, 24, 0.1)",
                          borderColor:
                            expandedRow === idx
                              ? "rgba(140, 29, 24, 0.6)"
                              : "rgba(140, 29, 24, 0.25)",
                        }}
                      >
                        <motion.span
                          animate={{
                            rotate: expandedRow === idx ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="text-[color:var(--color-primary)] font-bold text-sm"
                        >
                          ▼
                        </motion.span>
                      </motion.button>
                    </motion.div>
                  </motion.div>

                  {/* EXPANDED ROW - Details */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: expandedRow === idx ? 1 : 0,
                      height: expandedRow === idx ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-12 gap-0 px-6 md:px-8 py-5 md:py-6 bg-gradient-to-r from-[color:var(--color-primary)]/5 via-transparent to-transparent border-t border-white/5">
                      <div className="col-span-full">
                        <div className="space-y-3">
                          <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[color:var(--color-primary)] mb-3">
                              Full Details
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Duration */}
                              <div className="p-3 rounded-lg backdrop-blur-md bg-white/3 border border-white/8">
                                <p className="text-[9px] text-[color:var(--color-muted)] uppercase tracking-[0.1em] mb-2 font-semibold">
                                  Duration
                                </p>
                                <p className="text-xs md:text-sm font-bold text-[color:var(--color-text)]">
                                  {item.start_date} – {item.end_date || "Present"}
                                </p>
                              </div>

                              {/* Location */}
                              <div className="p-3 rounded-lg backdrop-blur-md bg-white/3 border border-white/8">
                                <p className="text-[9px] text-[color:var(--color-muted)] uppercase tracking-[0.1em] mb-2 font-semibold">
                                  Location
                                </p>
                                <p className="text-xs md:text-sm font-bold text-[color:var(--color-text)]">
                                  {item.location || "–"}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          {item.description && (
                            <div>
                              <p className="text-[9px] text-[color:var(--color-muted)] uppercase tracking-[0.1em] mb-2 font-semibold">
                                Focus & Highlights
                              </p>
                              <TypingText
                                text={item.description}
                                speed={12}
                                className="block text-[10px] md:text-xs text-[color:var(--color-muted)] leading-relaxed p-3 rounded-lg backdrop-blur-md bg-white/3 border border-white/8"
                              />
                            </div>
                          )}

                          {/* Action Button */}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[color:var(--color-primary)] to-[#ff6b35] text-white font-bold text-xs uppercase tracking-[0.1em] transition-all flex items-center justify-center gap-2 group/action"
                          >
                            <motion.span
                              animate={{ x: [0, 4, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              ▶
                            </motion.span>
                            View Certificate
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </React.Fragment>
              ))}
            </motion.div>
          ) : (
            <div className="relative z-10 px-6 md:px-8 py-16 text-center">
              <p className="text-sm md:text-base text-[color:var(--color-muted)]">
                Loading education data...
              </p>
            </div>
          )}
        </motion.div>

        {/* FOOTER NOTE */}
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-8"
          >
            <p className="text-xs md:text-sm text-[color:var(--color-muted)] uppercase tracking-[0.12em] font-semibold">
              Click on any row to see detailed information
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Education;