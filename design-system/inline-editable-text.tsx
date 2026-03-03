"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/design-system/input";
import { Textarea } from "@/design-system/textarea";

interface InlineEditableTextProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  className?: string;
  inputClassName?: string;
  displayClassName?: string;
  mutedWhenEmpty?: boolean;
}

export function InlineEditableText({
  value,
  onValueChange,
  placeholder = "Add description...",
  multiline = false,
  className,
  inputClassName,
  displayClassName,
  mutedWhenEmpty = true,
}: InlineEditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsEditing(false);
    }
    if (e.key === "Enter" && !multiline) {
      setIsEditing(false);
    }
  };

  if (isEditing) {
    const InputComponent = multiline ? Textarea : Input;
    return (
      <InputComponent
        autoFocus
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onBlur={() => setIsEditing(false)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "loupe-system",
          multiline ? "resize-none" : "h-8",
          "text-sm",
          inputClassName,
        )}
        rows={multiline ? 2 : undefined}
      />
    );
  }

  return (
    <p
      className={cn(
        "loupe-system",
        "cursor-pointer transition-colors",
        mutedWhenEmpty
          ? cn(
              "text-sm hover:text-foreground",
              value
                ? "text-muted-foreground"
                : "text-muted-foreground/50 italic",
            )
          : cn(value ? "text-foreground" : "text-muted-foreground/50 italic"),
        displayClassName,
        className,
      )}
      onClick={() => setIsEditing(true)}
    >
      {value || placeholder}
    </p>
  );
}
