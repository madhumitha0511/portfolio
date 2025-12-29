// client/src/components/Navbar.js
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [otherOpen, setOtherOpen] = useState(false);

  // timeout ref for delayed close of "Other"
  const otherTimeoutRef = useRef(null);

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

  const handleOtherEnter = () => {
    if (otherTimeoutRef.current) clearTimeout(otherTimeoutRef.current);
    setOtherOpen(true);
  };

  const handleOtherLeave = () => {
    // small delay (300–400 ms) so submenu doesn’t vanish instantly
    otherTimeoutRef.current = setTimeout(() => {
      setOtherOpen(false);
    }, 350);
  };

  return (
   <motion.nav
  initial={{ y: -80, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className="sticky top-0 z-50 backdrop-blur-xl bg-[color:var(--color-bg)] border-b border-[color:var(--color-border)] shadow-soft"
>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="text-2xl font-bold tracking-tight text-[color:var(--color-primary)]"
          >
            M
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-primary)] transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* Other dropdown with delay */}
            <div
              className="relative"
              onMouseEnter={handleOtherEnter}
              onMouseLeave={handleOtherLeave}
            >
              <button className="text-sm font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-primary)] transition-colors flex items-center gap-1">
                Other
                <span className="text-xs">▾</span>
              </button>

              <AnimatePresence>
                {otherOpen && (
                  <motion.div
                    key="other-menu"
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 10, scale: 1 }}
                    exit={{ opacity: 0, y: 0, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-48 rounded-xl bg-[color:var(--color-bg-elevated)] border border-[color:var(--color-border)] shadow-soft/70 py-2"
                  >
                    {otherLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="block px-4 py-1.5 text-xs font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-primary)] hover:bg-[color:var(--color-bg)]/80 transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ThemeToggle />

            {/* Login button */}
            <a
              href="/admin/login"
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-[color:var(--color-border)] text-[color:var(--color-text)] hover:bg-[color:var(--color-bg-elevated)] hover:text-[color:var(--color-primary)] transition-colors"
            >
              Login
            </a>
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden bg-[color:var(--color-bg-elevated)] border-t border-[color:var(--color-border)]"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-primary)] transition-colors"
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
                    className="block text-sm font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-primary)] transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Login button mobile */}
              <a
                href="/admin/login"
                onClick={() => setIsOpen(false)}
                className="block mt-2 text-sm font-semibold text-[color:var(--color-primary)]"
              >
                Login
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
