import React from "react";
import { Button } from "./Button";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export function EmptyState({ icon, title, description, action, className = "" }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-20 text-center ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/8 flex items-center justify-center text-gray-300 dark:text-gray-600 mb-5">
        {icon}
      </div>
      <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      {description && <p className="text-[13px] text-gray-400 dark:text-gray-500 max-w-xs leading-relaxed mb-5">{description}</p>}
      {action && (
        <Button variant="secondary" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
