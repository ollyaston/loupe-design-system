/* eslint-disable agent-loupe-ui/ui-component-story-required -- Archive story removed as redundant */
import React from "react";

interface ColorPickerLegacyProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function ColorPickerLegacy({
  value,
  onChange,
  label,
}: ColorPickerLegacyProps) {
  return (
    <div className="loupe-system flex items-center gap-2">
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-12 p-1 border rounded-lg cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-border focus:outline-hidden focus:ring-2 focus:ring-border"
          style={{
            WebkitAppearance: "none",
            MozAppearance: "none",
            appearance: "none",
            backgroundColor: "transparent",
          }}
        />
        <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
          <div
            className="w-full h-full rounded-lg border border-border"
            style={{ backgroundColor: value }}
          />
        </div>
      </div>
      <span className="text-sm text-muted-foreground font-mono">{value}</span>
    </div>
  );
}
