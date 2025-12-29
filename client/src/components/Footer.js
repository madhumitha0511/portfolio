// client/src/components/sections/Footer.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioAPI } from "../../services/api";


export const Footer = () => {
  const [owner, setOwner] = useState(null);


  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await portfolioAPI.getOwner();
        setOwner(res.data[0] || res.data);
      } catch (err) {
        console.error('Error fetching owner:', err);
      }
    };
    fetchOwner();
  }, []);


  return (
    <footer 
      className="py-8 px-4 relative overflow-hidden"
    >
      {/* Optional subtle divider line at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-border)] to-transparent" />


      <div className="max-w-4xl mx-auto relative z-10">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          {/* Social Links */}
          <div className="flex justify-center gap-6">
            {owner?.github_url && (
              <motion.a
                href={owner.github_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-[color:var(--color-muted)] hover:text-[color:var(--color-primary)] transition-colors text-sm font-medium"
              >
                GitHub
              </motion.a>
            )}
            {owner?.linkedin_url && (
              <motion.a
                href={owner.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-[color:var(--color-muted)] hover:text-[color:var(--color-primary)] transition-colors text-sm font-medium"
              >
                LinkedIn
              </motion.a>
            )}
            {owner?.email && (
              <motion.a
                href={`mailto:${owner.email}`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-[color:var(--color-muted)] hover:text-[color:var(--color-primary)] transition-colors text-sm font-medium"
              >
                Email
              </motion.a>
            )}
          </div>


          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs text-[color:var(--color-muted)]"
          >
            © {new Date().getFullYear()} All rights reserved. Built with passion.
          </motion.p>


          {/* Optional Tech Stack Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)]/60 backdrop-blur-md"
          >
            <span className="text-[9px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
              Powered by
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-semibold text-[color:var(--color-primary)]">React</span>
              <span className="text-[9px] text-[color:var(--color-muted)]">•</span>
              <span className="text-[10px] font-semibold text-[color:var(--color-primary)]">Node.js</span>
              <span className="text-[9px] text-[color:var(--color-muted)]">•</span>
              <span className="text-[10px] font-semibold text-[color:var(--color-primary)]">PostgreSQL</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

