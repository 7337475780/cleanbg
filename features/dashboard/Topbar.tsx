'use client';

import React from 'react';
import { useAuth } from '@/store/auth/context';

export function Topbar() {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        {/* Placeholder for breadcrumbs or page title if needed */}
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-foreground">{user?.name || 'Guest User'}</p>
          <p className="text-xs text-foreground/50 capitalize">{user?.plan || 'Free'} Plan</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden border border-primary/30">
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          ) : (
             <span>{user?.name?.charAt(0) || 'G'}</span>
          )}
        </div>
      </div>
    </header>
  );
}
