// client/src/components/sections/Projects.js
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { projectsAPI } from "../../services/api";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [time, setTime] = useState(0);
  const [tempActiveIndex, setTempActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
  // ✅ PERFORMANCE: Respect user's motion preferences
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
    if (isMobile || prefersReducedMotion) return;

    const speed = 0.002;
    let frameId;

    const update = () => {
      setTime((prev) => prev + speed);
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [isMobile, prefersReducedMotion]);
  
  const radiusX = 450;
  const radiusY = 420;
  const centerYOffset = 230;

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
    const colorMap = {
      0: "border-orange-500/80",
      1: "border-cyan-500/80", 
      2: "border-emerald-500/80",
      3: "border-violet-500/80",
      4: "border-yellow-500/80",
      5: "border-pink-500/80",
      6: "border-indigo-500/80",
      7: "border-teal-500/80",
    };
    return colorMap[index % 8] || "border-orange-500/80";
  };

  const handleCardClick = useCallback((index) => {
    setTempActiveIndex(index);
    setTimeout(() => setTempActiveIndex(null), 15000);
  }, []);

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

  const orbitContainerVariants = {
    hidden: { 
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.85
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 1,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2
      }
    }
  };

  const centerCardVariants = {
    hidden: { 
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.7,
      rotateY: prefersReducedMotion ? 0 : -30
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.4
      }
    }
  };

  const mobileCardVariants = {
    hidden: { 
      opacity: 0,
      y: prefersReducedMotion ? 0 : 50,
      scale: prefersReducedMotion ? 1 : 0.9
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

  if (projects.length === 0) {
    return (
      <section id="projects" className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3, margin: "-50px" }}
            className="text-4xl md:text-5xl font-bold text-center text-[color:var(--color-text)] mb-1"
          >
            Projects
          </motion.h2>
          <p className="text-center text-[color:var(--color-muted)] text-lg">
            Projects will appear here soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ✅ SCROLL ANIMATION: Title - Works on both scroll directions */}
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ 
            once: false,  // Re-animates on scroll up
            amount: 0.3,
            margin: "-50px"
          }}
          className="text-4xl md:text-5xl font-bold text-center text-[color:var(--color-text)] mb-3"
        >
          Projects
        </motion.h2>

        {!isMobile ? (
          /* ✅ DESKTOP: Orbital Animation with Scroll Trigger */
          <motion.div
            variants={orbitContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ 
              once: false,  // Re-animates on scroll
              amount: 0.2,
              margin: "-100px"
            }}
            className="relative h-[700px] md:h-[780px] flex items-center justify-center mt-2"
            style={{
              perspective: "2000px", // 3D depth effect
              transformStyle: "preserve-3d"
            }}
          >
            {projects.map((project, index) => {
              const { x, y, angle } = getOrbitPosition(index, projects.length);
              const colorClass = getColorClass(index);

              const normalized = ((angle + Math.PI) % (2 * Math.PI)) - Math.PI;
              const isTopHalf = normalized > -Math.PI / 2 && normalized < Math.PI / 2;
              const zIndex = isTopHalf ? 30 : 5;

              // ✅ PERFORMANCE: Calculate opacity based on position (fade back cards)
              const opacity = isTopHalf ? 1 : 0.6;

              return (
                <motion.button
                  key={project.id}
                  className={isDark 
                    ? `absolute w-64 md:w-72 h-48 md:h-52 rounded-2xl  
                       border border-[color:var(--color-border)] 
                       bg-[color:var(--color-card)]/85 backdrop-blur-xl 
                       shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden 
                       group hover:scale-105 active:scale-[0.98] transition-all`
                    : `absolute w-64 md:w-72 h-48 md:h-52 rounded-2xl 
                       border border-[color:var(--color-border)] 
                       bg-[color:var(--color-card)] backdrop-blur-xl 
                       shadow-soft overflow-hidden 
                       group hover:scale-105 hover:shadow-elevated active:scale-[0.98] transition-all`
                  }
                  style={{ 
                    transformOrigin: "center", 
                    zIndex,
                    opacity,
                    willChange: "transform, opacity", // GPU optimization
                    transform: "translateZ(0)" // Force GPU layer
                  }}
                  animate={{ x, y }}
                  transition={{ 
                    type: "tween", 
                    ease: "linear", 
                    duration: 0.2 
                  }}
                  onClick={() => handleCardClick(index)}
                  whileHover={!prefersReducedMotion ? {
                    scale: 1.08,
                    rotateY: 5,
                    transition: { duration: 0.2 }
                  } : {}}
                >
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${colorClass}`} />
                  
                  <div className="h-full w-full px-5 py-4 flex flex-col justify-between">
                    <p className="text-sm md:text-base font-semibold text-[color:var(--color-text)] line-clamp-2">
                      {project.title}
                    </p>
                    <p className="text-xs md:text-sm text-[color:var(--color-muted)] line-clamp-2">
                      {project.short_description}
                    </p>
                    {project.formatted_start_date && (
                      <p className="text-[10px] text-[color:var(--color-muted)] mt-1">
                        {project.formatted_start_date}
                      </p>
                    )}
                    <p className={`text-xs mt-1 font-semibold bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}>
                      View details →
                    </p>
                  </div>
                </motion.button>
              );
            })}

            {/* ✅ SCROLL ANIMATION: Center Active Card */}
            {activeProject && (
              <div 
                className="absolute top-1/2 translate-y-0 flex flex-col items-center justify-center" 
                style={{ zIndex: 50, perspective: "1500px" }}
              >
                <motion.div
                  key={activeProject.id}
                  variants={centerCardVariants}
                  initial="hidden"
                  animate="visible"
                  className={isDark
                    ? `relative w-[350px] h-[200px] md:w-[440px] md:h-[440px]  
                       rounded-full border-4 overflow-hidden backdrop-blur-xl 
                       flex flex-col items-center justify-center p-8
                       bg-[color:var(--color-card)]/90 shadow-[0_40px_80px_rgba(0,0,0,0.6)] 
                       ${getActiveBorderColor(activeIndex)}`
                    : `relative w-[350px] h-[200px] md:w-[440px] md:h-[440px]  
                       rounded-full border-4 overflow-hidden backdrop-blur-xl 
                       flex flex-col items-center justify-center p-8
                       bg-[color:var(--color-card)] shadow-elevated 
                       ${getActiveBorderColor(activeIndex)}`
                  }
                  style={{
                    willChange: "transform, opacity",
                    transform: "translateZ(0)"
                  }}
                  whileHover={!prefersReducedMotion ? {
                    scale: 1.05,
                    rotateZ: 2,
                    transition: { duration: 0.3 }
                  } : {}}
                >
                  {isDark && (
                    <motion.div 
                      className="absolute inset-8 rounded-full bg-gradient-radial from-[color:var(--color-primary)]/10 to-transparent"
                      animate={!prefersReducedMotion ? {
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5]
                      } : {}}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}

                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center space-y-3 px-4">
                    <motion.h3 
                      className="text-xl md:text-2xl font-bold text-[color:var(--color-text)] leading-tight w-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {activeProject.title}
                    </motion.h3>

                    <motion.p 
                      className="text-sm md:text-base text-[color:var(--color-muted)] leading-relaxed line-clamp-3 w-full px-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {activeProject.short_description}
                    </motion.p>

                    {activeProject.formatted_start_date && (
                      <motion.p 
                        className="text-xs text-[color:var(--color-muted)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        Started: {activeProject.formatted_start_date}
                      </motion.p>
                    )}

                    {activeProject.tech_stack && activeProject.tech_stack.length > 0 && (
                      <motion.div 
                        className="flex flex-wrap justify-center gap-1.5 w-full max-w-xs"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        {activeProject.tech_stack.slice(0, 4).map((tech, i) => (
                          <motion.span
                            key={`${tech}-${i}`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.6 + (i * 0.05) }}
                            className="px-2.5 py-1 text-xs font-medium rounded-full 
                                      bg-[color:var(--color-primary)]/15 
                                      text-[color:var(--color-primary)] 
                                      border border-[color:var(--color-primary)]/30 whitespace-nowrap"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                    )}

                    <motion.div 
                      className="flex flex-row gap-3 w-full justify-center max-w-xs pt-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      {activeProject.github_link && (
                        <motion.a
                          href={activeProject.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                          whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
                          className="group relative px-5 py-2.5 text-sm font-semibold 
                                    bg-transparent border-2 border-[color:var(--color-primary)] 
                                    text-[color:var(--color-primary)] rounded-xl overflow-hidden 
                                    transition-all hover:bg-[color:var(--color-primary)] hover:text-white"
                        >
                          <div className="absolute inset-0 bg-[color:var(--color-primary)] 
                                          transform translate-y-full group-hover:translate-y-0 
                                          transition-transform duration-300" />
                          <span className="relative z-10">More Details</span>
                        </motion.a>
                      )}
                      {activeProject.demo_link && (
                        <motion.a
                          href={activeProject.demo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                          whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
                          className="group relative px-5 py-2.5 text-sm font-semibold 
                                    bg-transparent border-2 border-[color:var(--color-primary)] 
                                    text-[color:var(--color-primary)] rounded-xl overflow-hidden 
                                    transition-all hover:bg-[color:var(--color-primary)] hover:text-white"
                        >
                          <div className="absolute inset-0 bg-[color:var(--color-primary)] 
                                          transform translate-y-full group-hover:translate-y-0 
                                          transition-transform duration-300" />
                          <span className="relative z-10">Live Demo</span>
                        </motion.a>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        ) : (
          /* ✅ MOBILE: Staggered Card Stack with Scroll Animation */
          <div className="mt-12 space-y-6 max-w-2xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                custom={index}
                variants={mobileCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ 
                  once: false,  // ✅ Re-animates on scroll up
                  amount: 0.3,
                  margin: "-50px"
                }}
                whileHover={!prefersReducedMotion ? { 
                  scale: 1.02, 
                  y: -4,
                  transition: { duration: 0.2 }
                } : {}}
                className="group"
                onClick={() => handleCardClick(index)}
                style={{
                  willChange: "transform, opacity"
                }}
              >
                <div className={isDark
                  ? `bg-[color:var(--color-card)]/90 backdrop-blur-xl rounded-3xl p-6 
                     border border-[color:var(--color-border)] 
                     shadow-2xl hover:shadow-3xl transition-all cursor-pointer`
                  : `bg-[color:var(--color-card)] backdrop-blur-xl rounded-3xl p-6 
                     border border-[color:var(--color-border)] 
                     shadow-soft hover:shadow-elevated transition-all cursor-pointer`
                }>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-[color:var(--color-text)] flex-1 pr-3">
                      {project.title}
                    </h3>
                    {index === activeIndex && (
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-[color:var(--color-primary)]"
                        animate={!prefersReducedMotion ? {
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.5, 1]
                        } : {}}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </div>
                  
                  <p className="text-sm text-[color:var(--color-muted)] mb-4 leading-relaxed">
                    {project.short_description}
                  </p>

                  {project.formatted_start_date && (
                    <p className="text-xs text-[color:var(--color-muted)] mb-3">
                      Started: {project.formatted_start_date}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech_stack?.map((tech, i) => (
                      <motion.span
                        key={`${tech}-${i}`}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ 
                          delay: i * 0.05,
                          duration: 0.2 
                        }}
                        className="px-2 py-0.5 text-xs font-medium rounded-full 
                                  bg-[color:var(--color-primary)]/15 
                                  text-[color:var(--color-primary)] 
                                  border border-[color:var(--color-primary)]/30"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    {project.github_link && (
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg 
                                  bg-[color:var(--color-primary-soft)] 
                                  text-[color:var(--color-primary)] 
                                  border border-[color:var(--color-primary)]/40
                                  hover:bg-[color:var(--color-primary)]/20 transition-colors"
                      >
                        More Details
                      </a>
                    )}
                    {project.demo_link && (
                      <a
                        href={project.demo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={isDark
                          ? `px-3 py-1.5 text-xs font-semibold rounded-lg 
                             bg-gradient-to-r from-[color:var(--color-primary)] 
                             text-[color:var(--color-bg)] shadow-md
                             hover:shadow-lg transition-shadow`
                          : `px-3 py-1.5 text-xs font-semibold rounded-lg 
                             bg-[color:var(--color-primary)] 
                             text-white shadow-soft
                             hover:shadow-elevated transition-shadow`
                        }
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