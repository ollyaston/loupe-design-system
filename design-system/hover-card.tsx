"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

export interface HoverCardProps
  extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root> {
  trigger: React.ReactNode;
  content: React.ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  openDelay?: number;
  closeDelay?: number;
  contentClassName?: string;
  collisionPadding?: number;
}

const HoverCard = React.forwardRef<HTMLDivElement, HoverCardProps>(
  (
    {
      trigger,
      content,
      align = "center",
      side = "bottom",
      sideOffset = 4,
      openDelay,
      closeDelay,
      contentClassName,
      collisionPadding = 16,
      ...props
    },
    ref,
  ) => {
    return (
      <HoverCardPrimitive.Root
        openDelay={openDelay}
        closeDelay={closeDelay}
        {...props}
      >
        <HoverCardPrimitive.Trigger asChild>
          {trigger}
        </HoverCardPrimitive.Trigger>
        <HoverCardPrimitive.Content
          ref={ref}
          align={align}
          side={side}
          sideOffset={sideOffset}
          collisionPadding={collisionPadding}
          className={cn(
            "loupe-system",
            "z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-hover-card-content-transform-origin]",
            contentClassName || "w-64",
          )}
        >
          {content}
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    );
  },
);
HoverCard.displayName = "HoverCard";

export { HoverCard };
