"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

const PopoverWrapper = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, style, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "loupe-system",
        "z-[9999] w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      style={
        {
          pointerEvents: "auto",
          touchAction: "auto",
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export interface PopoverProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof PopoverWrapper>,
    "children"
  > {
  triggerContent: React.ReactNode;
  children: React.ReactNode;
  align?: React.ComponentPropsWithoutRef<typeof PopoverContent>["align"];
  sideOffset?: React.ComponentPropsWithoutRef<
    typeof PopoverContent
  >["sideOffset"];
  className?: React.ComponentPropsWithoutRef<
    typeof PopoverContent
  >["className"];
  side?: React.ComponentPropsWithoutRef<typeof PopoverContent>["side"];
  alignOffset?: React.ComponentPropsWithoutRef<
    typeof PopoverContent
  >["alignOffset"];
  avoidCollisions?: React.ComponentPropsWithoutRef<
    typeof PopoverContent
  >["avoidCollisions"];
  collisionBoundary?: React.ComponentPropsWithoutRef<
    typeof PopoverContent
  >["collisionBoundary"];
  collisionPadding?: React.ComponentPropsWithoutRef<
    typeof PopoverContent
  >["collisionPadding"];
  sticky?: React.ComponentPropsWithoutRef<typeof PopoverContent>["sticky"];
  hideWhenDetached?: React.ComponentPropsWithoutRef<
    typeof PopoverContent
  >["hideWhenDetached"];
  style?: React.ComponentPropsWithoutRef<typeof PopoverContent>["style"];
  /** Event handler for pointer down outside. Useful for preventing close in nested contexts. */
  onPointerDownOutside?: React.ComponentPropsWithoutRef<
    typeof PopoverContent
  >["onPointerDownOutside"];
  /** Event handler for interact outside */
  onInteractOutside?: React.ComponentPropsWithoutRef<
    typeof PopoverContent
  >["onInteractOutside"];
}

const Popover = ({
  triggerContent,
  children,
  align = "center",
  sideOffset = 4,
  className,
  side,
  alignOffset,
  avoidCollisions,
  collisionBoundary,
  collisionPadding,
  sticky,
  hideWhenDetached,
  style,
  onPointerDownOutside,
  onInteractOutside,
  ...wrapperProps
}: PopoverProps) => {
  return (
    <PopoverWrapper {...wrapperProps}>
      <PopoverTrigger asChild>{triggerContent}</PopoverTrigger>
      <PopoverContent
        align={align}
        sideOffset={sideOffset}
        className={className}
        side={side}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
        sticky={sticky}
        hideWhenDetached={hideWhenDetached}
        style={style}
        onPointerDownOutside={onPointerDownOutside}
        onInteractOutside={onInteractOutside}
      >
        {children}
      </PopoverContent>
    </PopoverWrapper>
  );
};
Popover.displayName = "Popover";

export { Popover };
