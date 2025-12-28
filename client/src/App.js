// src/App.js - 80/20 PERFECT BALANCE
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Education from "./components/sections/Education";
import Certifications from "./components/sections/Certifications";
import Achievements from "./components/sections/Achievements";
import Hackathons from "./components/sections/Hackathons";
import Research from "./components/sections/Research";
import Extracurricular from "./components/sections/Extracurricular";
import Testimonials from "./components/sections/Testimonials";
import Contact from "./components/sections/Contact";
import Footer from "./components/Footer";

import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/admin/login" />;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading portfolio:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#050006]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[color:var(--color-primary)] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#050006] text-[color:var(--color-text)] relative overflow-x-hidden">
        <Routes>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Navbar />
                <Hero />

                {/* ✅ 80% BLACK + 20% RED - PERFECT BALANCE */}
                <div 
                  className="relative z-0"
                  style={{
                    background: `
                      /* PRIMARY SPOTLIGHTS - 20% RED INTENSITY */
                      radial-gradient(ellipse 1100px 800px at 20% 15%, rgba(140,29,24,0.18) 0%, transparent 65%),
                      radial-gradient(ellipse 950px 700px at 80% 70%, rgba(140,29,24,0.15) 0%, transparent 65%),
                      radial-gradient(ellipse 850px 600px at 45% 92%, rgba(178,37,30,0.12) 0%, transparent 65%),
                      
                      /* SUBTLE ENHANCERS - 5% RED */
                      radial-gradient(ellipse 1000px 750px at 35% 75%, rgba(140,29,24,0.08) 0%, transparent 75%),
                      radial-gradient(circle 180px at 70% 30%, rgba(220,38,38,0.10) 0%, transparent 70%),
                      
                      /* WHITE HIGHLIGHTS - 2% */
                      radial-gradient(circle 120px at 55% 8%, rgba(255,255,255,0.06) 0%, transparent 60%)
                    `,
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover'
                  }}
                >
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
                </div>
              </motion.div>
            }
          />
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
      </div>
    </Router>
  );
}

export default App;