"use client";

import * as React from "react";
import { Icon } from "./icon";
import { Button, type ButtonProps } from "./button";
import {
  DropdownMenuWrapper,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { cn } from "@/lib/utils";

export interface SplitButtonProps {
  /** The main button content and props */
  mainButton: React.ReactNode;
  /** Props for the main button */
  mainButtonProps?: Omit<ButtonProps, "children">;
  /** Content for the dropdown menu */
  children: React.ReactNode;
  /** Additional props for the dropdown menu content */
  dropdownContentProps?: React.ComponentPropsWithoutRef<
    typeof DropdownMenuContent
  >;
  /** Whether the dropdown is open (controlled) */
  open?: boolean;
  /** Callback when dropdown open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether the dropdown trigger is disabled */
  dropdownDisabled?: boolean;
  /** Additional class name for the split button container */
  className?: string;
}

const SplitButton = React.forwardRef<HTMLDivElement, SplitButtonProps>(
  (
    {
      mainButton,
      mainButtonProps = {},
      children,
      dropdownContentProps = {},
      open,
      onOpenChange,
      dropdownDisabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("loupe-system", "inline-flex", className)}
        {...props}
      >
        {/* Main button area */}
        <Button
          {...mainButtonProps}
          className={cn("rounded-r-none border-r-0", mainButtonProps.className)}
        >
          {mainButton}
        </Button>

        {/* Dropdown trigger area */}
        <DropdownMenuWrapper open={open} onOpenChange={onOpenChange}>
          <DropdownMenuTrigger asChild disabled={dropdownDisabled}>
            <Button
              variant={mainButtonProps.variant || "default"}
              size={mainButtonProps.size || "default"}
              aspectRatio={mainButtonProps.aspectRatio || "default"}
              disabled={dropdownDisabled}
              className={cn(
                "rounded-l-none border-l border-l-border/20 px-2",
                mainButtonProps.className,
              )}
              aria-label="Open dropdown menu"
            >
              <Icon name="keyboard_arrow_down" size={16} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            sideOffset={4}
            className={dropdownContentProps.className}
            {...dropdownContentProps}
          >
            {children}
          </DropdownMenuContent>
        </DropdownMenuWrapper>
      </div>
    );
  },
);
SplitButton.displayName = "SplitButton";

// Re-export dropdown menu components for convenience
export {
  DropdownMenuWrapper,
  DropdownMenuContent,
  DropdownMenuTrigger,
  SplitButton,
};
