"use client";

import * as React from "react";
import { ScrollArea } from "@/design-system/scroll-area";
import { cn } from "@/lib/utils";

interface SplitPaneLayoutProps {
  /**
   * Content for the left pane (typically a form).
   */
  leftPane: React.ReactNode;
  /**
   * Content for the right pane (typically a preview).
   */
  rightPane: React.ReactNode;
  /**
   * Split ratio. Default is "50/50".
   * Options: "50/50", "60/40", "40/60", "30/70"
   */
  splitRatio?: "50/50" | "60/40" | "40/60" | "30/70";
  /**
   * Additional class name for the left pane.
   */
  leftPaneClassName?: string;
  /**
   * Additional class name for the right pane.
   */
  rightPaneClassName?: string;
  /**
   * Whether to show a divider between panes.
   * Default is false.
   */
  showDivider?: boolean;
  /**
   * Additional class name for the container.
   */
  className?: string;
}

function SplitPaneLayout({
  leftPane,
  rightPane,
  splitRatio = "50/50",
  leftPaneClassName,
  rightPaneClassName,
  showDivider = false,
  className,
}: SplitPaneLayoutProps) {
  const leftWidth = {
    "50/50": "w-1/2",
    "60/40": "w-3/5",
    "40/60": "w-2/5",
    "30/70": "w-[30%]",
  }[splitRatio];

  const rightWidth = {
    "50/50": "w-1/2",
    "60/40": "w-2/5",
    "40/60": "w-3/5",
    "30/70": "w-[70%]",
  }[splitRatio];

  return (
    <div
      className={cn(
        "loupe-system",
        "flex-1 flex overflow-hidden min-h-0",
        className,
      )}
    >
      {/* Left pane */}
      <ScrollArea
        className={cn(
          leftWidth,
          "overflow-y-auto flex-shrink-0",
          showDivider && "border-r",
          leftPaneClassName,
        )}
      >
        {leftPane}
      </ScrollArea>

      {/* Right pane */}
      <div
        className={cn(
          rightWidth,
          "flex flex-col relative overflow-auto",
          rightPaneClassName,
        )}
      >
        {rightPane}
      </div>
    </div>
  );
}

export { SplitPaneLayout };
export type { SplitPaneLayoutProps };
