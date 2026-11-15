import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, id, required, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs sm:text-sm font-medium text-white/90 tracking-normal"
          >
            {label}
            {required && <span className="text-red-400 ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          ref={ref}
          required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={cn(
            "flex min-h-[46px] w-full border border-white/15 bg-[#141414] px-4 py-2.5 text-sm sm:text-base text-white transition-colors placeholder:text-white/40 focus-visible:outline-none focus-visible:border-white focus-visible:ring-1 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50 rounded-xl",
            error && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        {helperText && !error && (
          <p id={helperId} className="text-xs text-white/50">{helperText}</p>
        )}
        {error && (
          <p id={errorId} className="text-xs text-red-400 font-medium flex items-center gap-1 mt-1">
            <span aria-hidden="true">⚠</span> {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
