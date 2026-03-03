"use client";

import { NumberField, Input } from "react-aria-components";
import * as React from "react";
import { ComponentProps } from "react";
import { CURRENCIES, CurrencyCode } from "@/lib/currency";
import { cn } from "@/lib/utils";

export function CurrencyInput({
  currency,
  className,
  ...props
}: ComponentProps<typeof NumberField> & {
  currency: CurrencyCode;
}) {
  return (
    <NumberField
      {...props}
      formatOptions={{
        style: "currency",
        currency: currency,
      }}
    >
      <Input
        className={cn(
          // "loupe-system",
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
      />
    </NumberField>
  );
}

// Re-export types for backward compatibility
export type { CurrencyCode };
export { CURRENCIES };
