"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-[#cc0000] text-white hover:bg-[#990000] focus:ring-[#cc0000]": variant === "primary",
            "bg-gray-900 text-white hover:bg-gray-700 focus:ring-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100": variant === "secondary",
            "border-2 border-[#cc0000] text-[#cc0000] hover:bg-[#cc0000] hover:text-white focus:ring-[#cc0000]": variant === "outline",
            "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800": variant === "ghost",
            "bg-red-700 text-white hover:bg-red-800 focus:ring-red-700": variant === "danger",
          },
          {
            "text-sm px-3 py-1.5": size === "sm",
            "text-sm px-4 py-2": size === "md",
            "text-base px-6 py-3": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
