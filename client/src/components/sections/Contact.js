// client/src/components/sections/Contact.js
import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  const [isDark, setIsDark] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setIsDark(currentTheme === 'dark');

    const observer = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDark(theme === 'dark');
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    
    return () => observer.disconnect();
  }, []);

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
      style={{
        perspective: "2000px"
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-start">
         
          {/* ✅ LEFT PANEL - Slides from left with blur reveal */}
          <motion.div 
            className="space-y-6"
            initial={{ 
              x: prefersReducedMotion ? 0 : -100,
              opacity: 0,
              filter: prefersReducedMotion ? "blur(0px)" : "blur(20px)"
            }}
            whileInView={{ 
              x: 0,
              opacity: 1,
              filter: "blur(0px)"
            }}
            viewport={{ 
              once: false,
              amount: 0.3
            }}
            transition={{ 
              duration: prefersReducedMotion ? 0.3 : 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
            >
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[color:var(--color-muted)] mb-4">
                Get In Touch
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[color:var(--color-text)] mb-4">
                Building intelligent systems that <span className="text-[color:var(--color-primary)]">solve real problems</span>
              </h2>
              <p className="text-sm md:text-base text-[color:var(--color-muted)] leading-relaxed">
                AI-focused developer and full-stack engineer with hands-on experience in production-ready applications, applied ML, and scalable web platforms. I focus on clean implementation, on-time delivery, and turning ideas into usable systems, not just proof-of-concepts.
                </p>
            </motion.div>

            {/* ✅ Staggered bullet points with blur reveal */}
            <div className="grid gap-3 text-[13px] text-[color:var(--color-text)]">
              {[
                "ML Engineer: 94% accuracy models deployed at scale",
                "Full-stack: React + Node.js + PostgreSQL production apps",
                "Research: 7 papers + Top 3 hackathon finisher"
              ].map((text, i) => (
                <motion.div 
                  key={i}
                  className="flex items-start gap-2"
                  initial={{ 
                    opacity: 0,
                    x: -20,
                    filter: prefersReducedMotion ? "blur(0px)" : "blur(10px)"
                  }}
                  whileInView={{ 
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)"
                  }}
                  viewport={{ once: false }}
                  transition={{ 
                    delay: prefersReducedMotion ? 0 : 0.3 + i * 0.1,
                    duration: 0.5
                  }}
                >
                  <motion.span 
                    className="mt-1 h-2 w-2 rounded-full bg-[color:var(--color-primary)]"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ 
                      delay: prefersReducedMotion ? 0 : 0.4 + i * 0.1,
                      type: "spring",
                      stiffness: 500
                    }}
                  />
                  <p>{text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="pt-4 pb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.7 }}
            >
              <p className="text-[12px] text-[color:var(--color-muted)] italic">
                "Got a problem AI can solve? Let's talk code, not concepts."
              </p>
            </motion.div>

            {/* ✅ Magnetic hover social buttons */}
            <motion.div 
              className="flex gap-3 pt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.8 }}
            >
              {[
                { 
                  href: "https://github.com/RamPrabhu31",
                  label: "GitHub",
                  icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                },
                { 
                  href: "mailto:ramwork31@gmail.com",
                  label: "Email",
                  isStroke: true,
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                },
                { 
                  href: "https://linkedin.com/in/ramprabhu-v-19380b223",
                  label: "LinkedIn",
                  icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target={social.href.startsWith('http') ? "_blank" : undefined}
                  rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  whileHover={!prefersReducedMotion ? { 
                    scale: 1.15,
                    rotate: i % 2 === 0 ? 8 : -8,
                    y: -5
                  } : {}}
                  whileTap={{ scale: 0.95 }}
                  className={isDark
                    ? "w-12 h-12 rounded-full bg-[color:var(--color-bg-elevated)] border-2 border-[color:var(--color-border)] flex items-center justify-center shadow-soft hover:border-[color:var(--color-primary)] transition-all"
                    : "w-12 h-12 rounded-full bg-white border-2 border-[color:var(--color-border)] flex items-center justify-center shadow-soft hover:border-[color:var(--color-primary)] hover:shadow-elevated transition-all"
                  }
                  aria-label={social.label}
                >
                  <svg className="w-5 h-5 text-[color:var(--color-text)]" fill={social.isStroke ? "none" : "currentColor"} stroke={social.isStroke ? "currentColor" : undefined} viewBox="0 0 24 24">
                    {social.icon}
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ✅ RIGHT PANEL - Slides from right with 3D rotation */}
          <motion.div
            initial={{ 
              x: prefersReducedMotion ? 0 : 100,
              opacity: 0,
              rotateY: prefersReducedMotion ? 0 : 25,
              filter: prefersReducedMotion ? "blur(0px)" : "blur(20px)"
            }}
            whileInView={{ 
              x: 0,
              opacity: 1,
              rotateY: 0,
              filter: "blur(0px)"
            }}
            viewport={{ 
              once: false,
              amount: 0.3
            }}
            transition={{ 
              duration: prefersReducedMotion ? 0.3 : 0.9,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={!prefersReducedMotion ? {
              scale: 1.02,
              rotateY: -2,
              transition: { duration: 0.3 }
            } : {}}
            className={isDark
              ? "relative rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card)]/92 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] px-6 py-7 md:px-7 md:py-8"
              : "relative rounded-3xl border border-[color:var(--color-border)] bg-white/95 backdrop-blur-xl shadow-elevated px-6 py-7 md:px-7 md:py-8"
            }
            style={{
              transformStyle: "preserve-3d"
            }}
          >
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
                className={isDark
                  ? "mb-4 rounded-xl border border-emerald-400/60 bg-emerald-50/95 text-emerald-900 px-3 py-2.5 text-xs shadow-soft"
                  : "mb-4 rounded-xl border border-emerald-400 bg-emerald-50 text-emerald-900 px-3 py-2.5 text-xs shadow-soft"
                }
              >
                ✓ Message sent successfully.
              </motion.div>
            )}

            {/* ✅ Form with staggered blur reveal */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4 relative z-10"
            >
              {[
                { label: "Name", name: "sender_name", type: "text", placeholder: "Your name" },
                { label: "Email", name: "sender_email", type: "email", placeholder: "Your email" },
                { label: "Subject", name: "subject", type: "text", placeholder: "Project, collaboration, or hiring" }
              ].map((field, i) => (
                <motion.div
                  key={field.name}
                  initial={{ 
                    opacity: 0,
                    y: 20,
                    filter: prefersReducedMotion ? "blur(0px)" : "blur(10px)"
                  }}
                  whileInView={{ 
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)"
                  }}
                  viewport={{ once: false }}
                  transition={{ 
                    delay: prefersReducedMotion ? 0 : 0.1 + i * 0.1,
                    duration: 0.5
                  }}
                >
                  <Field
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    isDark={isDark}
                  />
                </motion.div>
              ))}

              <motion.div 
                className="space-y-1.5"
                initial={{ 
                  opacity: 0,
                  y: 20,
                  filter: prefersReducedMotion ? "blur(0px)" : "blur(10px)"
                }}
                whileInView={{ 
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)"
                }}
                viewport={{ once: false }}
                transition={{ 
                  delay: prefersReducedMotion ? 0 : 0.4,
                  duration: 0.5
                }}
              >
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
                  className={isDark
                    ? "w-full rounded-2xl border border-white/8 bg-white/5 backdrop-blur-md px-3 py-2.5 text-sm text-[color:var(--color-text)] shadow-[0_1px_0_rgba(255,255,255,0.15)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/70 focus:border-[color:var(--color-primary)] resize-none"
                    : "w-full rounded-2xl border border-[color:var(--color-border)] bg-white/80 backdrop-blur-md px-3 py-2.5 text-sm text-[color:var(--color-text)] shadow-soft focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/70 focus:border-[color:var(--color-primary)] resize-none"
                  }
                />
              </motion.div>

              <motion.button
                initial={{ 
                  opacity: 0,
                  scale: 0.9,
                  filter: prefersReducedMotion ? "blur(0px)" : "blur(10px)"
                }}
                whileInView={{ 
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)"
                }}
                viewport={{ once: false }}
                transition={{ 
                  delay: prefersReducedMotion ? 0 : 0.5,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  y: -2,
                  scale: 1.02,
                  boxShadow: isDark ? "0 16px 0 rgba(0,0,0,0.4)" : "0 16px 0 rgba(59,130,246,0.3)" 
                }}
                whileTap={{ y: 0, scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={isDark
                  ? "mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-gradient-to-r from-[color:var(--color-primary-soft)] to-[color:var(--color-bg-elevated)] text-[color:var(--color-text)] font-semibold text-sm py-2.5 shadow-[0_12px_0_rgba(0,0,0,0.35)] transition-all disabled:opacity-60"
                  : "mt-2 w-full rounded-2xl border border-[color:var(--color-primary)] bg-[color:var(--color-primary)] text-white font-semibold text-sm py-2.5 shadow-[0_12px_0_rgba(59,130,246,0.25)] hover:bg-[color:var(--color-primary)]/90 transition-all disabled:opacity-60"
                }
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

const Field = ({ label, name, type, placeholder, value, onChange, isDark }) => (
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
      className={isDark
        ? "w-full rounded-2xl border border-white/8 bg-white/5 backdrop-blur-md px-3 py-2.5 text-sm text-[color:var(--color-text)] shadow-[0_1px_0_rgba(255,255,255,0.15)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/70 focus:border-[color:var(--color-primary)]"
        : "w-full rounded-2xl border border-[color:var(--color-border)] bg-white/80 backdrop-blur-md px-3 py-2.5 text-sm text-[color:var(--color-text)] shadow-soft focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/70 focus:border-[color:var(--color-primary)]"
      }
    />
  </div>
);

export default Contact;