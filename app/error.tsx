"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error Captured:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-amber-50 dark:bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Something went wrong</h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
        We encountered a temporary issue while loading this page. Please try refreshing or contact support if the problem persists.
      </p>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 px-6 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Try again
      </button>
    </div>
  );
}
