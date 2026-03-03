"use client";

import * as React from "react";
import { format } from "date-fns";
import { Icon } from "@/design-system/icon";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/design-system/button";
import { Calendar } from "@/design-system/calendar";
import { Popover } from "@/design-system/popover";

interface DateRangePickerProps {
  dateRange?: DateRange;
  onDateRangeChange: (range: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  placeholder = "Select date range...",
  disabled = false,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [isSelecting, setIsSelecting] = React.useState(false);
  const [tempStartDate, setTempStartDate] = React.useState<Date | undefined>(
    undefined,
  );

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setIsSelecting(false);
      setTempStartDate(undefined);
    }
  };

  const handleSelect = (range: DateRange | undefined) => {
    if (!isSelecting) {
      setIsSelecting(true);
      setTempStartDate(range?.from);
      onDateRangeChange({ from: range?.from, to: undefined });
      return;
    }

    const newDate = range?.to || range?.from;
    if (!newDate || !tempStartDate) return;

    if (newDate.getTime() < tempStartDate.getTime()) {
      onDateRangeChange({ from: newDate, to: tempStartDate });
      setOpen(false);
    } else if (newDate.getTime() > tempStartDate.getTime()) {
      onDateRangeChange({ from: tempStartDate, to: newDate });
      setOpen(false);
    }
    setIsSelecting(false);
    setTempStartDate(undefined);
  };

  const calendarSelection = React.useMemo(() => {
    if (isSelecting && tempStartDate) {
      return { from: tempStartDate, to: undefined };
    }
    return dateRange;
  }, [isSelecting, tempStartDate, dateRange]);

  return (
    <Popover
      open={open}
      onOpenChange={handleOpenChange}
      triggerContent={
        <Button
          variant="outline"
          className={cn(
            "loupe-system",
            "w-full justify-start text-left font-normal",
            !dateRange && "text-muted-foreground",
            className,
          )}
          disabled={disabled}
        >
          <Icon name="calendar_today" size={16} />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "LLL dd, y")} -{" "}
                {format(dateRange.to, "LLL dd, y")}
              </>
            ) : (
              format(dateRange.from, "LLL dd, y")
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      }
      className="w-auto p-0"
      align="start"
    >
      <Calendar
        mode="range"
        selected={calendarSelection}
        onSelect={handleSelect}
        initialFocus
        numberOfMonths={2}
      />
    </Popover>
  );
}
