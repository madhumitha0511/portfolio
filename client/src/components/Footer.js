// client/src/components/sections/Footer.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioAPI } from "../services/api";

export const Footer = () => {
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await portfolioAPI.getOwner();
        setOwner(res.data);
      } catch (err) {
        console.error('Error fetching owner:', err);
      }
    };
    fetchOwner();
  }, []);

  return (
    <footer className="py-12 px-4 relative overflow-hidden">
      {/* Subtle divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-border)] to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* MOBILE-OPTIMIZED LAYOUT */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 text-xs text-[color:var(--color-muted)]">
            {/* Tech Stack - CENTERED ON MOBILE, RIGHT ON DESKTOP */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center sm:justify-start gap-1.5 px-3 py-1.5 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)]/50 backdrop-blur-sm text-[10px] mx-auto sm:mx-0 w-fit order-1"
            >
              <span className="text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">Tech</span>
              <span className="text-[10px] font-semibold text-[color:var(--color-primary)]">React</span>
              <span className="text-[9px] text-[color:var(--color-muted)]">•</span>
              <span className="text-[10px] font-semibold text-[color:var(--color-primary)]">Node</span>
              <span className="text-[9px] text-[color:var(--color-muted)]">•</span>
              <span className="text-[10px] font-semibold text-[color:var(--color-primary)]">PGSQL</span>
            </motion.div>

            {/* Copyright - FULL WIDTH CENTERED ON MOBILE, LEFT ON DESKTOP */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xs md:text-sm font-medium text-center sm:text-left order-2 sm:order-1"
            >
              © {new Date().getFullYear()} {owner?.full_name || 'All rights reserved'}.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
