// client/src/components/sections/Projects.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { projectsAPI } from "../../services/api";

export const Projects = () => {
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
      className="py-20 px-4 bg-[color:var(--color-bg)] border-t border-[color:var(--color-border)]"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-semibold mb-12 text-center text-[color:var(--color-text)]">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.01 }}
              transition={{ delay: idx * 0.06 }}
              className="rounded-2xl overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-card)] shadow-soft backdrop-blur-sm cursor-pointer"
            >
              {/* Project Image */}
              <div className="h-48 overflow-hidden bg-[color:var(--color-primary-soft)]">
                <img
                  src={
                    project.image_url || "https://via.placeholder.com/300x200"
                  }
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[color:var(--color-text)] mb-2">
                  {project.title}
                </h3>
                <p className="text-[13px] text-[color:var(--color-muted)] mb-4 line-clamp-2">
                  {project.short_description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech_stack?.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-1 rounded-full bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.github_link && (
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[color:var(--color-primary)] hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                  {project.demo_link && (
                    <a
                      href={project.demo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[color:var(--color-primary)] hover:underline"
                    >
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
