import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon } from "../../design-system/icon";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../../design-system/command";

const meta: Meta<typeof Command> = {
  component: Command,
  parameters: {
    docs: {
      description: {
        component:
          "A command menu component for keyboard navigation and search functionality.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Command>;

// Sample data for command items
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
    icon: "description",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
    icon: "description",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
    icon: "description",
  },
  {
    value: "remix",
    label: "Remix",
    icon: "description",
  },
  {
    value: "astro",
    label: "Astro",
    icon: "description",
  },
];

const actions = [
  {
    value: "calendar",
    label: "Calendar",
    icon: "event",
    shortcut: "⌘C",
  },
  {
    value: "calculator",
    label: "Calculator",
    icon: "calculate",
    shortcut: "⌘K",
  },
  {
    value: "settings",
    label: "Settings",
    icon: "settings",
    shortcut: "⌘S",
  },
  {
    value: "search",
    label: "Search",
    icon: "search",
    shortcut: "⌘F",
  },
];

const users = [
  {
    value: "john",
    label: "John Doe",
    icon: "people",
  },
  {
    value: "jane",
    label: "Jane Smith",
    icon: "people",
  },
  {
    value: "bob",
    label: "Bob Johnson",
    icon: "people",
  },
];

export const Default: Story = {
  render: (args) => (
    <Command {...args} className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {actions.map((action) => (
            <CommandItem key={action.value} value={action.value}>
              <Icon name={action.icon} size={16} className="mr-2" />
              <span>{action.label}</span>
              <CommandShortcut>{action.shortcut}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Frameworks">
          {frameworks.map((framework) => (
            <CommandItem key={framework.value} value={framework.value}>
              <Icon name={framework.icon} size={16} className="mr-2" />
              <span>{framework.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const WithDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-info text-primary-foreground rounded hover:bg-info/80"
        >
          Open command menu
        </button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Actions">
              {actions.map((action) => (
                <CommandItem key={action.value} value={action.value}>
                  <Icon name={action.icon} size={16} className="mr-2" />
                  <span>{action.label}</span>
                  <CommandShortcut>{action.shortcut}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Users">
              {users.map((user) => (
                <CommandItem key={user.value} value={user.value}>
                  <Icon name={user.icon} size={16} className="mr-2" />
                  <span>{user.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  },
};

export const SimpleList: Story = {
  render: (args) => (
    <Command {...args} className="rounded-lg border shadow-md">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          <CommandItem value="item-1">
            <Icon name="mood" size={16} className="mr-2" />
            <span>Item 1</span>
          </CommandItem>
          <CommandItem value="item-2">
            <Icon name="mail" size={16} className="mr-2" />
            <span>Item 2</span>
          </CommandItem>
          <CommandItem value="item-3">
            <Icon name="settings" size={16} className="mr-2" />
            <span>Item 3</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const WithShortcuts: Story = {
  render: (args) => (
    <Command {...args} className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Quick actions">
          <CommandItem value="new-file">
            <Icon name="description" size={16} className="mr-2" />
            <span>New file</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem value="save">
            <Icon name="description" size={16} className="mr-2" />
            <span>Save</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
          <CommandItem value="undo">
            <Icon name="description" size={16} className="mr-2" />
            <span>Undo</span>
            <CommandShortcut>⌘Z</CommandShortcut>
          </CommandItem>
          <CommandItem value="redo">
            <Icon name="description" size={16} className="mr-2" />
            <span>Redo</span>
            <CommandShortcut>⌘⇧Z</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
