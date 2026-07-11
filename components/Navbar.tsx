"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#api", label: "API" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
        role="banner"
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${scrolled
          ? "border-b border-gray-200/80 dark:border-white/10 bg-white/80 dark:bg-[#09090B]/80 backdrop-blur-2xl saturate-150 shadow-sm"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-16 md:h-20 flex items-center justify-between transition-all duration-300">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="cleanBG home">
            <div className="relative h-8 w-8 md:h-9 md:w-9">
              <Image src="/logo.png" alt="cleanBG" fill sizes="36px" className="object-contain" priority />
            </div>
            <span className="text-[17px] font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              CleanBG
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md
                  ${activeLink === link.href
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
              >
                {link.label}
                {activeLink === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-blue-500 rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="relative px-5 py-2 text-sm font-semibold text-white rounded-lg gradient-bg-primary shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-px transition-all duration-200 flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Get Started Free
            </Link>
          </div>

          {/* Mobile Hamburger & Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1001] md:hidden"
          >
            <div
              className="absolute inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 bottom-0 w-[85%] max-w-[400px] bg-white dark:bg-[#0D1117] border-r border-gray-200 dark:border-white/10 p-6 pt-24 shadow-2xl flex flex-col h-full"
            >
              <nav className="flex flex-col gap-1 mb-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 pt-4 border-t border-gray-100 dark:border-white/10 pb-8">
                <Link href="/login" className="w-full py-3.5 text-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all min-h-[48px] flex items-center justify-center">
                  Log in
                </Link>
                <Link href="/signup" className="w-full py-3.5 text-center text-sm font-semibold text-white rounded-xl gradient-bg-primary shadow-lg shadow-blue-500/25 min-h-[48px] flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Get Started Free
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
