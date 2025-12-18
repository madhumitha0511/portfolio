
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  experienceAPI,

} from '../../services/api';

// ========== 2. EXPERIENCE SECTION ==========
export const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await experienceAPI.getAll();
        setExperiences(res.data);
      } catch (err) {
        console.error('Error fetching experiences:', err);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <section id="experience" className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Experience
        </h2>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-blue-500/50 transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <p className="text-blue-400">{exp.company_name}</p>
                </div>
                <span className="text-sm text-slate-400">
                  {exp.start_date
                    ? new Date(exp.start_date).toLocaleDateString()
                    : ''}
                  {' - '}
                  {exp.is_current
                    ? 'Present'
                    : exp.end_date
                    ? new Date(exp.end_date).toLocaleDateString()
                    : ''}
                </span>
              </div>

              <p className="text-slate-300 mb-4">{exp.description}</p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2">
                {exp.tech_stack?.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
