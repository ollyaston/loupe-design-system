"use client";

import { useState } from "react";
import { addMonths } from "date-fns";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/design-system/date-picker";
import { Button } from "@/design-system/button";
import { Icon } from "@/design-system/icon";
import { Label } from "@/design-system/label";

interface DateRangePickerWithShortcutsProps {
  startDate: Date;
  endDate: Date | undefined;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date | undefined) => void;
  className?: string;
  /** Optional content to render below the start date picker */
  startDateExtra?: React.ReactNode;
  /** Optional content to render below the end date picker */
  endDateExtra?: React.ReactNode;
}

export function DateRangePickerWithShortcuts({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className,
  startDateExtra,
  endDateExtra,
}: DateRangePickerWithShortcutsProps) {
  const [isCustomMode, setIsCustomMode] = useState(false);

  const shortcuts = [
    { label: "Ongoing", months: null, icon: "all_inclusive" as const },
    { label: "3 months", months: 3 },
    { label: "6 months", months: 6 },
    { label: "12 months", months: 12 },
  ];

  const handleShortcutClick = (months: number | null) => {
    if (months === null) {
      onEndDateChange(undefined);
    } else {
      onEndDateChange(addMonths(startDate, months));
    }
    setIsCustomMode(false);
  };

  const handleCustomClick = () => {
    setIsCustomMode(true);
    // If no end date set, default to 1 month from start
    if (!endDate) {
      onEndDateChange(addMonths(startDate, 1));
    }
  };

  const isOngoing = endDate === undefined && !isCustomMode;

  return (
    <div className={cn("loupe-system space-y-6", className)}>
      {/* Duration section */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Duration</Label>
        <div className="flex flex-wrap gap-2">
          {shortcuts.map((shortcut) => {
            const isActive =
              !isCustomMode &&
              (shortcut.months === null
                ? endDate === undefined
                : endDate !== undefined &&
                  shortcut.months !== null &&
                  Math.abs(
                    endDate.getTime() -
                      addMonths(startDate, shortcut.months).getTime(),
                  ) < 86400000); // Within 1 day tolerance

            return (
              <Button
                key={shortcut.label}
                type="button"
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => handleShortcutClick(shortcut.months)}
                className={cn("h-9 rounded-full px-4 gap-2")}
              >
                {shortcut.icon && <Icon name={shortcut.icon} size={16} />}
                {shortcut.label}
              </Button>
            );
          })}

          <Button
            type="button"
            variant={isCustomMode ? "default" : "outline"}
            size="sm"
            onClick={handleCustomClick}
            className="h-9 rounded-full px-4"
          >
            Custom
          </Button>
        </div>
      </div>

      {/* Date fields */}
      <div className="grid grid-cols-2 gap-4">
        {/* Start date column */}
        <div className="min-w-0 space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Start date</Label>
            <DatePicker
              date={startDate}
              onDateChange={(date) => date && onStartDateChange(date)}
              showDropdowns
              triggerClassName="w-full"
            />
          </div>
          {startDateExtra}
        </div>

        {/* End date column */}
        <div className="min-w-0 space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">End date</Label>
            {isOngoing ? (
              <Button
                type="button"
                variant="outline"
                disabled
                className={cn(
                  "loupe-system",
                  "justify-start text-left font-normal gap-2",
                  "text-muted-foreground",
                  "w-full",
                )}
              >
                <Icon name="calendar_today" size={16} />
                <span>No end date</span>
              </Button>
            ) : (
              <DatePicker
                date={endDate}
                onDateChange={onEndDateChange}
                placeholder="Select end date..."
                showDropdowns
                triggerClassName="w-full"
              />
            )}
          </div>
          {endDateExtra}
        </div>
      </div>
    </div>
  );
}
