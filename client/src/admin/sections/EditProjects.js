import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { projectsAPI } from '../../services/api';

const EditProjects = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    short_description: '',
    image_url: '',
    tech_stack: [],
    github_link: '',
    demo_link: '',
    live_link: '',
    start_date: '',
    end_date: '',
    category: '',
    highlight: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await projectsAPI.getAll();
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTechStackChange = (e) => {
    const arr = e.target.value.split(',').map((t) => t.trim()).filter(Boolean);
    setFormData((p) => ({ ...p, tech_stack: arr }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await projectsAPI.update(editingId, formData);
      } else {
        await projectsAPI.create(formData);
      }
      fetchProjects();
      resetForm();
    } catch (err) {
      console.error('Error saving project:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (proj) => {
    setFormData({
      title: proj.title,
      description: proj.description,
      short_description: proj.short_description || '',
      image_url: proj.image_url || '',
      tech_stack: proj.tech_stack || [],
      github_link: proj.github_link || '',
      demo_link: proj.demo_link || '',
      live_link: proj.live_link || '',
      start_date: proj.start_date ? proj.start_date.slice(0, 10) : '',
      end_date: proj.end_date ? proj.end_date.slice(0, 10) : '',
      category: proj.category || '',
      highlight: proj.highlight,
    });
    setEditingId(proj.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await projectsAPI.delete(id);
      fetchProjects();
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      short_description: '',
      image_url: '',
      tech_stack: [],
      github_link: '',
      demo_link: '',
      live_link: '',
      start_date: '',
      end_date: '',
      category: '',
      highlight: false,
    });
    setEditingId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-white">Manage Projects</h2>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-8"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Project Title"
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category (Web, AI, IoT...)"
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          placeholder="Full Description"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          name="short_description"
          value={formData.short_description}
          onChange={handleChange}
          placeholder="Short Summary"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          name="tech_stack"
          value={formData.tech_stack.join(', ')}
          onChange={handleTechStackChange}
          placeholder="Tech Stack (comma separated)"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <div className="grid grid-cols-3 gap-4">
          <input
            name="github_link"
            value={formData.github_link}
            onChange={handleChange}
            placeholder="GitHub URL"
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
          <input
            name="demo_link"
            value={formData.demo_link}
            onChange={handleChange}
            placeholder="Demo URL"
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
          <input
            name="live_link"
            value={formData.live_link}
            onChange={handleChange}
            placeholder="Live URL"
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
        </div>

        <input
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />

        <label className="flex items-center gap-2 text-slate-300">
          <input
            type="checkbox"
            name="highlight"
            checked={formData.highlight}
            onChange={handleChange}
            className="w-4 h-4"
          />
          Highlight on homepage
        </label>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
          </motion.button>
          {editingId && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={resetForm}
              className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
            >
              Cancel
            </motion.button>
          )}
        </div>
      </motion.form>

      {/* List */}
      <div className="space-y-4">
        {projects.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-slate-800 border border-slate-700 rounded-lg flex justify-between items-start"
          >
            <div>
              <h3 className="text-lg font-bold text-white">{p.title}</h3>
              <p className="text-sm text-slate-400">{p.category}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EditProjects;
