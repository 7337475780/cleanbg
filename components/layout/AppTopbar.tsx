"use client";

import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/config/constants";

const PAGE_TITLES: Record<string, string> = {
  [ROUTES.DASHBOARD]: "Dashboard",
  [ROUTES.EDITOR]:    "Editor",
  [ROUTES.HISTORY]:   "History",
  [ROUTES.SETTINGS]:  "Settings",
  [ROUTES.PROFILE]:   "Profile",
  [ROUTES.API_DOCS]:  "API Documentation",
};

interface AppTopbarProps {
  onMenuOpen: () => void;
}

export function AppTopbar({ onMenuOpen }: AppTopbarProps) {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "cleanBG";

  return (
    <header className="h-14 flex items-center justify-between px-4 md:px-6 border-b border-gray-100 dark:border-white/[0.06] bg-white/90 dark:bg-[#09090B]/90 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuOpen}
          className="lg:hidden p-2 -ml-1 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-[15px] font-semibold text-gray-900 dark:text-white">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
