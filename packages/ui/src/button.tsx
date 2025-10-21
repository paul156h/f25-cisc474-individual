"use client";

import { ReactNode } from "react";
import Link from "next/link";
import styles from "./button.module.css";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "card";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  href?: string;
}

export const Button = ({
  children,
  className = "",
  variant = "default",
  onClick,
  type = "button",
  href,
}: ButtonProps) => {
  const buttonClass =
    variant === "card" ? `${styles.cardButton} ${className}` : className;

  const content = <span className={buttonClass}>{children}</span>;

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button type={type} className={buttonClass} onClick={onClick}>
      {content}
    </button>
  );
};
