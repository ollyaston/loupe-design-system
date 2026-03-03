"use client";

import * as React from "react";
import { CURRENCIES, CurrencyCode, getCurrencySymbol } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { Select } from "@/design-system/select";
import { Input } from "@/design-system/input";

interface CurrencyInputWithSelectorProps {
  value: number;
  onChange: (value: number) => void;
  currency: CurrencyCode;
  currencies: string[];
  onCurrencyChange: (currency: string) => void;
  onBlur?: () => void;
  className?: string;
  disabled?: boolean;
  fixedDecimals?: number;
  useThousandsSeparator?: boolean;
}

export function CurrencyInputWithSelector({
  value,
  onChange,
  currency,
  currencies,
  onCurrencyChange,
  onBlur,
  className,
  disabled,
  fixedDecimals,
  useThousandsSeparator = true,
}: CurrencyInputWithSelectorProps) {
  const [displayValue, setDisplayValue] = React.useState("");
  const currencySymbol = getCurrencySymbol(currency);

  // Format number with thousand separators
  const formatWithCommas = (num: number | string): string => {
    const numStr = num.toString().replace(/,/g, "");
    const parts = numStr.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const formatDisplayValue = (num: number | string): string => {
    if (!useThousandsSeparator) {
      return num.toString();
    }
    return formatWithCommas(num);
  };

  // Update display value when prop value changes
  React.useEffect(() => {
    if (value === 0) {
      setDisplayValue("");
    } else {
      const formatted =
        fixedDecimals !== undefined
          ? Number(value).toFixed(fixedDecimals)
          : value;
      setDisplayValue(formatDisplayValue(formatted));
    }
  }, [value, currency, fixedDecimals, useThousandsSeparator]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Remove commas and non-numeric characters except decimal point
    const numericValue = rawValue.replace(/[^0-9.]/g, "");

    // Prevent multiple decimal points
    const parts = numericValue.split(".");
    const sanitized =
      parts.length > 2
        ? parts[0] + "." + parts.slice(1).join("")
        : numericValue;

    setDisplayValue(formatDisplayValue(sanitized));

    // Parse and send numeric value to parent
    const parsed = parseFloat(sanitized) || 0;
    onChange(parsed);
  };

  const handleBlur = () => {
    if (displayValue && !displayValue.includes(".")) {
      // Add .00 if no decimal point exists
      const formatted = formatDisplayValue(displayValue + ".00");
      setDisplayValue(formatted);
    } else if (displayValue && displayValue.includes(".")) {
      // Ensure two decimal places
      const parts = displayValue.split(".");
      if (parts[1]?.length === 1) {
        const formatted = formatDisplayValue(displayValue + "0");
        setDisplayValue(formatted);
      }
    }
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
      {/* Currency Selector Dropdown */}
      <Select
        value={currency}
        onValueChange={onCurrencyChange}
        disabled={disabled}
        hugContents
        triggerClassName="rounded-r-none border-r-0"
        options={currencies.map((curr) => ({
          value: curr,
          label: `${curr} (${getCurrencySymbol(curr as CurrencyCode)})`,
        }))}
      />

      {/* Currency Input Field */}
      <div className="relative flex-1 min-w-0">
        <Input
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={disabled}
          className="h-9 rounded-l-none text-sm focus:z-10 font-mono"
          placeholder="0.00"
        />
      </div>
    </div>
  );
}

// Re-export types for backward compatibility
export type { CurrencyCode };
export { CURRENCIES };
