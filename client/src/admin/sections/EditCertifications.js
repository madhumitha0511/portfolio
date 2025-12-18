import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { certificationsAPI } from '../../services/api';

const EditCertifications = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    certification_name: '',
    issuer: '',
    issue_date: '',
    expiration_date: '',
    credential_id: '',
    credential_url: '',
    category: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCerts();
  }, []);

  const fetchCerts = async () => {
    try {
      const res = await certificationsAPI.getAll();
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching certifications:', err);
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
        await certificationsAPI.update(editingId, formData);
      } else {
        await certificationsAPI.create(formData);
      }
      fetchCerts();
      resetForm();
    } catch (err) {
      console.error('Error saving certification:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      certification_name: item.certification_name,
      issuer: item.issuer || '',
      issue_date: item.issue_date ? item.issue_date.slice(0, 10) : '',
      expiration_date: item.expiration_date
        ? item.expiration_date.slice(0, 10)
        : '',
      credential_id: item.credential_id || '',
      credential_url: item.credential_url || '',
      category: item.category || '',
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certification?')) return;
    try {
      await certificationsAPI.delete(id);
      fetchCerts();
    } catch (err) {
      console.error('Error deleting certification:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      certification_name: '',
      issuer: '',
      issue_date: '',
      expiration_date: '',
      credential_id: '',
      credential_url: '',
      category: '',
    });
    setEditingId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-white">Manage Certifications</h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-8"
      >
        <input
          name="certification_name"
          value={formData.certification_name}
          onChange={handleChange}
          placeholder="Certification Name"
          required
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />
        <input
          name="issuer"
          value={formData.issuer}
          onChange={handleChange}
          placeholder="Issuer (e.g., Cisco, Infosys Springboard)"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="issue_date"
            value={formData.issue_date}
            onChange={handleChange}
            placeholder="Issue Date"
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
          <input
            type="date"
            name="expiration_date"
            value={formData.expiration_date}
            onChange={handleChange}
            placeholder="Expiration Date"
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
        </div>

        <input
          name="credential_id"
          value={formData.credential_id}
          onChange={handleChange}
          placeholder="Credential ID"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />
        <input
          name="credential_url"
          value={formData.credential_url}
          onChange={handleChange}
          placeholder="Credential URL"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category (AI/ML, Web, Security...)"
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
              ? 'Update Certification'
              : 'Add Certification'}
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
                {item.certification_name}
              </p>
              <p className="text-xs text-slate-400">
                {item.issuer} • {item.category}
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

export default EditCertifications;
