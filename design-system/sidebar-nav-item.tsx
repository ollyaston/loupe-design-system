"use client";

import * as React from "react";
import Link from "next/link";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/design-system/sidebar";
import { Gem, GemId } from "@/design-system/gem";
import { Icon, type IconName } from "@/design-system/icon";
import { Badge } from "@/design-system/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/design-system/collapsible";
import { cn } from "@/lib/utils";

// Base properties shared by all nav items
type NavItemBase = {
  title: string;
  isVisible: boolean; // Required for the item to appear in the sidebar

  beta?: boolean;
  isActive?: boolean;
  externalLink?: boolean; // If true, renders as external link with arrow icon
  isFlagged?: boolean; // If true, item is controlled by a feature flag

  // Icon (optional - items can have neither icon nor gem)
  icon?: IconName;
  gem?: GemId;
};

// Nav item with nested items (no url allowed)
type NavItemWithNested = NavItemBase & {
  items: NavItem[];
  url?: never;
  onClick?: never;
};

// Nav item with url (no nested items allowed)
type NavItemWithUrl = NavItemBase & {
  url: string;
  items?: never;
  onClick?: never;
};

// Nav item with onClick handler (no url or nested items allowed)
type NavItemWithOnClick = NavItemBase & {
  onClick: () => void;
  url?: never;
  items?: never;
};

// Discriminated union: must have either nested items OR url OR onClick, but only one
export type NavItem = NavItemWithNested | NavItemWithUrl | NavItemWithOnClick;

// Type guard to check if item has nested items
function hasNestedItems(item: NavItem): item is NavItemWithNested {
  return "items" in item && Array.isArray(item.items) && item.items.length > 0;
}

// Type guard to check if item has url
function hasUrl(item: NavItem): item is NavItemWithUrl {
  return "url" in item && typeof item.url === "string";
}

// Type guard to check if item has onClick
function hasOnClick(item: NavItem): item is NavItemWithOnClick {
  return "onClick" in item && typeof item.onClick === "function";
}

export function SidebarNavItem({
  item,
}: {
  item: NavItem;
}): React.ReactElement {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!item.isVisible) {
    return <></>;
  }

  // Check if item has nested items and filter visible ones
  const itemHasNestedItems = hasNestedItems(item);
  const visibleNestedItems = itemHasNestedItems
    ? item.items.filter((subItem) => subItem.isVisible)
    : [];

  const linkContent = (
    <div className="relative flex items-center gap-2 justify-between w-full">
      <div className="relative flex items-center gap-2">
        {item.gem ? (
          <span className="ml-[2px]">
            <Gem id={item.gem} size={16} darkMode={true} />
          </span>
        ) : item.icon ? (
          <Icon name={item.icon} size={16} className="ml-[2px]" />
        ) : null}
        <span>{item.title}</span>
      </div>
      <div className="relative flex items-center gap-2">
        {item.beta && <Badge variant="sidebar">Beta</Badge>}
        {!itemHasNestedItems && item.externalLink && (
          <Icon name="arrow_outward" size={14} className="ml-1 opacity-70" />
        )}
        {itemHasNestedItems && visibleNestedItems.length > 0 && (
          <Icon
            name="keyboard_arrow_down"
            size={16}
            className={cn(
              "ml-1 opacity-70 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        )}
      </div>
    </div>
  );

  // If item has nested items, render as collapsible
  if (itemHasNestedItems && visibleNestedItems.length > 0) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <SidebarMenuItem className="loupe-system">
          <CollapsibleTrigger asChild>
            <SidebarMenuButton data-state={isOpen ? "open" : "closed"}>
              {linkContent}
            </SidebarMenuButton>
          </CollapsibleTrigger>
        </SidebarMenuItem>
        <CollapsibleContent>
          <SidebarMenuSub>
            {visibleNestedItems.map((subItem, index) => {
              // Nested items must have a url (enforced by type)
              if (!hasUrl(subItem)) {
                return null;
              }

              return (
                <SidebarMenuSubItem key={subItem.title || index}>
                  {subItem.externalLink ? (
                    <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                      <a
                        href={subItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {subItem.gem ? (
                          <Gem id={subItem.gem} size={16} darkMode={true} />
                        ) : subItem.icon ? (
                          <Icon name={subItem.icon} size={16} />
                        ) : null}
                        <span>{subItem.title}</span>
                        {subItem.beta && <Badge variant="sidebar">Beta</Badge>}
                        <Icon
                          name="arrow_outward"
                          size={14}
                          className="ml-auto opacity-70"
                        />
                      </a>
                    </SidebarMenuSubButton>
                  ) : (
                    <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                      <Link href={subItem.url}>
                        {subItem.gem ? (
                          <Gem id={subItem.gem} size={16} darkMode={true} />
                        ) : subItem.icon ? (
                          <Icon name={subItem.icon} size={16} />
                        ) : null}
                        <span>{subItem.title}</span>
                        {subItem.beta && <Badge variant="sidebar">Beta</Badge>}
                      </Link>
                    </SidebarMenuSubButton>
                  )}
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  // Item with onClick handler
  if (hasOnClick(item)) {
    return (
      <SidebarMenuItem className="loupe-system">
        <SidebarMenuButton onClick={item.onClick}>
          {linkContent}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  // Regular non-nested item - must have url (enforced by type)
  if (!hasUrl(item)) {
    return <></>;
  }

  return (
    <>
      <SidebarMenuItem className="loupe-system">
        <SidebarMenuButton asChild>
          {item.externalLink ? (
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {linkContent}
            </a>
          ) : (
            <Link href={item.url}>{linkContent}</Link>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  );
}
