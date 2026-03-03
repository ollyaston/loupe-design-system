"use client";

import { Icon, type IconName } from "@/design-system/icon";
import { cn } from "@/lib/utils";

export interface IconBadgeProps {
  icon: IconName;
  size?: number;
  backgroundColor?: string; // If provided, shows background + half size icon, if not provided, no background + full size icon
  foregroundColor?: string; // Tailwind color class (e.g., "blue", "green", "red")
  darkMode?: boolean;
}

export const IconBadge = ({
  icon,
  size = 32,
  backgroundColor,
  foregroundColor,
  darkMode = false,
}: IconBadgeProps) => {
  // Use foregroundColor if provided
  const textColor = foregroundColor || backgroundColor || "pigeon";

  // Auto-detect if background should be shown based on backgroundColor prop
  const hasBackground = !!backgroundColor;
  const iconSize = hasBackground ? Math.round(size * 0.5) : size;

  return (
    <span
      className={cn(
        "loupe-system",
        "flex items-center justify-center rounded-full select-none",
        hasBackground
          ? darkMode
            ? `bg-${backgroundColor}-900 text-${textColor}-300`
            : `bg-${backgroundColor}-50 text-${textColor}-500`
          : darkMode
            ? `text-${textColor}-300`
            : `text-${textColor}-500`,
      )}
      style={{
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      <Icon name={icon} size={iconSize} />
    </span>
  );
};
