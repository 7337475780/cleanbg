"use client";

// ============================================================
// Combined App Store Provider
// Wrap the entire app with this single provider.
// ============================================================

import React from "react";
import { AuthProvider } from "./auth/context";
import { ProcessingProvider } from "./processing/context";
import { SettingsProvider } from "./settings/context";

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SettingsProvider>
        <ProcessingProvider>
          {children}
        </ProcessingProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

// Re-export hooks for convenient imports
export { useAuth }       from "./auth/context";
export { useProcessing } from "./processing/context";
export { useSettings }   from "./settings/context";
