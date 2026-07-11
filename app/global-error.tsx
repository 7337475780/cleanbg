"use client";

import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Captured:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 dark:bg-[#09090B] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white dark:bg-[#18181B] rounded-3xl p-8 border border-gray-200 dark:border-white/10 shadow-xl text-center">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Critical Error</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              We encountered an unexpected condition that prevented the application from rendering.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <button
                onClick={() => reset()}
                className="w-full sm:w-auto px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
