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
    <button
      onClick={toggle}
      className="relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] shadow-soft text-xs font-medium text-[color:var(--color-text)]"
    >
      <motion.div
        layout
        className="w-8 h-8 rounded-full bg-[color:var(--color-primary-soft)] flex items-center justify-center"
      >
        <span className="text-[11px]">
          {theme === "light" ? "☀︎" : "☾"}
        </span>
      </motion.div>
      <span>{theme === "light" ? "Light" : "Dark"} mode</span>
    </button>
  );
};

export default ThemeToggle;
