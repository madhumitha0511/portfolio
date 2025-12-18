import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { researchAPI } from '../../services/api';

const EditResearch = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    research_title: '',
    description: '',
    start_date: '',
    end_date: '',
    research_type: '',
    outcomes: '',
    publication_link: '',
    image_url: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResearch();
  }, []);

  const fetchResearch = async () => {
    try {
      const res = await researchAPI.getAll();
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching research:', err);
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
        await researchAPI.update(editingId, formData);
      } else {
        await researchAPI.create(formData);
      }
      fetchResearch();
      resetForm();
    } catch (err) {
      console.error('Error saving research:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      research_title: item.research_title,
      description: item.description || '',
      start_date: item.start_date ? item.start_date.slice(0, 10) : '',
      end_date: item.end_date ? item.end_date.slice(0, 10) : '',
      research_type: item.research_type || '',
      outcomes: item.outcomes || '',
      publication_link: item.publication_link || '',
      image_url: item.image_url || '',
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this research item?')) return;
    try {
      await researchAPI.delete(id);
      fetchResearch();
    } catch (err) {
      console.error('Error deleting research:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      research_title: '',
      description: '',
      start_date: '',
      end_date: '',
      research_type: '',
      outcomes: '',
      publication_link: '',
      image_url: '',
    });
    setEditingId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-white">Manage Research</h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-8"
      >
        <input
          name="research_title"
          value={formData.research_title}
          onChange={handleChange}
          placeholder="Research Title"
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
          name="research_type"
          value={formData.research_type}
          onChange={handleChange}
          placeholder="Research Type (Paper, Project...)"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />

        <textarea
          name="outcomes"
          value={formData.outcomes}
          onChange={handleChange}
          rows="2"
          placeholder="Outcomes"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />

        <input
          name="publication_link"
          value={formData.publication_link}
          onChange={handleChange}
          placeholder="Publication / Link"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />

        <input
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="Image URL"
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
            {loading ? 'Saving...' : editingId ? 'Update Research' : 'Add Research'}
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
              <p className="text-white font-semibold">{item.research_title}</p>
              <p className="text-xs text-slate-400">{item.research_type}</p>
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

export default EditResearch;
