import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400":
            variant === "default",
          "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400":
            variant === "secondary",
          "border border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400":
            variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
export type { BadgeProps };
