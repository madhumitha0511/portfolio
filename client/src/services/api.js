// ============================================
// API SERVICE - api.js
// ============================================
// Save as: src/services/api.js

import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with interceptors
const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========== PORTFOLIO API CALLS ==========
export const portfolioAPI = {
  // Portfolio Owner
  getOwner: () => apiClient.get('/portfolio/owner'),
  updateOwner: (data) => apiClient.put('/portfolio/owner', data),

  // Hero Section
  getHero: () => apiClient.get('/portfolio/hero'),
  updateHero: (data) => apiClient.put('/portfolio/hero', data),

  // About Section (merged - removed duplicate)
  getAbout: () => apiClient.get('/portfolio/about'),
  updateAbout: (data) => apiClient.put('/portfolio/about', data),
};

// ========== ABOUT API (standalone for About.js) ==========
export const aboutAPI = {
  get: () => apiClient.get('/portfolio/about'), // Fixed: uses apiClient, not "api"
  update: (data) => apiClient.put('/portfolio/about', data),
};

// ========== EXPERIENCE API ==========
export const experienceAPI = {
  getAll: () => apiClient.get('/experience'),
  getById: (id) => apiClient.get(`/experience/${id}`),
  create: (data) => apiClient.post('/experience', data),
  update: (id, data) => apiClient.put(`/experience/${id}`, data),
  delete: (id) => apiClient.delete(`/experience/${id}`),
};

// ========== PROJECTS API ==========
export const projectsAPI = {
  getAll: () => apiClient.get('/projects'),
  getFeatured: () => apiClient.get('/projects/featured'),
  getById: (id) => apiClient.get(`/projects/${id}`),
  create: (data) => apiClient.post('/projects', data),
  update: (id, data) => apiClient.put(`/projects/${id}`, data),
  delete: (id) => apiClient.delete(`/projects/${id}`),
};

// ========== SKILLS API ==========
export const skillsAPI = {
  getAll: () => apiClient.get('/skills'),
  getByCategory: (category) => apiClient.get(`/skills/category/${category}`),
  create: (data) => apiClient.post('/skills', data),
  update: (id, data) => apiClient.put(`/skills/${id}`, data),
  delete: (id) => apiClient.delete(`/skills/${id}`),
};

// ========== EDUCATION API ==========
export const educationAPI = {
  getAll: () => apiClient.get('/education'),
  getById: (id) => apiClient.get(`/education/${id}`),
  create: (data) => apiClient.post('/education', data),
  update: (id, data) => apiClient.put(`/education/${id}`, data),
  delete: (id) => apiClient.delete(`/education/${id}`),
};

// ========== CERTIFICATIONS API ==========
export const certificationsAPI = {
  getAll: () => apiClient.get('/certifications'),
  getById: (id) => apiClient.get(`/certifications/${id}`),
  create: (data) => apiClient.post('/certifications', data),
  update: (id, data) => apiClient.put(`/certifications/${id}`, data),
  delete: (id) => apiClient.delete(`/certifications/${id}`),
};

// ========== ACHIEVEMENTS API ==========
export const achievementsAPI = {
  getAll: () => apiClient.get('/achievements'),
  create: (data) => apiClient.post('/achievements', data),
  update: (id, data) => apiClient.put(`/achievements/${id}`, data),
  delete: (id) => apiClient.delete(`/achievements/${id}`),
};

// ========== HACKATHONS API ==========
export const hackathonsAPI = {
  getAll: () => apiClient.get('/hackathons'),
  create: (data) => apiClient.post('/hackathons', data),
  update: (id, data) => apiClient.put(`/hackathons/${id}`, data),
  delete: (id) => apiClient.delete(`/hackathons/${id}`),
};

// ========== RESEARCH API ==========
export const researchAPI = {
  getAll: () => apiClient.get('/research'),
  create: (data) => apiClient.post('/research', data),
  update: (id, data) => apiClient.put(`/research/${id}`, data),
  delete: (id) => apiClient.delete(`/research/${id}`),
};

// ========== EXTRACURRICULAR API ==========
export const extracurricularAPI = {
  getAll: () => apiClient.get('/extracurricular'),
  create: (data) => apiClient.post('/extracurricular', data),
  update: (id, data) => apiClient.put(`/extracurricular/${id}`, data),
  delete: (id) => apiClient.delete(`/extracurricular/${id}`),
};

// ========== TESTIMONIALS API ==========
export const testimonialsAPI = {
  getAll: () => apiClient.get('/testimonials'),
  create: (data) => apiClient.post('/testimonials', data),
  update: (id, data) => apiClient.put(`/testimonials/${id}`, data),
  delete: (id) => apiClient.delete(`/testimonials/${id}`),
};

// ========== CONTACT API ==========
export const contactAPI = {
  sendMessage: (data) => apiClient.post('/contact', data),
  getMessages: () => apiClient.get('/contact'), // Admin only
  markAsRead: (id) => apiClient.put(`/contact/${id}/read`, {}),
};

// ========== AUTH API ==========
export const authAPI = {
  login: (username, password) => 
    axios.post(`${API_BASE}/auth/login`, { username, password }),
  verify: (token) => 
    axios.post(`${API_BASE}/auth/verify`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }),
};

export default apiClient;

// ============================================
// EXPLANATION FOR BEGINNERS:
// ============================================
// 1. axios.create() - Creates reusable HTTP client
// 2. interceptors - Automatically adds auth token to all requests
// 3. Each API module has methods: getAll, create, update, delete (CRUD)
// 4. All errors are caught by global error handlers
// 5. Organized by feature (portfolio, experience, projects, etc.)
