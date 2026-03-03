"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/design-system/dialog";
import { Button } from "@/design-system/button";
import { Icon } from "@/design-system/icon";
import { cn } from "@/lib/utils";

interface BottomSheetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string | React.ReactNode;
  children: React.ReactNode;
  /**
   * Height offset from the top of the viewport in pixels.
   * Default is 73px to match top margin and title height.
   */
  topOffset?: number;
  /**
   * Whether to show the close button in the header.
   * Default is true.
   */
  showCloseButton?: boolean;
  /**
   * Additional class name for the dialog content.
   */
  className?: string;
  /**
   * Custom z-index for the overlay (for stacking modals).
   */
  overlayClassName?: string;
  /**
   * Custom close handler for the close button.
   * If provided, this will be called instead of onOpenChange(false) for the close button.
   */
  onClose?: () => void;
}

function BottomSheetDialog({
  open,
  onOpenChange,
  title,
  children,
  topOffset = 73,
  showCloseButton = true,
  className,
  overlayClassName,
  onClose,
}: BottomSheetDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "loupe-system",
          "w-[calc(100vw-1rem)] max-w-none flex flex-col p-0 rounded-xl",
          "!top-auto !bottom-2 !right-2 !left-auto !translate-x-0 !translate-y-0",
          className,
        )}
        style={{
          height: `calc(100vh - ${topOffset}px - 0.5rem)`,
          maxHeight: `calc(100vh - ${topOffset}px - 0.5rem)`,
        }}
        showCloseButton={false}
        overlayClassName={overlayClassName}
      >
        {(title || showCloseButton) && (
          <DialogHeader className="px-6 pt-6 pb-4 relative shrink-0">
            {title && (
              <DialogTitle
                className={typeof title === "string" ? "text-xl" : ""}
              >
                {title}
              </DialogTitle>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
                onClick={() => {
                  if (onClose) {
                    onClose();
                  } else {
                    onOpenChange(false);
                  }
                }}
              >
                <Icon name="close" size={20} />
              </Button>
            )}
          </DialogHeader>
        )}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { BottomSheetDialog };
export type { BottomSheetDialogProps };
