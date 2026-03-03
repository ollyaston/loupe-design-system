"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Select } from "@/design-system/select";
import { Input } from "@/design-system/input";

export type TimeUnit = "minutes" | "hours" | "days";

interface TimeIncrementSelectorProps {
  value: number;
  onChange: (value: number) => void;
  unit: TimeUnit;
  onUnitChange: (unit: TimeUnit) => void;
  onBlur?: () => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  error?: boolean;
}

const TIME_UNITS: { value: TimeUnit; label: string }[] = [
  { value: "minutes", label: "Minutes" },
  { value: "hours", label: "Hours" },
  { value: "days", label: "Days" },
];

export function TimeIncrementSelector({
  value,
  onChange,
  unit,
  onUnitChange,
  onBlur,
  className,
  disabled,
  placeholder = "0",
  error,
}: TimeIncrementSelectorProps) {
  const [displayValue, setDisplayValue] = React.useState("");

  // Update display value when prop value changes
  React.useEffect(() => {
    if (value === 0) {
      setDisplayValue("");
    } else {
      setDisplayValue(value.toString());
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // Allow empty string
    if (rawValue === "") {
      setDisplayValue("");
      onChange(0);
      return;
    }

    // Remove non-numeric characters
    const numericValue = rawValue.replace(/[^0-9]/g, "");

    setDisplayValue(numericValue);

    // Parse and send numeric value to parent
    const parsed = parseInt(numericValue) || 0;
    onChange(parsed);
  };

  const handleBlur = () => {
    // Call parent onBlur if provided
    onBlur?.();
  };

  return (
    <div
      className={cn(
        "loupe-system",
        "flex items-stretch gap-0 w-full",
        className,
      )}
    >
      {/* Number Input Field */}
      <div className="relative flex-1 min-w-0">
        <Input
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={cn(
            "h-9 rounded-r-none text-sm focus:z-10",
            error && "border-destructive",
          )}
          placeholder={placeholder}
        />
      </div>

      {/* Time Unit Selector Dropdown */}
      <Select
        value={unit}
        onValueChange={onUnitChange}
        disabled={disabled}
        error={error}
        hugContents
        triggerClassName="rounded-l-none border-l-0"
        options={TIME_UNITS.map((timeUnit) => ({
          value: timeUnit.value,
          label: timeUnit.label,
        }))}
      />
    </div>
  );
}

// Re-export types for convenience
export type { TimeIncrementSelectorProps };
