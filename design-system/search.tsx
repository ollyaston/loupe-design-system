"use client";

import * as React from "react";
import { Icon } from "./icon";

import { Input } from "@/design-system/input";
import { cn } from "@/lib/utils";

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (
    { placeholder, value, onChange, error, disabled, className, ...props },
    ref,
  ) => {
    return (
      <div className={cn("loupe-system", "relative max-w-md", className)}>
        <Icon
          name="search"
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder={placeholder}
          className="pl-8"
          value={value}
          onChange={onChange}
          error={error}
          disabled={disabled}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Search.displayName = "Search";

export { Search };
