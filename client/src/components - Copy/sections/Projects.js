// client/src/components/sections/Projects.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { projectsAPI } from "../../services/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectsAPI.getAll();
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="py-24 px-4 bg-[color:var(--color-bg)] relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, var(--color-primary-soft) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, var(--color-primary-soft) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, var(--color-primary-soft) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute inset-0 opacity-30 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold mb-16 text-center text-[color:var(--color-text)]"
        >
          Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: idx * 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
              whileHover={{
                y: -12,
                rotateY: 5,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              style={{ perspective: "1000px" }}
              className="group relative"
            >
              {/* 3D Card Container */}
              <div className="relative rounded-3xl overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-card)] backdrop-blur-xl shadow-soft transition-all duration-300 group-hover:shadow-2xl">
                {/* Floating gradient on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[color:var(--color-primary)]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ mixBlendMode: "overlay" }}
                />

                {/* Image with 3D tilt */}
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[color:var(--color-primary-soft)] to-[color:var(--color-bg-elevated)]">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={
                      project.image_url ||
                      "https://via.placeholder.com/400x300"
                    }
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[color:var(--color-primary)] text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                    Featured
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-[color:var(--color-text)] group-hover:text-[color:var(--color-primary)] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[color:var(--color-muted)] leading-relaxed line-clamp-2">
                    {project.short_description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2">
                    {(project.tech_stack || [])
                      .slice(0, 3)
                      .map((tech, techIdx) => (
                        <motion.span
                          key={techIdx}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: idx * 0.1 + techIdx * 0.05 }}
                          className="px-3 py-1 text-[11px] font-medium rounded-full bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)] border border-[color:var(--color-primary)]/20"
                        >
                          {tech}
                        </motion.span>
                      ))}
                  </div>

                  {/* Links with 3D button effect */}
                  <div className="flex gap-3 pt-2">
                    {project.github_link && (
                      <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm font-semibold rounded-xl bg-[color:var(--color-primary)] text-white shadow-lg hover:shadow-xl transition-shadow"
                      >
                        GitHub
                      </motion.a>
                    )}
                    {project.demo_link && (
                      <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.demo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm font-semibold rounded-xl border-2 border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white transition-all"
                      >
                        Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>

              {/* 3D depth shadow */}
              <div className="absolute inset-0 -z-10 rounded-3xl bg-[color:var(--color-primary)]/10 blur-2xl translate-y-8 group-hover:translate-y-12 transition-transform duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
