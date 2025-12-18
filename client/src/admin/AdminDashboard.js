// ============================================
// ADMIN DASHBOARD - AdminDashboard.js
// ============================================
// Save as: src/admin/AdminDashboard.js

import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';

// Admin Sub-components (Create similar components for each)
import EditHero from './sections/EditHero';
import EditAbout from './sections/EditAbout';
import EditExperience from './sections/EditExperience';
import EditProjects from './sections/EditProjects';
import EditSkills from './sections/EditSkills';
// import other edit components similarly

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/admin/login');
  };

  const menuItems = [
    { label: 'Hero', path: '/admin/hero' },
    { label: 'About', path: '/admin/about' },
    { label: 'Experience', path: '/admin/experience' },
    { label: 'Projects', path: '/admin/projects' },
    { label: 'Skills', path: '/admin/skills' },
    { label: 'Education', path: '/admin/education' },
    { label: 'Certifications', path: '/admin/certifications' },
    { label: 'Achievements', path: '/admin/achievements' },
    { label: 'Hackathons', path: '/admin/hackathons' },
    { label: 'Research', path: '/admin/research' },
    { label: 'Extracurricular', path: '/admin/extracurricular' },
    { label: 'Testimonials', path: '/admin/testimonials' },
    { label: 'Contact Messages', path: '/admin/contact' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white">
      {/* Header */}
      <motion.header
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 bg-slate-800/95 backdrop-blur-lg border-b border-slate-700 z-40"
      >
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-white hover:bg-slate-700 p-2 rounded"
            >
              {sidebarOpen ? <FiX /> : <FiMenu />}
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            <FiLogOut /> Logout
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="mt-20 flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen ? 0 : -300 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed lg:relative left-0 w-64 h-screen bg-slate-800/50 backdrop-blur-lg border-r border-slate-700 overflow-y-auto pt-6 z-30"
        >
          <nav className="space-y-2 px-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className="block px-4 py-2 rounded-lg hover:bg-blue-600/30 transition text-slate-300 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </motion.aside>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 p-6 lg:p-10 max-w-6xl lg:ml-64"
        >
          <Routes>
            <Route path="/hero" element={<EditHero />} />
            <Route path="/about" element={<EditAbout />} />
            <Route path="/experience" element={<EditExperience />} />
            <Route path="/projects" element={<EditProjects />} />
            <Route path="/skills" element={<EditSkills />} />
            {/* Add other routes similarly */}
          </Routes>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
