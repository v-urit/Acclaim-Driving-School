import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "accent";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer active:scale-[0.98]";

    const variantStyles = {
      default:
        "bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm shadow-emerald-950/40 hover:shadow-emerald-500/20",
      secondary:
        "bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700/80",
      outline:
        "border border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800/80 hover:text-white hover:border-slate-600",
      ghost:
        "text-slate-300 hover:bg-slate-800/60 hover:text-white",
      destructive:
        "bg-rose-600 text-white hover:bg-rose-500 shadow-sm",
      accent:
        "bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 shadow-sm shadow-amber-950/30",
    };

    const sizeStyles = {
      default: "h-11 px-5 py-2.5",
      sm: "h-9 px-3.5 text-xs",
      lg: "h-12 px-7 text-base font-semibold",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
