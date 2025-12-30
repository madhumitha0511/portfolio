// ✅ UPDATED Experience.js - FRONTEND (Use formatted dates from backend)

// client/src/components/sections/Experience.js
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experienceAPI } from "../../services/api";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [selectedYear, setSelectedYear] = useState("ALL");
  const [isHoveringMac, setIsHoveringMac] = useState(false);
  const [isDark, setIsDark] = useState(false);

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
    const fetchExperiences = async () => {
      try {
        const res = await experienceAPI.getAll();
        // ✅ CHANGE: Sort by year field instead of parsing date
        const sorted = res.data.sort((a, b) => b.year - a.year);
        setExperiences(sorted);
        if (sorted.length > 0) {
          setActiveId(sorted[0].id);
          setSelectedYear("ALL");
        }
      } catch (err) {
        console.error("Error fetching experiences:", err);
      }
    };
    fetchExperiences();
  }, []);

  const groupedByYear = useMemo(() => {
    const groups = {};
    experiences.forEach((exp) => {
      // ✅ CHANGE: Use year field directly
      const year = exp.year;
      if (!groups[year]) groups[year] = [];
      groups[year].push(exp);
    });
    return Object.keys(groups)
      .sort((a, b) => b - a)
      .reduce((obj, key) => {
        obj[key] = groups[key];
        return obj;
      }, {});
  }, [experiences]);

  const allYears = useMemo(
    () => Object.keys(groupedByYear).map(Number).sort((a, b) => b - a),
    [groupedByYear]
  );

  const filteredExperiences = useMemo(() => {
    if (selectedYear === "ALL" || !selectedYear) return experiences;
    // ✅ CHANGE: Use year field directly
    return experiences.filter((exp) => exp.year === Number(selectedYear));
  }, [experiences, selectedYear]);

  const activeExp = useMemo(
    () => experiences.find((e) => e.id === activeId) || null,
    [experiences, activeId]
  );

  const cursorUrl = `url('/cursor2.png') 16 16, auto`;

  useEffect(() => {
    if (isHoveringMac) {
      document.body.style.cursor = cursorUrl;
      const handleMouseMove = (e) => {
        if (e.target.closest("#mac-experience-window")) {
          document.body.style.cursor = cursorUrl;
        }
      };
      document.addEventListener("mousemove", handleMouseMove);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
      };
    } else {
      document.body.style.cursor = "auto";
    }
  }, [isHoveringMac, cursorUrl]);

  const colors = [
    "from-orange-400 to-red-500",
    "from-cyan-400 to-blue-500",
    "from-emerald-400 to-green-500",
    "from-violet-400 to-purple-500",
    "from-yellow-400 to-orange-500",
    "from-pink-400 to-rose-500",
    "from-indigo-400 to-blue-600",
    "from-teal-400 to-cyan-500",
  ];

  const getColorClass = (index) => colors[index % colors.length];

  return (
    <section id="experience" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-full mx-auto relative z-10 px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[color:var(--color-text)] mb-8 md:mb-12"
        >
          Experience
        </motion.h2>

        {experiences.length === 0 ? (
          <p className="text-center text-[color:var(--color-muted)]">
            No experiences yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 w-full">
            <div className="lg:col-span-2 w-full relative">
              <motion.div
                id="mac-experience-window"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                onMouseEnter={() => setIsHoveringMac(true)}
                onMouseLeave={() => setIsHoveringMac(false)}
                className={`w-full rounded-2xl md:rounded-3xl overflow-hidden relative ${
                  isDark 
                    ? "border border-[color:var(--color-border)]" 
                    : "border border-[color:var(--color-border)] shadow-elevated"
                }`}
                style={isDark ? {
                  boxShadow:
                    `0 0 0 1px rgba(50, 184, 198, 0.1),
                     0 4px 6px rgba(0, 0, 0, 0.15),
                     0 8px 12px rgba(0, 0, 0, 0.2),
                     0 16px 24px rgba(0, 0, 0, 0.25),
                     0 32px 48px rgba(0, 0, 0, 0.3),
                     0 48px 72px rgba(50, 184, 198, 0.08),
                     inset 0 1px 0 rgba(255, 255, 255, 0.1),
                     inset -1px -1px 2px rgba(255, 255, 255, 0.04),
                     inset 1px 1px 2px rgba(255, 255, 255, 0.05)`,
                  backdropFilter: "blur(10px)",
                  transform: "translateZ(0)",
                  zIndex: 1,
                } : {
                  backdropFilter: "blur(10px)",
                  transform: "translateZ(0)",
                  zIndex: 1,
                }}
              >
                <div className={isDark 
                  ? "px-4 md:px-5 py-2.5 md:py-3 bg-gradient-to-b from-[#2d3e52] to-[#1f2937] border-b border-[color:var(--color-border)] flex items-center gap-3 relative z-10"
                  : "px-4 md:px-5 py-2.5 md:py-3 bg-[color:var(--color-bg-elevated)] border-b border-[color:var(--color-border)] flex items-center gap-3 relative z-10"
                }>
                  <div className="flex gap-1.5 md:gap-2">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={isDark ? "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500 cursor-pointer shadow-md" : "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[color:var(--color-secondary)] cursor-pointer shadow-soft"}
                      style={{ cursor: cursorUrl }}
                    />
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={isDark ? "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-400 cursor-pointer shadow-md" : "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[color:var(--color-accent)] cursor-pointer shadow-soft"}
                      style={{ cursor: cursorUrl }}
                    />
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={isDark ? "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500 cursor-pointer shadow-md" : "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[color:var(--color-primary)] cursor-pointer shadow-soft"}
                      style={{ cursor: cursorUrl }}
                    />
                  </div>
                  <h3 className={isDark ? "text-[10px] md:text-xs font-semibold text-white flex-1 text-center" : "text-[10px] md:text-xs font-semibold text-[color:var(--color-text)] flex-1 text-center"}>
                    Welcome to my professional journey!
                  </h3>
                </div>

                <div className={isDark 
                  ? "px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-[#1f2937]/60 via-[#111827]/60 to-[#0f1419]/60 border-b border-[color:var(--color-border)]/30 flex gap-2 overflow-x-auto scrollbar-hide relative z-10"
                  : "px-4 md:px-6 py-2 md:py-3 bg-[color:var(--color-bg)] border-b border-[color:var(--color-border)]/30 flex gap-2 overflow-x-auto scrollbar-hide relative z-10"
                }>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedYear("ALL")}
                    className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg font-semibold text-[10px] md:text-xs whitespace-nowrap transition-all ${
                      selectedYear === "ALL"
                        ? "bg-[color:var(--color-primary)] text-[color:var(--color-bg)]"
                        : isDark
                        ? "bg-[color:var(--color-primary-soft)]/40 text-white hover:bg-[color:var(--color-primary-soft)]/60"
                        : "bg-[color:var(--color-primary-soft)] text-[color:var(--color-text)] hover:bg-[color:var(--color-primary-soft)]/80"
                    }`}
                    style={{ cursor: cursorUrl }}
                  >
                    All
                  </motion.button>

                  {allYears.map((year) => (
                    <motion.button
                      key={year}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedYear(String(year))}
                      className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg font-semibold text-[10px] md:text-xs whitespace-nowrap transition-all ${
                        selectedYear === String(year)
                          ? "bg-[color:var(--color-primary)] text-[color:var(--color-bg)]"
                          : isDark
                          ? "bg-[color:var(--color-primary-soft)]/40 text-white hover:bg-[color:var(--color-primary-soft)]/60"
                          : "bg-[color:var(--color-primary-soft)] text-[color:var(--color-text)] hover:bg-[color:var(--color-primary-soft)]/80"
                      }`}
                      style={{ cursor: cursorUrl }}
                    >
                      {year}
                    </motion.button>
                  ))}
                </div>

                <div
                  className={isDark 
                    ? "p-3 md:p-8 lg:p-9 min-h-[350px] md:min-h-[600px] bg-gradient-to-br from-[#1f2937]/80 via-[#111827]/70 to-[#0f1419]/80 backdrop-blur-md relative z-10"
                    : "p-3 md:p-8 lg:p-9 min-h-[350px] md:min-h-[600px] bg-[color:var(--color-bg-elevated)] backdrop-blur-md relative z-10"
                  }
                  style={isDark ? {
                    backgroundImage:
                      "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)",
                  } : {}}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedYear}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5"
                    >
                      {filteredExperiences.map((exp, idx) => {
                        const isActive = exp.id === activeId;
                        const colorClass = getColorClass(idx);

                        return (
                          <motion.button
                            key={exp.id}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{
                              delay: idx * 0.08,
                              duration: 0.5,
                              ease: "easeOut",
                            }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            onClick={() => setActiveId(exp.id)}
                            className={isDark 
                              ? `relative rounded-xl md:rounded-2xl p-3 md:p-5 border-2 transition-all overflow-hidden group backdrop-blur-sm h-[180px] md:h-auto text-white flex-1 ${
                                  isActive
                                    ? "bg-gradient-to-br from-[#2d3e52]/70 to-[#1f2937]/60 border-[color:var(--color-primary)] shadow-lg ring-2 ring-[color:var(--color-primary)]/50"
                                    : "bg-gradient-to-br from-[#1f2937]/60 to-[#111827]/40 border-[color:var(--color-primary-soft)]/40 hover:border-[color:var(--color-primary)]/60 hover:from-[#2d3e52]/70 hover:to-[#1f2937]/50"
                                }`
                              : `relative rounded-xl md:rounded-2xl p-3 md:p-5 border-2 transition-all overflow-hidden group backdrop-blur-sm h-[180px] md:h-auto flex-1 text-[color:var(--color-text)] shadow-soft ${
                                  isActive
                                    ? "bg-[color:var(--color-card)] border-[color:var(--color-primary)] ring-2 ring-[color:var(--color-primary)]/40"
                                    : "bg-[color:var(--color-bg-elevated)] border-[color:var(--color-border)] hover:border-[color:var(--color-primary)]/70 hover:shadow-elevated"
                                }`
                            }
                            style={{ cursor: cursorUrl }}
                          >
                            {isDark && (
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-br from-white/30 to-transparent" />
                            )}
                            
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={isDark 
                                  ? "absolute inset-0 bg-gradient-to-br from-[color:var(--color-primary)]/5 to-transparent pointer-events-none"
                                  : "absolute inset-0 bg-[color:var(--color-primary-soft)] pointer-events-none"
                                }
                              />
                            )}

                            <div className="relative flex flex-col h-full space-y-2">
                              <div className={`text-xl md:text-4xl font-bold opacity-90 bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}>
                                {exp.company_name?.[0] || "E"}
                              </div>
                              
                              <div className="space-y-1 flex-1">
                                <h4 className="text-sm font-bold leading-tight line-clamp-1">
                                  {exp.role}
                                </h4>
                                <p className={`text-xs font-semibold bg-gradient-to-r ${colorClass} bg-clip-text text-transparent line-clamp-1`}>
                                  {exp.company_name}
                                </p>
                                <p className="text-[10px] opacity-75 line-clamp-2 leading-tight">
                                  {exp.description}
                                </p>
                              </div>

                              <div className={isDark ? "border-t border-current border-opacity-30 pt-1.5" : "border-t border-[color:var(--color-border)] pt-1.5"} />
                              
                              <div className="flex justify-between items-center text-xs">
                                {/* ✅ CHANGE: Use year field directly */}
                                <span className={`font-bold uppercase tracking-wider bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}>
                                  {exp.year}
                                </span>
                                <span className={isDark ? "opacity-60 text-[10px]" : "text-[10px] text-[color:var(--color-muted)]"}>
                                  {exp.location && `📍 ${exp.location}`}
                                </span>
                              </div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>

                  {filteredExperiences.length === 0 && (
                    <div className={isDark ? "flex items-center justify-center h-full min-h-[300px] text-white opacity-50" : "flex items-center justify-center h-full min-h-[300px] text-[color:var(--color-muted)]"}>
                      <p className="text-sm md:text-base">No experiences in {selectedYear}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1 w-full mt-4 lg:mt-0 flex items-start lg:items-center relative">
              <AnimatePresence mode="wait">
                {activeExp && (
                  <motion.div
                    key={activeExp.id}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className={isDark 
                      ? "w-full rounded-2xl md:rounded-2xl border border-[color:var(--color-border)] backdrop-blur-xl p-5 md:p-6 lg:p-7 relative"
                      : "w-full rounded-2xl md:rounded-2xl border border-[color:var(--color-border)] backdrop-blur-xl p-5 md:p-6 lg:p-7 shadow-elevated bg-[color:var(--color-card)]"
                    }
                    style={isDark ? {
                      background:
                        "linear-gradient(135deg, rgba(31,41,55,0.4) 0%, rgba(17,24,39,0.3) 100%)",
                      boxShadow:
                        `0 0 0 1px rgba(50, 184, 198, 0.1),
                         0 4px 8px rgba(0, 0, 0, 0.15),
                         0 8px 16px rgba(0, 0, 0, 0.2),
                         0 16px 32px rgba(0, 0, 0, 0.25),
                         0 32px 48px rgba(50, 184, 198, 0.06),
                         inset 0 1px 1px rgba(255, 255, 255, 0.1),
                         inset -1px -1px 2px rgba(255, 255, 255, 0.03),
                         inset 1px 1px 2px rgba(255, 255, 255, 0.04)`,
                      transform: "translateZ(0)",
                      zIndex: 1,
                    } : {
                      transform: "translateZ(0)",
                      zIndex: 1,
                    }}
                  >
                    <div className="mb-4 md:mb-5 relative z-10">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex mb-2 px-2 md:px-2.5 py-0.5 md:py-1 rounded-full bg-[color:var(--color-primary-soft)] border border-[color:var(--color-primary)]/40 text-[color:var(--color-primary)] text-[10px] md:text-xs font-bold uppercase tracking-wider"
                      >
                        {/* ✅ CHANGE: Use year field directly */}
                        {activeExp.year}
                      </motion.div>

                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[color:var(--color-text)] mb-1 md:mb-1.5">
                        {activeExp.role}
                      </h3>

                      <p className="text-sm md:text-base lg:text-lg text-[color:var(--color-primary)] font-bold mb-2 md:mb-2.5">
                        {activeExp.company_name}
                      </p>

                      <div className="flex flex-col gap-1 md:gap-1.5 text-[11px] md:text-xs lg:text-sm text-[color:var(--color-muted)]">
                        <div className="flex items-center gap-1.5">
                          <span>📅</span>
                          {/* ✅ CHANGE: Use formatted_date_range directly */}
                          <span>{activeExp.formatted_date_range}</span>
                        </div>
                        {activeExp.location && (
                          <div className="flex items-center gap-1.5">
                            <span>📍</span>
                            <span>{activeExp.location}</span>
                          </div>
                        )}
                        {activeExp.employment_type && (
                          <div className="flex items-center gap-1.5">
                            <span>💼</span>
                            <span>{activeExp.employment_type}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-[color:var(--color-border)] my-3 md:my-4 relative z-10" />

                    <p className="text-[11px] md:text-xs lg:text-sm text-[color:var(--color-text)] leading-relaxed mb-3 md:mb-4 opacity-95 relative z-10">
                      {activeExp.description}
                    </p>

                    {activeExp.tech_stack && activeExp.tech_stack.length > 0 && (
                      <div className="relative z-10">
                        <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[color:var(--color-muted)] mb-2">
                          🛠️ Tech Stack
                        </p>
                        <div className="flex flex-wrap gap-1 md:gap-1.5">
                          {activeExp.tech_stack.map((tech, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                delay: idx * 0.06,
                                duration: 0.3,
                              }}
                              className="px-2 py-0.5 md:py-1 text-[10px] md:text-xs font-medium rounded-md bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)] border border-[color:var(--color-primary)]/30 shadow-soft"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;