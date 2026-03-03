import React from "react";

import { Icon } from "@/design-system/icon";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  className?: string;
  iconClassName?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "ghost" | "outline" | "secondary";
  onCopy?: () => void;
}

export function CopyButton({
  text,
  className,
  iconClassName = "text-primary-foreground",
  size = "default",
  variant = "ghost",
  onCopy,
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy?.();

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={cn(
        "loupe-system",
        "transition-opacity text-sidebar-foreground hover:bg-sidebar/80 active:bg-sidebar/60 overflow-hidden",
        className,
      )}
      aspectRatio="square"
    >
      <div className="relative h-4 w-4">
        <Icon
          name="content_copy"
          size={16}
          className={cn(
            "h-4 w-4 absolute inset-0 transition-all duration-300 ease-in-out",
            iconClassName,
            copied ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0",
          )}
        />
        <Icon
          name="check"
          size={16}
          className={cn(
            "h-4 w-4 absolute inset-0 transition-all duration-300 ease-in-out",
            iconClassName,
            copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        />
      </div>
    </Button>
  );
}
