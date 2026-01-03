// client/src/components/sections/Hackathons.js
import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const Hackathons = ({ data }) => {
  // No API call! Data comes from App.js
  const items = React.useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return [...data].sort((a, b) => b.year - a.year);
  }, [data]);

  const [activeId, setActiveId] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // ✅ PERFORMANCE: Respect user's motion preferences
  const prefersReducedMotion = useReducedMotion();

  // ✅ Set initial activeId when data loads
  useEffect(() => {
    if (items.length > 0 && !activeId) {
      setActiveId(items[0].id);
    }
  }, [items, activeId]);

  // ✅ Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const titleColors = [
    "text-red-400",
    "text-orange-400",
    "text-yellow-400",
    "text-green-400",
    "text-cyan-400",
    "text-blue-400",
    "text-purple-400",
    "text-pink-400",
  ];

  const getTitleColor = (index) => titleColors[index % titleColors.length];

  // ✅ PERFORMANCE: Optimized animation variants
  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : -30,
      scale: prefersReducedMotion ? 1 : 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const tableContainerVariants = {
    hidden: { 
      opacity: 0,
      y: prefersReducedMotion ? 0 : 50,
      scale: prefersReducedMotion ? 1 : 0.96
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : -10 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : custom * 0.08,
        ease: "easeOut"
      }
    })
  };

  const rowVariants = {
    hidden: { 
      opacity: 0,
      x: prefersReducedMotion ? 0 : -30,
      scale: prefersReducedMotion ? 1 : 0.98
    },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : custom * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  const detailsVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      y: prefersReducedMotion ? 0 : -20
    },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      y: prefersReducedMotion ? 0 : -20,
      transition: {
        duration: prefersReducedMotion ? 0.15 : 0.3,
        ease: "easeInOut"
      }
    }
  };

  const contentStaggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
        delayChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  };

  const contentItemVariants = {
    hidden: { 
      opacity: 0,
      y: prefersReducedMotion ? 0 : 10,
      scale: prefersReducedMotion ? 1 : 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      id="hackathons"
      className="py-20 px-4 relative overflow-hidden"
      style={{
        perspective: "1500px",
        transformStyle: "preserve-3d"
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ✅ Title - Mobile: NO animation, Desktop: bidirectional */}
        <motion.h2
          variants={titleVariants}
          initial={isMobile ? "visible" : "hidden"}
          whileInView={isMobile ? false : "visible"}
          viewport={{ 
            once: isMobile,  
            amount: 0.3,
            margin: "-50px"
          }}
          className="text-4xl md:text-5xl font-bold text-center text-[color:var(--color-text)] mb-10"
        >
          Hackathons & Events
        </motion.h2>

        {/* ✅ Table Container - Mobile: NO animation, Desktop: bidirectional */}
        <motion.div 
          variants={tableContainerVariants}
          initial={isMobile ? "visible" : "hidden"}
          whileInView={isMobile ? false : "visible"}
          viewport={{ 
            once: isMobile,  
            amount: 0.15,
            margin: "-80px"
          }}
          whileHover={!prefersReducedMotion ? {
            scale: 1.005,
            transition: { duration: 0.3 }
          } : {}}
          className="mt-4 rounded-3xl shadow-soft border border-[color:var(--color-border)] overflow-hidden relative backdrop-blur-2xl bg-[color:var(--color-card)]/40"
          style={{
            willChange: "transform, opacity",
            transform: "translateZ(0)"
          }}
        >
          <div className="absolute inset-0 bg-blue-500/3 pointer-events-none" />

          <div className="relative z-10">
            
            {/* ✅ Table Header - Mobile: NO animation, Desktop: bidirectional */}
            <div className="hidden md:grid grid-cols-[70px,1.8fr,1.3fr,1.3fr,40px] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-muted)] bg-[color:var(--color-primary-soft)]/40 backdrop-blur-xl border-b border-[color:var(--color-border)]/30">
              <motion.span
                custom={0}
                variants={headerVariants}
                initial={isMobile ? "visible" : "hidden"}
                whileInView={isMobile ? false : "visible"}
                viewport={{ once: isMobile, amount: 0.5 }}
              >
                Year
              </motion.span>
              <motion.span
                custom={1}
                variants={headerVariants}
                initial={isMobile ? "visible" : "hidden"}
                whileInView={isMobile ? false : "visible"}
                viewport={{ once: isMobile, amount: 0.5 }}
              >
                Event
              </motion.span>
              <motion.span
                custom={2}
                variants={headerVariants}
                initial={isMobile ? "visible" : "hidden"}
                whileInView={isMobile ? false : "visible"}
                viewport={{ once: isMobile, amount: 0.5 }}
              >
                Location
              </motion.span>
              <motion.span
                custom={3}
                variants={headerVariants}
                initial={isMobile ? "visible" : "hidden"}
                whileInView={isMobile ? false : "visible"}
                viewport={{ once: isMobile, amount: 0.5 }}
              >
                Category
              </motion.span>
              <motion.span
                custom={4}
                variants={headerVariants}
                initial={isMobile ? "visible" : "hidden"}
                whileInView={isMobile ? false : "visible"}
                viewport={{ once: isMobile, amount: 0.5 }}
              />
            </div>

            {/* ✅ Table Rows - Mobile: NO animation, Desktop: bidirectional */}
            {items.map((h, index) => {
              const isActive = h.id === activeId;
              const year = h.year || "";
              const titleColorClass = getTitleColor(index);

              return (
                <motion.div
                  key={h.id}
                  custom={index}
                  variants={rowVariants}
                  initial={isMobile ? "visible" : "hidden"}
                  whileInView={isMobile ? false : "visible"}
                  viewport={{ 
                    once: isMobile,  
                    amount: 0.3,
                    margin: "-30px"
                  }}
                  className="border-t border-[color:var(--color-border)]/30"
                  style={{
                    willChange: "transform, opacity",
                    transform: "translateZ(0)"
                  }}
                >
                  <motion.button
                    type="button"
                    onClick={() =>
                      setActiveId((prev) => (prev === h.id ? null : h.id))
                    }
                    whileHover={!prefersReducedMotion ? {
                      x: 4,
                      backgroundColor: isDark 
                        ? "rgba(255, 255, 255, 0.03)"
                        : "rgba(31, 58, 138, 0.03)",
                      transition: { duration: 0.2 }
                    } : {}}
                    whileTap={{ scale: prefersReducedMotion ? 1 : 0.995 }}
                    className={`w-full text-left relative overflow-hidden transition-all backdrop-blur-xl ${
                      isActive
                        ? "bg-[color:var(--color-bg-elevated)]/50"
                        : "bg-transparent hover:bg-[color:var(--color-bg-elevated)]/20"
                    }`}
                    style={{
                      willChange: "transform"
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="hack-active-row"
                        className="absolute inset-0 bg-[color:var(--color-bg-elevated)]/40 backdrop-blur-xl"
                        transition={{
                          type: "spring",
                          stiffness: prefersReducedMotion ? 400 : 300,
                          damping: prefersReducedMotion ? 40 : 30
                        }}
                      />
                    )}

                    <div className="relative grid grid-cols-1 md:grid-cols-[70px,1.8fr,1.3fr,1.3fr,40px] gap-3 px-5 md:px-8 py-5 items-center">
                      
                      {/* Year Badge */}
                      <motion.div 
                        className="text-[11px] font-semibold text-[color:var(--color-muted)]"
                        animate={isActive && !prefersReducedMotion ? {
                          scale: [1, 1.1, 1],
                          color: ["var(--color-muted)", "var(--color-primary)", "var(--color-muted)"]
                        } : {}}
                        transition={{
                          duration: 0.5,
                          ease: "easeInOut"
                        }}
                      >
                        {year}
                      </motion.div>

                      {/* Event Name & Description */}
                      <div className="flex items-center gap-4">
                        <motion.div 
                          initial={isMobile ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                          whileInView={isMobile ? false : { scale: 1, rotate: 0 }}
                          viewport={{ once: isMobile }}
                          transition={{ 
                            delay: prefersReducedMotion ? 0 : index * 0.05,
                            type: "spring",
                            stiffness: 200
                          }}
                          className="hidden sm:flex w-10 h-10 rounded-xl bg-[color:var(--color-primary-soft)]/60 backdrop-blur-md items-center justify-center text-[color:var(--color-primary)] text-xs font-bold shadow-soft border border-[color:var(--color-border)]/20"
                        >
                          {h.event_name?.[0]}
                        </motion.div>
                        <div>
                          <p className={`text-sm md:text-base font-semibold ${titleColorClass}`}>
                            {h.event_name}
                          </p>
                          <p className="text-[11px] text-[color:var(--color-muted)] line-clamp-1">
                            {h.description}
                          </p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="text-[11px] md:text-xs text-[color:var(--color-muted)]">
                        {h.location}
                      </div>

                      {/* Category */}
                      <div className="text-[11px] md:text-xs font-medium text-[color:var(--color-primary)]">
                        {h.category ||
                          (h.role_or_achievement &&
                            h.role_or_achievement.slice(0, 40))}
                      </div>

                      {/* Expand Arrow */}
                      <div className="flex justify-end">
                        <motion.span
                          animate={isMobile ? { x: 0, rotate: isActive ? 90 : 0 } : {
                            x: isActive ? (prefersReducedMotion ? 0 : 4) : 0,
                            rotate: isActive ? (prefersReducedMotion ? 0 : 90) : 0
                          }}
                          transition={{
                            duration: prefersReducedMotion ? 0.15 : 0.3,
                            ease: "easeOut"
                          }}
                          className="text-[color:var(--color-primary)] text-lg"
                        >
                          ▸
                        </motion.span>
                      </div>
                    </div>
                  </motion.button>

                  {/* ✅ Expandable Details */}
                  {isActive && (
                    <motion.div
                      variants={detailsVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="px-5 md:px-8 pb-6 bg-[color:var(--color-bg-elevated)]/40 backdrop-blur-2xl overflow-hidden"
                    >
                      <motion.div
                        variants={contentStaggerVariants}
                        initial="hidden"
                        animate="visible"
                        className="rounded-2xl border border-[color:var(--color-border)]/40 bg-[color:var(--color-card)]/30 backdrop-blur-2xl p-4 md:p-5 shadow-soft"
                      >
                        
                        {/* Header Info */}
                        <motion.div 
                          variants={contentItemVariants}
                          className="flex flex-wrap items-center justify-between gap-3 mb-3"
                        >
                          <span className="inline-flex items-center gap-2 text-[11px] md:text-xs text-[color:var(--color-muted)]">
                            <motion.span 
                              className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-primary)]"
                              animate={!prefersReducedMotion ? {
                                scale: [1, 1.3, 1],
                                opacity: [1, 0.7, 1]
                              } : {}}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                            {h.formatted_date} · {h.location}
                          </span>

                          {h.category && (
                            <motion.span 
                              whileHover={!prefersReducedMotion ? { 
                                scale: 1.05,
                                transition: { duration: 0.2 }
                              } : {}}
                              className="px-3 py-1 text-[11px] font-semibold rounded-full bg-[color:var(--color-primary-soft)]/50 backdrop-blur-md text-[color:var(--color-primary)] uppercase tracking-wide border border-[color:var(--color-primary)]/20"
                            >
                              {h.category}
                            </motion.span>
                          )}
                        </motion.div>

                        {/* Description */}
                        <motion.p 
                          variants={contentItemVariants}
                          className="text-[13px] md:text-sm text-[color:var(--color-text)] leading-relaxed mb-4"
                        >
                          {h.description}
                        </motion.p>

                        {/* Role & Outcome Cards */}
                        <motion.div 
                          variants={contentItemVariants}
                          className="grid md:grid-cols-2 gap-3 mb-3"
                        >
                          {h.role_or_achievement && (
                            <motion.div 
                              whileHover={!prefersReducedMotion ? {
                                y: -2,
                                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                transition: { duration: 0.2 }
                              } : {}}
                              className="flex items-start gap-2 p-3 rounded-xl bg-[color:var(--color-bg-elevated)]/40 backdrop-blur-xl border border-[color:var(--color-border)]/30"
                            >
                              <span className="mt-[3px] w-5 h-5 rounded-full bg-[color:var(--color-primary-soft)]/60 backdrop-blur-md text-[color:var(--color-primary)] flex items-center justify-center text-[10px] font-bold">
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
                            </motion.div>
                          )}

                          {h.outcome_or_result && (
                            <motion.div 
                              whileHover={!prefersReducedMotion ? {
                                y: -2,
                                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                transition: { duration: 0.2 }
                              } : {}}
                              className="flex items-start gap-2 p-3 rounded-xl bg-[color:var(--color-bg-elevated)]/40 backdrop-blur-xl border border-[color:var(--color-border)]/30"
                            >
                              <motion.span 
                                className="mt-[3px] w-5 h-5 rounded-full bg-[color:var(--color-primary-soft)]/60 backdrop-blur-md text-[color:var(--color-primary)] flex items-center justify-center text-[10px] font-bold"
                                animate={!prefersReducedMotion ? {
                                  rotate: [0, 15, -15, 0],
                                  scale: [1, 1.1, 1]
                                } : {}}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                ★
                              </motion.span>
                              <div>
                                <p className="text-[11px] font-semibold text-[color:var(--color-muted)] uppercase tracking-[0.18em] mb-1">
                                  Outcome
                                </p>
                                <p className="text-[12px] md:text-[13px] text-[color:var(--color-primary)]">
                                  {h.outcome_or_result}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div 
                          variants={contentItemVariants}
                          className="flex flex-wrap gap-2 pt-1"
                        >
                          {h.project_link && (
                            <motion.a
                              href={h.project_link}
                              target="_blank"
                              rel="noreferrer"
                              whileHover={!prefersReducedMotion ? { 
                                scale: 1.05,
                                y: -2,
                                transition: { duration: 0.2 }
                              } : {}}
                              whileTap={{ scale: 0.98 }}
                              className="text-[11px] md:text-xs px-3 py-1.5 rounded-full border border-[color:var(--color-primary)] text-[color:var(--color-primary)] bg-[color:var(--color-primary-soft)]/20 backdrop-blur-md hover:bg-[color:var(--color-primary)] hover:text-white transition-colors"
                            >
                              View project
                            </motion.a>
                          )}
                          {h.event_link && (
                            <motion.a
                              href={h.event_link}
                              target="_blank"
                              rel="noreferrer"
                              whileHover={!prefersReducedMotion ? { 
                                scale: 1.05,
                                y: -2,
                                transition: { duration: 0.2 }
                              } : {}}
                              whileTap={{ scale: 0.98 }}
                              className="text-[11px] md:text-xs px-3 py-1.5 rounded-full border border-[color:var(--color-border)] text-[color:var(--color-muted)] bg-[color:var(--color-bg-elevated)]/30 backdrop-blur-md hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)] transition-colors"
                            >
                              Event page
                            </motion.a>
                          )}
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hackathons;
