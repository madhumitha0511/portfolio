// client/src/components/sections/Education.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { educationAPI } from "../../services/api";

const Education = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await educationAPI.getAll();
        setItems(res.data);
      } catch (e) {
        console.error("Education load error", e);
      }
    };
    load();
  }, []);

  return (
    <section id="education" className="py-20 px-4 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
          Education
        </h2>

        <div className="space-y-6">
          {items.map((ed, i) => (
            <motion.div
              key={ed.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col md:flex-row gap-4 bg-slate-900/70 border border-slate-700 rounded-xl p-5"
            >
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                <img
                  src={ed.institution_logo_url || "https://via.placeholder.com/64"}
                  alt={ed.institution_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-semibold text-white">
                  {ed.degree} · {ed.field_of_study}
                </h3>
                <p className="text-sm text-indigo-200">
                  {ed.institution_name}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {ed.start_date} – {ed.end_date || "Present"} •{" "}
                  {ed.location}
                  {ed.gpa && ` • CGPA: ${ed.gpa}`}
                </p>
                <p className="text-xs text-slate-300 mt-2">
                  {ed.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
