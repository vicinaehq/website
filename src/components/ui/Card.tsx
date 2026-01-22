import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-zinc-200 bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#1A1A1A]",
          hover &&
            "transition-all hover:border-zinc-300 hover:shadow-lg dark:hover:border-zinc-700",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card };
export type { CardProps };
