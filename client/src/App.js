// ============================================
// MAIN APP COMPONENT - App.js
// ============================================
// Save as: src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Components (ALL DEFAULT IMPORTS)
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Education from './components/sections/Education';
import Certifications from './components/sections/Certifications';
import Achievements from './components/sections/Achievements';
import Hackathons from './components/sections/Hackathons';
import Research from './components/sections/Research';
import Extracurricular from './components/sections/Extracurricular';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';

// Admin Components (DEFAULT IMPORTS)
import AdminDashboard from './admin/AdminDashboard';
import AdminLogin from './admin/AdminLogin';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  return token ? children : <Navigate to="/admin/login" />;
};

function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      // TODO: fetch from your API and setPortfolioData
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading portfolio:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-900 to-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 border-4 border-blue-500 border-t-blue-300 rounded-full"
        />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Main Portfolio Routes */}
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Navbar />
              <Hero />
              <About />
              <Experience />
              <Projects />
              <Skills />
              <Education />
              <Certifications />
              <Achievements />
              <Hackathons />
              <Research />
              <Extracurricular />
              <Testimonials />
              <Contact />
              <Footer />
            </motion.div>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
