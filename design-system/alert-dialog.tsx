"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/design-system/button";

const AlertDialogWrapper = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-[110] bg-primary/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "loupe-system",
        "fixed left-[50%] top-[50%] z-[120] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-background p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className,
    )}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

// Simplified AlertDialog component
interface AlertDialogProps {
  triggerContent?: React.ReactNode;
  title?: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "destructive" | "normal";
  cancelText?: string;
  onCancelClick?: () => void;
  actionText?: string;
  onActionClick?: () => void;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AlertDialog = ({
  triggerContent,
  title,
  description,
  icon,
  variant = "normal",
  cancelText,
  onCancelClick,
  actionText,
  onActionClick,
  children,
  open,
  onOpenChange,
}: AlertDialogProps) => {
  const hasIcon = !!icon;
  const hasHeader = title || description;
  const hasFooter = cancelText || actionText;

  const iconColorClass =
    variant === "destructive" ? "text-destructive" : "text-warning";
  const iconBgClass =
    variant === "destructive" ? "bg-destructive/10" : "bg-warning/10";

  const actionButtonClass =
    variant === "destructive"
      ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
      : undefined;

  return (
    <AlertDialogWrapper open={open} onOpenChange={onOpenChange}>
      {triggerContent && (
        <AlertDialogTrigger asChild>{triggerContent}</AlertDialogTrigger>
      )}
      <AlertDialogContent>
        {hasIcon || hasHeader ? (
          <div className="flex items-start gap-3">
            {icon && (
              <div
                className={cn(
                  "flex items-center justify-center shrink-0 w-9 h-9 rounded-full",
                  iconBgClass,
                  iconColorClass,
                )}
              >
                {icon}
              </div>
            )}
            {hasHeader && (
              <AlertDialogHeader className={icon ? "flex-1" : ""}>
                {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
                {description && (
                  <AlertDialogDescription>{description}</AlertDialogDescription>
                )}
              </AlertDialogHeader>
            )}
          </div>
        ) : null}
        {children}
        {hasFooter && (
          <AlertDialogFooter>
            {cancelText && (
              <AlertDialogCancel onClick={onCancelClick}>
                {cancelText}
              </AlertDialogCancel>
            )}
            {actionText && onActionClick && (
              <AlertDialogAction
                onClick={onActionClick}
                className={actionButtonClass}
              >
                {actionText}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialogWrapper>
  );
};

export { AlertDialog };
