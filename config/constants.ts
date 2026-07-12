// ============================================================
// App Constants
// ============================================================

export const APP_NAME = "cleanBG";
export const APP_URL = "https://cleanbg.io";

export const ROUTES = {
  HOME:            "/",
  LOGIN:           "/login",
  SIGNUP:          "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD:       "/dashboard",
  EDITOR:          "/editor",
  HISTORY:         "/history",
  SETTINGS:        "/settings",
  PROFILE:         "/profile",
  API_DOCS:        "/api-docs",
} as const;

export const UPLOAD_CONSTRAINTS = {
  MAX_FILE_SIZE_MB:   20,
  MAX_FILE_SIZE_BYTES: 20 * 1024 * 1024,
  MAX_DIMENSION:      8000,
  ACCEPTED_TYPES:     ["image/jpeg", "image/png", "image/webp"],
  ACCEPTED_EXTENSIONS:[".jpg", ".jpeg", ".png", ".webp"],
} as const;

export const SESSION_KEY      = "cleanbg_session";
export const SETTINGS_KEY     = "cleanbg_settings";
export const HISTORY_MOCK_KEY = "cleanbg_history";

export const PLAN_LIMITS = {
  free:       { imagesPerMonth: 10,       apiRequests: 0 },
  pro:        { imagesPerMonth: Infinity, apiRequests: 1000 },
  enterprise: { imagesPerMonth: Infinity, apiRequests: Infinity },
} as const;
