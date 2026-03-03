"use client";

import { useEffect } from "react";

import { useFeatureFlags } from "@/lib/feature-flags";
import { ScrollArea } from "@/design-system/scroll-area";
import { Container } from "./container";

export function ChatLayout({
  sidebarContent,
  children,
  contentAlign = "start",
  demoBanner,
  containerBackground,
}: {
  sidebarContent: React.ReactNode;
  children: React.ReactNode;
  contentAlign?: "start" | "center";
  demoBanner?: React.ReactNode;
  containerBackground?: "primary" | "secondary";
}) {
  const { insetScrolling } = useFeatureFlags();

  // Prevent body scrolling when this layout is used (only if insetScrolling is enabled)
  useEffect(() => {
    if (insetScrolling) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [insetScrolling]);

  const Comp = insetScrolling ? ScrollArea : "div";
  const justifyClass =
    contentAlign === "center" ? "justify-center" : "justify-start";
  const contentPaddingClass =
    contentAlign === "center" ? "px-4 pb-4 pt-14" : "p-4";

  return (
    <div className="fixed inset-0 flex flex-col h-screen bg-sidebar p-2 gap-2 z-[100]">
      {demoBanner}
      <div className="flex flex-1 gap-2 min-h-0">
        <div className="flex flex-col w-1/4 md:w-1/3 px-2 text-sidebar-foreground min-h-0">
          {sidebarContent}
        </div>
        <Container background={containerBackground}>
          <Comp
            className={`h-full flex flex-col ${justifyClass} overflow-y-auto`}
          >
            <div className={`w-full max-w-7xl mx-auto ${contentPaddingClass}`}>
              {children}
            </div>
          </Comp>
        </Container>
      </div>
    </div>
  );
}
