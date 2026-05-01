import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  children,
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all",
    {
      "btn-warm": variant === "primary",
      "border border-sand-700/10 bg-ink-800/50 text-stone-400 hover:text-stone-200 hover:border-sand-600/18 hover:bg-ink-700/50":
        variant === "secondary",
    },
    {
      "h-8 px-3 text-sm": size === "sm",
      "h-10 px-5 text-sm": size === "md",
      "h-12 px-6 text-base": size === "lg",
    },
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export { Button };
export type { ButtonProps };
