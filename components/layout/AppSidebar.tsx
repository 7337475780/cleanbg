"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard, Wand2, History, Settings,
  User, Code2, LogOut, X, ChevronRight,
} from "lucide-react";
import { useAuth } from "@/store";
import { ROUTES } from "@/config/constants";

const navItems = [
  { href: ROUTES.DASHBOARD, icon: LayoutDashboard, label: "Dashboard" },
  { href: ROUTES.EDITOR,    icon: Wand2,           label: "Editor" },
  { href: ROUTES.HISTORY,   icon: History,         label: "History" },
  { href: ROUTES.API_DOCS,  icon: Code2,           label: "API Docs" },
];

const bottomItems = [
  { href: ROUTES.PROFILE,  icon: User,     label: "Profile" },
  { href: ROUTES.SETTINGS, icon: Settings, label: "Settings" },
];

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function NavLink({ href, icon: Icon, label, onClick }: {
  href: string; icon: React.ElementType; label: string; onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all duration-150 group ${
        isActive
          ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
      }`}
    >
      <Icon className={`w-4 h-4 shrink-0 ${isActive ? "" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"}`} />
      {label}
      {isActive && <ChevronRight className="w-3 h-3 ml-auto opacity-60" />}
    </Link>
  );
}

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const { user, logout } = useAuth();

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 flex items-center gap-2.5 border-b border-gray-100 dark:border-white/[0.06]">
        <div className="relative h-7 w-7">
          <Image src="/logo.png" alt="cleanBG" fill sizes="28px" className="object-contain" />
        </div>
        <span className="text-[15px] font-bold tracking-tight text-gray-900 dark:text-white">CleanBG</span>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink key={item.href} {...item} onClick={onClose} />
        ))}
      </nav>

      {/* Bottom Nav */}
      <div className="p-3 border-t border-gray-100 dark:border-white/[0.06] space-y-0.5">
        {bottomItems.map((item) => (
          <NavLink key={item.href} {...item} onClick={onClose} />
        ))}
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/5 transition-all duration-150"
        >
          <LogOut className="w-4 h-4 shrink-0 text-gray-400" />
          Sign Out
        </button>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-3 pt-0">
          <Link
            href={ROUTES.PROFILE}
            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          >
            <Image
              src={user.avatarUrl ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3B82F6&color=fff&size=48`}
              alt={user.name}
              width={32}
              height={32}
              className="rounded-full border border-gray-200 dark:border-white/10"
              unoptimized
            />
            <div className="min-w-0">
              <p className="text-[12.5px] font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 truncate">{user.plan} plan</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[220px] shrink-0 bg-white dark:bg-[#09090B] border-r border-gray-100 dark:border-white/[0.06] h-screen sticky top-0">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[1100] lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <aside className="absolute left-0 top-0 bottom-0 w-[220px] bg-white dark:bg-[#09090B] border-r border-gray-100 dark:border-white/[0.06] shadow-2xl flex flex-col">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
            {renderSidebarContent()}
          </aside>
        </div>
      )}
    </>
  );
}
