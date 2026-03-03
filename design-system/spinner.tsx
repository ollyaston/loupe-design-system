import React from "react";
import { Icon } from "./icon";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: number;
  className?: string;
  spinning?: boolean;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 24,
  className,
  spinning = true,
}) => {
  return (
    <Icon
      name={spinning ? "progress_activity" : "refresh"}
      size={size}
      className={cn("loupe-system", spinning && "animate-spin", className)}
    />
  );
};
