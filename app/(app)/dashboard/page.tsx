'use client';

import React from 'react';
import { useAuth } from '@/store/auth/context';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, {user?.name?.split(' ')[0] || 'User'} 👋</h1>
          <p className="text-foreground/60">Here's what's happening with your account today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Images Processed" value={user?.usage?.processedImages.toString() || '0'} icon="🖼️" trend="+12%" />
        <StatCard title="Remaining Credits" value={user?.usage?.remainingCredits.toString() || '0'} icon="✨" trend="-5" />
        <StatCard title="Storage Used" value={`${Math.round((user?.usage?.storageUsed || 0) / (1024 * 1024))} MB`} icon="💾" />
        <StatCard title="Current Plan" value={<span className="capitalize">{user?.plan || 'Free'}</span>} icon="🚀" action="Upgrade" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
          <div className="h-64 flex items-center justify-center text-foreground/40 border-2 border-dashed border-border/50 rounded-xl">
            Chart Placeholder - Weekly Usage
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>
          <div className="flex-1 flex flex-col gap-4">
            <button className="w-full py-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
              <span>🪄</span> Open Editor
            </button>
            <button className="w-full py-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
              <span>⚙️</span> API Settings
            </button>
            <div className="mt-auto p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm">
              <p className="font-semibold text-blue-500 mb-1">Pro Tip</p>
              <p className="text-foreground/70">Connect our API to automate your workflow entirely.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, action }: { title: string, value: React.ReactNode, icon: string, trend?: string, action?: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <p className="text-foreground/60 font-medium text-sm">{title}</p>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-bold">{value}</h3>
        {trend && (
          <span className={`text-xs font-semibold ${trend.startsWith('+') ? 'text-green-500' : 'text-orange-500'}`}>
            {trend}
          </span>
        )}
      </div>
      {action && (
        <button className="mt-4 text-sm text-primary font-medium hover:underline">
          {action} &rarr;
        </button>
      )}
    </div>
  );
}
