import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ContextMenu } from "@/design-system/context-menu";
import { Container } from "@/components/layouts/container";

const meta = {
  component: ContextMenu,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        id: "copy",
        label: "Copy",
        icon: "content_copy",
        shortcut: "⌘C",
        onClick: () => console.log("Copy clicked"),
      },
      {
        id: "cut",
        label: "Cut",
        icon: "content_cut",
        shortcut: "⌘X",
        onClick: () => console.log("Cut clicked"),
      },
      {
        id: "paste",
        label: "Paste",
        icon: "content_paste",
        shortcut: "⌘V",
        onClick: () => console.log("Paste clicked"),
      },
      {
        id: "separator1",
        label: "",
        type: "separator",
      },
      {
        id: "edit",
        label: "Edit",
        icon: "edit",
        onClick: () => console.log("Edit clicked"),
      },
      {
        id: "delete",
        label: "Delete",
        icon: "delete",
        shortcut: "⌘⌫",
        onClick: () => console.log("Delete clicked"),
      },
    ],
    children: (
      <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </div>
    ),
  },
};

export const WithLabels: Story = {
  args: {
    items: [
      {
        id: "file-ops-label",
        label: "File operations",
        type: "label",
        group: "file-ops",
      },
      {
        id: "copy",
        label: "Copy",
        icon: "content_copy",
        shortcut: "⌘C",
        group: "file-ops",
        onClick: () => console.log("Copy clicked"),
      },
      {
        id: "cut",
        label: "Cut",
        icon: "content_cut",
        shortcut: "⌘X",
        group: "file-ops",
        onClick: () => console.log("Cut clicked"),
      },
      {
        id: "paste",
        label: "Paste",
        icon: "content_paste",
        shortcut: "⌘V",
        group: "file-ops",
        onClick: () => console.log("Paste clicked"),
      },
      {
        id: "actions-label",
        label: "Actions",
        type: "label",
        group: "actions",
      },
      {
        id: "edit",
        label: "Edit",
        icon: "edit",
        group: "actions",
        onClick: () => console.log("Edit clicked"),
      },
      {
        id: "delete",
        label: "Delete",
        icon: "delete",
        shortcut: "⌘⌫",
        group: "actions",
        onClick: () => console.log("Delete clicked"),
      },
    ],
    children: (
      <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </div>
    ),
  },
};

export const WithCheckboxes: Story = {
  args: {
    items: [
      {
        id: "view-options-label",
        label: "View options",
        type: "label",
        group: "view-options",
      },
      {
        id: "show-grid",
        label: "Show grid",
        type: "checkbox",
        checked: true,
        group: "view-options",
        onClick: () => console.log("Show grid toggled"),
      },
      {
        id: "show-labels",
        label: "Show labels",
        type: "checkbox",
        checked: true,
        group: "view-options",
        onClick: () => console.log("Show labels toggled"),
      },
      {
        id: "show-icons",
        label: "Show icons",
        type: "checkbox",
        checked: false,
        group: "view-options",
        onClick: () => console.log("Show icons toggled"),
      },
      {
        id: "show-timestamps",
        label: "Show timestamps",
        type: "checkbox",
        checked: false,
        group: "view-options",
        onClick: () => console.log("Show timestamps toggled"),
      },
      {
        id: "dark-mode",
        label: "Dark mode",
        type: "checkbox",
        checked: false,
        group: "theme",
        onClick: () => console.log("Dark mode toggled"),
      },
    ],
    children: (
      <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </div>
    ),
  },
};

export const WithRadioGroup: Story = {
  args: {
    items: [
      {
        id: "theme-label",
        label: "Theme",
        type: "label",
        group: "theme",
      },
      {
        id: "light",
        label: "Light",
        type: "radio",
        value: "light",
        group: "theme",
        onClick: () => console.log("Light theme selected"),
      },
      {
        id: "dark",
        label: "Dark",
        type: "radio",
        value: "dark",
        group: "theme",
        onClick: () => console.log("Dark theme selected"),
      },
      {
        id: "system",
        label: "System",
        type: "radio",
        value: "system",
        group: "theme",
        onClick: () => console.log("System theme selected"),
      },
      {
        id: "sort-label",
        label: "Sort by",
        type: "label",
        group: "sort",
      },
      {
        id: "name",
        label: "Name",
        type: "radio",
        value: "name",
        group: "sort",
        onClick: () => console.log("Sort by name selected"),
      },
      {
        id: "date",
        label: "Date modified",
        type: "radio",
        value: "date",
        group: "sort",
        onClick: () => console.log("Sort by date selected"),
      },
      {
        id: "size",
        label: "Size",
        type: "radio",
        value: "size",
        group: "sort",
        onClick: () => console.log("Sort by size selected"),
      },
    ],
    children: (
      <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </div>
    ),
  },
};

