'use client';

import React from 'react';
import { AuthProvider } from '@/store/auth/context';
import { ProcessingProvider } from '@/store/processing/context';
import { HistoryProvider } from '@/store/history/context';
import { SettingsProvider } from '@/store/settings/context';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <SettingsProvider>
          <ProcessingProvider>
            <HistoryProvider>
              {children}
            </HistoryProvider>
          </ProcessingProvider>
        </SettingsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
