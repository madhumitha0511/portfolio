import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
 
  projectsAPI,

} from '../../services/api';

// ========== 3. PROJECTS SECTION ==========
export const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectsAPI.getAll();
        setProjects(res.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section
  id="projects"
  className="py-20 border-t border-[color:var(--color-border)]"
>
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center text-[color:var(--color-text)]">
      Projects
    </h2>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <motion.article
          key={p.id}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6, scale: 1.01 }}
          className="bg-[color:var(--color-card)] border border-[color:var(--color-border)] rounded-2xl overflow-hidden shadow-soft backdrop-blur-sm"
        >
          {/* ...content... */}
          <h3 className="text-base md:text-lg font-semibold text-[color:var(--color-text)]">
            {p.title}
          </h3>
          <p className="text-xs text-[color:var(--color-muted)]">
            {p.short_description}
          </p>
          {/* chips */}
          <span className="px-2 py-1 text-[11px] rounded-full bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)]">
            {t}
          </span>
        </motion.article>
      ))}
    </div>
  </div>
</section>

  );
};

export default Projects;