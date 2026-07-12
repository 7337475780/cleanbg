'use client';

import React, { useState } from 'react';
import { useSettings } from '@/store/settings/context';

const TABS = ['General', 'Appearance', 'Downloads', 'API', 'Billing'];

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();
  const [activeTab, setActiveTab] = useState(TABS[0]);

  if (!settings) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-foreground/60">Manage your account preferences and application settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-4 py-2.5 rounded-xl font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground/70 hover:bg-foreground/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 space-y-6">
          {activeTab === 'General' && (
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
              <h2 className="text-xl font-semibold border-b border-border pb-4">General Preferences</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <select 
                    className="w-full md:w-1/2 p-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary"
                    value={settings.general.language}
                    onChange={(e) => updateSettings({ general: { ...settings.general, language: e.target.value } })}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Appearance' && (
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
              <h2 className="text-xl font-semibold border-b border-border pb-4">Appearance</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-4">Theme</label>
                  <div className="flex gap-4">
                    {['light', 'dark', 'system'].map(theme => (
                      <button 
                        key={theme}
                        onClick={() => updateSettings({ general: { ...settings.general, theme: theme as any } })}
                        className={`flex-1 py-3 border rounded-xl capitalize font-medium transition-all ${
                          settings.general.theme === theme 
                            ? 'border-primary text-primary bg-primary/5' 
                            : 'border-border text-foreground/70 hover:bg-foreground/5'
                        }`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'API' && (
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
              <h2 className="text-xl font-semibold border-b border-border pb-4">API Configuration</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">API Key</label>
                  <div className="flex gap-2">
                    <input 
                      type="password" 
                      readOnly 
                      value={settings.api.apiKey || ''} 
                      className="w-full p-2.5 bg-foreground/5 border border-border rounded-xl font-mono text-sm"
                    />
                    <button className="px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors">
                      Reveal
                    </button>
                  </div>
                  <p className="text-xs text-foreground/50 mt-2">Do not share your API key with anyone.</p>
                </div>
              </div>
            </div>
          )}

          {/* Placeholders for other tabs to keep brevity in this setup */}
          {(activeTab === 'Downloads' || activeTab === 'Billing') && (
            <div className="bg-card border border-border rounded-2xl p-6 text-center py-12">
              <p className="text-foreground/50 italic">Settings for {activeTab} are coming soon.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
