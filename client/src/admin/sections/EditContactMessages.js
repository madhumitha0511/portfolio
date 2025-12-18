import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { contactAPI } from '../../services/api';

const EditContactMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await contactAPI.getAll();
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching contact messages:', err);
    }
  };

  const toggleFlag = async (msg, field) => {
    try {
      await contactAPI.update(msg.id, {
        read: field === 'read' ? !msg.read : msg.read,
        replied: field === 'replied' ? !msg.replied : msg.replied,
      });
      fetchMessages();
    } catch (err) {
      console.error('Error updating message:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await contactAPI.delete(id);
      fetchMessages();
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-white">Contact Messages</h2>

      {messages.length === 0 && (
        <p className="text-slate-400">No messages yet.</p>
      )}

      <div className="space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-slate-800 border border-slate-700 rounded-lg"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-white font-semibold">
                  {msg.sender_name || 'Anonymous'}
                </p>
                <p className="text-xs text-slate-400">
                  {msg.sender_email} • {msg.sender_phone}
                </p>
              </div>
              <p className="text-xs text-slate-500">
                {new Date(msg.created_at).toLocaleString()}
              </p>
            </div>

            <p className="text-sm text-blue-300 mb-1">{msg.subject}</p>
            <p className="text-slate-200 text-sm mb-3 whitespace-pre-line">
              {msg.message}
            </p>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFlag(msg, 'read')}
                  className={`px-3 py-1 rounded text-xs ${
                    msg.read
                      ? 'bg-green-700 text-white'
                      : 'bg-slate-700 text-slate-200'
                  }`}
                >
                  {msg.read ? 'Read' : 'Mark as Read'}
                </button>
                <button
                  onClick={() => toggleFlag(msg, 'replied')}
                  className={`px-3 py-1 rounded text-xs ${
                    msg.replied
                      ? 'bg-indigo-700 text-white'
                      : 'bg-slate-700 text-slate-200'
                  }`}
                >
                  {msg.replied ? 'Replied' : 'Mark as Replied'}
                </button>
              </div>

              <button
                onClick={() => handleDelete(msg.id)}
                className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EditContactMessages;
