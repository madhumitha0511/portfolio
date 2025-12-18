// client/src/components/sections/Achievements.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { achievementsAPI } from "../../services/api";

const Achievements = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await achievementsAPI.getAll();
        setItems(res.data);
      } catch (e) {
        console.error("Achievements load error", e);
      }
    };
    load();
  }, []);

  return (
    <section id="achievements" className="py-20 px-4 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
          Achievements
        </h2>

        <div className="space-y-5">
          {items.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-slate-900/70 border border-slate-700 rounded-xl p-4 flex gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-slate-800 overflow-hidden flex-none">
                <img
                  src={a.badge_icon_url || "https://via.placeholder.com/64"}
                  alt={a.achievement_title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-semibold text-white">
                  {a.achievement_title}
                </h3>
                <p className="text-xs text-indigo-200">
                  {a.organization} {a.category && `• ${a.category}`}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {a.achievement_date}
                </p>
                <p className="text-xs text-slate-300 mt-2">{a.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
