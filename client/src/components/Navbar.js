// client/src/components/Navbar.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [otherOpen, setOtherOpen] = useState(false);

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

            {/* Other dropdown - Fixed with padding to bridge gap */}
            <div
              className="relative"
              onMouseEnter={() => setOtherOpen(true)}
              onMouseLeave={() => setOtherOpen(false)}
            >
              <button className="text-sm font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-primary)] transition flex items-center gap-1">
                Other
                <span className="text-xs">▾</span>
              </button>
              
              <AnimatePresence>
                {otherOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl bg-[color:var(--color-bg-elevated)] border border-[color:var(--color-border)] shadow-lg py-2"
                  >
                    {otherLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="block px-4 py-2 text-sm font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-primary)] hover:bg-[color:var(--color-bg)]/70 transition"
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
              className="px-4 py-2 text-sm font-semibold rounded-lg border border-[color:var(--color-border)] text-[color:var(--color-text)] hover:bg-[color:var(--color-bg-elevated)] transition"
            >
              Login
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[color:var(--color-text)] p-2"
              aria-label="Toggle menu"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[color:var(--color-bg-elevated)] border-t border-[color:var(--color-border)]"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="block py-2 text-base font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-primary)] transition"
                >
                  {link.name}
                </motion.a>
              ))}

              {/* Other group on mobile */}
              <div className="pt-3 mt-3 border-t border-[color:var(--color-border)]">
                <p className="text-xs uppercase tracking-wider text-[color:var(--color-muted)] mb-2 font-semibold">
                  Other
                </p>
                {otherLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navLinks.length + idx) * 0.05 }}
                    className="block py-2 text-sm font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-primary)] transition"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              {/* Login button mobile */}
              <motion.a
                href="/admin/login"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + otherLinks.length) * 0.05 }}
                className="block mt-4 py-2 text-center text-sm font-semibold text-[color:var(--color-primary)] border border-[color:var(--color-border)] rounded-lg hover:bg-[color:var(--color-bg)] transition"
              >
                Login
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
