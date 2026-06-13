import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
          "h-10 px-4 py-2",
          variant === "default" &&
            "bg-primary text-surface hover:bg-primary/90 shadow-sm",
          variant === "outline" &&
            "border border-border bg-transparent hover:bg-secondary/5 text-primary",
          variant === "ghost" && "hover:bg-secondary/5 text-primary",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
