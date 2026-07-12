import React from "react";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "purple" | "outline";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const badgeClasses: Record<BadgeVariant, string> = {
  default: "bg-gray-100 dark:bg-white/8 text-gray-600 dark:text-gray-300",
  success: "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400",
  warning: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400",
  error:   "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400",
  info:    "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400",
  purple:  "bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400",
  outline: "border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400",
};

const dotClasses: Record<BadgeVariant, string> = {
  default: "bg-gray-400", success: "bg-green-500", warning: "bg-amber-500",
  error: "bg-red-500", info: "bg-blue-500", purple: "bg-purple-500", outline: "bg-gray-400",
};

export function Badge({ variant = "default", children, className = "", dot = false }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${badgeClasses[variant]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotClasses[variant]}`} />}
      {children}
    </span>
  );
}
