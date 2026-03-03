"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/design-system/input";
import { Icon } from "@/design-system/icon";

interface TimePickerProps {
  time?: string;
  onTimeChange: (time: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function TimePicker({
  time,
  onTimeChange,
  placeholder = "Select time...",
  disabled = false,
  className,
}: TimePickerProps) {
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTimeChange(event.target.value);
  };

  return (
    <div className={cn("loupe-system", "relative", className)}>
      <div className="relative">
        <Icon
          name="schedule"
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10"
        />
        <Input
          type="time"
          value={time || "09:00"}
          onChange={handleTimeChange}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "pl-9 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
          )}
        />
      </div>
    </div>
  );
}
