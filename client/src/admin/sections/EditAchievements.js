import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { achievementsAPI } from '../../services/api';

const EditAchievements = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    achievement_title: '',
    description: '',
    achievement_date: '',
    category: '',
    organization: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const res = await achievementsAPI.getAll();
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching achievements:', err);
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
        await achievementsAPI.update(editingId, formData);
      } else {
        await achievementsAPI.create(formData);
      }
      fetchAchievements();
      resetForm();
    } catch (err) {
      console.error('Error saving achievement:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      achievement_title: item.achievement_title,
      description: item.description || '',
      achievement_date: item.achievement_date
        ? item.achievement_date.slice(0, 10)
        : '',
      category: item.category || '',
      organization: item.organization || '',
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this achievement?')) return;
    try {
      await achievementsAPI.delete(id);
      fetchAchievements();
    } catch (err) {
      console.error('Error deleting achievement:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      achievement_title: '',
      description: '',
      achievement_date: '',
      category: '',
      organization: '',
    });
    setEditingId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-white">Manage Achievements</h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-8"
      >
        <input
          name="achievement_title"
          value={formData.achievement_title}
          onChange={handleChange}
          placeholder="Achievement Title"
          required
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Description"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="achievement_date"
            value={formData.achievement_date}
            onChange={handleChange}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category (Hackathon, Award...)"
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
        </div>

        <input
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          placeholder="Organization (e.g., Sathyabama, SIH)"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? 'Saving...'
              : editingId
              ? 'Update Achievement'
              : 'Add Achievement'}
          </motion.button>
          {editingId && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={resetForm}
              className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
            >
              Cancel
            </motion.button>
          )}
        </div>
      </motion.form>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-slate-800 border border-slate-700 rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="text-white font-semibold">
                {item.achievement_title}
              </p>
              <p className="text-xs text-slate-400">
                {item.organization} • {item.category}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
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

export default EditAchievements;
