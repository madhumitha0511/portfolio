// client/src/components/sections/Extracurricular.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { extracurricularAPI } from "../../services/api";

const Extracurricular = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await extracurricularAPI.getAll();
        setItems(res.data);
      } catch (e) {
        console.error("Extracurricular load error", e);
      }
    };
    load();
  }, []);

  return (
    <section id="extracurricular" className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
          Extracurricular & Clubs
        </h2>

        <div className="space-y-6">
          {items.map((ex, i) => (
            <motion.div
              key={ex.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-slate-900/70 border border-slate-700 rounded-xl p-5"
            >
              <h3 className="text-sm md:text-base font-semibold text-white">
                {ex.activity_title}
              </h3>
              <p className="text-xs text-indigo-200 mt-1">
                {ex.position} · {ex.organization_name}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {ex.start_date} – {ex.end_date || "Present"}
              </p>
              <p className="text-xs text-slate-300 mt-2">{ex.description}</p>
              {ex.contributions?.length > 0 && (
                <ul className="mt-2 list-disc list-inside text-[11px] text-slate-300 space-y-1">
                  {ex.contributions.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Extracurricular;
