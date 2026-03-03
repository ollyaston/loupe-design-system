"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/design-system/input";
import { Label } from "@/design-system/label";
import { Popover } from "@/design-system/popover";
import { Button } from "@/design-system/button";
import { Icon } from "@/design-system/icon";
import { countries, sortCountriesWithPriority } from "@/lib/countries";

export interface AddressValue {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface AddressErrors {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface AddressInputProps {
  value: AddressValue;
  onChange: (value: AddressValue) => void;
  errors?: AddressErrors;
  onErrorClear?: (field: keyof AddressErrors) => void;
  label?: string;
  className?: string;
  autoOpenCountry?: boolean;
  onCountryPopoverOpenChange?: (open: boolean) => void;
}

export function AddressInput({
  value,
  onChange,
  errors,
  onErrorClear,
  label = "Billing address",
  className,
  autoOpenCountry = false,
  onCountryPopoverOpenChange,
}: AddressInputProps) {
  const [countryPopoverOpen, setCountryPopoverOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [filteredCountries, setFilteredCountries] = useState(() =>
    sortCountriesWithPriority(countries),
  );

  useEffect(() => {
    const searchTerm = countrySearch.toLowerCase();
    const filtered = countries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchTerm) ||
        country.code.toLowerCase().includes(searchTerm),
    );
    setFilteredCountries(sortCountriesWithPriority(filtered, countrySearch));
    setHighlightedIndex(0);
  }, [countrySearch]);

  useEffect(() => {
    if (autoOpenCountry && !value.country) {
      setCountryPopoverOpen(true);
    }
  }, [autoOpenCountry, value.country]);

  const handleCountryPopoverChange = (open: boolean) => {
    setCountryPopoverOpen(open);
    onCountryPopoverOpenChange?.(open);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!countryPopoverOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredCountries.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (filteredCountries[highlightedIndex]) {
          handleCountrySelect(filteredCountries[highlightedIndex].code);
        }
        break;
      case "Escape":
        setCountryPopoverOpen(false);
        break;
    }
  };

  const handleCountrySelect = (countryCode: string) => {
    onChange({ ...value, country: countryCode });
    onErrorClear?.("country");
    setCountryPopoverOpen(false);
    setCountrySearch("");
  };

  const handleFieldChange = (field: keyof AddressValue, fieldValue: string) => {
    onChange({ ...value, [field]: fieldValue });
    onErrorClear?.(field);
  };

  const selectedCountryName = value.country
    ? countries.find((c) => c.code === value.country)?.name
    : undefined;

  return (
    <div className={cn("loupe-system space-y-3", className)}>
      {label && <Label className="text-sm font-medium">{label}</Label>}

      <Popover
        open={countryPopoverOpen}
        onOpenChange={handleCountryPopoverChange}
        modal={true}
        triggerContent={
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={countryPopoverOpen}
            className={cn(
              "w-full justify-between text-left px-3 py-2 shadow-input ring-offset-background focus-visible:ring-offset-1",
              !!errors?.country &&
                "border-destructive focus-visible:ring-destructive",
            )}
            type="button"
          >
            {selectedCountryName ? (
              <span className="truncate font-medium">
                {selectedCountryName}
              </span>
            ) : (
              <span className="truncate text-muted-foreground">
                Select country...
              </span>
            )}
            <Icon
              name="keyboard_arrow_down"
              size={16}
              className="shrink-0 opacity-50"
            />
          </Button>
        }
        className="p-0 rounded-lg shadow-xs"
        align="start"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <div className="p-2">
          <Input
            placeholder="Search countries..."
            value={countrySearch}
            onChange={(e) => setCountrySearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="mb-2"
          />
          <div className="max-h-[300px] overflow-y-auto">
            {filteredCountries.length === 0 ? (
              <div className="p-2 text-sm text-muted-foreground">
                No countries found.
              </div>
            ) : (
              filteredCountries.map((country, index) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country.code)}
                  className={cn(
                    "w-full px-2 py-1.5 text-sm text-left hover:bg-accent hover:text-accent-foreground flex justify-between items-center",
                    index === highlightedIndex &&
                      "bg-accent text-accent-foreground",
                  )}
                >
                  <div>
                    <span>{country.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {country.code}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </Popover>
      {errors?.country && (
        <p className="text-sm text-destructive">{errors.country}</p>
      )}

      <Input
        placeholder="Address line 1"
        autoComplete="address-line1"
        value={value.line1 || ""}
        onChange={(e) => handleFieldChange("line1", e.target.value)}
        error={!!errors?.line1}
      />
      {errors?.line1 && (
        <p className="text-sm text-destructive">{errors.line1}</p>
      )}

      <Input
        placeholder="Address line 2"
        autoComplete="address-line2"
        value={value.line2 || ""}
        onChange={(e) => handleFieldChange("line2", e.target.value)}
        error={!!errors?.line2}
      />

      <Input
        placeholder="City"
        autoComplete="address-level2"
        value={value.city || ""}
        onChange={(e) => handleFieldChange("city", e.target.value)}
        error={!!errors?.city}
      />
      {errors?.city && (
        <p className="text-sm text-destructive">{errors.city}</p>
      )}

      <Input
        placeholder="State"
        autoComplete="address-level1"
        value={value.state || ""}
        onChange={(e) => handleFieldChange("state", e.target.value)}
        error={!!errors?.state}
      />
      {errors?.state && (
        <p className="text-sm text-destructive">{errors.state}</p>
      )}

      <Input
        placeholder="Zip code"
        autoComplete="postal-code"
        value={value.zipCode || ""}
        onChange={(e) => handleFieldChange("zipCode", e.target.value)}
        error={!!errors?.zipCode}
      />
      {errors?.zipCode && (
        <p className="text-sm text-destructive">{errors.zipCode}</p>
      )}
    </div>
  );
}
