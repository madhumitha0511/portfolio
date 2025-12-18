
// ============================================
// NAVBAR COMPONENT - Navbar.js
// ============================================
// Save as: src/components/Navbar.js

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { FiMenu, FiX } from 'react-icons/fi';
import { generateRLogo, generateMLogo } from '../utils/LogoGenerator';

const Navbar = ({ logoType = 'R' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    'Hero', 'About', 'Experience', 'Projects', 'Skills', 'Education',
    'Certifications', 'Achievements', 'Hackathons', 'Contact'
  ];

  const logoSVG = logoType === 'R' 
    ? generateRLogo(100, '#3B82F6')
    : generateMLogo(100, '#10B981');

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-gradient-to-r from-slate-900 to-black/90 backdrop-blur-md z-50 shadow-lg border-b border-slate-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={`data:image/svg+xml;base64,${btoa(logoSVG)}`}
              alt="Logo"
              className="w-10 h-10"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {logoType}
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <ScrollLink
                key={item}
                to={item.toLowerCase()}
                smooth={true}
                duration={500}
                className="text-slate-300 hover:text-white cursor-pointer transition-colors duration-300 text-sm font-medium"
              >
                {item}
              </ScrollLink>
            ))}
          </div>

          {/* Resume Download & Admin Link */}
          <div className="hidden md:flex gap-4 items-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/resume.pdf"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Resume
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/admin/login"
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition text-xs"
            >
              Admin
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pb-4 space-y-2">
            {navItems.map((item) => (
              <ScrollLink
                key={item}
                to={item.toLowerCase()}
                smooth={true}
                duration={500}
                onClick={() => setIsOpen(false)}
                className="block text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
              >
                {item}
              </ScrollLink>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
