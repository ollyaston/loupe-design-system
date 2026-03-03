/* eslint-disable agent-loupe-ui/ui-component-story-required -- Archive story removed as redundant */
import React from "react";
import { ColorPickerLegacy } from "./color-picker-legacy";
import { BorderControl } from "./border-control";

interface StyleControlsProps {
  fontFamily: string;
  setFontFamily: (value: string) => void;
  titleColor: string;
  setTitleColor: (value: string) => void;
  titleFontWeight: string;
  setTitleFontWeight: (value: string) => void;
  titleFontSize: string;
  setTitleFontSize: (value: string) => void;
  thFontSize: string;
  setThFontSize: (value: string) => void;
  thFontWeight: string;
  setThFontWeight: (value: string) => void;
  thColor: string;
  setThColor: (value: string) => void;
  tdFontSize: string;
  setTdFontSize: (value: string) => void;
  tdColor: string;
  setTdColor: (value: string) => void;
  emptyColor: string;
  setEmptyColor: (value: string) => void;
  wrapperBorder: string;
  setWrapperBorder: (value: string) => void;
  headerBg: string;
  setHeaderBg: (value: string) => void;
  headerBorderBottom: string;
  setHeaderBorderBottom: (value: string) => void;
  thBg: string;
  setThBg: (value: string) => void;
  thBorderBottom: string;
  setThBorderBottom: (value: string) => void;
  tdBg: string;
  setTdBg: (value: string) => void;
  tdFontWeight: string;
  setTdFontWeight: (value: string) => void;
  tdBorderBottom: string;
  setTdBorderBottom: (value: string) => void;
  rowHoverBg: string;
  setRowHoverBg: (value: string) => void;
  popularFonts: Array<{ name: string; value: string }>;
}

export function StyleControls({
  fontFamily,
  setFontFamily,
  titleColor,
  setTitleColor,
  titleFontWeight,
  setTitleFontWeight,
  titleFontSize,
  setTitleFontSize,
  thFontSize,
  setThFontSize,
  thFontWeight,
  setThFontWeight,
  thColor,
  setThColor,
  tdFontSize,
  setTdFontSize,
  tdColor,
  setTdColor,
  emptyColor,
  setEmptyColor,
  wrapperBorder,
  setWrapperBorder,
  headerBg,
  setHeaderBg,
  headerBorderBottom,
  setHeaderBorderBottom,
  thBg,
  setThBg,
  thBorderBottom,
  setThBorderBottom,
  tdBg,
  setTdBg,
  tdFontWeight,
  setTdFontWeight,
  tdBorderBottom,
  setTdBorderBottom,
  rowHoverBg,
  setRowHoverBg,
  popularFonts,
}: StyleControlsProps) {
  return (
    <div className="loupe-system space-y-4">
      {/* Typography Controls */}
      <div>
        <label className="block text-sm font-medium mb-2">Font family</label>
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="w-full p-2 border rounded"
          style={{ fontFamily: fontFamily }}
        >
          {popularFonts.map((font) => (
            <option
              key={font.value}
              value={font.value}
              style={{ fontFamily: font.value }}
            >
              {font.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Title color</label>
        <ColorPickerLegacy value={titleColor} onChange={setTitleColor} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Title font weight
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setTitleFontWeight("normal")}
            className={`flex-1 py-2 px-4 rounded border ${
              titleFontWeight === "normal"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:bg-primary-foreground"
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => setTitleFontWeight("bold")}
            className={`flex-1 py-2 px-4 rounded border ${
              titleFontWeight === "bold"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:bg-primary-foreground"
            }`}
          >
            Bold
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Title font size</label>
        <input
          type="text"
          value={titleFontSize}
          onChange={(e) => setTitleFontSize(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Header Controls */}
      <div>
        <label className="block text-sm font-medium mb-2">Header color</label>
        <ColorPickerLegacy value={thColor} onChange={setThColor} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Header font weight
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setThFontWeight("normal")}
            className={`flex-1 py-2 px-4 rounded border ${
              thFontWeight === "normal"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:bg-primary-foreground"
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => setThFontWeight("bold")}
            className={`flex-1 py-2 px-4 rounded border ${
              thFontWeight === "bold"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:bg-primary-foreground"
            }`}
          >
            Bold
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Header font size</label>
        <input
          type="text"
          value={thFontSize}
          onChange={(e) => setThFontSize(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Data Controls */}
      <div>
        <label className="block text-sm font-medium mb-2">Data color</label>
        <ColorPickerLegacy value={tdColor} onChange={setTdColor} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Data font weight
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setTdFontWeight("normal")}
            className={`flex-1 py-2 px-4 rounded border ${
              tdFontWeight === "normal"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:bg-primary-foreground"
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => setTdFontWeight("bold")}
            className={`flex-1 py-2 px-4 rounded border ${
              tdFontWeight === "bold"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:bg-primary-foreground"
            }`}
          >
            Bold
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Data font size</label>
        <input
          type="text"
          value={tdFontSize}
          onChange={(e) => setTdFontSize(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Background & Border Controls */}
      <div>
        <label className="block text-sm font-medium mb-2">Wrapper border</label>
        <BorderControl value={wrapperBorder} onChange={setWrapperBorder} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Header background
        </label>
        <ColorPickerLegacy value={headerBg} onChange={setHeaderBg} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Header border bottom
        </label>
        <BorderControl
          value={headerBorderBottom}
          onChange={setHeaderBorderBottom}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Header background
        </label>
        <ColorPickerLegacy value={thBg} onChange={setThBg} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Header border bottom
        </label>
        <BorderControl value={thBorderBottom} onChange={setThBorderBottom} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Data background
        </label>
        <ColorPickerLegacy value={tdBg} onChange={setTdBg} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Data border bottom
        </label>
        <BorderControl value={tdBorderBottom} onChange={setTdBorderBottom} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Row hover background
        </label>
        <ColorPickerLegacy value={rowHoverBg} onChange={setRowHoverBg} />
      </div>
    </div>
  );
}
