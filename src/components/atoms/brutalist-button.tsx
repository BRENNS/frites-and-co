import { cn } from "@/utils/cn";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonBaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    as?: "button";
    href?: never;
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as: "a";
    href: string;
  };

type BrutalistButtonProps = ButtonAsButton | ButtonAsAnchor;

export function BrutalistButton({
  children,
  className,
  variant = "primary",
  as = "button",
  ...props
}: BrutalistButtonProps) {
  const baseStyles = cn(
    "group relative inline-block font-bold text-lg tracking-wide uppercase cursor-pointer"
  );

  const variantStyles = {
    primary: "bg-amber-500 text-white",
    secondary: "bg-white text-zinc-900",
  };

  const shadowStyles = {
    primary: "bg-zinc-900",
    secondary: "bg-zinc-900",
  };

  const content = (
    <>
      {/* Shadow layer - fixed position */}
      <span
        className={cn(
          "absolute inset-0 translate-x-2 translate-y-2",
          shadowStyles[variant]
        )}
        aria-hidden="true"
      />
      {/* Button face - moves on hover to cover shadow */}
      <span
        className={cn(
          "relative block px-8 py-4",
          "transition-transform duration-150 ease-out",
          "group-hover:translate-x-2 group-hover:translate-y-2",
          variantStyles[variant],
          className
        )}
      >
        {children}
      </span>
    </>
  );

  if (as === "a") {
    const { href, ...anchorProps } = props as ButtonAsAnchor;
    return (
      <a href={href} className={baseStyles} {...anchorProps}>
        {content}
      </a>
    );
  }

  return (
    <button className={baseStyles} {...(props as ButtonAsButton)}>
      {content}
    </button>
  );
}
