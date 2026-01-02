// src/App.js - With GlobalLoader Progress Bar
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

import GlobalLoader from "./components/GlobalLoader"; // ✅ Your fancy loader
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
  const [loadingProgress, setLoadingProgress] = useState(0); // ✅ Progress tracking
  
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
      console.log('🚀 Loading portfolio data...');
      
      // Initial progress
      setLoadingProgress(10);

      // Define all API calls
      const apiCalls = [
        { name: 'Owner', call: portfolioAPI.getOwner, setter: setOwnerData },
        { name: 'Hero', call: portfolioAPI.getHero, setter: setHeroData },
        { name: 'About', call: portfolioAPI.getAbout, setter: setAboutData },
        { name: 'Experience', call: experienceAPI.getAll, setter: setExperienceData },
        { name: 'Projects', call: projectsAPI.getAll, setter: setProjectsData },
        { name: 'Skills', call: skillsAPI.getAll, setter: setSkillsData },
        { name: 'Education', call: educationAPI.getAll, setter: setEducationData },
        { name: 'Certifications', call: certificationsAPI.getAll, setter: setCertificationsData },
        { name: 'Achievements', call: achievementsAPI.getAll, setter: setAchievementsData },
        { name: 'Hackathons', call: hackathonsAPI.getAll, setter: setHackathonsData },
        { name: 'Research', call: researchAPI.getAll, setter: setResearchData },
        { name: 'Extracurricular', call: extracurricularAPI.getAll, setter: setExtracurricularData },
        { name: 'Testimonials', call: testimonialsAPI.getAll, setter: setTestimonialsData },
      ];

      const totalCalls = apiCalls.length;
      const progressPerCall = 80 / totalCalls; // 10% start, 10% end buffer

      // Set 10-second timeout safety
      const timeoutId = setTimeout(() => {
        console.log("⏰ 10-second timeout reached - showing website");
        setLoadingProgress(100);
        setTimeout(() => setIsLoading(false), 300);
      }, 10000);

      // Load all data in parallel
      let completedCalls = 0;

      const loadPromises = apiCalls.map(async ({ name, call, setter }) => {
        try {
          const response = await call();
          
          // Handle both array and object responses
          const data = Array.isArray(response.data) && response.data.length === 1
            ? response.data[0]
            : response.data;
          
          setter(data);
          completedCalls++;
          
          // Update progress
          const newProgress = 10 + (completedCalls * progressPerCall);
          setLoadingProgress(Math.min(Math.round(newProgress), 90));
          
          console.log(`✅ Loaded: ${name} (${completedCalls}/${totalCalls})`);
        } catch (error) {
          completedCalls++;
          
          // Update progress even on error
          const newProgress = 10 + (completedCalls * progressPerCall);
          setLoadingProgress(Math.min(Math.round(newProgress), 90));
          
          console.error(`❌ Failed to load ${name}:`, error);
          
          // Set empty data based on expected type
          const isSingleObject = ['Hero', 'About', 'Owner'].includes(name);
          setter(isSingleObject ? null : []);
        }
      });

      // Wait for all API calls
      await Promise.all(loadPromises);

      // Clear timeout
      clearTimeout(timeoutId);

      // Complete loading
      setLoadingProgress(100);
      console.log('✅ All data loaded successfully!');

      // Small delay for smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 500);

    } catch (error) {
      console.error("❌ Critical error loading portfolio:", error);
      setLoadingProgress(100);
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  // ✅ Show GlobalLoader with progress
  if (isLoading) {
    return <GlobalLoader progress={loadingProgress} />;
  }

  // ✅ Show error screen if critical data missing
  if (!ownerData || !heroData) {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: '#050006',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{ 
          maxWidth: '600px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '20px',
          padding: '40px',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontSize: '24px',
            marginBottom: '20px',
            color: '#EF4444'
          }}>
            ⚠️ Unable to Load Portfolio
          </h1>
          
          <p style={{ 
            fontSize: '16px',
            marginBottom: '30px',
            lineHeight: '1.6',
            color: 'rgba(255,255,255,0.8)'
          }}>
            Critical portfolio data failed to load from the backend server.
          </p>

          <div style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '30px',
            textAlign: 'left'
          }}>
            <h3 style={{ fontSize: '14px', marginBottom: '15px', color: '#EF4444' }}>
              Please check:
            </h3>
            <ul style={{ 
              listStyle: 'none',
              padding: 0,
              margin: 0,
              fontSize: '14px',
              lineHeight: '2'
            }}>
              <li>✓ Backend server is running</li>
              <li>✓ Database is connected and populated</li>
              <li>✓ Environment variable REACT_APP_API_URL is correct</li>
              <li>✓ CORS allows your frontend domain</li>
            </ul>
          </div>

          <div style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.6)',
            textAlign: 'left'
          }}>
            <strong>Debug Info:</strong><br/>
            Owner Data: {ownerData ? '✅ Loaded' : '❌ Missing'}<br/>
            Hero Data: {heroData ? '✅ Loaded' : '❌ Missing'}<br/>
            API URL: {process.env.REACT_APP_API_URL || '❌ NOT SET'}
          </div>

          <button 
            onClick={() => window.location.reload()}
            style={{
              width: '100%',
              padding: '15px',
              background: '#EF4444',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🔄 Retry Loading
          </button>
        </div>
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