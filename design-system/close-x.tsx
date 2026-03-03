"use client";

import * as React from "react";
import { Button } from "@/design-system/button";
import { Icon } from "@/design-system/icon";
import { cn } from "@/lib/utils";

interface CloseXProps {
  onClick?: () => void;
  className?: string;
  size?: "sm" | "default" | "lg";
  variant?: "ghost" | "outline";
}

export const CloseX = React.forwardRef<HTMLButtonElement, CloseXProps>(
  ({ onClick, className, size = "sm", variant = "ghost", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 w-8 p-0",
      default: "h-10 w-10 p-0",
      lg: "h-12 w-12 p-0",
    };

    const iconSizes = {
      sm: 16,
      default: 20,
      lg: 24,
    };

    return (
      <Button
        ref={ref}
        variant={variant}
        onClick={onClick}
        className={cn(
          "loupe-system",
          sizeClasses[size],
          "hover:bg-muted",
          className,
        )}
        aria-label="Close"
        {...props}
      >
        <span className="sr-only">Close</span>
        <Icon name="close" size={iconSizes[size]} />
      </Button>
    );
  },
);

CloseX.displayName = "CloseX";
