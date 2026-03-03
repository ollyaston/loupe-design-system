/* eslint-disable agent-loupe-ui/ui-component-story-required -- Story removed per design decision */
import { ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/card";
import { Badge } from "@/design-system/badge";
import { Icon } from "@/design-system/icon";
import { IconName } from "@/design-system/icon";
import { IconBadge } from "@/design-system/icon-badge";

export interface WorkflowCardProps {
  icon?: IconName;
  color?: string;
  title: string;
  description: string;
  beta?: boolean;
  soon?: boolean;
  badgeContent?: ReactNode;
  onClick?: () => void;
  loading?: boolean;
  className?: string;
  hoverText?: string;
  actionsContent?: ReactNode;
}

export function WorkflowCard({
  icon,
  color,
  title,
  description,
  beta,
  soon,
  badgeContent,
  onClick,
  loading,
  className,
  hoverText = "View",
  actionsContent,
}: WorkflowCardProps) {
  return (
    <Card
      className={cn(
        "loupe-system",
        "relative h-full cursor-pointer text-left shadow-none group",
        "pb-12", // Padding for the arrow icon
        !soon && !loading && "hover:bg-secondary",
        soon && "opacity-50 cursor-not-allowed",
        loading && "opacity-50",
        className,
      )}
      onClick={(e) => {
        if (soon || loading) {
          e.preventDefault();
        } else if (onClick) {
          onClick();
        }
      }}
    >
      <CardHeader className="p-5 pb-3">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            {icon && (
              <IconBadge
                icon={icon}
                size={32}
                backgroundColor={color || "blue"}
              />
            )}
            {badgeContent ? (
              badgeContent
            ) : beta ? (
              <Badge variant="outline">Beta</Badge>
            ) : soon ? (
              <Badge variant="outline">Soon</Badge>
            ) : null}
          </div>
          {actionsContent && (
            <div className="flex items-center gap-1">{actionsContent}</div>
          )}
        </div>
        <CardTitle className="text-xl font-medium mt-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <div className="absolute bottom-6 right-6 flex items-center gap-2">
        {!soon && !loading && (
          <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-100">
            {hoverText}
          </span>
        )}
        <Icon name="arrow_outward" size={16} />
      </div>
    </Card>
  );
}
