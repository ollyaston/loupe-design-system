import React, { useEffect, ReactNode } from "react";

import { useFeatureFlags } from "@/lib/feature-flags";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/design-system/scroll-area";
import { Breadcrumb } from "@/design-system/breadcrumb";
import { SidebarTrigger, useSidebar } from "@/design-system/sidebar";
import { Separator } from "@/design-system/separator";

function PageWrapperFooter({ children }: { children: ReactNode }) {
  return (
    <div className="loupe-system w-full shrink-0 mt-auto relative isolate">
      {children}
    </div>
  );
}
PageWrapperFooter.displayName = "PageWrapperFooter";

function PageWrapper({
  // Header
  breadcrumbs,
  title,
  beta,
  actions,

  // Body
  children,
  sidebar,
  contentStyle = "default",
  compactBottom = false,

  // Footer
  footerContent,
}: {
  // Header
  breadcrumbs?: {
    label: string;
    href?: string;
  }[];
  title?: string | React.ReactNode;
  beta?: boolean;
  actions?: React.ReactNode;

  // Body
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  contentStyle?: "default" | "mini" | "nano";
  /** Reduces bottom padding to match header top padding (for grid pages) */
  compactBottom?: boolean;

  // Footer
  /**
   * Footer content is always visible & pinned to the bottom of the page.
   * e.g. a chat input box for a conversation.
   */
  footerContent?: ReactNode;
}) {
  const { insetScrolling } = useFeatureFlags();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  // Prevent body scrolling when PageWrapper is used (ScrollArea does the scrolling)
  useEffect(() => {
    if (insetScrolling) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [insetScrolling]);

  const content = (
    <div
      className={cn(
        "loupe-system",
        "pt-6 px-6 gap-6 w-full mx-auto overflow-hidden",
        // Reduce bottom padding to match header top padding (pt-2) for grid pages
        compactBottom ? "pb-2" : "pb-6",
        // When using insetScrolling, don't set min-height as the ScrollArea handles sizing
        // When not using insetScrolling, set min-height to ensure content fills viewport
        !insetScrolling && "min-h-[calc(100vh-100px)]",
        // Use grid for default style with sidebar, flex for others
        contentStyle === "default" && sidebar
          ? "lg:grid lg:grid-cols-[1fr_auto] flex flex-col"
          : "flex flex-col",
        contentStyle === "mini" && "",
        contentStyle === "nano" && "",
      )}
    >
      <div
        className={cn(
          "w-full min-w-0 overflow-hidden",
          contentStyle === "default" && "flex flex-col gap-6",
          contentStyle === "mini" && "max-w-[800px] pt-4 px-6 pb-6 mx-auto",
          contentStyle === "nano" && "",
        )}
      >
        {children}
      </div>
      {sidebar && (
        <div
          className={cn(
            "w-full lg:w-57 lg:pl-4 lg:ml-4 lg:border-l overflow-hidden",
          )}
        >
          {sidebar}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full min-h-0">
      {breadcrumbs && (
        <header
          className={cn(
            "loupe-system",
            "flex w-full shrink-0 items-center gap-2 h-14 px-6 pt-2 justify-between",
            // "border-b",
          )}
        >
          <div className="flex items-center">
            <div
              className={cn(
                "transition-all duration-200 ease-in-out",
                isCollapsed
                  ? "opacity-100 translate-x-0 w-auto pr-2"
                  : "opacity-0 -translate-x-2 pointer-events-none w-0 overflow-hidden",
              )}
            >
              <SidebarTrigger className="-ml-1" />
            </div>
            <div
              className={cn(
                "transition-all duration-200 ease-in-out",
                isCollapsed
                  ? "opacity-100 w-auto pr-2"
                  : "opacity-0 w-0 overflow-hidden",
              )}
            >
              <Separator orientation="vertical" className="h-4" />
            </div>
            <Breadcrumb items={breadcrumbs} size="large" />
          </div>
          <div className="flex items-center gap-3">{actions && actions}</div>
        </header>
      )}

      {insetScrolling ? (
        <ScrollArea className="flex-1 min-h-0">{content}</ScrollArea>
      ) : (
        content
      )}

      {footerContent ? (
        <PageWrapperFooter>{footerContent}</PageWrapperFooter>
      ) : null}
    </div>
  );
}

export { PageWrapper };
