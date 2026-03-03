"use client";

import * as React from "react";
import { CurrencyCode, getCurrencySymbol } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { Input } from "@/design-system/input";

interface CurrencyInputProps
  extends Omit<
    React.ComponentProps<typeof Input>,
    "value" | "onChange" | "type" | "inputMode"
  > {
  value: number;
  onChange: (value: number) => void;
  currency: CurrencyCode;
  minValue?: number;
  maxValue?: number;
}

export const CurrencyInput = React.forwardRef<
  HTMLInputElement,
  CurrencyInputProps
>(function CurrencyInput(
  {
    value,
    onChange,
    currency,
    onBlur,
    className,
    disabled,
    placeholder = "0.00",
    minValue,
    maxValue,
    error,
    ...rest
  },
  ref,
) {
  const [displayValue, setDisplayValue] = React.useState("");
  const [isUserEditing, setIsUserEditing] = React.useState(false);
  const currencySymbol = getCurrencySymbol(currency);

  // Format number with thousand separators
  const formatWithCommas = (num: number | string): string => {
    const numStr = num.toString().replace(/,/g, "");
    const parts = numStr.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  // Update display value when prop value changes (but not while user is typing)
  React.useEffect(() => {
    if (!isUserEditing) {
      if (value === 0) {
        setDisplayValue("");
      } else {
        setDisplayValue(formatWithCommas(value));
      }
    }
  }, [value, currency, isUserEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUserEditing(true);
    const rawValue = e.target.value;
    // Remove commas and non-numeric characters except decimal point
    const numericValue = rawValue.replace(/[^0-9.]/g, "");

    // Prevent multiple decimal points
    const parts = numericValue.split(".");
    const sanitized =
      parts.length > 2
        ? parts[0] + "." + parts.slice(1).join("")
        : numericValue;

    setDisplayValue(formatWithCommas(sanitized));

    // Parse and send numeric value to parent
    let parsed = parseFloat(sanitized) || 0;

    // Apply min/max constraints
    if (minValue !== undefined && parsed < minValue) {
      parsed = minValue;
    }
    if (maxValue !== undefined && parsed > maxValue) {
      parsed = maxValue;
    }

    onChange(parsed);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsUserEditing(false);
    if (displayValue && !displayValue.includes(".")) {
      // Add .00 if no decimal point exists
      const formatted = formatWithCommas(displayValue + ".00");
      setDisplayValue(formatted);
    } else if (displayValue && displayValue.includes(".")) {
      // Ensure two decimal places
      const parts = displayValue.split(".");
      if (parts[1]?.length === 1) {
        const formatted = formatWithCommas(displayValue + "0");
        setDisplayValue(formatted);
      }
    }
    // Call parent onBlur if provided
    onBlur?.(e);
  };

  const handleFocus = () => {
    setIsUserEditing(true);
  };

  return (
    <div className={cn("loupe-system", "relative w-full")}>
      {/* Currency symbol - same positioning as Search icon */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10 text-muted-foreground text-base md:text-sm">
        {currencySymbol}
      </div>

      {/* Input - uses base Input with only pl-8 (symbol space) and font-mono (number alignment) */}
      <Input
        ref={ref}
        type="text"
        inputMode="decimal"
        value={displayValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        disabled={disabled}
        error={error}
        placeholder={placeholder}
        className={cn("pl-8 font-mono", className)}
        {...rest}
      />
    </div>
  );
});
CurrencyInput.displayName = "CurrencyInput";

// Re-export types for convenience
export type { CurrencyCode };
