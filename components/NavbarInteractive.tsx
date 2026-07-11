"use client";

import { useEffect, useState, ReactNode } from "react";
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
    const onScroll = () => setScrolled(window.scrollY > 16);
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

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace(/.*#/, "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled
            ? "border-b border-gray-200/60 dark:border-white/[0.06] bg-white/90 dark:bg-[#09090B]/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-14 md:h-16 flex items-center justify-between relative">
          {logo}
          {desktopNav}

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              className="p-2 -mr-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/8 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[1001] lg:hidden" aria-modal="true" role="dialog">
          <div
            className="absolute inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-[260px] bg-white dark:bg-[#0A0A0F] border-l border-gray-100 dark:border-white/[0.06] shadow-2xl flex flex-col">
            <div className="h-14 px-4 flex items-center justify-between border-b border-gray-100 dark:border-white/[0.06]">
              <span className="text-[13px] font-semibold text-gray-900 dark:text-white">Navigation</span>
              <button
                className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-white/8 transition-colors"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2.5 text-[14px] font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => handleNavClick(link.href)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-100 dark:border-white/[0.06]">
              <a
                href="/#upload"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg gradient-bg-primary text-white text-[14px] font-semibold shadow-[0_2px_12px_rgba(37,99,235,0.3)]"
                onClick={() => handleNavClick("/#upload")}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Start for Free
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
