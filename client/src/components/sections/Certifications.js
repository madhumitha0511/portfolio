// client/src/components/sections/Certifications.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { certificationsAPI } from "../../services/api";

const Certifications = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await certificationsAPI.getAll();
        setItems(res.data);
      } catch (e) {
        console.error("Certifications load error", e);
      }
    };
    load();
  }, []);

  return (
    <section id="certifications" className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
          Certifications
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-slate-900/70 border border-slate-700 rounded-xl p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-800">
                  <img
                    src={c.certificate_image_url || "https://via.placeholder.com/80"}
                    alt={c.certification_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {c.certification_name}
                  </h3>
                  <p className="text-xs text-indigo-200">{c.issuer}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-1">
                {c.issue_date} {c.category && `• ${c.category}`}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
