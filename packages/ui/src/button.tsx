"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  href?: string;
}

export const Button = ({ children, className, onClick, type = "button", href }: ButtonProps) => {
  
  const content = (
    <span className={className}>
      {children}
    </span>
  )

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button
      type={type}
      className = {className}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
