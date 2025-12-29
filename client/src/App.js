// src/App.js - NAVBAR FIXED PERMANENTLY ON TOP
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
      <div className="min-h-screen text-[color:var(--color-text)] relative overflow-x-hidden">
        {/* ✅ NAVBAR = ALWAYS FIXED ON TOP */}
        <div className="fixed top-0 left-0 right-0 z-[100]">
          <Navbar />
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* ✅ HERO = High z-index (below navbar) */}
                <div className="pt-20 relative z-50"> {/* Offset for fixed navbar */}
                  <Hero />
                </div>
{/* ✅ 80% BLACK + 20% RED - PERFECT BALANCE */}
                <div 
                  className="relative z-0"
                  style={{
                    background: "var(--hero-bg)",
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
              </>
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