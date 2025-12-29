// client/src/components/sections/Skills.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { skillsAPI } from "../../services/api";

export const Skills = () => {
  const [skills, setSkills] = useState({});
  const [isDark, setIsDark] = useState(false);

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

  // Dark theme pill colors (unchanged)
  const darkPillClasses = [
    "border-blue-400/50 text-blue-200 bg-blue-900/10",
    "border-purple-400/50 text-purple-200 bg-purple-900/10",
    "border-emerald-400/50 text-emerald-200 bg-emerald-900/10",
    "border-amber-400/50 text-amber-200 bg-amber-900/10",
    "border-pink-400/50 text-pink-200 bg-pink-900/10",
  ];

  // Light theme pill colors (vibrant and premium)
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
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[color:var(--color-text)]">
            Skills
          </h2>
          <p className="mt-3 text-sm md:text-base text-[color:var(--color-muted)]">
            The stack used across projects, AI work, and real client deliverables.
          </p>
        </div>

        {/* glass cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {Object.entries(skills).map(([category, skillsList], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className={isDark
                ? "relative rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card)]/80 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.6)] px-5 py-5 flex flex-col gap-3"
                : "relative rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] backdrop-blur-xl shadow-soft hover:shadow-elevated transition-shadow px-5 py-5 flex flex-col gap-3"
              }
            >
              {/* category title */}
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="text-sm md:text-base font-semibold text-[color:var(--color-text)]">
                  {category}
                </h3>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                  {skillsList.length} skills
                </span>
              </div>

              {/* pills */}
              <div className="flex flex-wrap gap-2.5">
                {skillsList.map((skill, i) => {
                  const accent = getPillAccent(i);
                  return (
                    <motion.button
                      key={skill.id}
                      whileHover={{ y: -2, scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-[11px] md:text-[12px] font-medium transition backdrop-blur-sm ${accent} ${isDark ? 'shadow-[0_1px_0_rgba(255,255,255,0.04)]' : 'shadow-sm'}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      <span>{skill.skill_name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
