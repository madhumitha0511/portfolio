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
                  {/* Animated red spotlight background */}
                  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                    <motion.div
                      className="absolute inset-0"
                      style={{ backgroundColor: "#050006" }}
                      animate={{
                        backgroundImage: [
                          // Frame 1
                          "radial-gradient(ellipse 900px 650px at 15% 10%, rgba(140,29,24,0.26) 0%, transparent 55%), radial-gradient(ellipse 800px 550px at 85% 65%, rgba(140,29,24,0.20) 0%, transparent 55%), radial-gradient(ellipse 700px 500px at 50% 95%, rgba(140,29,24,0.16) 0%, transparent 55%), radial-gradient(circle at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 45%)",
                          // Frame 2
                          "radial-gradient(ellipse 850px 600px at 80% 30%, rgba(140,29,24,0.26) 0%, transparent 55%), radial-gradient(ellipse 750px 550px at 10% 75%, rgba(140,29,24,0.20) 0%, transparent 55%), radial-gradient(ellipse 700px 500px at 50% 90%, rgba(140,29,24,0.16) 0%, transparent 55%), radial-gradient(circle at 40% 5%, rgba(255,255,255,0.03) 0%, transparent 45%)",
                          // Frame 3
                          "radial-gradient(ellipse 900px 650px at 30% 80%, rgba(140,29,24,0.26) 0%, transparent 55%), radial-gradient(ellipse 800px 550px at 90% 20%, rgba(140,29,24,0.20) 0%, transparent 55%), radial-gradient(ellipse 700px 500px at 50% 50%, rgba(140,29,24,0.16) 0%, transparent 55%), radial-gradient(circle at 60% 0%, rgba(255,255,255,0.03) 0%, transparent 45%)",
                          // Back to frame 1
                          "radial-gradient(ellipse 900px 650px at 15% 10%, rgba(140,29,24,0.26) 0%, transparent 55%), radial-gradient(ellipse 800px 550px at 85% 65%, rgba(140,29,24,0.20) 0%, transparent 55%), radial-gradient(ellipse 700px 500px at 50% 95%, rgba(140,29,24,0.16) 0%, transparent 55%), radial-gradient(circle at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 45%)",
                        ],
                      }}
                      transition={{
                        duration: 24,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    {/* Subtle noise for texture */}
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