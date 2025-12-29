// client/src/components/sections/Projects.js
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projectsAPI } from "../../services/api";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [time, setTime] = useState(0);
  const [tempActiveIndex, setTempActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect theme
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

  // Scroll animation for heading
  const { scrollYProgress } = useScroll();
  const headingY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectsAPI.getAll();
        setProjects(res.data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
    const interval = setInterval(fetchProjects, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const speed = 0.002;
    let frameId;

    const update = () => {
      setTime((prev) => prev + speed);
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [isMobile]);

  const radiusX = 380;
  const radiusY = 350;
  const centerYOffset = 170;

  const getOrbitPosition = useCallback((i, n) => {
    if (!n || isMobile) return { x: 0, y: 0, angle: 0 };
    const step = (2 * Math.PI) / n;
    const angle = time + i * step;
    const x = radiusX * Math.cos(angle);
    const y = radiusY * Math.sin(angle) + centerYOffset;
    return { x, y, angle };
  }, [time, isMobile]);

  const orbitActiveIndex = useMemo(() => {
    if (!projects.length || isMobile) return 0;
    let bestIdx = 0;
    let bestScore = Infinity;
    const n = projects.length;

    for (let i = 0; i < n; i++) {
      const { angle } = getOrbitPosition(i, n);
      const target = -Math.PI / 2;
      const diff = Math.atan2(Math.sin(angle - target), Math.cos(angle - target));
      const score = Math.abs(diff);
      if (score < bestScore) {
        bestScore = score;
        bestIdx = i;
      }
    }
    return bestIdx;
  }, [projects, getOrbitPosition]);

  const activeIndex = tempActiveIndex !== null ? tempActiveIndex : orbitActiveIndex;
  const activeProject = projects[activeIndex];

  const getActiveBorderColor = (index) => {
    const colorMap = isDark ? {
      0: "border-orange-500/80",
      1: "border-cyan-500/80",
      2: "border-emerald-500/80",
      3: "border-violet-500/80",
      4: "border-yellow-500/80",
      5: "border-pink-500/80",
      6: "border-indigo-500/80",
      7: "border-teal-500/80",
    } : {
      0: "border-[color:var(--color-secondary)]",
      1: "border-[color:var(--color-primary)]",
      2: "border-[color:var(--color-accent)]",
      3: "border-[color:var(--color-primary)]",
      4: "border-[color:var(--color-secondary)]",
      5: "border-[color:var(--color-accent)]",
      6: "border-[color:var(--color-primary)]",
      7: "border-[color:var(--color-secondary)]",
    };
    return colorMap[index % 8] || (isDark ? "border-orange-500/80" : "border-[color:var(--color-primary)]");
  };

  const handleCardClick = useCallback((index) => {
    setTempActiveIndex(index);
    setTimeout(() => setTempActiveIndex(null), 15000);
  }, []);

  const colors = isDark ? [
    "from-orange-400 to-red-500",
    "from-cyan-400 to-blue-500",
    "from-emerald-400 to-green-500",
    "from-violet-400 to-purple-500",
    "from-yellow-400 to-orange-500",
    "from-pink-400 to-rose-500",
    "from-indigo-400 to-blue-600",
    "from-teal-400 to-cyan-500",
  ] : [
    "from-[color:var(--color-secondary)] to-[color:var(--color-primary)]",
    "from-[color:var(--color-primary)] to-[color:var(--color-accent)]",
    "from-[color:var(--color-accent)] to-[color:var(--color-secondary)]",
    "from-[color:var(--color-primary)] to-[color:var(--color-secondary)]",
    "from-[color:var(--color-secondary)] to-[color:var(--color-accent)]",
    "from-[color:var(--color-accent)] to-[color:var(--color-primary)]",
    "from-[color:var(--color-primary)] to-[color:var(--color-accent)]",
    "from-[color:var(--color-secondary)] to-[color:var(--color-primary)]",
  ];
  
  const getColorClass = (index) => colors[index % colors.length];

  if (projects.length === 0) {
    return (
      <section id="projects" className="py-12 md:py-16 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[color:var(--color-text)] mb-3"
          >
            Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center text-[color:var(--color-muted)] text-base md:text-lg"
          >
            Projects will appear here soon.
          </motion.p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-12 md:py-16 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[color:var(--color-text)] mb-6 md:mb-8"
        >
          Projects
        </motion.h2>

        {!isMobile ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[580px] md:h-[660px] flex items-center justify-center"
          >
            {/* Orbit Cards */}
            {projects.map((project, index) => {
              const { x, y, angle } = getOrbitPosition(index, projects.length);
              const colorClass = getColorClass(index);

              const normalized = ((angle + Math.PI) % (2 * Math.PI)) - Math.PI;
              const isTopHalf = normalized > -Math.PI / 2 && normalized < Math.PI / 2;
              const zIndex = isTopHalf ? 40 : 5;

              return (
                <motion.button
                  key={project.id}
                  className={isDark
                    ? "absolute w-52 md:w-64 h-40 md:h-44 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)]/85 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden group hover:scale-105 active:scale-[0.98] transition-all"
                    : "absolute w-52 md:w-64 h-40 md:h-44 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] backdrop-blur-xl shadow-soft overflow-hidden group hover:scale-105 hover:shadow-elevated active:scale-[0.98] transition-all"
                  }
                  style={{ transformOrigin: "center", zIndex }}
                  animate={{ x, y }}
                  transition={{ type: "tween", ease: "linear", duration: 0.2 }}
                  onClick={() => handleCardClick(index)}
                >
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${colorClass}`} />
                  <div className="h-full w-full px-4 py-3.5 flex flex-col justify-between">
                    <p className="text-[11px] md:text-[12px] font-semibold text-[color:var(--color-text)] line-clamp-2">
                      {project.title}
                    </p>
                    <p className="text-[10px] md:text-[11px] text-[color:var(--color-muted)] line-clamp-2">
                      {project.short_description}
                    </p>
                    <p className={`text-[10px] mt-1 font-semibold bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}>
                      View details →
                    </p>
                  </div>
                </motion.button>
              );
            })}

            {/* Active Card */}
            {activeProject && (
              <div className="absolute top-1/2 -translate-y-8 flex flex-col items-center justify-center">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`relative w-[350px] h-[350px] md:w-[390px] md:h-[390px] rounded-full border-4 overflow-hidden backdrop-blur-xl flex flex-col items-center justify-center p-8 ${
                    isDark 
                      ? "bg-[color:var(--color-card)]/90 shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                      : "bg-[color:var(--color-card)] shadow-elevated"
                  } ${getActiveBorderColor(activeIndex)}`}
                >
                  <div className={isDark 
                    ? "absolute inset-8 rounded-full bg-gradient-radial from-[color:var(--color-primary)]/10 to-transparent"
                    : "absolute inset-8 rounded-full bg-[color:var(--color-primary-soft)]"
                  } />

                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center space-y-4 px-4">
                    <h3 className="text-xl md:text-2xl font-bold text-[color:var(--color-text)] leading-tight w-full">
                      {activeProject.title}
                    </h3>

                    <p className="text-sm md:text-base text-[color:var(--color-muted)] leading-relaxed line-clamp-3 w-full px-2">
                      {activeProject.short_description}
                    </p>

                    {activeProject.tech_stack && activeProject.tech_stack.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-1.5 w-full max-w-xs">
                        {activeProject.tech_stack.map((tech, i) => (
                          <span
                            key={`${tech}-${i}`}
                            className="px-2.5 py-1 text-xs font-medium rounded-full bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)] border border-[color:var(--color-primary)]/30 whitespace-nowrap"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-row gap-3 w-full justify-center max-w-xs">
                      {activeProject.github_link && (
                        <motion.a
                          href={activeProject.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="group relative px-6 py-3 text-sm font-semibold bg-transparent border-2 border-[color:var(--color-primary)] text-[color:var(--color-primary)] rounded-xl overflow-hidden transition-all hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-bg)]"
                        >
                          <div className="absolute inset-0 bg-[color:var(--color-primary)] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                          <span className="relative z-10">More Details</span>
                        </motion.a>
                      )}
                      {activeProject.demo_link && (
                        <motion.a
                          href={activeProject.demo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="group relative px-6 py-3 text-sm font-semibold bg-transparent border-2 border-[color:var(--color-secondary)] text-[color:var(--color-secondary)] rounded-xl overflow-hidden transition-all hover:bg-[color:var(--color-secondary)] hover:text-[color:var(--color-bg)]"
                        >
                          <div className="absolute inset-0 bg-[color:var(--color-secondary)] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                          <span className="relative z-10">Live Demo</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="mt-8 space-y-6 max-w-2xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group"
                onClick={() => handleCardClick(index)}
              >
                <div className={isDark
                  ? "bg-[color:var(--color-card)]/90 backdrop-blur-xl rounded-3xl p-6 border border-[color:var(--color-border)] shadow-2xl hover:shadow-3xl transition-all cursor-pointer"
                  : "bg-[color:var(--color-card)] backdrop-blur-xl rounded-3xl p-6 border border-[color:var(--color-border)] shadow-soft hover:shadow-elevated transition-all cursor-pointer"
                }>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-[color:var(--color-text)] flex-1 pr-3">
                      {project.title}
                    </h3>
                    {index === activeIndex && (
                      <div className="w-2 h-2 rounded-full bg-[color:var(--color-primary)] animate-pulse" />
                    )}
                  </div>
                  
                  <p className="text-sm text-[color:var(--color-muted)] mb-4 leading-relaxed">
                    {project.short_description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech_stack?.map((tech, i) => (
                      <span
                        key={`${tech}-${i}`}
                        className="px-2 py-0.5 text-xs font-medium rounded-full bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)] border border-[color:var(--color-primary)]/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    {project.github_link && (
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)] border border-[color:var(--color-primary)]/40 hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-bg)] transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                    {project.demo_link && (
                      <a
                        href={project.demo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[color:var(--color-primary)] text-[color:var(--color-bg)] shadow-soft hover:shadow-elevated transition-all"
                      >
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
