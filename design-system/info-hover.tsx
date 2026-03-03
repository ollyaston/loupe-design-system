"use client";

import React from "react";
import { Tooltip } from "@/design-system/tooltip";
import { Icon } from "@/design-system/icon";

export interface InfoHoverProps {
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

export const InfoHover = React.forwardRef<HTMLSpanElement, InfoHoverProps>(
  ({ content, side = "top", ...props }, ref) => {
    return (
      <Tooltip content={content} side={side}>
        <span
          className="loupe-system text-muted-foreground hover:text-foreground focus:outline-none flex items-center justify-center cursor-help"
          ref={ref}
          {...props}
        >
          <Icon name="info" size={12} />
        </span>
      </Tooltip>
    );
  },
);

InfoHover.displayName = "InfoHover";
