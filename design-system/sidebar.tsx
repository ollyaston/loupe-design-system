"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";

import { useFeatureFlags } from "@/lib/feature-flags";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/design-system/button";
import { Input } from "@/design-system/input";
import { Separator } from "@/design-system/separator";
import { Sheet } from "@/design-system/sheet";
import { Skeleton } from "@/design-system/skeleton";
import { Tooltip } from "@/design-system/tooltip";
import { Icon } from "@/design-system/icon";
import { HIDE_ICONS_WHEN_SIDEBAR_COLLAPSED } from "@/lib/ui-flags";
import { SidebarNavItem, type NavItem } from "@/design-system/sidebar-nav-item";

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3.5rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SIDEBAR_ANIMATE_SPEED_CLASS = "duration-400";

type SidebarContext = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
  isHovering: boolean;
  setIsHovering: (hovering: boolean) => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    enableHover?: boolean;
    initialOpen?: boolean; // Server-provided initial state
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      enableHover = false,
      initialOpen,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);
    const [isHovering, setIsHovering] = React.useState(false);

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(() => {
      // Use server-provided initial state or defaultOpen
      if (initialOpen !== undefined) {
        return initialOpen;
      }
      return defaultOpen;
    });

    const open = openProp ?? _open;
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value;

        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }
      },
      [setOpenProp, open, openProp],
    );

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((currentOpen) => !currentOpen);
    }, [isMobile, setOpen, setOpenMobile, open]);

    // Hover detection logic
    const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
      if (!enableHover || isMobile) return;

      const handleMouseMove = (event: MouseEvent) => {
        const { clientX } = event;

        // Check if mouse is within 20px of the left edge (trigger zone)
        if (clientX <= 20) {
          // Clear any pending hide timeout
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
          }
          setIsHovering(true);
        } else {
          // Mouse is outside the trigger zone
          // Check if mouse is within the hover overlay area (when visible)
          // The overlay is approximately 224px wide (16rem - 2rem = 14rem = 224px)
          const overlayWidth = 224;

          // Only schedule hiding if mouse is also outside the overlay area
          // This allows the overlay's own onMouseEnter/onMouseLeave to handle things
          // when the mouse is over it
          if (clientX > overlayWidth) {
            // Schedule hiding with a small delay to prevent flickering
            if (!hoverTimeoutRef.current) {
              hoverTimeoutRef.current = setTimeout(() => {
                setIsHovering(false);
                hoverTimeoutRef.current = null;
              }, 100);
            }
          } else {
            // Mouse is in the overlay area but not in trigger zone
            // Let the overlay handle its own hover state
            // Clear any pending hide timeout since we might be over the overlay
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
              hoverTimeoutRef.current = null;
            }
          }
        }
      };

      const handleMouseLeave = () => {
        // Mouse left the document - hide the sidebar
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
        setIsHovering(false);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
      };
    }, [enableHover, isMobile]);

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
        isHovering,
        setIsHovering,
      }),
      [
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
        isHovering,
        setIsHovering,
      ],
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper flex min-h-[calc(100svh-var(--sidebar-top-offset,0px))] w-full has-data-[variant=inset]:bg-sidebar bg-sidebar",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    );
  },
);
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "loupe-system",
            "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <Sheet
          open={openMobile}
          onOpenChange={setOpenMobile}
          side={side}
          {...props}
        >
          <div
            className="flex h-full w-full flex-col"
            data-sidebar="sidebar"
            data-mobile="true"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
          >
            {children}
          </div>
        </Sheet>
      );
    }

    return (
      <div
        ref={ref}
        className="loupe-system group peer hidden md:block text-sidebar-foreground"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            `${SIDEBAR_ANIMATE_SPEED_CLASS} relative h-[calc(100svh-var(--sidebar-top-offset,0px))] w-(--sidebar-width) bg-transparent transition-[width] ease-in-out`,
            "group-data-[collapsible=offcanvas]:w-0",
            HIDE_ICONS_WHEN_SIDEBAR_COLLAPSED &&
              "group-data-[collapsible=icon]:w-0",
            "group-data-[side=right]:rotate-180",
            variant === "floating" || variant === "inset"
              ? !HIDE_ICONS_WHEN_SIDEBAR_COLLAPSED &&
                  "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
              : !HIDE_ICONS_WHEN_SIDEBAR_COLLAPSED &&
                  "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
          )}
        />
        <div
          className={cn(
            `${SIDEBAR_ANIMATE_SPEED_CLASS} fixed top-[var(--sidebar-top-offset,0px)] bottom-0 z-10 hidden w-(--sidebar-width) transition-[left,right,width] ease-in-out md:flex`,
            side === "left"
              ? cn(
                  "left-0",
                  "group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]",
                  HIDE_ICONS_WHEN_SIDEBAR_COLLAPSED &&
                    "group-data-[collapsible=icon]:left-[calc(var(--sidebar-width)*-1)]",
                )
              : cn(
                  "right-0",
                  "group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                  HIDE_ICONS_WHEN_SIDEBAR_COLLAPSED &&
                    "group-data-[collapsible=icon]:right-[calc(var(--sidebar-width)*-1)]",
                ),
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? cn(
                  "p-2",
                  !HIDE_ICONS_WHEN_SIDEBAR_COLLAPSED &&
                    "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]",
                )
              : cn(
                  !HIDE_ICONS_WHEN_SIDEBAR_COLLAPSED &&
                    "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
                  "group-data-[side=left] group-data-[side=right]",
                ),
            className,
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className={cn(
              "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating] group-data-[variant=floating] group-data-[variant=floating]:shadow-sm",
              `transition-opacity ${SIDEBAR_ANIMATE_SPEED_CLASS} ease-in-out`,
              "group-data-[state=expanded]:opacity-100 group-data-[state=collapsed]:opacity-50",
            )}
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("loupe-system", "h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      {open ? (
        <Icon name="left_panel_closed" size={16} />
      ) : (
        <Icon name="left_panel_open" size={16} />
      )}
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle sidebar"
      className={cn(
        "loupe-system",
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
});
SidebarRail.displayName = "SidebarRail";

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  const { insetScrolling } = useFeatureFlags();
  return (
    <div className="bg-sidebar w-full h-full overflow-hidden">
      <main
        ref={ref}
        className={cn(
          "relative flex flex-1 flex-col bg-card overflow-x-hidden",
          "mt-2 mb-2 mr-2 rounded-xl border border-sidebar-border",
          insetScrolling
            ? "h-[calc(100vh-1rem-var(--sidebar-top-offset,0px))]"
            : "min-h-[calc(100svh-1rem-var(--sidebar-top-offset,0px))]",
          "peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm",
          HIDE_ICONS_WHEN_SIDEBAR_COLLAPSED && "ml-2",
          className,
        )}
        {...props}
      />
    </div>
  );
});
SidebarInset.displayName = "SidebarInset";

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className,
      )}
      {...props}
    />
  );
});
SidebarInput.displayName = "SidebarInput";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("loupe-system", "flex flex-col gap-2 p-2 pt-3", className)}
      {...props}
    />
  );
});
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("loupe-system", "flex flex-col", className)}
      {...props}
    />
  );
});
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => {
    return (
      <li data-sidebar="separator" className="loupe-system list-none">
        <Separator
          ref={ref}
          orientation={orientation}
          decorative={decorative}
          className={cn("mx-2 w-auto bg-sidebar-border", className)}
          {...props}
        />
      </li>
    );
  },
);
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "loupe-system",
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto",
        !HIDE_ICONS_WHEN_SIDEBAR_COLLAPSED &&
          "group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn(
        "loupe-system",
        "relative flex w-full min-w-0 flex-col p-2",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "loupe-system",
        `${SIDEBAR_ANIMATE_SPEED_CLASS} flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-hidden ring-sidebar-ring transition-[margin,opa] ease-in-out focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0`,
        !HIDE_ICONS_WHEN_SIDEBAR_COLLAPSED &&
          "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "loupe-system",
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("loupe-system", "w-full text-sm", className)}
    {...props}
  />
));
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn(
      "loupe-system",
      "flex w-full min-w-0 flex-col gap-1",
      className,
    )}
    {...props}
  />
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("loupe-system", "group/menu-item relative", className)}
    {...props}
  />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | { children: React.ReactNode };
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(
          "loupe-system",
          sidebarMenuButtonVariants({ variant, size }),
          !HIDE_ICONS_WHEN_SIDEBAR_COLLAPSED
            ? "group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!"
            : "",
          size === "lg" &&
            !HIDE_ICONS_WHEN_SIDEBAR_COLLAPSED &&
            "group-data-[collapsible=icon]:p-0!",
          className,
        )}
        {...props}
      />
    );

    if (!tooltip) {
      return button;
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      };
    }

    return (
      <Tooltip content={tooltip.children} side="right" delayDuration={5000}>
        {button}
      </Tooltip>
    );
  },
);
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "loupe-system",
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "loupe-system",
      "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      className,
    )}
    {...props}
  />
));
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean;
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn(
        "loupe-system",
        "rounded-md h-8 flex gap-2 px-2 items-center",
        className,
      )}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 flex-1 max-w-(--skeleton-width)"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "loupe-system",
      "ml-4 my-1 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      className,
    )}
    {...props}
  />
));
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "loupe-system",
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-hidden ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

