// client/src/components/sections/Experience.js
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experienceAPI } from "../../services/api";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [selectedYear, setSelectedYear] = useState("ALL");
  const [isHoveringMac, setIsHoveringMac] = useState(false);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await experienceAPI.getAll();
        const sorted = res.data.sort(
          (a, b) => new Date(b.start_date) - new Date(a.start_date)
        );
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
      const year = new Date(exp.start_date).getFullYear();
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
    return experiences.filter(
      (exp) => new Date(exp.start_date).getFullYear() === Number(selectedYear)
    );
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

  // keep gradient logic, but color tokens come from CSS only
  const colors = [
    "from-[color:var(--color-secondary)] to-[color:var(--color-primary)]",
    "from-[color:var(--color-accent)] to-[color:var(--color-primary)]",
    "from-[color:var(--color-primary)] to-[color:var(--color-secondary)]",
    "from-[color:var(--color-primary)] to-[color:var(--color-accent)]",
    "from-[color:var(--color-secondary)] to-[color:var(--color-accent)]",
    "from-[color:var(--color-accent)] to-[color:var(--color-secondary)]",
    "from-[color:var(--color-primary)] to-[color:var(--color-accent)]",
    "from-[color:var(--color-secondary)] to-[color:var(--color-primary)]",
  ];

  const getColorClass = (index) => colors[index % colors.length];

  return (
    <section
      id="experience"
      className="py-20 px-4 relative overflow-hidden bg-[color:var(--color-bg)]"
    >
      <div className="max-w-full mx-auto relative z-10 px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-[color:var(--color-text)] mb-12"
        >
          Experience
        </motion.h2>

        {experiences.length === 0 ? (
          <p className="text-center text-[color:var(--color-muted)]">
            No experiences yet.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* LEFT: Mac window */}
              <div className="lg:col-span-2 relative">
                <motion.div
                  id="mac-experience-window"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ y: -12, transition: { duration: 0.3 } }}
                  onMouseEnter={() => setIsHoveringMac(true)}
                  onMouseLeave={() => setIsHoveringMac(false)}
                  className="rounded-3xl overflow-hidden border border-[color:var(--color-border)] relative shadow-elevated bg-[color:var(--color-card)]"
                  style={{
                    backdropFilter: "blur(10px)",
                    transform: "translateZ(0)",
                    zIndex: 1,
                  }}
                >
                  {/* Titlebar using tokens */}
                  <div className="px-5 py-3 bg-[color:var(--color-bg-elevated)] border-b border-[color:var(--color-border)] flex items-center gap-3 relative z-10">
                    <div className="flex gap-2">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="w-3 h-3 rounded-full bg-[color:var(--color-secondary)] cursor-pointer shadow-soft"
                        style={{ cursor: cursorUrl }}
                      />
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="w-3 h-3 rounded-full bg-[color:var(--color-accent)] cursor-pointer shadow-soft"
                        style={{ cursor: cursorUrl }}
                      />
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="w-3 h-3 rounded-full bg-[color:var(--color-primary)] cursor-pointer shadow-soft"
                        style={{ cursor: cursorUrl }}
                      />
                    </div>
                    <h3 className="text-xs font-semibold text-[color:var(--color-text)] flex-1 text-center">
                      Welcome to my professional journey!
                    </h3>
                  </div>

                  {/* Year filter bar */}
                  <div className="px-6 py-3 bg-[color:var(--color-bg)] border-b border-[color:var(--color-border)]/30 flex gap-2 overflow-x-auto scrollbar-hide relative z-10">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedYear("ALL")}
                      className={`px-3 py-1.5 rounded-lg font-semibold text-xs whitespace-nowrap transition-all ${
                        selectedYear === "ALL"
                          ? "bg-[color:var(--color-primary)] text-[color:var(--color-bg)]"
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
                        className={`px-3 py-1.5 rounded-lg font-semibold text-xs whitespace-nowrap transition-all ${
                          selectedYear === String(year)
                            ? "bg-[color:var(--color-primary)] text-[color:var(--color-bg)]"
                            : "bg-[color:var(--color-primary-soft)] text-[color:var(--color-text)] hover:bg-[color:var(--color-primary-soft)]/80"
                        }`}
                        style={{ cursor: cursorUrl }}
                      >
                        {year}
                      </motion.button>
                    ))}
                  </div>

                 {/* Cards grid - Dark theme match */}
<div
  className="p-8 md:p-9 min-h-[600px] relative z-10 bg-gradient-to-br from-[color:var(--color-bg)]/80 via-[color:var(--color-bg-elevated)]/60 to-[color:var(--color-card)]/50 backdrop-blur-md"
>
  <AnimatePresence mode="wait">
    <motion.div
      key={selectedYear}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {filteredExperiences.map((exp, idx) => {
        const isActive = exp.id === activeId;
        const colorClass = getColorClass(idx);

        return (
          <motion.button
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              delay: idx * 0.06,
              duration: 0.4,
              ease: "easeOut",
            }}
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => setActiveId(exp.id)}
            className={`relative rounded-2xl p-5 border-2 transition-all overflow-hidden group backdrop-blur-sm h-full text-[color:var(--color-text)] shadow-soft ${
              isActive
                ? "bg-[color:var(--color-card)]/90 border-[color:var(--color-primary)] ring-2 ring-[color:var(--color-primary)]/50"
                : "bg-[color:var(--color-bg-elevated)]/70 border-[color:var(--color-border)]/50 hover:border-[color:var(--color-primary)]/70 hover:bg-[color:var(--color-bg-elevated)]/80"
            }`}
            style={{ cursor: cursorUrl }}
          >
            {isActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-[color:var(--color-primary)]/10 backdrop-blur-sm pointer-events-none"
              />
            )}

            <div className="relative flex flex-col h-full">
              <div
                className={`mb-3 text-4xl font-bold opacity-90 bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
              >
                {exp.company_name?.[0] || "E"}
              </div>

              <h4 className="text-base font-bold mb-1.5 leading-tight text-[color:var(--color-text)]">
                {exp.role}
              </h4>

              <p
                className={`text-xs md:text-sm opacity-95 mb-2.5 font-semibold bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
              >
                {exp.company_name}
              </p>

              <p className="text-xs opacity-75 line-clamp-3 leading-relaxed mb-3 flex-1 text-[color:var(--color-text)]/90">
                {exp.description}
              </p>

              <div className="border-t border-[color:var(--color-border)]/50 my-2" />

              <div className="flex justify-between items-center mt-auto">
                <span
                  className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
                >
                  {new Date(exp.start_date).getFullYear()}
                </span>
                <span className="text-[9px] opacity-60 text-[color:var(--color-muted)]">
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
    <div className="flex items-center justify-center h-full min-h-[300px] text-[color:var(--color-muted)]">
      <p className="text-base">
        No experiences in {selectedYear}
      </p>
    </div>
  )}
</div>

                </motion.div>
              </div>

              {/* RIGHT: Details panel */}
              <div className="lg:col-span-1 flex items-center relative">
                <AnimatePresence mode="wait">
                  {activeExp && (
                    <motion.div
                      key={activeExp.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                      className="w-full rounded-2xl border border-[color:var(--color-border)] backdrop-blur-xl p-6 md:p-7 shadow-elevated bg-[color:var(--color-card)]"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-bg-elevated) 0%, var(--color-card) 100%)",
                        transform: "translateZ(0)",
                        zIndex: 1,
                      }}
                    >
                      <div className="mb-5 relative z-10">
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="inline-flex mb-2 px-2.5 py-1 rounded-full bg-[color:var(--color-primary-soft)] border border-[color:var(--color-primary)]/40 text-[color:var(--color-primary)] text-xs font-bold uppercase tracking-wider"
                        >
                          {new Date(activeExp.start_date).getFullYear()}
                        </motion.div>

                        <h3 className="text-xl md:text-2xl font-bold text-[color:var(--color-text)] mb-1.5">
                          {activeExp.role}
                        </h3>

                        <p className="text-base md:text-lg text-[color:var(--color-primary)] font-bold mb-2.5">
                          {activeExp.company_name}
                        </p>

                        <div className="flex flex-col gap-1.5 text-xs md:text-sm text-[color:var(--color-muted)]">
                          <div className="flex items-center gap-1.5">
                            <span>📅</span>
                            <span>
                              {activeExp.start_date
                                ? new Date(
                                    activeExp.start_date
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    year: "numeric",
                                  })
                                : ""}{" "}
                              -{" "}
                              {activeExp.is_current
                                ? "Present"
                                : activeExp.end_date
                                ? new Date(
                                    activeExp.end_date
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    year: "numeric",
                                  })
                                : ""}
                            </span>
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

                      <div className="border-top border-[color:var(--color-border)] my-4 relative z-10 border-t" />

                      <p className="text-xs md:text-sm text-[color:var(--color-text)] leading-relaxed mb-4 opacity-95 relative z-10">
                        {activeExp.description}
                      </p>

                      {activeExp.tech_stack && activeExp.tech_stack.length > 0 && (
                        <div className="relative z-10">
                          <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--color-muted)] mb-2">
                            🛠️ Tech Stack
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {activeExp.tech_stack.map((tech, idx) => (
                              <motion.span
                                key={idx}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                  delay: idx * 0.06,
                                  duration: 0.3,
                                }}
                                className="px-2 py-1 text-xs font-medium rounded-md bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)] border border-[color:var(--color-primary)]/30 shadow-soft"
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
          </>
        )}
      </div>
    </section>
  );
};

export default Experience;
