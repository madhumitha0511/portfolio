import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { hackathonsAPI } from '../../services/api';

const EditHackathons = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    event_name: '',
    event_date: '',
    location: '',
    description: '',
    role_or_achievement: '',
    team_size: '',
    outcome_or_result: '',
    image_url: '',
    project_link: '',
    event_link: '',
    category: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHackathons();
  }, []);

  const fetchHackathons = async () => {
    try {
      const res = await hackathonsAPI.getAll();
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching hackathons:', err);
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
        await hackathonsAPI.update(editingId, formData);
      } else {
        await hackathonsAPI.create(formData);
      }
      fetchHackathons();
      resetForm();
    } catch (err) {
      console.error('Error saving hackathon:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      event_name: item.event_name,
      event_date: item.event_date ? item.event_date.slice(0, 10) : '',
      location: item.location || '',
      description: item.description || '',
      role_or_achievement: item.role_or_achievement || '',
      team_size: item.team_size || '',
      outcome_or_result: item.outcome_or_result || '',
      image_url: item.image_url || '',
      project_link: item.project_link || '',
      event_link: item.event_link || '',
      category: item.category || '',
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this hackathon/event?')) return;
    try {
      await hackathonsAPI.delete(id);
      fetchHackathons();
    } catch (err) {
      console.error('Error deleting hackathon:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      event_name: '',
      event_date: '',
      location: '',
      description: '',
      role_or_achievement: '',
      team_size: '',
      outcome_or_result: '',
      image_url: '',
      project_link: '',
      event_link: '',
      category: '',
    });
    setEditingId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-white">Manage Hackathons & Events</h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-8"
      >
        <input
          name="event_name"
          value={formData.event_name}
          onChange={handleChange}
          placeholder="Event Name"
          required
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="event_date"
            value={formData.event_date}
            onChange={handleChange}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
        </div>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Event Description"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />

        <textarea
          name="role_or_achievement"
          value={formData.role_or_achievement}
          onChange={handleChange}
          rows="2"
          placeholder="Your Role / Achievement"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />

        <div className="grid grid-cols-3 gap-4">
          <input
            name="team_size"
            value={formData.team_size}
            onChange={handleChange}
            placeholder="Team Size"
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category (Hackathon, Outreach...)"
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
          <input
            name="outcome_or_result"
            value={formData.outcome_or_result}
            onChange={handleChange}
            placeholder="Outcome / Result"
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

        <div className="grid grid-cols-2 gap-4">
          <input
            name="project_link"
            value={formData.project_link}
            onChange={handleChange}
            placeholder="Project Link"
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
          <input
            name="event_link"
            value={formData.event_link}
            onChange={handleChange}
            placeholder="Event Link"
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
        </div>

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
              ? 'Update Event'
              : 'Add Event'}
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
              <p className="text-white font-semibold">{item.event_name}</p>
              <p className="text-xs text-slate-400">
                {item.location} • {item.category}
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

export default EditHackathons;
