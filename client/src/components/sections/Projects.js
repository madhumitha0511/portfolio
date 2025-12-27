// client/src/components/sections/Projects.js
import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { projectsAPI } from "../../services/api";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [time, setTime] = useState(0); // drives continuous motion

  // Fetch projects
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
  }, []);

  // Continuous time progression for orbit (smooth + controlled)
  useEffect(() => {
    const speed = 0.002; // smaller = slower rotation
    let frameId;

    const update = () => {
      setTime((prev) => prev + speed);
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const cursorUrl = `url('/cursor2.png') 16 16, auto`;

  // Color palette reused from Experience
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

  // Orbit geometry - circular + spacious
  const radiusX = 380;
  const radiusY = 350;
  const centerYOffset = 170;

  const getOrbitPosition = (i, n) => {
    if (!n) return { x: 0, y: 0, angle: 0 };
    const step = (2 * Math.PI) / n;
    const angle = time + i * step;
    const x = radiusX * Math.cos(angle);
    const y = radiusY * Math.sin(angle) + centerYOffset;
    return { x, y, angle };
  };

  // Active project = one closest to "top" angle (-π/2)
  const activeIndex = useMemo(() => {
    if (!projects.length) return 0;
    let bestIdx = 0;
    let bestScore = Infinity;
    const n = projects.length;

    for (let i = 0; i < n; i++) {
      const { angle } = getOrbitPosition(i, n);
      const target = -Math.PI / 2;
      const diff = Math.atan2(
        Math.sin(angle - target),
        Math.cos(angle - target)
      );
      const score = Math.abs(diff);
      if (score < bestScore) {
        bestScore = score;
        bestIdx = i;
      }
    }
    return bestIdx;
  }, [projects, time]);

  const activeProject = useMemo(
    () => (projects.length ? projects[activeIndex] : null),
    [projects, activeIndex]
  );

  return (
    <section
      id="projects"
      className="py-20 px-4 bg-[color:var(--color-bg)] border-t border-[color:var(--color-border)] relative overflow-hidden"
    >
      {/* Animated background (clean, no ghost box) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(140,29,24,0.12), transparent 60%)",
            "radial-gradient(circle at 100% 100%, rgba(140,29,24,0.12), transparent 60%)",
            "radial-gradient(circle at 0% 0%, rgba(140,29,24,0.12), transparent 60%)",
          ],
        }}
        transition={{ duration: 16, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-[color:var(--color-text)] mb-3"
        >
          Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-[color:var(--color-muted)] mb-12 max-w-2xl mx-auto text-sm md:text-base"
        >
        </motion.p>

        {/* RADIAL LAYOUT */}
        <div className="relative h-[520px] md:h-[540px] flex items-center justify-center mt-10 md:mt-12">
          {/* Orbit cards */}
          {projects.map((project, index) => {
            const { x, y, angle } = getOrbitPosition(index, projects.length);
            const colorClass = getColorClass(index);

            // Depth: top half above main circle, bottom half behind
            const normalized = ((angle + Math.PI) % (2 * Math.PI)) - Math.PI;
            const isTopHalf =
              normalized > -Math.PI / 2 && normalized < Math.PI / 2;
            const zIndex = isTopHalf ? 40 : 5;

            return (
              <motion.button
                key={project.id}
                className="absolute w-52 md:w-64 h-40 md:h-44 rounded-2xl 
                           border border-[color:var(--color-border)] 
                           bg-gradient-to-br from-[#1f2937]/80 to-[#020617]/80 
                           shadow-lg overflow-hidden group cursor-pointer"
                style={{
                  transformOrigin: "center",
                  boxShadow:
                    "0 8px 18px rgba(0,0,0,0.45), 0 0 0 1px rgba(15,23,42,0.9)",
                  zIndex,
                }}
                animate={{ x, y }}
                transition={{ type: "tween", ease: "linear", duration: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Accent strip */}
                <div
                  className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${colorClass}`}
                />
                <div className="h-full w-full px-4 py-3.5 flex flex-col justify-between">
                  <p className="text-[11px] md:text-[12px] font-semibold text-[color:var(--color-text)] line-clamp-2">
                    {project.title}
                  </p>
                  <p className="text-[10px] md:text-[11px] text-[color:var(--color-muted)] line-clamp-3">
                    {project.short_description}
                  </p>
                  <p
                    className={`text-[10px] mt-1 font-semibold bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
                  >
                    View details
                  </p>
                </div>
              </motion.button>
            );
          })}

          {/* Center stack: glow + active circle */}
          {activeProject && (
            <div className="absolute top-1/2 -translate-y-6">
              {/* Glow that moves with the center card */}
              <motion.div
                
                animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.02, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.28), transparent 65%)",
                  filter: "blur(18px)",
                }}
              />

              {/* Center active circle */}
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative w-[320px] h-[320px] md:w-[360px] md:h-[360px] 
                           rounded-full border border-[color:var(--color-border)] 
                           overflow-hidden backdrop-blur-xl flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(circle at 20% 0%, rgba(255,255,255,0.08), transparent 55%), radial-gradient(circle at 80% 120%, rgba(15,23,42,0.95), rgba(15,23,42,0.98))",
                  boxShadow:
                    "0 0 0 1px rgba(50,184,198,0.22), 0 30px 60px rgba(0,0,0,0.7)",
                  zIndex: 20,
                }}
              >
                <div
                  className="absolute inset-6 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)",
                  }}
                />

                <div className="relative z-10 flex flex-col items-center text-center px-8">
                  <div className="mb-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[color:var(--color-primary-soft)]/40 border border-[color:var(--color-primary)]/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-primary)] animate-pulse" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-primary)]">
                      Active project
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-[color:var(--color-text)] mb-2">
                    {activeProject.title}
                  </h3>

                  <p className="text-[11px] md:text-[13px] text-[color:var(--color-muted)] mb-4 leading-relaxed line-clamp-4">
                    {activeProject.short_description}
                  </p>

                  {activeProject.tech_stack &&
                    activeProject.tech_stack.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-1.5 mb-4 max-w-xs">
                        {activeProject.tech_stack
                          .slice(0, 4)
                          .map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-[10px] font-medium rounded-full bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)] border border-[color:var(--color-primary)]/40"
                            >
                              {tech}
                            </span>
                          ))}
                        {activeProject.tech_stack.length > 4 && (
                          <span className="px-2 py-1 text-[10px] rounded-full text-[color:var(--color-muted)]">
                            +{activeProject.tech_stack.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                  <div className="flex gap-2 mt-1">
                    {activeProject.github_link && (
                      <motion.a
                        href={activeProject.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 text-[11px] font-semibold rounded-full bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)] border border-[color:var(--color-primary)]/40"
                        style={{ cursor: cursorUrl }}
                      >
                        GitHub
                      </motion.a>
                    )}
                    {activeProject.demo_link && (
                      <motion.a
                        href={activeProject.demo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 text-[11px] font-semibold rounded-full bg-[color:var(--color-primary)] text-[color:var(--color-bg)] shadow-lg"
                        style={{ cursor: cursorUrl }}
                      >
                        Live demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;