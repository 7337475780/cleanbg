'use client';

import React from 'react';
import { useAuth } from '@/store/auth/context';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-card border border-border rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="w-32 h-32 rounded-full bg-primary/20 flex flex-shrink-0 items-center justify-center text-primary text-4xl font-bold border-4 border-background shadow-md overflow-hidden">
           {user.avatarUrl ? (
             <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
           ) : (
             <span>{user.name.charAt(0)}</span>
           )}
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
          <p className="text-foreground/60 mb-4">{user.email}</p>
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold capitalize">
            {user.plan} Member
          </div>
          <p className="text-sm text-foreground/40 mt-4">Joined {new Date(user.joinDate).toLocaleDateString()}</p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col gap-3">
          <button className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors">
            Edit Profile
          </button>
          <button className="px-6 py-2.5 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-colors">
            Change Password
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-foreground/80">Security</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm">Two-Factor Auth</span>
              <span className="text-xs font-semibold px-2 py-1 bg-green-500/10 text-green-500 rounded-md">Enabled</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm">Active Sessions</span>
              <span className="text-sm text-foreground/60">2 Devices</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
           <h3 className="text-lg font-semibold mb-4 text-foreground/80">Danger Zone</h3>
           <p className="text-sm text-foreground/60 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
           <button className="w-full px-4 py-2 border border-destructive text-destructive font-semibold rounded-xl hover:bg-destructive hover:text-white transition-colors">
             Delete Account
           </button>
        </div>
      </div>
    </div>
  );
}
