"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { CloseX } from "./close-x";

import { cn } from "@/lib/utils";

const sheetVariants = cva("", {
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
      bottom:
        "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
      left: "inset-y-0 left-0 h-full border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
      right:
        "inset-y-0 right-0 h-full border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
    },
  },
  defaultVariants: {
    side: "right",
  },
});

export interface SheetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof sheetVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  width?: "sm" | "md" | "lg" | "xl" | "sidebar" | string;
}

const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(
  (
    {
      open,
      onOpenChange,
      trigger,
      title,
      description,
      children,
      footer,
      side = "right",
      width,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(open ?? false);

    const handleOpenChange = React.useCallback(
      (newOpen: boolean) => {
        setIsOpen(newOpen);
        onOpenChange?.(newOpen);
      },
      [onOpenChange],
    );

    const getWidthClass = () => {
      if (!width) return "";

      const predefinedSizes = {
        sm: "w-80",
        md: "w-96",
        lg: "w-2xl",
        xl: "w-4xl",
        sidebar: "w-80",
      };

      if (width in predefinedSizes) {
        return predefinedSizes[width as keyof typeof predefinedSizes];
      }

      return `w-[${width}]`;
    };

    React.useEffect(() => {
      if (open !== undefined) {
        setIsOpen(open);
      }
    }, [open]);

    return (
      <SheetPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
        {trigger && (
          <SheetPrimitive.Trigger asChild>{trigger}</SheetPrimitive.Trigger>
        )}
        <SheetPrimitive.Portal>
          <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-primary/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <SheetPrimitive.Content
            ref={ref}
            className={cn(
              "loupe-system",
              "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out overflow-y-auto",
              sheetVariants({ side }),
              getWidthClass(),
              !width && side === "right" && "w-3/4 sm:max-w-sm",
              !width && side === "left" && "w-3/4 sm:max-w-sm",
              !width && (side === "right" || side === "left") && "max-w-sm",
            )}
            {...props}
          >
            <SheetPrimitive.Close asChild>
              <CloseX
                className="absolute right-4 top-4"
                onClick={() => handleOpenChange(false)}
              />
            </SheetPrimitive.Close>

            {(title || description) && (
              <div className="flex flex-col space-y-2 text-center sm:text-left">
                {title && (
                  <SheetPrimitive.Title className="text-lg font-semibold text-foreground">
                    {title}
                  </SheetPrimitive.Title>
                )}
                {description && (
                  <SheetPrimitive.Description className="text-sm text-muted-foreground">
                    {description}
                  </SheetPrimitive.Description>
                )}
              </div>
            )}

            {children && <div className="grid gap-4 py-4">{children}</div>}

            {footer && (
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                {footer}
              </div>
            )}
          </SheetPrimitive.Content>
        </SheetPrimitive.Portal>
      </SheetPrimitive.Root>
    );
  },
);
Sheet.displayName = "Sheet";

export { Sheet };
