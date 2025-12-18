// ========== EDIT HERO SECTION ==========
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioAPI, experienceAPI } from '../../services/api';

export const EditHero = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    cta_text: '',
    background_image_url: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const res = await portfolioAPI.getHero();
      setFormData(res.data || {});
    } catch (err) {
      console.error('Error fetching hero:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await portfolioAPI.updateHero(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error updating hero:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-white">Edit Hero Section</h2>

      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 p-3 bg-green-900/50 border border-green-700 rounded text-green-300"
        >
          ✓ Hero section updated successfully!
        </motion.div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-slate-800/50 p-6 rounded-lg border border-slate-700"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Hero Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Welcome to my portfolio"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Subtitle/Tagline
          </label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="AI Engineer | Full Stack Developer"
          />
        </div>

        {/* CTA Text */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            CTA Button Text
          </label>
          <input
            type="text"
            name="cta_text"
            value={formData.cta_text || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="View My Work"
          />
        </div>

        {/* Background Image URL */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Background Image URL
          </label>
          <input
            type="url"
            name="background_image_url"
            value={formData.background_image_url || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://via.placeholder.com/1920x1080"
          />
          {formData.background_image_url && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={formData.background_image_url}
              alt="Preview"
              className="mt-4 w-full h-32 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Submit Button */}
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

export default EditHero;