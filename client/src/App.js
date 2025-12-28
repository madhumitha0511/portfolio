// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
      // TODO: fetch from your API
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading portfolio:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0f0000]">
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
      {/* Base dark tone under everything */}
      <div className="min-h-screen bg-[#050006] text-[color:var(--color-text)] relative">
        <Routes>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Navbar />
                {/* Hero sits on clean dark base */}
                <Hero />

               {/* GLOBAL DYNAMIC SPOTLIGHT LAYER (About -> Footer) */}
<div className="relative z-0">
  {/* Animated spotlight background */}
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute inset-0 spotlight-bg"
      animate={{ backgroundPosition: ["0% 0%", "100% 50%", "50% 100%", "0% 0%"] }}
      transition={{
        duration: 24,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    {/* Subtle noise for texture (keep same for both themes) */}
    <div
      className="absolute inset-0 opacity-[0.018]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  </div>

  

                  {/* Foreground content */}
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