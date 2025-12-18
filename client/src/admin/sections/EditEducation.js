import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { educationAPI } from '../../services/api';

const EditEducation = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    institution_name: '',
    degree: '',
    field_of_study: '',
    start_date: '',
    end_date: '',
    gpa: '',
    description: '',
    location: '',
    institution_logo_url: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const res = await educationAPI.getAll();
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching education:', err);
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
        await educationAPI.update(editingId, formData);
      } else {
        await educationAPI.create(formData);
      }
      fetchEducation();
      resetForm();
    } catch (err) {
      console.error('Error saving education:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      institution_name: item.institution_name,
      degree: item.degree,
      field_of_study: item.field_of_study || '',
      start_date: item.start_date ? item.start_date.slice(0, 10) : '',
      end_date: item.end_date ? item.end_date.slice(0, 10) : '',
      gpa: item.gpa || '',
      description: item.description || '',
      location: item.location || '',
      institution_logo_url: item.institution_logo_url || '',
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this education item?')) return;
    try {
      await educationAPI.delete(id);
      fetchEducation();
    } catch (err) {
      console.error('Error deleting education:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      institution_name: '',
      degree: '',
      field_of_study: '',
      start_date: '',
      end_date: '',
      gpa: '',
      description: '',
      location: '',
      institution_logo_url: '',
    });
    setEditingId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-white">Manage Education</h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-8"
      >
        <input
          name="institution_name"
          value={formData.institution_name}
          onChange={handleChange}
          placeholder="Institution Name"
          required
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            placeholder="Degree (e.g., BE Computer Science)"
            required
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
          <input
            name="field_of_study"
            value={formData.field_of_study}
            onChange={handleChange}
            placeholder="Field of Study"
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
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

        <div className="grid grid-cols-2 gap-4">
          <input
            name="gpa"
            value={formData.gpa}
            onChange={handleChange}
            placeholder="GPA (e.g., 7.66)"
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

        <input
          name="institution_logo_url"
          value={formData.institution_logo_url}
          onChange={handleChange}
          placeholder="Institution Logo URL"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Description (optional)"
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
            {loading ? 'Saving...' : editingId ? 'Update Education' : 'Add Education'}
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
              <p className="text-white font-semibold">{item.institution_name}</p>
              <p className="text-sm text-slate-400">
                {item.degree} • {item.field_of_study}
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

export default EditEducation;
