import * as React from "react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/design-system/card";
import { Separator } from "@/design-system/separator";

interface OnePagerLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  /**
   * Optional class name to customize the content area padding.
   * Default padding is p-6 (24px). Use this to override, e.g. "p-4" for 16px.
   */
  contentClassName?: string;
  /**
   * Whether to show automatic separators between children.
   * Default is true. Set to false when sections handle their own separators.
   */
  showSeparators?: boolean;
}

function OnePagerLayout({
  children,
  className,
  contentClassName,
  showSeparators = true,
}: OnePagerLayoutProps) {
  const validChildren = React.Children.toArray(children).filter(Boolean);

  return (
    <div
      className={cn(
        "loupe-system",
        "w-3/7 max-w-5xl mx-auto py-8 pb-16",
        className,
      )}
    >
      <Card className="border-none">
        <CardContent className={cn("pt-6 space-y-6", contentClassName)}>
          {validChildren.map((child, index) => (
            <React.Fragment key={index}>
              {child}
              {showSeparators && index < validChildren.length - 1 && (
                <Separator className="my-8" />
              )}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export { OnePagerLayout };