export const WithSubMenu: Story = {
  args: {
    items: [
      {
        id: "copy",
        label: "Copy",
        icon: "content_copy",
        shortcut: "⌘C",
        onClick: () => console.log("Copy clicked"),
      },
      {
        id: "cut",
        label: "Cut",
        icon: "content_cut",
        shortcut: "⌘X",
        onClick: () => console.log("Cut clicked"),
      },
      {
        id: "paste",
        label: "Paste",
        icon: "content_paste",
        shortcut: "⌘V",
        onClick: () => console.log("Paste clicked"),
      },
      {
        id: "share",
        label: "Share",
        icon: "share",
        subItems: [
          {
            id: "download",
            label: "Download",
            icon: "download",
            onClick: () => console.log("Download clicked"),
          },
          {
            id: "email",
            label: "Email",
            onClick: () => console.log("Email clicked"),
          },
          {
            id: "copy-link",
            label: "Copy link",
            onClick: () => console.log("Copy link clicked"),
          },
          {
            id: "social-separator",
            label: "",
            type: "separator",
          },
          {
            id: "social-media",
            label: "Social media",
            onClick: () => console.log("Social media clicked"),
          },
        ],
      },
      {
        id: "edit",
        label: "Edit",
        icon: "edit",
        onClick: () => console.log("Edit clicked"),
      },
      {
        id: "delete",
        label: "Delete",
        icon: "delete",
        shortcut: "⌘⌫",
        onClick: () => console.log("Delete clicked"),
      },
    ],
    children: (
      <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </div>
    ),
  },
};

export const FileContextMenu: Story = {
  args: {
    items: [
      {
        id: "file-label",
        label: "document.pdf",
        type: "label",
        group: "file",
      },
      {
        id: "copy",
        label: "Copy",
        icon: "content_copy",
        shortcut: "⌘C",
        group: "file",
        onClick: () => console.log("Copy clicked"),
      },
      {
        id: "cut",
        label: "Cut",
        icon: "content_cut",
        shortcut: "⌘X",
        group: "file",
        onClick: () => console.log("Cut clicked"),
      },
      {
        id: "paste",
        label: "Paste",
        icon: "content_paste",
        shortcut: "⌘V",
        group: "file",
        onClick: () => console.log("Paste clicked"),
      },
      {
        id: "download",
        label: "Download",
        icon: "download",
        shortcut: "⌘D",
        group: "actions",
        onClick: () => console.log("Download clicked"),
      },
      {
        id: "share",
        label: "Share",
        icon: "share",
        group: "actions",
        onClick: () => console.log("Share clicked"),
      },
      {
        id: "rename",
        label: "Rename",
        icon: "edit",
        shortcut: "F2",
        group: "actions",
        onClick: () => console.log("Rename clicked"),
      },
      {
        id: "delete",
        label: "Move to trash",
        icon: "delete",
        shortcut: "⌘⌫",
        group: "actions",
        onClick: () => console.log("Delete clicked"),
      },
    ],
    children: (
      <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click on a file
      </div>
    ),
  },
};

export const ImageContextMenu: Story = {
  args: {
    items: [
      {
        id: "image-label",
        label: "image.jpg",
        type: "label",
        group: "image",
      },
      {
        id: "copy-image",
        label: "Copy image",
        icon: "content_copy",
        shortcut: "⌘C",
        group: "image",
        onClick: () => console.log("Copy image clicked"),
      },
      {
        id: "save-as",
        label: "Save image as...",
        icon: "download",
        shortcut: "⌘S",
        group: "image",
        onClick: () => console.log("Save image as clicked"),
      },
      {
        id: "share-image",
        label: "Share image",
        icon: "share",
        group: "image",
        onClick: () => console.log("Share image clicked"),
      },
      {
        id: "view-new-tab",
        label: "View in new tab",
        shortcut: "⌘⏎",
        group: "browser",
        onClick: () => console.log("View in new tab clicked"),
      },
      {
        id: "inspect",
        label: "Inspect element",
        shortcut: "⌘⌥I",
        group: "browser",
        onClick: () => console.log("Inspect element clicked"),
      },
    ],
    children: (
      <div className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click on an image
      </div>
    ),
  },
};
