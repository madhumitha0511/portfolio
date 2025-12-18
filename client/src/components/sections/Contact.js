import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {

  contactAPI,
} from '../../services/api';
import Achievements from './Achievements';
// ========== 5. CONTACT SECTION ==========
export const Contact = () => {
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await contactAPI.sendMessage(formData);
      setSuccess(true);
      setFormData({
        sender_name: '',
        sender_email: '',
        subject: '',
        message: '',
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-slate-900">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Get In Touch
        </h2>

        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded text-green-300"
          >
            ✓ Message sent successfully!
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <input
            type="text"
            name="sender_name"
            placeholder="Your Name"
            value={formData.sender_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="sender_email"
            placeholder="Your Email"
            value={formData.sender_email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};
export default Achievements;
