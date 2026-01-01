// client/src/components/sections/Skills.js
import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { skillsAPI } from "../../services/api";

export const Skills = () => {
  const [skills, setSkills] = useState({});
  const [isDark, setIsDark] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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
    const fetchSkills = async () => {
      try {
        const res = await skillsAPI.getAll();
        const grouped = res.data.reduce((acc, skill) => {
          const key = skill.category || "Other";
          if (!acc[key]) acc[key] = [];
          acc[key].push(skill);
          return acc;
        }, {});
        setSkills(grouped);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };
    fetchSkills();
  }, []);

  const darkPillClasses = [
    "border-blue-400/50 text-blue-200 bg-blue-900/10",
    "border-purple-400/50 text-purple-200 bg-purple-900/10",
    "border-emerald-400/50 text-emerald-200 bg-emerald-900/10",
    "border-amber-400/50 text-amber-200 bg-amber-900/10",
    "border-pink-400/50 text-pink-200 bg-pink-900/10",
  ];

  const lightPillClasses = [
    "border-blue-500/60 text-blue-700 bg-blue-50/80",
    "border-purple-500/60 text-purple-700 bg-purple-50/80",
    "border-emerald-500/60 text-emerald-700 bg-emerald-50/80",
    "border-amber-500/60 text-amber-700 bg-amber-50/80",
    "border-pink-500/60 text-pink-700 bg-pink-50/80",
  ];

  const getPillAccent = (index) => {
    const classes = isDark ? darkPillClasses : lightPillClasses;
    return classes[index % classes.length];
  };

  return (
    <section
      id="skills"
      className="py-20 px-4 relative overflow-hidden"
      style={{
        perspective: "1500px"
      }}
    >
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
        
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[color:var(--color-text)]">
            Skills
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {Object.entries(skills).map(([category, skillsList], idx) => (
            <motion.div
              key={category}
              initial={{ 
                opacity: 0,
                y: prefersReducedMotion ? 0 : 30,
                scale: prefersReducedMotion ? 1 : 0.9,
                rotateX: prefersReducedMotion ? 0 : 10
              }}
              whileInView={{ 
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0
              }}
              viewport={{ 
                once: false,
                amount: 0.3
              }}
              transition={{
                delay: prefersReducedMotion ? 0 : idx * 0.1,
                duration: prefersReducedMotion ? 0.3 : 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={!prefersReducedMotion ? {
                scale: 1.03,
                y: -8,
                rotateX: -5,
                transition: { 
                  type: "spring",
                  stiffness: 400,
                  damping: 20
                }
              } : {}}
              className={isDark
                ? "relative rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card)]/80 shadow-[0_18px_45px_rgba(0,0,0,0.6)] px-5 py-5 flex flex-col gap-3"
                : "relative rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] shadow-soft hover:shadow-elevated transition-shadow px-5 py-5 flex flex-col gap-3"
              }
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform"
              }}
            >
              {/* ✅ Category Header - Pop in/out animation */}
              <motion.div 
                className="flex items-center justify-between gap-2 mb-1"
                initial={{ 
                  opacity: 0,
                  scale: prefersReducedMotion ? 1 : 0.5
                }}
                whileInView={{ 
                  opacity: 1,
                  scale: 1
                }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ 
                  delay: prefersReducedMotion ? 0 : idx * 0.1 + 0.1,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300
                }}
              >
                <h3 className="text-sm md:text-base font-semibold text-[color:var(--color-text)]">
                  {category}
                </h3>
                <motion.span 
                  className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]"
                  initial={{ 
                    scale: 0,
                    opacity: 0
                  }}
                  whileInView={{ 
                    scale: 1,
                    opacity: 1
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ 
                    delay: prefersReducedMotion ? 0 : idx * 0.1 + 0.2,
                    type: "spring",
                    stiffness: 500
                  }}
                >
                  {skillsList.length} skills
                </motion.span>
              </motion.div>

              {/* ✅ Pills - Pop in/out animation (no rotation) */}
              <div className="flex flex-wrap gap-2.5">
                {skillsList.map((skill, i) => {
                  const accent = getPillAccent(i);
                  return (
                    <motion.button
                      key={skill.id}
                      initial={{ 
                        scale: 0,
                        opacity: 0
                      }}
                      whileInView={{ 
                        scale: 1,
                        opacity: 1
                      }}
                      viewport={{ 
                        once: false,
                        amount: 0.3
                      }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : idx * 0.1 + 0.15 + i * 0.05,
                        type: "spring",
                        stiffness: prefersReducedMotion ? 400 : 300,
                        damping: prefersReducedMotion ? 40 : 18
                      }}
                      whileHover={!prefersReducedMotion ? { 
                        y: -4,
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { 
                          rotate: {
                            duration: 0.3,
                            ease: "easeInOut"
                          }
                        }
                      } : {}}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-[11px] md:text-[12px] font-medium transition ${accent} ${isDark ? 'shadow-[0_1px_0_rgba(255,255,255,0.04)]' : 'shadow-sm'}`}
                      style={{
                        willChange: "transform"
                      }}
                    >
                      <motion.span 
                        className="h-1.5 w-1.5 rounded-full bg-current"
                        animate={!prefersReducedMotion ? {
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.7, 1]
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                      <span>{skill.skill_name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;