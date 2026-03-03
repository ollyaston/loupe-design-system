"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils";
import { Icon, IconName } from "./icon";

export interface RadioChoice {
  value: string;
  title?: string;
  description?: string;
  icon?: IconName | React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode; // If provided, replaces title/description
  className?: string;
}

interface RadioGroupProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    "children"
  > {
  choices: RadioChoice[];
  showBorder?: boolean;
  showRadio?: boolean;
  variant?: "default" | "badge";
  size?: "sm" | "md" | "lg";
  orientation?: "vertical" | "horizontal";
  error?: boolean;
}

// Radio indicator component (the circular button)
const RadioIndicator = ({ error }: { error?: boolean }) => (
  <div
    className={cn(
      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-input text-primary shadow-xs transition-colors has-[span[data-state=checked]]:border-primary has-[span[data-state=checked]]:bg-background",
      error &&
        "has-[span[data-state=checked]]:border-destructive has-[span[data-state=checked]]:bg-background",
    )}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <div className="h-2 w-2 rounded-full bg-foreground" />
    </RadioGroupPrimitive.Indicator>
  </div>
);

// Reusable content component for title/description
const RadioContent = ({
  title,
  description,
  size = "md",
  error,
}: {
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  error?: boolean;
}) => {
  const hasContent = title || description;
  if (!hasContent) return null;

  return (
    <div className="flex-1 space-y-1 text-left">
      {title && (
        <div
          className={cn(
            "font-medium text-foreground group-data-[state=checked]:text-primary",
            size === "lg" ? "text-base" : "text-sm",
            error && "group-data-[state=checked]:text-destructive",
          )}
        >
          {title}
        </div>
      )}
      {description && (
        <div
          className={cn(
            "text-muted-foreground",
            size === "lg" ? "text-sm" : "text-xs",
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
};

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    {
      choices,
      showBorder = false,
      showRadio = true,
      variant = "default",
      size = "md",
      orientation = "vertical",
      error = false,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <RadioGroupPrimitive.Root
        className={cn(
          "loupe-system",
          orientation === "vertical" ? "grid gap-2" : "flex gap-1",
          className,
        )}
        disabled={disabled}
        {...props}
        ref={ref}
      >
        {choices.map((choice) => {
          const hasContent = choice.title || choice.description;
          const shouldShowRadio = showRadio && !choice.icon;
          const isDisabled = disabled || choice.disabled;

          // Badge variant - compact, button-like style
          if (variant === "badge") {
            return (
              <RadioGroupPrimitive.Item
                key={choice.value}
                value={choice.value}
                disabled={isDisabled}
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded font-medium transition-all focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                  "border border-input bg-background text-muted-foreground",
                  "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
                  "hover:bg-accent hover:text-foreground hover:border-muted-foreground",
                  "active:scale-95",
                  "px-2 py-0.5 text-xs",
                  choice.className,
                )}
              >
                {choice.children || choice.title}
              </RadioGroupPrimitive.Item>
            );
          }

          // Size-dependent values
          const iconSize = size === "sm" ? 16 : size === "lg" ? 32 : 24;
          const stackedGap =
            size === "sm" ? "gap-1.5" : size === "lg" ? "gap-3" : "gap-2";

          return (
            <RadioGroupPrimitive.Item
              key={choice.value}
              value={choice.value}
              disabled={isDisabled}
              className={cn(
                "group relative flex cursor-pointer transition-all focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                // Border styles
                showBorder && [
                  "rounded-md border",
                  "data-[state=checked]:border-primary data-[state=checked]:text-primary data-[state=checked]:bg-secondary data-[state=checked]:hover:bg-accent/50",
                  "data-[state=unchecked]:border-border data-[state=unchecked]:bg-background data-[state=unchecked]:hover:bg-accent/50",
                  "disabled:hover:bg-transparent",
                  "focus-visible:ring-offset-1",
                  error &&
                    "data-[state=checked]:border-destructive data-[state=checked]:bg-destructive/10 data-[state=checked]:text-destructive focus-visible:ring-destructive",
                ],
                // Layout direction and alignment
                // Stack layout when there's an icon (icon above content)
                choice.icon
                  ? [
                      "flex-col items-start",
                      showBorder ? cn("p-3", stackedGap) : "gap-2",
                    ]
                  : ["items-start", showBorder ? "p-3 gap-3" : "gap-2"],
                // Custom className for this choice
                choice.className,
              )}
            >
              {/* Radio indicator - only show if shouldShowRadio */}
              {shouldShowRadio && <RadioIndicator error={error} />}

              {/* Icon - stacked above content */}
              {choice.icon &&
                (typeof choice.icon === "string" ? (
                  <Icon name={choice.icon} size={iconSize} />
                ) : (
                  choice.icon
                ))}

              {/* Content - use children if provided, otherwise title/description */}
              {choice.children ? (
                <div className="flex-1">{choice.children}</div>
              ) : (
                hasContent && (
                  <RadioContent
                    title={choice.title}
                    description={choice.description}
                    size={size}
                    error={error}
                  />
                )
              )}
            </RadioGroupPrimitive.Item>
          );
        })}
      </RadioGroupPrimitive.Root>
    );
  },
);
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

export { RadioGroup };
