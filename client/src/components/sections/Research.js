// client/src/components/sections/Research.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { researchAPI } from "../../services/api";

const Research = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await researchAPI.getAll();
        setItems(res.data);
      } catch (e) {
        console.error("Research load error", e);
      }
    };
    load();
  }, []);

  return (
    <section id="research" className="py-20 px-4 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
          Research
        </h2>

        <div className="space-y-6">
          {items.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-slate-900/70 border border-slate-700 rounded-xl p-5"
            >
              <h3 className="text-sm md:text-base font-semibold text-white">
                {r.research_title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {r.start_date} – {r.end_date || "Ongoing"} • {r.research_type}
              </p>
              <p className="text-xs text-slate-300 mt-2">{r.description}</p>
              {r.outcomes && (
                <p className="text-xs text-emerald-300 mt-2">
                  Outcomes: {r.outcomes}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Research;
