import React from "react";
import { Loader2 } from "lucide-react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const sizeMap = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-8 h-8" };

export function Spinner({ size = "md", className = "", label = "Loading..." }: SpinnerProps) {
  return (
    <span className={`inline-flex items-center gap-2 text-gray-400 dark:text-gray-500 ${className}`} aria-label={label} role="status">
      <Loader2 className={`animate-spin ${sizeMap[size]}`} />
    </span>
  );
}

export function FullPageSpinner({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" />
        <p className="text-[13px] text-gray-400 dark:text-gray-500">{label}</p>
      </div>
    </div>
  );
}
