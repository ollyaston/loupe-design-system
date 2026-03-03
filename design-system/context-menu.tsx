"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Icon, type IconName } from "@/design-system/icon";

import { cn } from "@/lib/utils";

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: IconName;
  shortcut?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "item" | "separator" | "label" | "checkbox" | "radio";
  checked?: boolean;
  value?: string;
  group?: string;
  subItems?: ContextMenuItem[];
}

interface ContextMenuProps {
  children: React.ReactNode;
  items: ContextMenuItem[];
  triggerClassName?: string;
  onItemClick?: (item: ContextMenuItem) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  items,
  triggerClassName,
  onItemClick,
  ...props
}) => {
  const renderMenuItem = (item: ContextMenuItem, index: number) => {
    if (item.type === "separator") {
      return (
        <ContextMenuPrimitive.Separator
          key={`separator-${index}`}
          className="-mx-1 my-1 h-px bg-border"
        />
      );
    }

    if (item.type === "label") {
      return (
        <ContextMenuPrimitive.Label
          key={`label-${item.id}`}
          className="px-2 py-1.5 text-sm font-semibold text-foreground"
        >
          {item.label}
        </ContextMenuPrimitive.Label>
      );
    }

    if (item.type === "checkbox") {
      return (
        <ContextMenuPrimitive.CheckboxItem
          key={item.id}
          className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          checked={item.checked}
          disabled={item.disabled}
          onSelect={() => {
            item.onClick?.();
            onItemClick?.(item);
          }}
        >
          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <ContextMenuPrimitive.ItemIndicator>
              <Icon name="check" size={16} />
            </ContextMenuPrimitive.ItemIndicator>
          </span>
          {item.label}
        </ContextMenuPrimitive.CheckboxItem>
      );
    }

    if (item.type === "radio") {
      return (
        <ContextMenuPrimitive.RadioItem
          key={item.id}
          className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          value={item.value || item.id}
          disabled={item.disabled}
          onSelect={() => {
            item.onClick?.();
            onItemClick?.(item);
          }}
        >
          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <ContextMenuPrimitive.ItemIndicator>
              <Icon name="radio_button_checked" size={16} />
            </ContextMenuPrimitive.ItemIndicator>
          </span>
          {item.label}
        </ContextMenuPrimitive.RadioItem>
      );
    }

    // Regular item or submenu
    if (item.subItems && item.subItems.length > 0) {
      return (
        <ContextMenuPrimitive.Sub key={item.id}>
          <ContextMenuPrimitive.SubTrigger
            className="flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
            disabled={item.disabled}
          >
            {item.icon && <Icon name={item.icon} size={16} className="mr-2" />}
            {item.label}
            <Icon name="chevron_right" size={16} className="ml-auto" />
          </ContextMenuPrimitive.SubTrigger>
          <ContextMenuPrimitive.SubContent className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]">
            {item.subItems.map((subItem, subIndex) =>
              renderMenuItem(subItem, subIndex),
            )}
          </ContextMenuPrimitive.SubContent>
        </ContextMenuPrimitive.Sub>
      );
    }

    // Regular menu item
    return (
      <ContextMenuPrimitive.Item
        key={item.id}
        className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
        disabled={item.disabled}
        onSelect={() => {
          item.onClick?.();
          onItemClick?.(item);
        }}
      >
        {item.icon && <Icon name={item.icon} size={16} className="mr-2" />}
        {item.label}
        {item.shortcut && (
          <span className="ml-auto text-xs tracking-widest text-muted-foreground">
            {item.shortcut}
          </span>
        )}
      </ContextMenuPrimitive.Item>
    );
  };

  // Group items by their group property
  const groupedItems = items.reduce(
    (groups, item) => {
      const group = item.group || "default";
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(item);
      return groups;
    },
    {} as Record<string, ContextMenuItem[]>,
  );

  return (
    <ContextMenuPrimitive.Root {...props}>
      <ContextMenuPrimitive.Trigger
        className={cn("cursor-context-menu", triggerClassName)}
        asChild
      >
        {children}
      </ContextMenuPrimitive.Trigger>
      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Content className="loupe-system z-50 max-h-[--radix-context-menu-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]">
          {Object.entries(groupedItems).map(
            ([groupName, groupItems], groupIndex) => (
              <React.Fragment key={groupName}>
                {groupIndex > 0 && (
                  <ContextMenuPrimitive.Separator className="-mx-1 my-1 h-px bg-border" />
                )}
                {groupItems.map((item, index) => renderMenuItem(item, index))}
              </React.Fragment>
            ),
          )}
        </ContextMenuPrimitive.Content>
      </ContextMenuPrimitive.Portal>
    </ContextMenuPrimitive.Root>
  );
};

ContextMenu.displayName = "ContextMenu";

export { ContextMenu };
