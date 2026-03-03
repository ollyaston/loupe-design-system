import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { formatNumber, isNumericString } from "./format-number";
import { Tooltip } from "./tooltip";

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 capitalize whitespace-nowrap min-w-6 justify-center",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-sm",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-sm",
        outline: "text-foreground",
        sidebar:
          "border-transparent bg-sidebar-accent text-sidebar-accent-foreground",
        ghost:
          "border-transparent bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
      },
      contentType: {
        text: "rounded-md",
        numbers: "rounded-xl px-1 font-mono",
      },
    },
    defaultVariants: {
      variant: "default",
      contentType: "text",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Whether to format numeric content using human-readable format (e.g., 1234 -> 1.2k) */
  formatNumbers?: boolean;
}

function Badge({
  className,
  variant,
  contentType,
  formatNumbers = false,
  children,
  ...props
}: BadgeProps) {
  // Format numeric content if requested and content is numeric
  const formattedChildren = React.useMemo(() => {
    if (!formatNumbers || !children) return children;

    const childrenStr = String(children);
    if (isNumericString(childrenStr)) {
      return formatNumber(childrenStr);
    }

    return children;
  }, [children, formatNumbers]);

  // Check if we should show a tooltip (when formatNumbers is enabled and content is numeric)
  const shouldShowTooltip = React.useMemo(() => {
    if (!formatNumbers || !children) return false;
    const childrenStr = String(children);
    return (
      isNumericString(childrenStr) && formatNumber(childrenStr) !== childrenStr
    );
  }, [children, formatNumbers]);

  const badgeElement = (
    <div
      className={cn(
        "loupe-system",
        badgeVariants({ variant, contentType }),
        className,
      )}
      {...props}
    >
      {formattedChildren}
    </div>
  );

  // Wrap with tooltip if we should show one
  if (shouldShowTooltip) {
    return <Tooltip content={<p>{children}</p>}>{badgeElement}</Tooltip>;
  }

  return badgeElement;
}

export { Badge, badgeVariants };
