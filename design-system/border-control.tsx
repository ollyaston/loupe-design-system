/* eslint-disable agent-loupe-ui/ui-component-story-required -- Archive story removed as redundant */
import React from "react";

interface BorderControlProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const borderStyles = [
  "solid",
  "dashed",
  "dotted",
  "double",
  "groove",
  "ridge",
  "inset",
  "outset",
];

// Helper function to parse border string
const parseBorder = (borderString: string) => {
  const [width, style, color] = borderString.split(" ");
  return { width, style, color };
};

// Helper function to create border string
const createBorderString = (width: string, style: string, color: string) => {
  return `${width} ${style} ${color}`;
};

export function BorderControl({ value, onChange, label }: BorderControlProps) {
  const { width, style, color } = parseBorder(value);

  return (
    <div className="loupe-system flex items-center gap-2">
      <input
        type="text"
        value={width}
        onChange={(e) => {
          onChange(createBorderString(e.target.value, style, color));
        }}
        className="w-14 h-10 p-2 border rounded"
        placeholder="1px"
      />
      <select
        value={style}
        onChange={(e) => {
          onChange(createBorderString(width, e.target.value, color));
        }}
        className="w-24 h-10 p-2 border rounded"
      >
        {borderStyles.map((style) => (
          <option key={style} value={style}>
            {style}
          </option>
        ))}
      </select>
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={color}
            onChange={(e) => {
              onChange(createBorderString(width, style, e.target.value));
            }}
            className="w-12 h-12 p-1 border border-border rounded-lg cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-border focus:outline-hidden focus:ring-2 focus:ring-border"
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
              style={{ backgroundColor: color }}
            />
          </div>
        </div>
        <span className="text-sm text-muted-foreground font-mono">{color}</span>
      </div>
    </div>
  );
}
