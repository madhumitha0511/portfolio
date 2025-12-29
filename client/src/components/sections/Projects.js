// client/src/components/sections/Projects.js
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { projectsAPI } from "../../services/api";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [time, setTime] = useState(0);
  const [tempActiveIndex, setTempActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch projects + auto-refetch every 30s
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

  // 60fps RAF loop (only desktop/tablet)
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

  // Orbit geometry (desktop/tablet)
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

  // Memoized orbit active project (position-based)
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

  // Final active index (manual override > orbit position)
  const activeIndex = tempActiveIndex !== null ? tempActiveIndex : orbitActiveIndex;
  const activeProject = projects[activeIndex];

  // LIGHT THEME: Professional color palette optimized for recruiters
  const getActiveBorderColor = (index) => {
    const colorMap = {
      0: "border-[#2E7D99]/70",      // Professional teal-blue
      1: "border-[#6366F1]/70",      // Modern indigo
      2: "border-[#059669]/70",      // Success green
      3: "border-[#7C3AED]/70",      // Royal purple
      4: "border-[#DC2626]/70",      // Confident red
      5: "border-[#0891B2]/70",      // Cyan professional
      6: "border-[#4F46E5]/70",      // Deep indigo
      7: "border-[#0D9488]/70",      // Teal accent
    };
    return colorMap[index % 8] || "border-[#2E7D99]/70";
  };

  // Click handler for orbit cards - 15 SECONDS ACTIVE
  const handleCardClick = useCallback((index) => {
    setTempActiveIndex(index);
    setTimeout(() => setTempActiveIndex(null), 15000);
  }, []);

  // LIGHT THEME: Refined gradient palette - subtle yet distinguished
  const colors = [
    "from-[#2E7D99] to-[#1E5A73]",    // Trustworthy teal-blue
    "from-[#6366F1] to-[#4F46E5]",    // Professional indigo
    "from-[#059669] to-[#047857]",    // Achievement green
    "from-[#7C3AED] to-[#6D28D9]",    // Creative purple
    "from-[#DC2626] to-[#B91C1C]",    // Bold red
    "from-[#0891B2] to-[#0E7490]",    // Calm cyan
    "from-[#4F46E5] to-[#4338CA]",    // Deep indigo
    "from-[#0D9488] to-[#0F766E]",    // Fresh teal
  ];
  const getColorClass = (index) => colors[index % colors.length];

  if (projects.length === 0) {
    return (
      <section id="projects" className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-[color:var(--color-text)] mb-3"
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
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-[color:var(--color-text)] mb-3"
        >
          Projects
        </motion.h2>

        {!isMobile ? (
          <div className="relative h-[580px] md:h-[660px] flex items-center justify-center mt-12">
            {/* Orbit Cards - LIGHT THEME optimized */}
            {projects.map((project, index) => {
              const { x, y, angle } = getOrbitPosition(index, projects.length);
              const colorClass = getColorClass(index);

              const normalized = ((angle + Math.PI) % (2 * Math.PI)) - Math.PI;
              const isTopHalf = normalized > -Math.PI / 2 && normalized < Math.PI / 2;
              const zIndex = isTopHalf ? 40 : 5;

              return (
                <motion.button
                  key={project.id}
                  className="absolute w-52 md:w-64 h-40 md:h-44 rounded-2xl 
                            border border-gray-200/80
                            bg-white/95 backdrop-blur-xl 
                            shadow-[0_8px_30px_rgba(0,0,0,0.08)] 
                            overflow-hidden 
                            group hover:scale-105 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
                            active:scale-[0.98] transition-all duration-300"
                  style={{ transformOrigin: "center", zIndex }}
                  animate={{ x, y }}
                  transition={{ type: "tween", ease: "linear", duration: 0.2 }}
                  onClick={() => handleCardClick(index)}
                >
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${colorClass}`} />
                  <div className="h-full w-full px-4 py-3.5 flex flex-col justify-between">
                    <p className="text-[11px] md:text-[12px] font-semibold text-gray-800 line-clamp-2">
                      {project.title}
                    </p>
                    <p className="text-[10px] md:text-[11px] text-gray-600 line-clamp-2">
                      {project.short_description}
                    </p>
                    <p className={`text-[10px] mt-1 font-semibold bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}>
                      View details →
                    </p>
                  </div>
                </motion.button>
              );
            })}

            {/* ACTIVE CARD - LIGHT THEME premium styling */}
            {activeProject && (
              <div className="absolute top-1/2 -translate-y-8 flex flex-col items-center justify-center">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`relative w-[350px] h-[350px] md:w-[390px] md:h-[390px] 
                            rounded-full border-4 overflow-hidden backdrop-blur-xl 
                            flex flex-col items-center justify-center p-8
                            bg-gradient-to-br from-white/98 to-gray-50/95
                            shadow-[0_20px_60px_rgba(0,0,0,0.12)] 
                            ${getActiveBorderColor(activeIndex)}`}
                >
                  {/* Subtle radial gradient overlay */}
                  <div className="absolute inset-8 rounded-full bg-gradient-radial from-gray-100/40 via-transparent to-transparent" />

                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center space-y-4 px-4">
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight w-full">
                      {activeProject.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed line-clamp-3 w-full px-2">
                      {activeProject.short_description}
                    </p>

                    {/* Tech stack - LIGHT THEME refined badges */}
                    {activeProject.tech_stack && activeProject.tech_stack.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-1.5 w-full max-w-xs">
                        {activeProject.tech_stack.map((tech, i) => (
                          <span
                            key={`${tech}-${i}`}
                            className={`px-2.5 py-1 text-xs font-medium rounded-full 
                                      bg-gradient-to-r ${getColorClass(activeIndex)} 
                                      text-white shadow-sm whitespace-nowrap`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* LIGHT THEME: Premium CTA buttons */}
                    <div className="flex flex-row gap-3 w-full justify-center max-w-xs">
                      {activeProject.github_link && (
                        <motion.a
                          href={activeProject.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className={`group relative px-6 py-3 text-sm font-semibold 
                                    bg-transparent border-2 rounded-xl overflow-hidden 
                                    transition-all duration-300
                                    ${activeIndex === 0 ? 'border-[#2E7D99] text-[#2E7D99] hover:bg-[#2E7D99]' : ''}
                                    ${activeIndex === 1 ? 'border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1]' : ''}
                                    ${activeIndex === 2 ? 'border-[#059669] text-[#059669] hover:bg-[#059669]' : ''}
                                    ${activeIndex === 3 ? 'border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]' : ''}
                                    ${activeIndex === 4 ? 'border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626]' : ''}
                                    ${activeIndex === 5 ? 'border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2]' : ''}
                                    ${activeIndex === 6 ? 'border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5]' : ''}
                                    ${activeIndex === 7 ? 'border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488]' : ''}
                                    hover:text-white hover:shadow-lg`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${getColorClass(activeIndex)}
                                        transform translate-y-full group-hover:translate-y-0 
                                        transition-transform duration-300`} />
                          <span className="relative z-10">More Details</span>
                        </motion.a>
                      )}
                      {activeProject.demo_link && (
                        <motion.a
                          href={activeProject.demo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className={`group relative px-6 py-3 text-sm font-semibold 
                                    bg-transparent border-2 rounded-xl overflow-hidden 
                                    transition-all duration-300
                                    ${activeIndex === 0 ? 'border-[#2E7D99] text-[#2E7D99] hover:bg-[#2E7D99]' : ''}
                                    ${activeIndex === 1 ? 'border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1]' : ''}
                                    ${activeIndex === 2 ? 'border-[#059669] text-[#059669] hover:bg-[#059669]' : ''}
                                    ${activeIndex === 3 ? 'border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]' : ''}
                                    ${activeIndex === 4 ? 'border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626]' : ''}
                                    ${activeIndex === 5 ? 'border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2]' : ''}
                                    ${activeIndex === 6 ? 'border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5]' : ''}
                                    ${activeIndex === 7 ? 'border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488]' : ''}
                                    hover:text-white hover:shadow-lg`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${getColorClass(activeIndex)}
                                        transform translate-y-full group-hover:translate-y-0 
                                        transition-transform duration-300`} />
                          <span className="relative z-10">Live Demo</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        ) : (
          // Mobile layout - LIGHT THEME optimized
          <div className="mt-12 space-y-6 max-w-2xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group"
                onClick={() => handleCardClick(index)}
              >
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 
                               border border-gray-200/80
                               shadow-[0_8px_30px_rgba(0,0,0,0.08)] 
                               hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] 
                               transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 flex-1 pr-3">
                      {project.title}
                    </h3>
                    {index === activeIndex && (
                      <div className={`w-2 h-2 rounded-full animate-pulse
                                    ${index === 0 ? 'bg-[#2E7D99]' : ''}
                                    ${index === 1 ? 'bg-[#6366F1]' : ''}
                                    ${index === 2 ? 'bg-[#059669]' : ''}
                                    ${index === 3 ? 'bg-[#7C3AED]' : ''}
                                    ${index === 4 ? 'bg-[#DC2626]' : ''}
                                    ${index === 5 ? 'bg-[#0891B2]' : ''}
                                    ${index === 6 ? 'bg-[#4F46E5]' : ''}
                                    ${index === 7 ? 'bg-[#0D9488]' : ''}`} 
                      />
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    {project.short_description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech_stack?.map((tech, i) => (
                      <span
                        key={`${tech}-${i}`}
                        className={`px-2 py-0.5 text-xs font-medium rounded-full text-white shadow-sm
                                  bg-gradient-to-r ${getColorClass(index)}`}
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
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg 
                                  border transition-colors
                                  ${index === 0 ? 'border-[#2E7D99]/40 bg-[#2E7D99]/10 text-[#2E7D99] hover:bg-[#2E7D99]/20' : ''}
                                  ${index === 1 ? 'border-[#6366F1]/40 bg-[#6366F1]/10 text-[#6366F1] hover:bg-[#6366F1]/20' : ''}
                                  ${index === 2 ? 'border-[#059669]/40 bg-[#059669]/10 text-[#059669] hover:bg-[#059669]/20' : ''}
                                  ${index === 3 ? 'border-[#7C3AED]/40 bg-[#7C3AED]/10 text-[#7C3AED] hover:bg-[#7C3AED]/20' : ''}
                                  ${index === 4 ? 'border-[#DC2626]/40 bg-[#DC2626]/10 text-[#DC2626] hover:bg-[#DC2626]/20' : ''}
                                  ${index === 5 ? 'border-[#0891B2]/40 bg-[#0891B2]/10 text-[#0891B2] hover:bg-[#0891B2]/20' : ''}
                                  ${index === 6 ? 'border-[#4F46E5]/40 bg-[#4F46E5]/10 text-[#4F46E5] hover:bg-[#4F46E5]/20' : ''}
                                  ${index === 7 ? 'border-[#0D9488]/40 bg-[#0D9488]/10 text-[#0D9488] hover:bg-[#0D9488]/20' : ''}`}
                      >
                        GitHub
                      </a>
                    )}
                    {project.demo_link && (
                      <a
                        href={project.demo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg 
                                  text-white shadow-md hover:shadow-lg transition-all
                                  bg-gradient-to-r ${getColorClass(index)}`}
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
