import React from "react";
import { Button } from "@/design-system/button";

interface SuggestionChipsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  className?: string;
}

export function SuggestionChips({
  suggestions,
  onSuggestionClick,
  className = "",
}: SuggestionChipsProps) {
  return (
    <div
      className={`loupe-system flex flex-wrap gap-2 justify-center ${className}`}
    >
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          className="rounded-lg text-foreground bg-background"
          onClick={() => onSuggestionClick(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
}
