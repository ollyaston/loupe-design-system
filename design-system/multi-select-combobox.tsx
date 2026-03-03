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
import { Checkbox } from "@/design-system/checkbox";
import { Badge } from "@/design-system/badge";

export interface MultiSelectComboboxOption {
  value: string;
  label: string;
}

export interface MultiSelectComboboxProps {
  options: MultiSelectComboboxOption[];
  values?: string[];
  onValuesChange?: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  maxDisplay?: number;
  displayText?: string;
}

export const MultiSelectCombobox = React.forwardRef<
  HTMLButtonElement,
  MultiSelectComboboxProps
>(
  (
    {
      options,
      values = [],
      onValuesChange,
      placeholder = "Select options...",
      searchPlaceholder = "Search...",
      emptyText = "No results found.",
      disabled = false,
      error = false,
      className,
      triggerClassName,
      contentClassName,
      maxDisplay = 2,
      displayText,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);

    const selectedOptions = options.filter((option) =>
      values.includes(option.value),
    );

    const handleSelect = (value: string) => {
      const newValues = values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value];
      onValuesChange?.(newValues);
    };

    const handleRemove = (value: string, e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      onValuesChange?.(values.filter((v) => v !== value));
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
              "w-full justify-between min-h-9 h-auto px-3 py-2 text-left shadow-input ring-offset-background focus-visible:ring-offset-1",
              error && "border-destructive focus-visible:ring-destructive",
              triggerClassName,
              className,
            )}
            disabled={disabled}
            {...props}
          >
            <div className="flex flex-wrap gap-1 flex-1">
              {displayText ? (
                <span>{displayText}</span>
              ) : selectedOptions.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : selectedOptions.length <= maxDisplay ? (
                selectedOptions.map((option) => (
                  <Badge
                    key={option.value}
                    variant="secondary"
                    className="mr-1 gap-1"
                  >
                    {option.label}
                    <span
                      role="button"
                      tabIndex={0}
                      className="ml-1 rounded-full outline-hidden ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleRemove(option.value, e as any);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => handleRemove(option.value, e)}
                    >
                      <Icon
                        name="close"
                        size={12}
                        className="text-muted-foreground hover:text-foreground"
                      />
                    </span>
                  </Badge>
                ))
              ) : (
                <Badge variant="secondary">
                  {selectedOptions.length} selected
                </Badge>
              )}
            </div>
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
              {options.map((option) => {
                const isSelected = values.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    keywords={[option.label]}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <Checkbox
                      checked={isSelected}
                      className="mr-2"
                      onCheckedChange={() => handleSelect(option.value)}
                    />
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </Popover>
    );
  },
);

MultiSelectCombobox.displayName = "MultiSelectCombobox";
