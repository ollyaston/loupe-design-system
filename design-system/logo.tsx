import React from "react";
import { cn } from "@/lib/utils";
import { IconCurrentColor } from "./logo-icon-current-color";
import { WordmarkOnlyCurrentColor } from "./logo-wordmark-only-current-color";

export interface LogoProps {
  size: number;
  variant?: "logotype" | "icon" | "logotype-only";
  color?: string; // Optional color string (e.g., "#000000", "rgb(255, 255, 255)", "currentColor")
  className?: string;
}

/** Loupe logo: icon (224×224), logotype (icon + wordmark), or wordmark-only. */
export const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ size, variant = "logotype", color, className, ...props }, ref) => {
    const hasColorOverride = color !== undefined && color !== "currentColor";
    const colorStyle = hasColorOverride ? { color } : undefined;

    // Full logotype from Loupe_Logo_Wordmark.svg: 723×224 (icon 224 + gap 56 + wordmark 443)
    const logotypeAspectRatio = 723 / 224;
    const gapRatio = 56 / 723;
    const wordmarkRatio = 443 / 723;

    const isIcon = variant === "icon";
    const isLogotypeOnly = variant === "logotype-only";

    if (isIcon) {
      return (
        <div
          ref={ref}
          className={cn("loupe-system", "inline-block", className)}
          style={{ width: size, height: size, ...colorStyle }}
          {...props}
        >
          <IconCurrentColor width={size} height={size} />
        </div>
      );
    }

    if (isLogotypeOnly) {
      const height = size / (443 / 224); // wordmark aspect 443×224
      return (
        <div
          ref={ref}
          className={cn("loupe-system", "inline-block", className)}
          style={{ width: size, height, ...colorStyle }}
          {...props}
        >
          <WordmarkOnlyCurrentColor width={size} height={height} />
        </div>
      );
    }

    // logotype: icon + gap + wordmark
    const height = size / logotypeAspectRatio;
    const iconSize = height; // icon is square
    const gapSize = size * gapRatio;
    const wordmarkWidth = size * wordmarkRatio;

    return (
      <div
        ref={ref}
        className={cn("loupe-system", "inline-block", className)}
        style={{ width: size, height, ...colorStyle }}
        {...props}
      >
        <div className="flex items-center" style={{ gap: gapSize }}>
          <IconCurrentColor width={iconSize} height={iconSize} />
          <WordmarkOnlyCurrentColor width={wordmarkWidth} height={height} />
        </div>
      </div>
    );
  },
);

Logo.displayName = "Logo";
