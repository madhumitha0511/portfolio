import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {

  skillsAPI,
 
} from '../../services/api';


// ========== 4. SKILLS SECTION ==========
export const Skills = () => {
  const [skills, setSkills] = useState({});

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await skillsAPI.getAll();
        // Group by category
        const grouped = res.data.reduce((acc, skill) => {
          if (!acc[skill.category]) acc[skill.category] = [];
          acc[skill.category].push(skill);
          return acc;
        }, {});
        setSkills(grouped);
      } catch (err) {
        console.error('Error fetching skills:', err);
      }
    };
    fetchSkills();
  }, []);

  const categoryColors = {
    'Programming Languages': 'from-blue-500 to-blue-600',
    'Frameworks & Libraries': 'from-purple-500 to-purple-600',
    Databases: 'from-green-500 to-green-600',
    'Tools & Platforms': 'from-orange-500 to-orange-600',
    'Soft Skills': 'from-pink-500 to-pink-600',
    'AI/ML': 'from-red-500 to-red-600',
  };

  return (
    <section id="skills" className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {Object.entries(skills).map(([category, skillsList]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3
                className={`text-xl font-bold bg-gradient-to-r ${
                  categoryColors[category] ||
                  'from-blue-500 to-blue-600'
                } bg-clip-text text-transparent`}
              >
                {category}
              </h3>

              <div className="flex flex-wrap gap-3">
                {skillsList.map((skill) => (
                  <motion.span
                    key={skill.id}
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-full text-sm hover:border-blue-500 transition cursor-pointer"
                  >
                    {skill.skill_name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Skills;