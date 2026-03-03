import * as React from "react";
import { Button } from "@/design-system/button";
import { Icon, type IconName } from "@/design-system/icon";
import { Gem, type GemId } from "@/design-system/gem";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: IconName;
  gem?: GemId;
  variant?: "outline" | "plain";
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  title,
  description,
  icon,
  gem,
  variant = "plain",
  action,
}: EmptyStateProps) {
  const containerClasses =
    variant === "outline"
      ? "flex flex-col items-center justify-center text-center border rounded-md bg-muted/10 py-16 px-6 min-h-[300px]"
      : "flex flex-col items-center justify-center text-center py-16 px-6 min-h-[300px]";

  return (
    <div className={cn("loupe-system", containerClasses)}>
      {/* Icon or Gem */}
      {(icon || gem) && (
        <div className="mb-4 w-12 h-12">
          {gem ? (
            <Gem id={gem} size={48} background />
          ) : icon ? (
            <Icon name={icon} size={32} className="text-muted-foreground" />
          ) : null}
        </div>
      )}

      {/* Title */}
      <h3
        className={cn(
          "loupe-system",
          "text-lg font-medium mb-2 self-stretch max-w-xl min-w-0 mx-auto",
        )}
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p
          className={cn(
            "loupe-system",
            "text-muted-foreground mb-6 self-stretch max-w-xl min-w-0 mx-auto",
          )}
        >
          {description}
        </p>
      )}

      {/* Action Button */}
      {action && (
        <Button variant="outline" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
