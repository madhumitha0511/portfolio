import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioAPI } from '../../services/api';

const EditAbout = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    highlights: [],
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await portfolioAPI.getAbout();
        setFormData(
          res.data || { title: '', description: '', image_url: '', highlights: [] }
        );
      } catch (err) {
        console.error('Error fetching about:', err);
      }
    };
    fetchAbout();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleHighlightsChange = (e) => {
    const arr = e.target.value.split(',').map((h) => h.trim()).filter(Boolean);
    setFormData((p) => ({ ...p, highlights: arr }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await portfolioAPI.updateAbout(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error updating about:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-white">Edit About Section</h2>

      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 p-3 bg-green-900/50 border border-green-700 rounded text-green-300"
        >
          ✓ About section updated successfully!
        </motion.div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-slate-800/50 p-6 rounded-lg border border-slate-700"
      >
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="About Me"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            value={formData.description || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Image URL
          </label>
          <input
            type="url"
            name="image_url"
            value={formData.image_url || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formData.image_url && (
            <img
              src={formData.image_url}
              alt="About preview"
              className="mt-3 w-40 h-40 object-cover rounded-lg"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Highlights (comma separated)
          </label>
          <input
            type="text"
            value={formData.highlights?.join(', ') || ''}
            onChange={handleHighlightsChange}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="5+ Internships, Hackathons, Leadership..."
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default EditAbout;
