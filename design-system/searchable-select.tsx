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

export interface SearchableSelectOption<T = unknown> {
  value: string;
  label: string;
  /** Optional data for custom rendering */
  data?: T;
}

export interface SearchableSelectProps<T = unknown> {
  options: SearchableSelectOption<T>[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  /**
   * Custom render function for the trigger content when an option is selected.
   * If not provided, displays the label.
   */
  renderTrigger?: (option: SearchableSelectOption<T>) => React.ReactNode;
  /**
   * Custom render function for each option item in the dropdown.
   * If not provided, displays the label.
   */
  renderOption?: (option: SearchableSelectOption<T>) => React.ReactNode;
  /**
   * Content to render at the bottom of the dropdown, anchored outside the scrollable list.
   * Useful for "Add new" actions that should always be visible.
   * Receives a close function to close the dropdown when clicked.
   */
  footerContent?: (close: () => void) => React.ReactNode;
}

export const SearchableSelect = React.forwardRef<
  HTMLButtonElement,
  SearchableSelectProps
>(
  (
    {
      options,
      value: valueProp,
      defaultValue,
      onValueChange,
      placeholder = "Select...",
      searchPlaceholder = "Search...",
      emptyText = "No results found.",
      disabled = false,
      error = false,
      className,
      triggerClassName,
      contentClassName,
      renderTrigger,
      renderOption,
      footerContent,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue);

    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internalValue;

    const selectedOption = options.find((option) => option.value === value);

    const handleSelect = (selectedValue: string) => {
      if (!isControlled) {
        setInternalValue(selectedValue);
      }
      onValueChange?.(selectedValue);
      setOpen(false);
    };

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
              "w-full justify-between text-left px-3 py-2 ring-offset-background focus-visible:ring-offset-1",
              renderTrigger ? "min-h-9 h-auto" : "h-9",
              error && "border-destructive focus-visible:ring-destructive",
              triggerClassName,
              className,
            )}
            disabled={disabled}
            {...props}
          >
            {selectedOption ? (
              renderTrigger ? (
                renderTrigger(selectedOption)
              ) : (
                <span className="truncate font-medium">
                  {selectedOption.label}
                </span>
              )
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
        <Command shouldFilter={true} loop={false}>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = value === option.value;
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    keywords={[option.label]}
                    onSelect={() => handleSelect(option.value)}
                    className="pr-8"
                  >
                    {renderOption ? (
                      renderOption(option)
                    ) : (
                      <span>{option.label}</span>
                    )}
                    <span className="pointer-events-none absolute right-2 top-1/2 flex h-3.5 w-3.5 -translate-y-1/2 items-center justify-center">
                      <Icon
                        name="check"
                        size={16}
                        className={cn(
                          isSelected ? "opacity-100" : "opacity-0",
                          "shrink-0",
                        )}
                      />
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
          {footerContent && (
            <div className="border-t border-border p-1">
              {footerContent(() => setOpen(false))}
            </div>
          )}
        </Command>
      </Popover>
    );
  },
);

SearchableSelect.displayName = "SearchableSelect";
