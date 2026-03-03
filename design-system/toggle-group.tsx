"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/design-system/toggle";
import { Icon, type IconName } from "@/design-system/icon";

export interface ToggleGroupItem {
  value: string;
  label?: React.ReactNode;
  icon?: IconName;
  iconSize?: number;
  disabled?: boolean;
}

export interface ToggleGroupProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>,
      "children"
    >,
    VariantProps<typeof toggleVariants> {
  items: ToggleGroupItem[];
}

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(({ variant, size, items, ...props }, ref) => {
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className="loupe-system flex items-center justify-center gap-1"
      {...(props as any)}
    >
      {items.map((item) => (
        <ToggleGroupPrimitive.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className={cn(
            toggleVariants({
              variant,
              size,
            }),
          )}
        >
          {item.icon && (
            <Icon
              name={item.icon}
              size={
                item.iconSize || (size === "sm" ? 14 : size === "lg" ? 18 : 16)
              }
            />
          )}
          {item.label}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  );
});

ToggleGroup.displayName = "ToggleGroup";

export { ToggleGroup };
