"use client";

// This is a UI-only component that wraps content with a sidebar
// It doesn't have app logic or app state
// It also implements individual sidebar components from shad

import * as React from "react";

import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarRail,
  useSidebar,
} from "@/design-system/sidebar";
import { useFeatureFlags } from "@/lib/feature-flags";
import { cn } from "@/lib/utils";

// Sidebar icon width when collapsed (3.5rem = 56px)
const SIDEBAR_ICON_WIDTH_PX = 56;

export function SidebarLayout({
  demoBanner,
  sidebarContent,
  children,
  open,
  onOpenChange,
  enableHover,
  resizable = false,
  width = "16rem",
  onResizeStart,
}: {
  demoBanner?: React.ReactNode;
  sidebarContent: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enableHover: boolean;
  resizable?: boolean;
  width?: string;
  onResizeStart?: () => void;
}) {
  return (
    <>
      {demoBanner && <div className="px-2 pt-2 bg-sidebar">{demoBanner}</div>}
      <SidebarProvider
        enableHover={enableHover}
        open={open}
        onOpenChange={onOpenChange}
        initialOpen={open}
        style={{ "--sidebar-width": width } as React.CSSProperties}
      >
        <IntercomPositionUpdater sidebarWidth={width} />
        {enableHover && (
          <HoverSidebarOverlay>{sidebarContent}</HoverSidebarOverlay>
        )}
        <Sidebar collapsible="icon">
          {sidebarContent}
          {resizable && open && onResizeStart && (
            <SidebarRail
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onResizeStart();
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="cursor-ew-resize hover:bg-sidebar-border/50 top-2 bottom-2"
            />
          )}
        </Sidebar>
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
}

function HoverSidebarOverlay({ children }: { children: React.ReactNode }) {
  const { state, isHovering, setIsHovering } = useSidebar();
  const { insetScrolling } = useFeatureFlags();

  // Only render when sidebar is collapsed
  if (state !== "collapsed") {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed top-[var(--sidebar-top-offset,0px)] bottom-0 left-0 z-50 bg-sidebar text-sidebar-foreground shadow-xl border border-sidebar-border rounded-lg transition-all duration-200 ease-out pointer-events-none",
        insetScrolling && "m-2",
      )}
      style={{
        width: "calc(var(--sidebar-width) - 2rem)",
        transform: isHovering ? "translateX(0)" : "translateX(-100%)",
        opacity: isHovering ? 1 : 0,
        pointerEvents: isHovering ? "auto" : "none",
      }}
      onMouseEnter={() => {
        // Keep the sidebar open when hovering over it
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        // Only close when leaving the sidebar area
        setIsHovering(false);
      }}
    >
      <div className="flex h-full w-full flex-col rounded-lg overflow-visible">
        {children}
      </div>
    </div>
  );
}

// Fixed offset from the left edge of the main content area
const INTERCOM_CONTENT_OFFSET_PX = 20;

// Component to update Intercom messenger position based on sidebar state
function IntercomPositionUpdater({ sidebarWidth }: { sidebarWidth: string }) {
  const { state, isHovering } = useSidebar();
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const lastPositionRef = React.useRef<number | null>(null);

  // Inject CSS for smooth transitions on mount
  React.useEffect(() => {
    if (typeof document === "undefined") return;

    const styleId = "intercom-transition-styles";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    // Use 200ms to match sidebar transition speed
    style.textContent = `
      .intercom-lightweight-app-launcher,
      .intercom-launcher,
      .intercom-messenger-frame,
      .intercom-app > div,
      .intercom-namespace .intercom-with-namespace-52k34s {
        transition: left 0.2s ease-out !important;
      }
      iframe.intercom-launcher-frame,
      iframe.intercom-messenger-frame {
        transition: left 0.2s ease-out !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.Intercom) return;

    // Convert sidebar width to pixels
    let widthPx: number;
    if (sidebarWidth.endsWith("px")) {
      widthPx = parseInt(sidebarWidth, 10);
    } else if (sidebarWidth.endsWith("rem")) {
      // Convert rem to px (assuming 16px base font size)
      widthPx = parseFloat(sidebarWidth) * 16;
    } else {
      widthPx = 256; // Default fallback
    }

    // Calculate horizontal padding based on sidebar state
    // Maintain consistent 20px offset from sidebar edge in all states
    let horizontalPadding: number;
    if (state === "expanded") {
      // Expanded: 20px from full sidebar edge
      horizontalPadding = widthPx + INTERCOM_CONTENT_OFFSET_PX;
    } else if (isHovering) {
      // Hovering: 20px from hover overlay edge (overlay is sidebar-width - 2rem)
      const hoverOverlayWidth = widthPx - 32; // 2rem = 32px
      horizontalPadding = hoverOverlayWidth + INTERCOM_CONTENT_OFFSET_PX;
    } else {
      // Collapsed: 20px from left edge of screen
      horizontalPadding = 20;
    }

    // Skip if position hasn't changed
    if (lastPositionRef.current === horizontalPadding) return;

    // Clear any pending update
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce the update to prevent glitches from rapid state changes
    timeoutRef.current = setTimeout(() => {
      lastPositionRef.current = horizontalPadding;
      (window.Intercom as (command: string, settings: object) => void)(
        "update",
        { horizontal_padding: horizontalPadding },
      );
    }, 50);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [state, isHovering, sidebarWidth]);

  return null;
}
