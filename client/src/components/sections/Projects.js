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
    <section id="projects" className="py-20 px-4 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden border border-slate-700 hover:border-blue-500/50 transition cursor-pointer shadow-lg hover:shadow-xl"
            >
              {/* Project Image */}
              <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <img
                  src={
                    project.image_url ||
                    'https://via.placeholder.com/300x200'
                  }
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {project.short_description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech_stack?.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded"
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
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      GitHub
                    </a>
                  )}
                  {project.demo_link && (
                    <a
                      href={project.demo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-400 hover:text-purple-300"
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