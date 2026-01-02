// src/App.js - CORRECTED VERSION
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Import API services
import {
  portfolioAPI,
  experienceAPI,
  projectsAPI,
  skillsAPI,
  educationAPI,
  certificationsAPI,
  achievementsAPI,
  hackathonsAPI,
  researchAPI,
  extracurricularAPI,
  testimonialsAPI,
} from "./services/api";

import GlobalLoader from "./components/GlobalLoader";
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

const NavbarWrapper = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/admin');
  
  return (
    <>
      {!hideNavbar && <div className="fixed top-0 left-0 right-0 z-[100]"><Navbar /></div>}
      <main className={hideNavbar ? "min-h-screen" : "pt-0 relative z-0"}>{children}</main>
    </>
  );
};

function App() {
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Data states
  const [ownerData, setOwnerData] = useState(null);
  const [heroData, setHeroData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [experienceData, setExperienceData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [certificationsData, setCertificationsData] = useState([]);
  const [achievementsData, setAchievementsData] = useState([]);
  const [hackathonsData, setHackathonsData] = useState([]);
  const [researchData, setResearchData] = useState([]);
  const [extracurricularData, setExtracurricularData] = useState([]);
  const [testimonialsData, setTestimonialsData] = useState([]);

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      setLoadingProgress(10);

      const apiCalls = [
        { name: 'Owner', call: portfolioAPI.getOwner, setter: setOwnerData, isSingle: true },
        { name: 'Hero', call: portfolioAPI.getHero, setter: setHeroData, isSingle: true },
        { name: 'About', call: portfolioAPI.getAbout, setter: setAboutData, isSingle: true },
        { name: 'Experience', call: experienceAPI.getAll, setter: setExperienceData, isSingle: false },
        { name: 'Projects', call: projectsAPI.getAll, setter: setProjectsData, isSingle: false },
        { name: 'Skills', call: skillsAPI.getAll, setter: setSkillsData, isSingle: false },
        { name: 'Education', call: educationAPI.getAll, setter: setEducationData, isSingle: false },
        { name: 'Certifications', call: certificationsAPI.getAll, setter: setCertificationsData, isSingle: false },
        { name: 'Achievements', call: achievementsAPI.getAll, setter: setAchievementsData, isSingle: false },
        { name: 'Hackathons', call: hackathonsAPI.getAll, setter: setHackathonsData, isSingle: false },
        { name: 'Research', call: researchAPI.getAll, setter: setResearchData, isSingle: false },
        { name: 'Extracurricular', call: extracurricularAPI.getAll, setter: setExtracurricularData, isSingle: false },
        { name: 'Testimonials', call: testimonialsAPI.getAll, setter: setTestimonialsData, isSingle: false },
      ];

      const totalCalls = apiCalls.length;
      const progressPerCall = 80 / totalCalls;

      // ✅ 10-second timeout safety
      const timeoutId = setTimeout(() => {
        console.log("⏰ 10s timeout - showing site anyway");
        setLoadingProgress(100);
        setTimeout(() => setIsLoading(false), 300);
      }, 10000);

      let completedCalls = 0;

      const loadPromises = apiCalls.map(async ({ name, call, setter, isSingle }) => {
        try {
          const response = await call();
          
          // ✅ FIX: Handle single vs array data correctly
          let data;
          if (isSingle) {
            // For Owner/Hero/About - expect single object
            data = Array.isArray(response.data) ? response.data[0] : response.data;
          } else {
            // For collections - always return array
            data = Array.isArray(response.data) ? response.data : [];
          }
          
          setter(data);
          completedCalls++;
          const newProgress = 10 + (completedCalls * progressPerCall);
          setLoadingProgress(Math.min(Math.round(newProgress), 90));
          console.log(`✅ ${name} loaded (${completedCalls}/${totalCalls})`);
        } catch (error) {
          completedCalls++;
          const newProgress = 10 + (completedCalls * progressPerCall);
          setLoadingProgress(Math.min(Math.round(newProgress), 90));
          console.warn(`⚠️ ${name} failed:`, error.message);
          
          // ✅ Set appropriate default
          setter(isSingle ? null : []);
        }
      });

      await Promise.all(loadPromises);
      clearTimeout(timeoutId);

      setLoadingProgress(100);
      console.log("🎉 Portfolio loaded!");

      setTimeout(() => setIsLoading(false), 500);

    } catch (error) {
      console.error("❌ Critical error:", error);
      setLoadingProgress(100);
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  if (isLoading) {
    return <GlobalLoader progress={loadingProgress} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#050006] text-[color:var(--color-text)] relative overflow-x-hidden">
        <NavbarWrapper>
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  {/* ✅ FIX: Hero doesn't need ownerData/heroData props - it fetches internally */}
                  <Hero />
                  <div 
                    className="relative z-0"
                    style={{
                      background: "var(--hero-bg)",
                      backgroundAttachment: 'fixed',
                      backgroundSize: 'cover'
                    }}
                  >
                    {/* ✅ FIX: Most components fetch their own data - remove props unless needed */}
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
        </NavbarWrapper>
      </div>
    </Router>
  );
}

export default App;
