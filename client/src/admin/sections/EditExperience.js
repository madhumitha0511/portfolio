// ✅ FIXED client/src/admin/sections/EditExperience.js

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { experienceAPI } from '../../services/api';

const EditExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [formData, setFormData] = useState({
    company_name: '',
    role: '',
    employment_type: 'Internship',
    start_date: '',
    end_date: '',
    is_current: false,
    description: '',
    tech_stack: [],
    company_logo_url: '',
    location: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await experienceAPI.getAll();
      console.log('Fetched experiences:', res.data);
      setExperiences(res.data || []);
    } catch (err) {
      console.error('Error fetching experiences:', err);
      alert('Failed to load experiences. Check console.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTechStackChange = (e) => {
    const techs = e.target.value.split(',').map((t) => t.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, tech_stack: techs }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      console.log('Submitting:', formData);
      
      if (editingId) {
        await experienceAPI.update(editingId, formData);
      } else {
        await experienceAPI.create(formData);
      }
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      fetchExperiences();
      resetForm();
    } catch (err) {
      console.error('Error saving experience:', err);
      alert('Failed to save. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this experience?')) {
      try {
        await experienceAPI.delete(id);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
        fetchExperiences();
      } catch (err) {
        console.error('Error deleting experience:', err);
        alert('Failed to delete. Check console.');
      }
    }
  };

  const handleEdit = (exp) => {
    console.log('Editing:', exp);
    setFormData({
      company_name: exp.company_name || '',
      role: exp.role || '',
      employment_type: exp.employment_type || 'Internship',
      start_date: exp.start_date ? exp.start_date.slice(0, 10) : '',
      end_date: exp.end_date ? exp.end_date.slice(0, 10) : '',
      is_current: exp.is_current || false,
      description: exp.description || '',
      tech_stack: exp.tech_stack || [],
      company_logo_url: exp.company_logo_url || '',
      location: exp.location || '',
    });
    setEditingId(exp.id);
  };

  const resetForm = () => {
    setFormData({
      company_name: '',
      role: '',
      employment_type: 'Internship',
      start_date: '',
      end_date: '',
      is_current: false,
      description: '',
      tech_stack: [],
      company_logo_url: '',
      location: '',
    });
    setEditingId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-white">Manage Experience</h2>

      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 p-3 bg-green-900/50 border border-green-700 rounded text-green-300"
        >
          ✓ Experience {editingId ? 'updated' : 'created'} successfully!
        </motion.div>
      )}

      {/* Add/Edit Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-8"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="company_name"
            placeholder="Company Name"
            value={formData.company_name}
            onChange={handleChange}
            required
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="role"
            placeholder="Job Title"
            value={formData.role}
            onChange={handleChange}
            required
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select
            name="employment_type"
            value={formData.employment_type}
            onChange={handleChange}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Full-time</option>
            <option>Internship</option>
            <option>Contract</option>
            <option>Freelance</option>
          </select>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            disabled={formData.is_current}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>

        <label className="flex items-center gap-2 text-slate-300">
          <input
            type="checkbox"
            name="is_current"
            checked={formData.is_current}
            onChange={handleChange}
            className="w-4 h-4"
          />
          Currently Working
        </label>

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="tech_stack"
          placeholder="Tech Stack (comma separated: React, Python, AWS)"
          value={formData.tech_stack?.join(', ')}
          onChange={handleTechStackChange}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="url"
          name="company_logo_url"
          placeholder="Company Logo URL (optional)"
          value={formData.company_logo_url}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? 'Update Experience' : 'Add Experience'}
          </motion.button>
          {editingId && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={resetForm}
              className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
            >
              Cancel
            </motion.button>
          )}
        </div>
      </motion.form>

      {/* Experiences List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white mb-4">
          All Experiences ({experiences.length})
        </h3>
        
        {experiences.length === 0 ? (
          <p className="text-slate-400 text-center py-8">No experiences yet. Add one above!</p>
        ) : (
          experiences.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-slate-800 border border-slate-700 rounded-lg flex justify-between items-start"
            >
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                <p className="text-blue-400">{exp.company_name}</p>
                <p className="text-sm text-slate-400">{exp.location} • {exp.employment_type}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {exp.formatted_date_range || 'No dates'}
                </p>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleEdit(exp)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleDelete(exp.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default EditExperience;