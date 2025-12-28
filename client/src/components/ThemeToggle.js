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
      className="relative flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] shadow-soft overflow-hidden group"
      aria-label="Toggle theme"
    >
      {/* Background Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-primary)]/10 to-[color:var(--color-primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon Container with Animation */}
      <div className="relative w-5 h-5">
        {/* Sun Icon */}
        <motion.svg
          initial={false}
          animate={{
            scale: theme === "light" ? 1 : 0,
            rotate: theme === "light" ? 0 : 180,
            opacity: theme === "light" ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 text-[color:var(--color-primary)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </motion.svg>

        {/* Moon Icon */}
        <motion.svg
          initial={false}
          animate={{
            scale: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : -180,
            opacity: theme === "dark" ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 text-[color:var(--color-primary)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </motion.svg>
      </div>

      {/* Text Label */}
      <span className="hidden sm:inline text-sm font-medium text-[color:var(--color-text)] relative z-10">
        {theme === "light" ? "Light" : "Dark"}
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
