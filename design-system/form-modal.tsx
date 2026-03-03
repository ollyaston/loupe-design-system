"use client";

import * as React from "react";
import { Button } from "./button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { cn } from "@/lib/utils";

interface FormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  onSubmit: () => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  submittingLabel?: string;
  cancelLabel?: string;
  width?: string;
  footer?: React.ReactNode;
  className?: string;
}

export function FormModal({
  open,
  onOpenChange,
  title,
  children,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = "Save",
  submittingLabel = "Saving...",
  cancelLabel = "Cancel",
  width = "640px",
  footer,
  className,
}: FormModalProps) {
  const handleClose = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "loupe-system rounded-[24px] border border-border bg-background shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] max-h-[85vh] overflow-hidden p-0 max-w-none",
          className,
        )}
        style={{ width, borderRadius: "24px" }}
        showCloseButton={false}
      >
        <form onSubmit={handleSubmit} className="flex flex-col max-h-[85vh]">
          <div className="overflow-y-auto flex-1 p-6">
            <div className="flex flex-col gap-6">
              <DialogHeader>
                <DialogTitle className="text-foreground font-sans text-lg font-medium leading-6">
                  {title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">{children}</div>
            </div>
          </div>
          {footer ?? (
            <div className="flex justify-between p-6 border-t border-border bg-background">
              <Button type="button" variant="outline" onClick={handleClose}>
                {cancelLabel}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? submittingLabel : submitLabel}
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
