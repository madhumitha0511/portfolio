import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { skillsAPI } from '../../services/api';

const EditSkills = () => {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    skill_name: '',
    category: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await skillsAPI.getAll();
      setSkills(res.data);
    } catch (err) {
      console.error('Error fetching skills:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await skillsAPI.update(editingId, formData);
      } else {
        await skillsAPI.create(formData);
      }
      fetchSkills();
      resetForm();
    } catch (err) {
      console.error('Error saving skill:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill) => {
    setFormData({
      skill_name: skill.skill_name,
      category: skill.category,
    });
    setEditingId(skill.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await skillsAPI.delete(id);
      fetchSkills();
    } catch (err) {
      console.error('Error deleting skill:', err);
    }
  };

  const resetForm = () => {
    setFormData({ skill_name: '', category: '' });
    setEditingId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-white">Manage Skills</h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-8"
      >
        <input
          name="skill_name"
          value={formData.skill_name}
          onChange={handleChange}
          placeholder="Skill (e.g., React.js)"
          required
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category (Programming Languages, AI/ML, Tools & Platforms...)"
          required
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? 'Update Skill' : 'Add Skill'}
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

      <div className="space-y-3">
        {skills.map((s) => (
          <div
            key={s.id}
            className="p-3 bg-slate-800 border border-slate-700 rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="text-white font-semibold">{s.skill_name}</p>
              <p className="text-xs text-slate-400">{s.category}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(s)}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default EditSkills;
