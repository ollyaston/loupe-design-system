"use client";

import * as React from "react";
import { Icon } from "@/design-system/icon";
import { Input } from "@/design-system/input";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectWithCustomOptionProps {
  value: string;
  customValue?: number;
  options: SelectOption[];
  onValueChange: (value: string, customValue?: number) => void;
  customOptionValue?: string;
  customInputLabel?: string;
  customInputPlaceholder?: string;
  customInputSuffix?: string;
  customDisplayFormat?: (value: number) => string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function SelectWithCustomOption({
  value,
  customValue,
  options,
  onValueChange,
  customOptionValue = "custom",
  customInputLabel = "Enter custom value",
  customInputPlaceholder = "e.g., 2",
  customInputSuffix = "month(s)",
  customDisplayFormat = (val) => `Every ${val} month${val === 1 ? "" : "s"}`,
  placeholder = "Select...",
  className,
  disabled = false,
}: SelectWithCustomOptionProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [tempCustomValue, setTempCustomValue] = React.useState<string>(
    customValue?.toString() || "",
  );
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Update temp value when prop changes
  React.useEffect(() => {
    setTempCustomValue(customValue?.toString() || "");
  }, [customValue]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const getDisplayLabel = () => {
    if (value === customOptionValue && customValue) {
      return customDisplayFormat(customValue);
    }
    return options.find((opt) => opt.value === value)?.label || placeholder;
  };

  const handleOptionClick = (optionValue: string) => {
    if (optionValue !== customOptionValue) {
      onValueChange(optionValue);
      setIsOpen(false);
      setTempCustomValue("");
    } else {
      // Just select custom, don't close dropdown
      onValueChange(optionValue, undefined);
    }
  };

  const handleCustomValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setTempCustomValue(next);
    const val = parseInt(next, 10);
    if (next && val > 0) {
      onValueChange(customOptionValue, val);
    } else if (!next) {
      onValueChange(customOptionValue, undefined);
    }
  };

  const handleCustomValueKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = parseInt(tempCustomValue, 10);
      if (tempCustomValue && val > 0) {
        onValueChange(customOptionValue, val);
        setIsOpen(false);
      }
    }
  };

  return (
    <div className={cn("loupe-system", "relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full h-9 bg-background border border-input rounded-lg px-3 py-2 text-left flex items-center justify-between",
          "hover:border-muted-foreground/50 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50 shadow-input",
        )}
      >
        <span className="text-sm text-foreground">{getDisplayLabel()}</span>
        <Icon
          name="keyboard_arrow_down"
          size={16}
          className={cn(
            "text-muted-foreground transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-xs overflow-hidden"
        >
          {/* Preset options */}
          <div className="p-1">
            {options
              .filter((opt) => opt.value !== customOptionValue)
              .map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOptionClick(option.value)}
                  className={cn(
                    "w-full px-3 py-2 text-left hover:bg-accent flex items-center justify-between transition-colors text-sm rounded-md",
                  )}
                >
                  <span className="text-foreground">{option.label}</span>
                  {value === option.value && (
                    <Icon name="check" size={16} className="text-primary" />
                  )}
                </button>
              ))}
          </div>

          {/* Divider */}
          <div
            className="mx-3 border-t border-border"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Custom section */}
          <div className="p-3 space-y-2" onClick={(e) => e.stopPropagation()}>
            <span className="text-sm font-medium text-foreground">
              {options.find((o) => o.value === customOptionValue)?.label ??
                "Custom"}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground shrink-0">
                Every
              </span>
              <Input
                type="number"
                min={1}
                value={tempCustomValue}
                onChange={handleCustomValueChange}
                onKeyDown={handleCustomValueKeyDown}
                placeholder={customInputPlaceholder}
                className="flex-1 min-w-0"
                autoFocus={value === customOptionValue}
              />
              <span className="text-sm text-muted-foreground shrink-0">
                {customInputSuffix}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