const SidebarAnimatedPanelSwitcher = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    mainPanel: React.ReactNode;
    secondaryPanel: React.ReactNode;
    isOnSecondaryPanel: boolean;
  }
>(
  (
    { mainPanel, secondaryPanel, isOnSecondaryPanel, className, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "loupe-system relative h-full overflow-visible",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            `loupe-system absolute inset-0 flex flex-col transition-all ${SIDEBAR_ANIMATE_SPEED_CLASS} ease-in-out`,
            isOnSecondaryPanel
              ? "opacity-0 pointer-events-none -translate-x-[30%]"
              : "opacity-100 pointer-events-auto translate-x-0",
          )}
        >
          {mainPanel}
        </div>
        <div
          className={cn(
            `loupe-system absolute inset-0 flex flex-col transition-all ${SIDEBAR_ANIMATE_SPEED_CLASS} ease-in-out`,
            isOnSecondaryPanel
              ? "opacity-100 pointer-events-auto translate-x-0"
              : "opacity-0 pointer-events-none translate-x-[30%]",
          )}
        >
          {secondaryPanel}
        </div>
      </div>
    );
  },
);
SidebarAnimatedPanelSwitcher.displayName = "SidebarAnimatedPanelSwitcher";

const SidebarNavSection = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    label?: string;
    navItems: NavItem[];
  }
>(({ label, navItems, className, ...props }, ref) => {
  if (navItems.length === 0) {
    return null;
  }

  return (
    <SidebarGroup ref={ref} className={className} {...props}>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {navItems.map((navItem) => (
          <SidebarNavItem key={navItem.title} item={navItem} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
});
SidebarNavSection.displayName = "SidebarNavSection";

export {
  Sidebar,
  SidebarAnimatedPanelSwitcher,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarNavSection,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
