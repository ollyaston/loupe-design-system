"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/design-system/button";
import { Icon } from "@/design-system/icon";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/design-system/command";
import { Popover } from "@/design-system/popover";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

export const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = "Select...",
      searchPlaceholder = "Search...",
      emptyText = "No results found.",
      disabled = false,
      error = false,
      className,
      triggerClassName,
      contentClassName,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);

    const selectedOption = options.find((option) => option.value === value);

    return (
      <Popover
        open={open}
        onOpenChange={setOpen}
        modal={false}
        collisionBoundary={
          typeof document !== "undefined" ? document.body : undefined
        }
        triggerContent={
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "loupe-system",
              "h-9 w-[200px] justify-between text-left px-3 py-2 shadow-input ring-offset-background focus-visible:ring-offset-1",
              error && "border-destructive focus-visible:ring-destructive",
              triggerClassName,
              className,
            )}
            disabled={disabled}
            {...props}
          >
            {selectedOption ? (
              <span className="truncate font-medium">
                {selectedOption.label}
              </span>
            ) : (
              <span className="truncate text-muted-foreground">
                {placeholder}
              </span>
            )}
            <Icon
              name="keyboard_arrow_down"
              size={16}
              className="shrink-0 opacity-50"
            />
          </Button>
        }
        className={cn("p-0 rounded-lg shadow-xs", contentClassName)}
        align="start"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  keywords={[option.label]}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    onValueChange?.(newValue);
                    setOpen(false);
                  }}
                  className="pr-8"
                >
                  <span>{option.label}</span>
                  <span className="pointer-events-none absolute right-2 top-1/2 flex h-3.5 w-3.5 -translate-y-1/2 items-center justify-center">
                    <Icon
                      name="check"
                      size={16}
                      className={cn(
                        value === option.value ? "opacity-100" : "opacity-0",
                        "shrink-0",
                      )}
                    />
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </Popover>
    );
  },
);

Combobox.displayName = "Combobox";
