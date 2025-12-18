// client/src/components/sections/Testimonials.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { testimonialsAPI } from "../../services/api";

const Testimonials = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await testimonialsAPI.getAll();
        setItems(res.data);
      } catch (e) {
        console.error("Testimonials load error", e);
      }
    };
    load();
  }, []);

  if (!items.length) return null;

  return (
    <section id="testimonials" className="py-20 px-4 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
          Testimonials
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-slate-900/70 border border-slate-700 rounded-xl p-5"
            >
              <p className="text-xs text-slate-200 italic mb-4">
                “{t.message}”
              </p>
              <div>
                <p className="text-sm font-semibold text-white">
                  {t.name}
                </p>
                <p className="text-xs text-indigo-200">
                  {t.title} · {t.company_or_organization}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
