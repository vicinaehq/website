import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-stone-800 text-stone-400": variant === "default",
          "text-stone-500": variant === "secondary",
        },
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
export type { BadgeProps };
