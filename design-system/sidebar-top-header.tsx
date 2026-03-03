import React from "react";
import { Icon } from "./icon";

import { Button } from "@/design-system/button";
import { cn } from "@/lib/utils";

interface SidebarTopHeaderProps {
  title?: string;
  picker?: React.ReactNode;
  actions?: {
    icon: React.ReactNode;
    onClick: () => void;
    tooltip?: string;
  }[];
  onBackClick?: () => void;
  backHref?: string;
  className?: string;
  customRightContent?: React.ReactNode; // Custom content for right side
}

export function SidebarTopHeader({
  title,
  picker,
  actions = [],
  onBackClick,
  backHref,
  className = "",
  customRightContent,
}: SidebarTopHeaderProps) {
  const showBackButton = Boolean(onBackClick || backHref);

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else if (backHref) {
      window.location.href = backHref;
    }
  };

  return (
    <div
      className={cn(
        "loupe-system",
        "flex items-center justify-between h-12 mt-1",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {showBackButton && (
          <Button
            variant="ghost"
            size="sm"
            className="p-2 h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
            onClick={handleBackClick}
          >
            <Icon name="arrow_back" size={16} />
          </Button>
        )}
        <div className="flex-1">
          {picker ? (
            picker
          ) : (
            <h2 className="font-semibold text-base text-sidebar-foreground leading-tight">
              {title}
            </h2>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1">
        {actions.length > 0 &&
          actions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="p-2 h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
              onClick={action.onClick}
              title={action.tooltip}
            >
              {action.icon}
            </Button>
          ))}
        {customRightContent}
      </div>
    </div>
  );
}
