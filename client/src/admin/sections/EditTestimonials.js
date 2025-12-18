import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { testimonialsAPI } from '../../services/api';

const EditTestimonials = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company_or_organization: '',
    message: '',
    rating: 5,
    relation: '',
    image_url: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await testimonialsAPI.getAll();
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
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
      const payload = {
        ...formData,
        rating: Number(formData.rating) || null,
      };
      if (editingId) {
        await testimonialsAPI.update(editingId, payload);
      } else {
        await testimonialsAPI.create(payload);
      }
      fetchTestimonials();
      resetForm();
    } catch (err) {
      console.error('Error saving testimonial:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      title: item.title || '',
      company_or_organization: item.company_or_organization || '',
      message: item.message || '',
      rating: item.rating || 5,
      relation: item.relation || '',
      image_url: item.image_url || '',
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await testimonialsAPI.delete(id);
      fetchTestimonials();
    } catch (err) {
      console.error('Error deleting testimonial:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      company_or_organization: '',
      message: '',
      rating: 5,
      relation: '',
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
      <h2 className="text-3xl font-bold mb-6 text-white">Manage Testimonials</h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-8"
      >
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title (e.g., Professor, Manager)"
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
          <input
            name="company_or_organization"
            value={formData.company_or_organization}
            onChange={handleChange}
            placeholder="Organization"
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
        </div>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="3"
          placeholder="Testimonial Message"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />

        <div className="grid grid-cols-3 gap-4 items-center">
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating (1-5)"
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
          <input
            name="relation"
            value={formData.relation}
            onChange={handleChange}
            placeholder="Relation (Mentor, Manager...)"
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
          <input
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="Image URL (optional)"
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
              ? 'Update Testimonial'
              : 'Add Testimonial'}
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
            <div className="max-w-md">
              <p className="text-white font-semibold">{item.name}</p>
              <p className="text-xs text-slate-400">
                {item.title} • {item.company_or_organization}
              </p>
              <p className="text-xs text-yellow-400 mt-1">
                Rating: {item.rating} / 5
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

export default EditTestimonials;
