import type { ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
};

export function buttonClassName(variant: Variant = "primary"): string {
  return `${styles.button} ${variant === "primary" ? styles.primary : styles.secondary}`;
}

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className,
}: ButtonLinkProps) {
  const extra = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const classes = [buttonClassName(variant), className].filter(Boolean).join(" ");

  return (
    <a href={href} className={classes} {...extra}>
      {children}
    </a>
  );
}
