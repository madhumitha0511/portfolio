import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored =
      localStorage.getItem("theme") ||
      document.documentElement.getAttribute("data-theme") ||
      "light";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] shadow-soft text-sm font-medium text-[color:var(--color-text)]"
    >
      <motion.div
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-lg"
      >
        {theme === "light" ? "☀️" : "🌙"}
      </motion.div>
      <span className="hidden sm:inline">
        {theme === "light" ? "Light" : "Dark"}
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
