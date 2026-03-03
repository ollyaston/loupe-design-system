import * as React from "react";
import { Card } from "@/design-system/card";
import { cn } from "@/lib/utils";

export interface CardWithPreviewProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The preview content to display at the top of the card
   */
  preview: React.ReactNode;
  /**
   * The height of the preview area (in tailwind units or px)
   * @default "h-64"
   */
  previewHeight?: string;
  /**
   * Optional className for the preview container
   */
  previewClassName?: string;
  /**
   * The main content of the card below the preview
   */
  children: React.ReactNode;
  /**
   * Optional className for the content container
   */
  contentClassName?: string;
}

/**
 * CardWithPreview - A card component with a preview area at the top and content below.
 * Commonly used for template galleries, file previews, or any content with a visual representation.
 */
export const CardWithPreview = React.forwardRef<
  HTMLDivElement,
  CardWithPreviewProps
>(
  (
    {
      preview,
      previewHeight = "h-64",
      previewClassName,
      children,
      contentClassName,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "loupe-system",
          "hover:shadow-md transition-shadow flex flex-col overflow-hidden",
          className,
        )}
        {...props}
      >
        {/* Preview area - rounded top and bottom so images get rounded corners */}
        <div
          className={cn(
            "bg-muted border-b border-border overflow-hidden rounded-t-xl rounded-b-xl",
            previewHeight,
            previewClassName,
          )}
        >
          {preview}
        </div>

        {/* Content area */}
        <div
          className={cn(
            "p-4 flex-1 flex flex-col rounded-b-xl",
            contentClassName,
          )}
        >
          {children}
        </div>
      </Card>
    );
  },
);

CardWithPreview.displayName = "CardWithPreview";
