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
            className="block text-sm font-medium text-sarto-black tracking-normal"
          >
            {label}
            {required && <span className="text-red-600 ml-1" aria-hidden="true">*</span>}
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
            "flex min-h-[46px] w-full border border-sarto-border bg-white px-3.5 py-2.5 text-sm sm:text-base text-sarto-black transition-colors placeholder:text-sarto-muted/80 focus-visible:outline-none focus-visible:border-sarto-black focus-visible:ring-1 focus-visible:ring-sarto-black disabled:cursor-not-allowed disabled:bg-sarto-ivory/50 disabled:opacity-60 rounded-none",
            error && "border-red-600 focus-visible:border-red-600 focus-visible:ring-red-600",
            className
          )}
          {...props}
        />
        {helperText && !error && (
          <p id={helperId} className="text-xs text-sarto-muted">{helperText}</p>
        )}
        {error && (
          <p id={errorId} className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
            <span aria-hidden="true">⚠</span> {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
