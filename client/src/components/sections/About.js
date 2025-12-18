
// ========== 1. ABOUT SECTION ==========
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  portfolioAPI,
 
} from '../../services/api';

export const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await portfolioAPI.getAbout();
        setAboutData(res.data);
      } catch (err) {
        console.error('Error fetching about:', err);
      }
    };
    fetchAbout();
  }, []);

  return (
    <section id="about" className="py-20 px-4 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <motion.img
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            src={aboutData?.image_url || 'https://via.placeholder.com/400'}
            alt="About"
            className="rounded-lg shadow-lg"
          />

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <p className="text-slate-300 text-lg mb-6 leading-relaxed">
              {aboutData?.description}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {aboutData?.highlights?.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg"
                >
                  <p className="text-blue-400 font-semibold text-sm">
                    {highlight}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default About;
