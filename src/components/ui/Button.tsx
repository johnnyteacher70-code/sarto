import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-[0.99] disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none rounded-full";

    const variants = {
      primary: "bg-white text-black hover:bg-[#EAE6DF] active:bg-[#DCD8D0] shadow-md font-semibold",
      secondary: "bg-white/10 text-white hover:bg-white/15 active:bg-white/20",
      outline: "border border-white/25 text-white hover:bg-white hover:text-black bg-transparent",
      ghost: "hover:bg-white/10 text-white",
    };

    const sizes = {
      sm: "min-h-[38px] px-4 py-1.5 text-xs sm:text-sm",
      md: "min-h-[44px] px-6 py-2 text-sm",
      lg: "min-h-[50px] px-8 py-3 text-sm sm:text-base font-semibold",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Yuklanmoqda...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
