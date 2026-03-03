"use client";

import * as React from "react";
import { format } from "date-fns";
import { Icon } from "@/design-system/icon";

import { cn } from "@/lib/utils";
import { Button } from "@/design-system/button";
import { Calendar } from "@/design-system/calendar";
import { Popover } from "@/design-system/popover";

interface DatePickerProps {
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  /** Additional class name for the trigger button */
  triggerClassName?: string;
  showDropdowns?: boolean;
  disabledDays?: (date: Date) => boolean;
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Select date...",
  disabled = false,
  className,
  triggerClassName,
  showDropdowns = false,
  disabledDays,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    onDateChange(selectedDate);
    setOpen(false); // Close the popover when a date is selected
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      triggerContent={
        <Button
          variant="outline"
          className={cn(
            "loupe-system",
            "justify-start text-left font-normal gap-2",
            !date && "text-muted-foreground",
            className,
            triggerClassName,
          )}
          disabled={disabled}
        >
          <Icon name="calendar_today" size={16} />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      }
      className="w-auto p-0"
      align="start"
    >
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDateSelect}
        initialFocus
        captionLayout={showDropdowns ? "dropdown" : "label"}
        fromYear={showDropdowns ? 1900 : undefined}
        toYear={showDropdowns ? new Date().getFullYear() + 10 : undefined}
        disabled={disabledDays}
      />
    </Popover>
  );
}
