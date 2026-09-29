import * as React from "react";
import { cn } from "./button";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning";
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "border-emerald-500/40 bg-emerald-950/60 text-emerald-300",
    secondary: "border-slate-700 bg-slate-800/80 text-slate-300",
    outline: "border-slate-700 text-slate-300",
    success: "border-emerald-500/40 bg-emerald-950/80 text-emerald-400",
    warning: "border-amber-500/40 bg-amber-950/80 text-amber-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-mono font-medium tracking-wide uppercase",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
