import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-semibold text-foreground leading-tight", {
  variants: {
    size: {
      "x-large": "text-3xl md:text-4xl lg:text-5xl",
      large: "text-xl md:text-2xl lg:text-3xl",
      normal: "text-lg md:text-xl lg:text-2xl",
      section: "text-base md:text-lg lg:text-xl",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    size: "normal",
    align: "left",
  },
});

const descriptionVariants = cva("text-muted-foreground leading-relaxed", {
  variants: {
    size: {
      "x-large": "text-base md:text-lg mt-1.5",
      large: "text-sm md:text-base mt-1",
      normal: "text-xs md:text-sm mt-0.5",
      section: "text-xs md:text-sm mt-0.5",
    },
  },
  defaultVariants: {
    size: "normal",
  },
});

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "children" | "title">,
    VariantProps<typeof headingVariants> {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  actionsContent?: React.ReactNode;
  badgeContent?: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span" | "p";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      className,
      size,
      align,
      title,
      description,
      actionsContent,
      badgeContent,
      as = "h2",
      ...props
    },
    ref,
  ) => {
    const Element = as;

    return (
      <div
        className={cn(
          "loupe-system",
          "space-y-0",
          align === "center" && "text-center",
          align === "right" && "text-right",
          className,
        )}
      >
        <div
          className={cn(
            "flex items-center gap-4",
            align === "center" ? "justify-center" : "justify-between",
          )}
        >
          <div
            className={cn(
              align === "center"
                ? "flex flex-col items-center"
                : "flex-1 min-w-0",
            )}
          >
            <div
              className={cn(
                "flex items-center gap-2",
                align === "center" && "justify-center",
              )}
            >
              <Element
                className={cn("loupe-system", headingVariants({ size, align }))}
                ref={ref}
                {...props}
              >
                {title}
              </Element>
              {badgeContent && (
                <div className="flex-shrink-0">{badgeContent}</div>
              )}
            </div>
            {description && (
              <p className={cn("loupe-system", descriptionVariants({ size }))}>
                {description}
              </p>
            )}
          </div>
          {actionsContent && align !== "center" && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {actionsContent}
            </div>
          )}
        </div>
        {actionsContent && align === "center" && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {actionsContent}
          </div>
        )}
      </div>
    );
  },
);
Heading.displayName = "Heading";

export { Heading, headingVariants, descriptionVariants };
