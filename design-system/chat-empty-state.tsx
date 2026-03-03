import React from "react";
import { cn } from "@/lib/utils";

interface ChatEmptyStateProps {
  title: string;
  className?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
}

export function ChatEmptyState({
  title,
  className = "",
  icon,
  showIcon = true,
}: ChatEmptyStateProps) {
  // const defaultIcon = (
  //   <div className="w-16 h-16 rounded-full bg-sidebar-primary flex items-center justify-center mx-auto mb-4">
  //     <div className="w-8 h-8 bg-sidebar-primary-foreground rounded-sm flex items-center justify-center">
  //       <div className="w-3 h-3 bg-sidebar-primary rounded-full"></div>
  //     </div>
  //   </div>
  // );

  return (
    <div
      className={cn(
        "loupe-system",
        "flex-1 flex flex-col items-center justify-center min-h-64",
        className,
      )}
    >
      {showIcon && icon}
      <h3 className="text-sm font-medium text-muted-foreground mb-2 text-center max-w-sm">
        {title}
      </h3>
    </div>
  );
}
