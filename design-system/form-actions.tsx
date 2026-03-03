import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormActionsProps {
  align?: "left" | "right" | "fill";
  children: React.ReactNode;
}

const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(
  ({ align = "right", children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "loupe-system",
          "flex items-center gap-2",
          align === "right" && "justify-start flex-row-reverse",
          align === "left" && "justify-start",
          align === "fill" && "justify-between flex-row-reverse",
        )}
      >
        {children}
      </div>
    );
  },
);

FormActions.displayName = "FormActions";

export { FormActions };
