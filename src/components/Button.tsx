"use client";

import React from "react";
import clsx from "clsx";

interface ButtonBaseProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

type ButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">;

export function Button(props: ButtonProps) {
  const { children, loading = false, disabled, className, ...rest } = props;

  const combinedClasses = clsx(
    "font-mono inline-flex items-center justify-center px-4 py-2 transition-colors duration-200 text-white disabled:opacity-70 disabled:cursor-not-allowed hover:cursor-pointer border-2 border-white",
    className
  );

  return (
    <button
      className={combinedClasses}
      disabled={disabled || loading}
      {...rest}
    >
      {children}
    </button>
  );
}
