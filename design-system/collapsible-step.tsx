"use client";

import * as React from "react";
import { Icon } from "./icon";

import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";

import { Button } from "./button";
import { IconBadge } from "./icon-badge";

export interface CollapsibleStepProps {
  icon?: string;
  backgroundColor?: string; // Tailwind color class for the icon badge

  title: string;
  titleClassName?: string;
  description?: string;

  quickActions?: React.ReactNode;

  children?: React.ReactNode;

  defaultOpen?: boolean;
  disabled?: boolean;
}

export const CollapsibleStep = React.forwardRef<
  HTMLDivElement,
  CollapsibleStepProps
>(
  (
    {
      icon,
      backgroundColor = "pigeon",

      title,
      titleClassName,
      description,

      quickActions,

      children,

      defaultOpen = false,
      disabled = false,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    const cardContent = (
      <div
        className={cn(
          "flex justify-between w-full focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
          description ? "items-start" : "items-center",
        )}
      >
        <div
          className={cn(
            "flex gap-2 flex-1",
            description ? "items-start" : "items-center",
          )}
        >
          <div className="-mt-1">
            {icon && (
              <IconBadge
                icon={icon}
                size={32}
                backgroundColor={backgroundColor}
              />
            )}
          </div>
          <div className="text-left flex-1">
            <div
              className={cn(
                "font-medium",
                disabled ? "text-muted-foreground" : "text-foreground",
                titleClassName ?? "text-base",
              )}
            >
              {title}
            </div>
            {description && (
              <div className="text-sm text-muted-foreground font-normal">
                {description}
              </div>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 ml-3">
          {quickActions ? (
            <div className="flex items-center gap-2">{quickActions}</div>
          ) : (
            <Icon
              name="keyboard_arrow_down"
              size={16}
              className={cn(
                "transition-transform duration-200",
                disabled ? "text-muted-foreground" : "text-foreground",
                isOpen && "rotate-180",
              )}
            />
          )}
        </div>
      </div>
    );

    // If quickActions are provided, render as a non-collapsible step
    if (quickActions) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-between p-3 border border-border rounded-lg bg-background",
            disabled && "opacity-60",
          )}
        >
          {cardContent}
        </div>
      );
    }

    // Render as collapsible step
    return (
      <div
        ref={ref}
        className={cn(
          "loupe-system",
          "border rounded-lg overflow-hidden",
          disabled && "opacity-60",
        )}
      >
        <Collapsible
          open={disabled ? false : isOpen}
          onOpenChange={disabled ? undefined : setIsOpen}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full p-3 h-auto rounded-none border-0 justify-start text-left",
                disabled && "cursor-not-allowed",
              )}
              disabled={disabled}
            >
              {cardContent}
            </Button>
          </CollapsibleTrigger>
          {!disabled && children && (
            <CollapsibleContent>
              <div className="px-4 pb-4 pt-4 border-t">{children}</div>
            </CollapsibleContent>
          )}
        </Collapsible>
      </div>
    );
  },
);

CollapsibleStep.displayName = "CollapsibleStep";
