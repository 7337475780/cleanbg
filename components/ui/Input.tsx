"use client";

import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, leftIcon, className = "", id, ...props },
  ref
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-[13px] font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-3.5 py-2.5 text-[13.5px] rounded-lg
            bg-white dark:bg-white/5
            border border-gray-200 dark:border-white/10
            text-gray-900 dark:text-white
            placeholder:text-gray-400 dark:placeholder:text-gray-600
            focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/15
            transition-all duration-150
            ${leftIcon ? "pl-9" : ""}
            ${error ? "border-red-400 dark:border-red-500/60 focus:border-red-400 focus:ring-red-400/15" : ""}
            ${className}
          `.trim()}
          {...props}
        />
      </div>
      {error && <p className="text-[12px] text-red-500 dark:text-red-400">{error}</p>}
      {hint && !error && <p className="text-[12px] text-gray-400 dark:text-gray-500">{hint}</p>}
    </div>
  );
});
