"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import { Badge } from "@/design-system/badge";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  numberBadge?: number;
  content?: React.ReactNode;
}

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "dir"> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  tabs: TabItem[];
  tabStyle?: "pills" | "underline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  actionsContent?: React.ReactNode;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      defaultValue,
      value,
      onValueChange,
      tabs,
      tabStyle = "pills",
      size = "md",
      fullWidth = false,
      actionsContent,
      ...props
    },
    ref,
  ) => {
    // Container and list should be full width for underline style
    // But triggers should only stretch (flex-1) when fullWidth prop is true (for pills)
    const containerFullWidth = tabStyle === "underline" || fullWidth;
    const triggersStretch = fullWidth;

    const sizeClasses = {
      sm: "h-8 text-xs",
      md: "h-9 text-sm",
      lg: "h-10 text-base",
    };

    const triggerSizeClasses = {
      sm: "px-2 py-1",
      md: "px-2 py-1",
      lg: "px-4 py-1",
    };

    return (
      <TabsPrimitive.Root
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        className={cn(containerFullWidth && "w-full", props.className)}
        {...props}
      >
        <div className="flex items-center justify-between">
          <TabsPrimitive.List
            ref={ref}
            className={cn(
              "loupe-system",
              "inline-flex items-center text-muted-foreground",
              tabStyle === "pills"
                ? `justify-center rounded-lg bg-muted p-1 ${sizeClasses[size]}`
                : "border-b border-border",
              containerFullWidth && "flex-1",
            )}
          >
            {tabs.map((tab) => (
              <TabsPrimitive.Trigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "loupe-system",
                  "group inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
                  tabStyle === "pills"
                    ? `rounded-md ${triggerSizeClasses[size]} data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm`
                    : `px-2 py-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-foreground ${triggerSizeClasses[size]} text-sm`,
                  triggersStretch && "flex-1",
                )}
              >
                {tab.label}
                {typeof tab.numberBadge !== "undefined" && (
                  <Badge
                    variant="outline"
                    contentType="numbers"
                    className="ml-2 -mr-1.5 group-data-[state=active]:bg-secondary group-data-[state=active]:border-secondary"
                  >
                    {tab.numberBadge}
                  </Badge>
                )}
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>
          {actionsContent && <div className="ml-4">{actionsContent}</div>}
        </div>

        {tabs.map((tab) => (
          <TabsPrimitive.Content
            key={tab.value}
            value={tab.value}
            className={cn(
              "loupe-system",
              "ring-offset-background focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 min-w-0 overflow-x-hidden",
              tabStyle === "pills" ? "mt-2" : "mt-4",
            )}
          >
            {tab.content}
          </TabsPrimitive.Content>
        ))}
      </TabsPrimitive.Root>
    );
  },
);

Tabs.displayName = "Tabs";

export { Tabs };
