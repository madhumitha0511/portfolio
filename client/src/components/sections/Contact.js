// client/src/components/sections/Contact.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { contactAPI } from "../../services/api";

export const Contact = () => {
  const [formData, setFormData] = useState({
    sender_name: "",
    sender_email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactAPI.sendMessage(formData);
      setSuccess(true);
      setFormData({
        sender_name: "",
        sender_email: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-4 overflow-hidden"
      // REMOVED: bg-[color:var(--color-bg)] and animated background - using global now!
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* LEFT COLUMN – text + bullets */}
          <div className="space-y-5">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[color:var(--color-muted)]">
              Contact
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[color:var(--color-text)]">
              Tell us about your idea.
            </h2>
            <p className="text-sm md:text-base text-[color:var(--color-muted)]">
              Whether it is a full product build, AI feature, or landing page,
              use this form to start a focused conversation.
            </p>

            <div className="mt-4 grid gap-3 text-[13px] text-[color:var(--color-text)]">
              <div className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--color-primary)]" />
                <p>Scope clarity for websites, dashboards, or AI flows.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--color-primary)]" />
                <p>Timeline and budget alignment before any call.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--color-primary)]" />
                <p>Clean, email‑only communication; no spam, no WhatsApp.</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN – glass form card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card)]/92 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] px-6 py-7 md:px-7 md:py-8"
          >
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 rounded-xl border border-emerald-400/60 bg-emerald-50/95 text-emerald-900 px-3 py-2.5 text-xs shadow-soft"
              >
                ✓ Message sent successfully.
              </motion.div>
            )}

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4 relative z-10"
            >
              <Field
                label="Name"
                name="sender_name"
                type="text"
                placeholder="Your name"
                value={formData.sender_name}
                onChange={handleChange}
              />
              <Field
                label="Email"
                name="sender_email"
                type="email"
                placeholder="Your email"
                value={formData.sender_email}
                onChange={handleChange}
              />
              <Field
                label="Subject"
                name="subject"
                type="text"
                placeholder="Project, collaboration, or hiring"
                value={formData.subject}
                onChange={handleChange}
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[color:var(--color-muted)]">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Share scope, tech stack, or links. Short is fine."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/8 bg-white/5 backdrop-blur-md px-3 py-2.5 text-sm text-[color:var(--color-text)] shadow-[0_1px_0_rgba(255,255,255,0.15)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/70 focus:border-[color:var(--color-primary)] resize-none"
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[color:var(--color-muted)]">
                <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-[6px] border border-[color:var(--color-border)] bg-[color:var(--color-bg)]/90 text-[color:var(--color-primary)] text-[10px]">
                  ✓
                </span>
                <span>Replies go only to your email. No promotions.</span>
              </div>

              <motion.button
                whileHover={{ y: -1, boxShadow: "0 12px 0 rgba(0,0,0,0.3)" }}
                whileTap={{ y: 0, scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-gradient-to-r from-[color:var(--color-primary-soft)] to-[color:var(--color-bg-elevated)] text-[color:var(--color-text)] font-semibold text-sm py-2.5 shadow-[0_16px_0_rgba(0,0,0,0.35)] transition-all disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send message"}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, name, type, placeholder, value, onChange }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-medium text-[color:var(--color-muted)]">
      {label}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full rounded-2xl border border-white/8 bg-white/5 backdrop-blur-md px-3 py-2.5 text-sm text-[color:var(--color-text)] shadow-[0_1px_0_rgba(255,255,255,0.15)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/70 focus:border-[color:var(--color-primary)]"
    />
  </div>
);

export default Contact;