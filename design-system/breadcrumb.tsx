import * as React from "react";
import { Icon } from "./icon";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  items: BreadcrumbItem[];
  size?: "default" | "large";
  separator?: React.ReactNode;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, size = "default", separator, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className="loupe-system"
        {...props}
      >
        <ol
          className={cn(
            "flex flex-wrap items-center break-words text-muted-foreground",
            size === "default" && "gap-1.5 text-sm sm:gap-2.5",
            size === "large" && "gap-1 text-base sm:gap-1.5",
          )}
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <React.Fragment key={index}>
                <li
                  className={cn(
                    "inline-flex items-center",
                    size === "default" && "gap-1.5",
                    size === "large" && "gap-1",
                  )}
                >
                  {isLast ? (
                    <span
                      role="link"
                      aria-disabled="true"
                      aria-current="page"
                      className={cn(
                        "text-foreground",
                        size === "default" && "font-medium",
                        size === "large" && "font-semibold",
                      )}
                    >
                      {item.label}
                    </span>
                  ) : (
                    <a
                      href={item.href}
                      className={cn(
                        "transition-colors hover:text-foreground",
                        size === "large" && "font-normal",
                      )}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
                {index < items.length - 1 && (
                  <li
                    role="presentation"
                    aria-hidden="true"
                    className="flex items-center justify-center"
                  >
                    {separator ?? (
                      <Icon
                        name="chevron_right"
                        size={size === "large" ? 16 : 14}
                      />
                    )}
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  },
);
Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
