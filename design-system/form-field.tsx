"use client";

import * as React from "react";
import { Label } from "@/design-system/label";
import { InfoHover } from "@/design-system/info-hover";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  label: string;
  required?: boolean;
  layout?: "horizontal" | "vertical";
  description?: string;
  hintText?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      required = false,
      layout = "vertical",
      description,
      hintText,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const isHorizontal = layout === "horizontal";

    return (
      <div
        ref={ref}
        className={cn(
          "loupe-system",
          isHorizontal ? "flex items-start gap-4" : "space-y-2",
          className,
        )}
        {...props}
      >
        {/* Label section */}
        <div className={cn(isHorizontal ? "flex-shrink-0 w-32" : "space-y-1")}>
          <div className="flex items-center gap-1">
            <Label className="text-sm font-medium">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {hintText && <InfoHover content={hintText} />}
          </div>
        </div>

        {/* Input section */}
        <div className={cn(isHorizontal ? "flex-1" : "w-full")}>
          {children}
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      </div>
    );
  },
);

FormField.displayName = "FormField";
