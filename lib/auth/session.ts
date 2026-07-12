// ============================================================
// Session Management — lib/auth/session.ts
// Abstraction over localStorage so backend swap requires
// only changing this file.
// ============================================================

import type { UserSession } from "@/types/user";
import { SESSION_KEY } from "@/config/constants";

export function getSession(): UserSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session: UserSession = JSON.parse(raw);
    if (new Date(session.expiresAt) < new Date()) {
      clearSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function setSession(session: UserSession): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}

export function isSessionValid(): boolean {
  return getSession() !== null;
}
