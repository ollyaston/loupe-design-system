"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { SearchableSelect } from "@/design-system/searchable-select";
import { Icon } from "@/design-system/icon";

export interface CustomerPickerCustomer {
  id: string;
  name: string;
  email?: string;
  externalId?: string;
}

export interface CustomerPickerProps {
  /** List of customers to display in the picker */
  customers: CustomerPickerCustomer[];
  /** Currently selected customer ID */
  value?: string;
  /** Callback when customer selection changes */
  onValueChange?: (value: string) => void;
  /** Placeholder text when no customer is selected */
  placeholder?: string;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Text shown when no customers match the search */
  emptyText?: string;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Whether to show an error state */
  error?: boolean;
  /** Additional CSS classes for the component */
  className?: string;
  /** CSS classes for the trigger button */
  triggerClassName?: string;
  /** Which field to show as secondary text: "email", "externalId", or "none" */
  secondaryText?: "email" | "externalId" | "none";
  /** Callback when "Add new customer" is clicked (always shown at bottom of list) */
  onAddNew?: () => void;
  /** Label for the "Add new customer" option */
  addNewLabel?: string;
}

export const CustomerPicker = React.forwardRef<
  HTMLButtonElement,
  CustomerPickerProps
>(
  (
    {
      customers,
      value,
      onValueChange,
      placeholder = "Select a customer...",
      searchPlaceholder = "Search customers...",
      emptyText = "No results found.",
      disabled = false,
      error = false,
      className,
      triggerClassName,
      secondaryText = "email",
      onAddNew,
      addNewLabel = "Add new customer",
    },
    ref,
  ) => {
    const getSecondaryValue = (
      customer: CustomerPickerCustomer,
    ): string | undefined => {
      if (secondaryText === "email") return customer.email;
      if (secondaryText === "externalId") return customer.externalId;
      return undefined;
    };

    const options = customers.map((customer) => ({
      value: customer.id,
      label: customer.name,
      data: {
        secondary: getSecondaryValue(customer),
      },
    }));

    return (
      <SearchableSelect
        ref={ref}
        options={options}
        value={value}
        onValueChange={onValueChange}
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        emptyText={emptyText}
        disabled={disabled}
        error={error}
        className={cn("loupe-system", className)}
        triggerClassName={triggerClassName}
        renderTrigger={(option) => {
          const data = option.data as { secondary?: string };
          return (
            <div className="flex flex-col items-start">
              <span>{option.label}</span>
              {data.secondary && (
                <span className="text-xs text-muted-foreground">
                  {data.secondary}
                </span>
              )}
            </div>
          );
        }}
        renderOption={(option) => {
          const data = option.data as { secondary?: string };
          return (
            <div className="flex flex-col">
              <span>{option.label}</span>
              {data.secondary && (
                <span className="text-xs text-muted-foreground">
                  {data.secondary}
                </span>
              )}
            </div>
          );
        }}
        footerContent={
          onAddNew
            ? (close) => (
                <button
                  type="button"
                  onClick={() => {
                    close();
                    onAddNew();
                  }}
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-primary hover:bg-accent cursor-pointer"
                >
                  <Icon name="add" size={16} />
                  <span>{addNewLabel}</span>
                </button>
              )
            : undefined
        }
      />
    );
  },
);

CustomerPicker.displayName = "CustomerPicker";
