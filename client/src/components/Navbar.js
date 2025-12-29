// client/src/components/Navbar.js - FIXED WITH Link
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";  // ✅ ADD THIS
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [otherOpen, setOtherOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const otherLinks = [
    { name: "Certifications", href: "#certifications" },
    { name: "Achievements", href: "#achievements" },
    { name: "Hackathons", href: "#hackathons" },
    { name: "Research", href: "#research" },
    { name: "Extracurricular", href: "#extracurricular" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setOtherOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOtherOpen(false);
    }, 200);
    setHoverTimeout(timeout);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-[color:var(--color-bg)]/80 border-b border-[color:var(--color-border)] shadow-soft"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-[color:var(--color-primary)]"
          >
            M
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-primary)] transition"
              >
                {link.name}
              </a>
            ))}

            {/* ULTRA TIGHT DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-sm font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-primary)] transition flex items-center gap-1">
                Other
                <span className="text-xs">▾</span>
              </button>
              {otherOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -left-[150%] translate-x-[150%] mt-4 w-52 rounded-xl bg-[color:var(--color-bg-elevated)] border border-[color:var(--color-border)] shadow-elevated py-1.5 px-3"
                >
                  <div className="flex flex-col items-center space-y-0.5 text-center">
                    {otherLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="block px-3 py-1 text-sm font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-primary)] hover:bg-[color:var(--color-bg)]/50 rounded-md transition-all w-full leading-tight"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <ThemeToggle />

            {/* ✅ FIXED: Link INSTEAD OF <a> */}
            <Link
              to="/admin/login"
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-[color:var(--color-border)] text-[color:var(--color-text)] hover:bg-[color:var(--color-bg-elevated)] transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[color:var(--color-text)]"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-[color:var(--color-bg-elevated)] border-t border-[color:var(--color-border)]"
        >
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-primary)]"
              >
                {link.name}
              </a>
            ))}

            {/* Other group on mobile */}
            <div className="pt-2 border-t border-[color:var(--color-border)]">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-muted)] mb-2">
                Other
              </p>
              {otherLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-primary)]"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* ✅ FIXED: Link INSTEAD OF <a> */}
            <Link
              to="/admin/login"
              onClick={() => setIsOpen(false)}
              className="block mt-2 text-sm font-semibold text-[color:var(--color-primary)]"
            >
              Login
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;