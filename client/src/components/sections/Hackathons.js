// client/src/components/sections/Hackathons.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { hackathonsAPI } from "../../services/api";

const Hackathons = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await hackathonsAPI.getAll();
        setItems(res.data);
      } catch (e) {
        console.error("Hackathons load error", e);
      }
    };
    load();
  }, []);

  return (
    <section id="hackathons" className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
          Hackathons & Events
        </h2>

        <div className="space-y-6">
          {items.map((h, i) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-slate-900/70 border border-slate-700 rounded-xl p-5"
            >
              <div className="flex justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-white">
                    {h.event_name}
                  </h3>
                  <p className="text-xs text-indigo-200">
                    {h.location} {h.category && `• ${h.category}`}
                  </p>
                </div>
                <p className="text-xs text-slate-400">{h.event_date}</p>
              </div>
              <p className="text-xs text-slate-300 mt-2">{h.description}</p>
              <p className="text-xs text-slate-200 mt-2">
                <span className="font-semibold">Role:</span>{" "}
                {h.role_or_achievement}
              </p>
              {h.outcome_or_result && (
                <p className="text-xs text-emerald-300 mt-1">
                  Outcome: {h.outcome_or_result}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hackathons;
