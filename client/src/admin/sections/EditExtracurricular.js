import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { extracurricularAPI } from '../../services/api';

const EditExtracurricular = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    activity_title: '',
    position: '',
    organization_name: '',
    start_date: '',
    end_date: '',
    description: '',
    contributions: [],
    image_url: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await extracurricularAPI.getAll();
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching extracurricular:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleContributionsChange = (e) => {
    const arr = e.target.value.split(',').map((c) => c.trim()).filter(Boolean);
    setFormData((p) => ({ ...p, contributions: arr }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await extracurricularAPI.update(editingId, formData);
      } else {
        await extracurricularAPI.create(formData);
      }
      fetchItems();
      resetForm();
    } catch (err) {
      console.error('Error saving extracurricular:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      activity_title: item.activity_title,
      position: item.position || '',
      organization_name: item.organization_name || '',
      start_date: item.start_date ? item.start_date.slice(0, 10) : '',
      end_date: item.end_date ? item.end_date.slice(0, 10) : '',
      description: item.description || '',
      contributions: item.contributions || [],
      image_url: item.image_url || '',
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this activity?')) return;
    try {
      await extracurricularAPI.delete(id);
      fetchItems();
    } catch (err) {
      console.error('Error deleting extracurricular:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      activity_title: '',
      position: '',
      organization_name: '',
      start_date: '',
      end_date: '',
      description: '',
      contributions: [],
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
      <h2 className="text-3xl font-bold mb-6 text-white">Manage Extracurricular</h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-8"
      >
        <input
          name="activity_title"
          value={formData.activity_title}
          onChange={handleChange}
          placeholder="Activity Title"
          required
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Position (Lead, Coordinator...)"
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
          <input
            name="organization_name"
            value={formData.organization_name}
            onChange={handleChange}
            placeholder="Organization / Club"
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

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Description"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />

        <input
          name="contributions"
          value={formData.contributions.join(', ')}
          onChange={handleContributionsChange}
          placeholder="Contributions (comma separated)"
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
            {loading
              ? 'Saving...'
              : editingId
              ? 'Update Activity'
              : 'Add Activity'}
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
              <p className="text-white font-semibold">{item.activity_title}</p>
              <p className="text-xs text-slate-400">
                {item.position} • {item.organization_name}
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

export default EditExtracurricular;
