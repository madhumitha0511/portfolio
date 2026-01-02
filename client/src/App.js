// src/App.js - Progress Bar Animates Smoothly (Not API-Based)
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// ✅ Import API services
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
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // ✅ Add all data states
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

  // ✅ NEW: Smooth progress animation (like spinning wheel)
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) return prev; // Stop at 90%, wait for actual loading
        return prev + 1; // Increment smoothly
      });
    }, 30); // Update every 30ms for smooth animation

    return () => clearInterval(interval);
  }, [isLoading]);

  const loadPortfolioData = async () => {
    try {
      console.log('🚀 Loading portfolio data...');

      // ✅ Fetch data from API (NO PROGRESS TRACKING)
      const [
        ownerRes,
        heroRes,
        aboutRes,
        experienceRes,
        projectsRes,
        skillsRes,
        educationRes,
        certificationsRes,
        achievementsRes,
        hackathonsRes,
        researchRes,
        extracurricularRes,
        testimonialsRes
      ] = await Promise.all([
        portfolioAPI.getOwner(),
        portfolioAPI.getHero(),
        portfolioAPI.getAbout(),
        experienceAPI.getAll(),
        projectsAPI.getAll(),
        skillsAPI.getAll(),
        educationAPI.getAll(),
        certificationsAPI.getAll(),
        achievementsAPI.getAll(),
        hackathonsAPI.getAll(),
        researchAPI.getAll(),
        extracurricularAPI.getAll(),
        testimonialsAPI.getAll()
      ]);

      // ✅ Set all data
      setOwnerData(Array.isArray(ownerRes.data) ? ownerRes.data[0] : ownerRes.data);
      setHeroData(Array.isArray(heroRes.data) ? heroRes.data[0] : heroRes.data);
      setAboutData(Array.isArray(aboutRes.data) ? aboutRes.data[0] : aboutRes.data);
      setExperienceData(experienceRes.data || []);
      setProjectsData(projectsRes.data || []);
      setSkillsData(skillsRes.data || []);
      setEducationData(educationRes.data || []);
      setCertificationsData(certificationsRes.data || []);
      setAchievementsData(achievementsRes.data || []);
      setHackathonsData(hackathonsRes.data || []);
      setResearchData(researchRes.data || []);
      setExtracurricularData(extracurricularRes.data || []);
      setTestimonialsData(testimonialsRes.data || []);

      // ✅ Jump to 100% when done
      setLoadingProgress(100);
      console.log('✅ All data loaded successfully!');
      
      // ✅ Small delay for smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 500);

    } catch (error) {
      console.error("❌ Error loading portfolio:", error);
      setLoadingProgress(100);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  // ✅ Show GlobalLoader with smooth animated progress
  if (isLoading) {
    return <GlobalLoader progress={loadingProgress} />;
  }

  // ✅ Add error screen if critical data missing
  if (!ownerData || !heroData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#050006] text-white p-6">
        <h1 className="text-2xl font-bold text-red-500 mb-4">⚠️ Failed to Load Portfolio</h1>
        <p className="text-gray-400 mb-6">Unable to connect to backend server</p>
        <ul className="text-sm text-gray-500 mb-6 space-y-2">
          <li>✓ Check if backend is running</li>
          <li>✓ Verify REACT_APP_API_URL is correct</li>
          <li>✓ Check database connection</li>
        </ul>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
        >
          🔄 Retry
        </button>
      </div>
    );
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
                  {/* ✅ Pass data as props */}
                  <Hero ownerData={ownerData} heroData={heroData} />
                  <div 
                    className="relative z-0"
                    style={{
                      background: "var(--hero-bg)",
                      backgroundAttachment: 'fixed',
                      backgroundSize: 'cover'
                    }}
                  >
                    <About data={aboutData} />
                    <Experience data={experienceData} />
                    <Projects data={projectsData} />
                    <Skills data={skillsData} />
                    <Education data={educationData} />
                    <Certifications data={certificationsData} />
                    <Achievements data={achievementsData} />
                    <Hackathons data={hackathonsData} />
                    <Research data={researchData} />
                    <Extracurricular data={extracurricularData} />
                    <Testimonials data={testimonialsData} />
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