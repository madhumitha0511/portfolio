// client/src/components/sections/Education.js
import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// ✅ PERFORMANCE: Optimized typing effect with memoization
const TypingText = ({ text, className, speed = 18 }) => {
  const [display, setDisplay] = useState("");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!text) return;
    
    // ✅ Skip typing animation if reduced motion is preferred
    if (prefersReducedMotion) {
      setDisplay(text);
      return;
    }

    let i = 0;
    setDisplay("");
    const id = setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, prefersReducedMotion]);

  return <span className={className}>{display}</span>;
};

const Education = ({ data }) => {
  // No API call! Data comes from App.js
  const items = data || [];
  const [isDark, setIsDark] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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

  // ✅ PERFORMANCE: Optimized animation variants
  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : -40,
      scale: prefersReducedMotion ? 1 : 0.9
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
      scale: prefersReducedMotion ? 1 : 0.95
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
        delay: prefersReducedMotion ? 0 : custom * 0.1,
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
        delay: prefersReducedMotion ? 0 : custom * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  const cellVariants = {
    hidden: { 
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.95
    },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : custom * 0.05,
        ease: "easeOut"
      }
    })
  };

  const mobileCardVariants = {
    hidden: { 
      opacity: 0,
      y: prefersReducedMotion ? 0 : 40,
      scale: prefersReducedMotion ? 1 : 0.95
    },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : custom * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  return (
    <section 
      id="education" 
      className="relative py-40 px-4 md:px-8 overflow-hidden"
      style={{
        perspective: "1500px",
        transformStyle: "preserve-3d"
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ✅ SCROLL ANIMATION: Header - Works on both scroll directions */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ 
            once: false,  // Re-animates on scroll up
            amount: 0.3,
            margin: "-50px"
          }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-[color:var(--color-text)]">
            Education
          </h2>
        </motion.div>

        {/* ✅ SCROLL ANIMATION: Table Container */}
        <motion.div
          variants={tableContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ 
            once: false,  // Re-animates on scroll
            amount: 0.15,
            margin: "-80px"
          }}
          whileHover={!prefersReducedMotion ? {
            scale: 1.01,
            transition: { duration: 0.3 }
          } : {}}
          className={isDark 
            ? "relative backdrop-blur-xl rounded-3xl overflow-hidden border border-[color:var(--color-border)] shadow-elevated"
            : "relative backdrop-blur-xl rounded-3xl overflow-hidden border border-[color:var(--color-border)] shadow-soft hover:shadow-elevated transition-shadow"
          }
          style={isDark ? {
            background: "rgba(10, 10, 15, 0.4)",
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
            willChange: "transform, opacity",
            transform: "translateZ(0)"
          } : {
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
            willChange: "transform, opacity",
            transform: "translateZ(0)"
          }}
        >
          
          {/* ✅ SCROLL ANIMATION: Desktop Table Header with Stagger */}
          <div className={isDark
            ? "relative z-10 grid grid-cols-10 gap-0 px-6 md:px-8 py-6 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)]/80 backdrop-blur-sm hidden lg:grid"
            : "relative z-10 grid grid-cols-10 gap-0 px-6 md:px-8 py-6 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)]/50 backdrop-blur-sm hidden lg:grid"
          }>
            <motion.div 
              custom={0}
              variants={headerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              className="col-span-3 text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] text-[color:var(--color-primary)]"
            >
              Degree
            </motion.div>
            <motion.div 
              custom={1}
              variants={headerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              className="col-span-4 text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] text-[color:var(--color-primary)]"
            >
              Institution
            </motion.div>
            <motion.div 
              custom={2}
              variants={headerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              className="col-span-2 text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] text-[color:var(--color-primary)]"
            >
              Year
            </motion.div>
            <motion.div 
              custom={3}
              variants={headerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              className="col-span-1 text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] text-[color:var(--color-primary)]"
            >
              CGPA
            </motion.div>
          </div>

          {/* ✅ SCROLL ANIMATION: Table Body - Desktop + Mobile */}
          {items.length > 0 ? (
            <div className="relative z-10 divide-y divide-[color:var(--color-border)]">
              {items.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  custom={idx}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ 
                    once: false,  // ✅ Re-animates on scroll up
                    amount: 0.3,
                    margin: "-30px"
                  }}
                  whileHover={!prefersReducedMotion ? (isDark ? {
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    x: 4,
                    transition: { duration: 0.2 }
                  } : {
                    backgroundColor: "rgba(31, 58, 138, 0.04)",
                    x: 4,
                    transition: { duration: 0.2 }
                  }) : {}}
                  className="group/row"
                  style={{
                    willChange: "transform, opacity",
                    transform: "translateZ(0)"
                  }}
                >
                  
                  {/* ✅ MOBILE CARD with Animation */}
                  <motion.div
                    variants={mobileCardVariants}
                    className={isDark
                      ? "lg:hidden px-6 py-5 border-b border-[color:var(--color-border)]/50 hover:bg-[color:var(--color-bg-elevated)]/30 transition-all duration-300"
                      : "lg:hidden px-6 py-5 border-b border-[color:var(--color-border)]/50 hover:bg-[color:var(--color-bg-elevated)]/20 transition-all duration-300"
                    }
                  >
                    <div className="flex items-start gap-4 mb-3">
                      <motion.div 
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: false }}
                        transition={{ 
                          duration: prefersReducedMotion ? 0 : 0.5,
                          delay: prefersReducedMotion ? 0 : 0.1,
                          ease: [0.34, 1.56, 0.64, 1]
                        }}
                        className="w-12 h-12 rounded-xl backdrop-blur-md border border-[color:var(--color-primary)]/40 bg-[color:var(--color-primary)]/10 flex-shrink-0 flex items-center justify-center mt-1"
                      >
                        {item.institution_logo_url ? (
                          <img src={item.institution_logo_url} alt={item.institution_name} className="w-10 h-10 object-cover rounded-lg" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs font-bold text-[color:var(--color-primary)]">
                            {item.institution_name?.charAt(0)?.toUpperCase()}
                          </div>
                        )}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <motion.div 
                          className="flex flex-col gap-1"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: false }}
                          transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
                        >
                          <TypingText text={item.degree} className="text-sm font-bold text-[color:var(--color-text)]" />
                          <TypingText text={item.field_of_study} className="text-xs font-semibold text-[color:var(--color-primary)] uppercase tracking-wide" speed={14} />
                        </motion.div>
                      </div>
                    </div>
                    <motion.div 
                      className="pl-16"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
                    >
                      <TypingText text={item.institution_name} className="text-sm font-semibold text-[color:var(--color-text)] mb-1 block" speed={14} />
                      {item.location && <p className="text-xs text-[color:var(--color-muted)] mb-3">{item.location}</p>}
                      <div className="flex items-center justify-between">
                        <motion.div 
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: false }}
                          transition={{ 
                            delay: prefersReducedMotion ? 0 : 0.4,
                            type: "spring",
                            stiffness: 200
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg backdrop-blur-sm bg-[color:var(--color-primary)]/12 border border-[color:var(--color-primary)]/35"
                        >
                          <span className="text-xs font-bold text-[color:var(--color-primary)]">{item.start_date?.slice(0, 4)}</span>
                          <span className="text-xs text-[color:var(--color-muted)]/60">–</span>
                          <span className="text-xs font-bold text-[color:var(--color-primary)]">{item.end_date?.slice(0, 4) || "Now"}</span>
                        </motion.div>
                        {item.gpa && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: false }}
                            transition={{ 
                              delay: prefersReducedMotion ? 0 : 0.5,
                              type: "spring",
                              stiffness: 200
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm bg-gradient-to-r from-[color:var(--color-primary)]/15 to-[color:var(--color-primary)]/5 border border-[color:var(--color-primary)]/45"
                          >
                            <motion.div 
                              className="w-2 h-2 rounded-full bg-[color:var(--color-primary)]"
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
                            <span className="text-xs font-bold text-[color:var(--color-primary)]">{item.gpa}</span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* ✅ DESKTOP TABLE ROW with Cell Stagger */}
                  <div className="hidden lg:grid lg:grid-cols-10 lg:gap-0 lg:px-6 lg:px-8 lg:py-5 lg:py-6 lg:items-center lg:transition-colors lg:duration-200 lg:backdrop-blur-sm grid-cols-10 gap-0 px-6 py-5 items-center transition-colors duration-200">
                    
                    {/* Degree Column */}
                    <motion.div 
                      custom={0}
                      variants={cellVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.5 }}
                      className="col-span-3 flex items-center gap-3"
                    >
                      <motion.div 
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: false }}
                        transition={{ 
                          duration: prefersReducedMotion ? 0 : 0.5,
                          ease: [0.34, 1.56, 0.64, 1]
                        }}
                        className="hidden lg:flex w-10 h-10 rounded-lg backdrop-blur-md border border-[color:var(--color-primary)]/35 bg-[color:var(--color-primary)]/10 overflow-hidden flex-shrink-0"
                      >
                        {item.institution_logo_url ? (
                          <img src={item.institution_logo_url} alt={item.institution_name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[11px] font-bold text-[color:var(--color-primary)]">
                            {item.institution_name?.charAt(0)?.toUpperCase()}
                          </div>
                        )}
                      </motion.div>
                      <div>
                        <TypingText text={item.degree} className="text-xs lg:text-sm font-extrabold text-[color:var(--color-text)]" />
                        <TypingText text={item.field_of_study} className="block text-[9px] lg:text-[10px] font-semibold text-[color:var(--color-primary)] uppercase tracking-[0.1em]" speed={14} />
                      </div>
                    </motion.div>

                    {/* Institution Column */}
                    <motion.div 
                      custom={1}
                      variants={cellVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.5 }}
                      className="col-span-4"
                    >
                      <TypingText text={item.institution_name} className="text-[10px] lg:text-xs font-semibold text-[color:var(--color-text)] line-clamp-2" speed={14} />
                      {item.location && (
                        <p className="text-[8px] lg:text-[9px] text-[color:var(--color-muted)]/75 mt-1">{item.location}</p>
                      )}
                    </motion.div>

                    {/* Year Column */}
                    <motion.div 
                      custom={2}
                      variants={cellVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.5 }}
                      className="col-span-2"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ 
                          delay: prefersReducedMotion ? 0 : 0.2,
                          type: "spring",
                          stiffness: 200
                        }}
                        className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg backdrop-blur-sm bg-[color:var(--color-primary)]/12 border border-[color:var(--color-primary)]/35"
                      >
                        <span className="text-[9px] lg:text-xs font-bold text-[color:var(--color-primary)]">{item.start_date?.slice(0, 4)}</span>
                        <span className="text-[8px] text-[color:var(--color-muted)]/60">–</span>
                        <span className="text-[9px] lg:text-xs font-bold text-[color:var(--color-primary)]">{item.end_date?.slice(0, 4) || "Now"}</span>
                      </motion.div>
                    </motion.div>

                    {/* CGPA Column */}
                    <motion.div 
                      custom={3}
                      variants={cellVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.5 }}
                      className="col-span-1"
                    >
                      {item.gpa ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: false }}
                          transition={{ 
                            delay: prefersReducedMotion ? 0 : 0.3,
                            type: "spring",
                            stiffness: 200
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm bg-gradient-to-r from-[color:var(--color-primary)]/15 to-[color:var(--color-primary)]/5 border border-[color:var(--color-primary)]/45"
                        >
                          <motion.div 
                            className="w-2 h-2 rounded-full bg-[color:var(--color-primary)]"
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
                          <span className="text-[9px] lg:text-xs font-bold text-[color:var(--color-primary)]">{item.gpa}</span>
                        </motion.div>
                      ) : (
                        <span className="text-[9px] text-[color:var(--color-muted)]/40">–</span>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="relative z-10 px-6 lg:px-8 py-16 text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-sm lg:text-base text-[color:var(--color-muted)]"
              >
                No education data available.
              </motion.p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;