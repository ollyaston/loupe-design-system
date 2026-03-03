"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  shape?: "circle" | "square";
  variant?: "default" | "ring" | "bordered";
  src?: string;
  alt?: string;
  isInGroup?: boolean;
}

interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(
  (
    {
      size = "md",
      shape = "circle",
      variant = "default",
      src,
      alt,
      isInGroup = false,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      xs: "h-6 w-6",
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
      "2xl": "h-20 w-20",
    };

    const shapeClasses = {
      circle: "rounded-full",
      square: "rounded-lg",
    };

    const variantClasses = {
      default: "",
      ring: "ring ring-1 ring-border",
      bordered: "border border-border",
    };

    const groupClasses = isInGroup ? "border-2 border-background" : "";

    const textSizeClasses = {
      xs: "text-xs",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-sm",
      xl: "text-base",
      "2xl": "text-lg",
    };

    // Generate fallback from alt text
    const generateFallback = (altText?: string) => {
      if (!altText) return "?";
      return altText
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2); // Limit to 2 characters
    };

    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(
          "loupe-system",
          "relative flex shrink-0 overflow-hidden",
          sizeClasses[size],
          shapeClasses[shape],
          variantClasses[variant],
          groupClasses,
        )}
        {...props}
      >
        {src && (
          <AvatarPrimitive.Image
            src={src}
            alt={alt}
            className="aspect-square h-full w-full"
          />
        )}
        <AvatarPrimitive.Fallback
          className={cn(
            "flex h-full w-full items-center justify-center bg-muted",
            shapeClasses[shape],
            textSizeClasses[size],
          )}
        >
          {generateFallback(alt)}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    );
  },
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max, size = "md", className, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
    const remainingCount =
      max && childrenArray.length > max ? childrenArray.length - max : 0;

    return (
      <div
        ref={ref}
        className={cn("loupe-system", "flex -space-x-2", className)}
        {...props}
      >
        {React.Children.map(visibleChildren, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              isInGroup: true,
              size: (child.props as any)?.size || size,
            } as any);
          }
          return child;
        })}
        {remainingCount > 0 && (
          <Avatar
            isInGroup={true}
            size={size}
            alt={`+${remainingCount} more`}
          />
        )}
      </div>
    );
  },
);

AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarGroup };
