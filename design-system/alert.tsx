import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/design-system/icon";

const alertVariants = cva(
  "relative w-full rounded-lg border px-3 py-3 text-sm mb-6 flex items-center gap-2",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "bg-background border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        warning:
          "bg-warning-alt border-warning/30 text-warning-alt-foreground [&>svg]:text-warning",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: IconName;
  actionContent?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant, title, description, icon, actionContent, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn("loupe-system", alertVariants({ variant }))}
        {...props}
      >
        <div className="flex items-start gap-2 flex-1 min-w-0">
          {icon && <Icon name={icon} size={16} className="shrink-0 -mt-0.5" />}
          <div className="flex-1 min-w-0">
            {title && (
              <h5
                className={cn(
                  "font-medium leading-none tracking-tight",
                  description ? "mb-1" : "",
                )}
              >
                {title}
              </h5>
            )}
            {description && (
              <div
                className={cn(
                  "text-sm [&_p]:leading-relaxed",
                  variant === "destructive"
                    ? "text-destructive"
                    : variant === "warning"
                      ? "text-warning-alt-foreground"
                      : "text-muted-foreground",
                )}
              >
                {description}
              </div>
            )}
          </div>
        </div>
        {actionContent && (
          <div className="flex items-center gap-2 shrink-0">
            {actionContent}
          </div>
        )}
      </div>
    );
  },
);
Alert.displayName = "Alert";

export { Alert };
