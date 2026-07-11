"use client";

import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarInteractiveProps {
  navLinks: { href: string; label: string }[];
  logo: ReactNode;
  desktopNav: ReactNode;
}

export function NavbarInteractive({ navLinks, logo, desktopNav }: NavbarInteractiveProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${
          scrolled
            ? "border-b border-gray-200/80 dark:border-white/10 bg-white/80 dark:bg-[#09090B]/80 backdrop-blur-2xl saturate-150 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-16 md:h-20 flex items-center justify-between transition-all duration-300">
          {logo}
          {desktopNav}

          <div className="flex items-center gap-4 lg:hidden">
            <ThemeToggle />
            <button
              className="p-2 -mr-2 text-gray-700 dark:text-gray-300"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[1001] lg:hidden">
          <div
            className="absolute inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-[280px] bg-white dark:bg-[#09090B] border-l border-gray-200 dark:border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right">
            <div className="h-16 px-6 flex items-center justify-end border-b border-gray-100 dark:border-white/5">
              <button
                className="p-2 -mr-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-gray-700 dark:text-gray-300"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-gray-100 dark:bg-white/10 my-2" />
              <Link
                href="#upload"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl gradient-bg-primary text-white font-semibold shadow-md"
                onClick={() => setMobileOpen(false)}
              >
                <Sparkles className="w-4 h-4" /> Try for Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
