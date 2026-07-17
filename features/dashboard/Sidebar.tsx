'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/store/auth/context';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Editor', href: '/#upload', icon: '🪄' },
  { name: 'History', href: '/history', icon: '🕒' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
  { name: 'Profile', href: '/profile', icon: '👤' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-background border-r border-border h-full flex flex-col">
      <div className="p-6">
        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
          cleanBG
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        {user ? (
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-foreground/70 hover:bg-destructive/10 hover:text-destructive rounded-xl transition-colors"
          >
            <span className="text-lg">🚪</span>
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="w-full flex items-center gap-3 px-4 py-3 text-foreground/70 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"
          >
            <span className="text-lg">🔑</span>
            Sign In
          </Link>
        )}
      </div>
    </aside>
  );
}
