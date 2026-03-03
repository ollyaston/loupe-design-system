"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Label } from "@/design-system/label";
import { Input } from "@/design-system/input";
import { Select } from "@/design-system/select";

const billingFrequencySelectorVariants = cva("loupe-system", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      default: "w-[50%]",
      full: "w-full",
      half: "w-[50%]",
      quarter: "w-[25%]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface BillingFrequencySelectorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof billingFrequencySelectorVariants> {
  value: string;
  onValueChange: (value: string) => void;
  customMonths?: number;
  onCustomMonthsChange?: (months: number) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

const BillingFrequencySelector = React.forwardRef<
  HTMLDivElement,
  BillingFrequencySelectorProps
>(
  (
    {
      className,
      variant,
      size,
      value,
      onValueChange,
      customMonths = 1,
      onCustomMonthsChange,
      label = "Billing frequency",
      placeholder = "Select frequency...",
      disabled = false,
      required = false,
      ...props
    },
    ref,
  ) => {
    const frequencyOptions = [
      { value: "monthly", label: "Monthly" },
      { value: "quarterly", label: "Quarterly" },
      { value: "semi-annually", label: "Semi-annually" },
      { value: "yearly", label: "Yearly" },
      { value: "custom", label: "Custom" },
    ];

    return (
      <div
        ref={ref}
        className={cn(
          billingFrequencySelectorVariants({ variant, size, className }),
        )}
        {...props}
      >
        <Label className="text-muted-foreground text-xs font-medium block mt-4 mb-1">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <Select
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          placeholder={placeholder}
          triggerClassName="w-full text-xs"
          options={frequencyOptions.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
        />

        {value === "custom" && (
          <div className="mt-3">
            <Label className="text-muted-foreground text-xs font-medium block mb-1">
              Number of months
            </Label>
            <Input
              type="number"
              min="1"
              max="12"
              value={customMonths}
              onChange={(e) => {
                const months = parseInt(e.target.value, 10);
                if (months >= 1 && months <= 12 && onCustomMonthsChange) {
                  onCustomMonthsChange(months);
                }
              }}
              className="w-full text-muted-foreground font-medium text-xs"
              placeholder="1-12"
              disabled={disabled}
            />
          </div>
        )}
      </div>
    );
  },
);

BillingFrequencySelector.displayName = "BillingFrequencySelector";

export { BillingFrequencySelector, billingFrequencySelectorVariants };
