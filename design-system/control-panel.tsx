/* eslint-disable agent-loupe-ui/ui-component-story-required -- Archive story removed as redundant */
import React from "react";
import { StyleControls } from "./style-controls";

interface ControlPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  styleControlsProps: any; // Replace with proper type from StyleControlsProps
}

export function ControlPanel({
  isOpen,
  onToggle,
  styleControlsProps,
}: ControlPanelProps) {
  return (
    <div
      className={`loupe-system w-80 bg-background border-l fixed right-0 top-0 bottom-0 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <button
        onClick={onToggle}
        className="absolute left-0 top-1/2 transform -translate-x-full bg-background hover:bg-primary-foreground text-muted-foreground px-3 py-4 rounded-l-lg border border-r-0 border-border transition-all duration-200 shadow-xs hover:shadow-md"
        aria-label={isOpen ? "Close panel" : "Open panel"}
      >
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      <div className="p-4 overflow-y-auto h-full">
        <h2 className="text-lg font-bold mb-4">Style controls</h2>
        <StyleControls {...styleControlsProps} />
      </div>
    </div>
  );
}
