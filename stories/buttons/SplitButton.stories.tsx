import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SplitButton } from "@/design-system/split-button";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/design-system/dropdown-menu";
import { Icon } from "@/design-system/icon";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof SplitButton> = {
  component: SplitButton,
  title: "Buttons/SplitButton",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <div className="flex flex-wrap gap-2">
          <Story />
        </div>
      </Container>
    ),
  ],
  argTypes: {
    mainButton: {
      control: "text",
      description: "Content for the main button area",
    },
    mainButtonProps: {
      control: "object",
      description: "Props passed to the main button",
    },
    open: {
      control: "boolean",
      description: "Whether the dropdown is open (controlled)",
    },
    onOpenChange: {
      action: "onOpenChange",
      description: "Callback when dropdown open state changes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mainButton: "Save",
    children: (
      <>
        <DropdownMenuItem>
          <Icon name="save" size={16} />
          Save
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="save_as" size={16} />
          Save As
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon name="download" size={16} />
          Export
        </DropdownMenuItem>
      </>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    mainButton: (
      <>
        <Icon name="add" size={16} />
        Add item
      </>
    ),
    children: (
      <>
        <DropdownMenuItem>
          <Icon name="add" size={16} />
          Add new
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="add_circle" size={16} />
          Add from template
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="upload" size={16} />
          Import
        </DropdownMenuItem>
      </>
    ),
  },
};

export const Destructive: Story = {
  args: {
    mainButton: "Delete",
    mainButtonProps: {
      variant: "destructive",
    },
    children: (
      <>
        <DropdownMenuItem>
          <Icon name="delete" size={16} />
          Delete selected
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="delete" size={16} />
          Delete permanently
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon name="archive" size={16} />
          Archive
        </DropdownMenuItem>
      </>
    ),
  },
};

export const Outline: Story = {
  args: {
    mainButton: "Export",
    mainButtonProps: {
      variant: "outline",
    },
    children: (
      <>
        <DropdownMenuItem>
          <Icon name="download" size={16} />
          Download CSV
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="download" size={16} />
          Download PDF
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon name="share" size={16} />
          Share link
        </DropdownMenuItem>
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    mainButton: "Filter",
    mainButtonProps: {
      size: "sm",
    },
    children: (
      <>
        <DropdownMenuItem>All items</DropdownMenuItem>
        <DropdownMenuItem>Active</DropdownMenuItem>
        <DropdownMenuItem>Inactive</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Custom filter</DropdownMenuItem>
      </>
    ),
  },
};

export const Large: Story = {
  args: {
    mainButton: "Create project",
    mainButtonProps: {
      size: "lg",
    },
    children: (
      <>
        <DropdownMenuItem>
          <Icon name="folder" size={16} />
          New folder
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="description" size={16} />
          New document
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="table_chart" size={16} />
          New spreadsheet
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon name="template" size={16} />
          From template
        </DropdownMenuItem>
      </>
    ),
  },
};

export const WithWaiting: Story = {
  args: {
    mainButton: "Save changes",
    mainButtonProps: {
      waiting: true,
    },
    children: (
      <>
        <DropdownMenuItem>
          <Icon name="save" size={16} />
          Save
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="save_as" size={16} />
          Save As
        </DropdownMenuItem>
      </>
    ),
  },
};

export const DisabledMainButton: Story = {
  args: {
    mainButton: "Main disabled",
    mainButtonProps: {
      disabled: true,
    },
    children: (
      <>
        <DropdownMenuItem>Option 1</DropdownMenuItem>
        <DropdownMenuItem>Option 2</DropdownMenuItem>
      </>
    ),
  },
};

export const DisabledDropdown: Story = {
  args: {
    mainButton: "Dropdown disabled",
    mainButtonProps: {
      onClick: () => alert("Main button clicked!"),
    },
    dropdownDisabled: true,
    children: (
      <>
        <DropdownMenuItem>Option 1</DropdownMenuItem>
        <DropdownMenuItem>Option 2</DropdownMenuItem>
      </>
    ),
  },
};

export const DisabledBoth: Story = {
  args: {
    mainButton: "Both disabled",
    mainButtonProps: {
      disabled: true,
    },
    dropdownDisabled: true,
    children: (
      <>
        <DropdownMenuItem>Option 1</DropdownMenuItem>
        <DropdownMenuItem>Option 2</DropdownMenuItem>
      </>
    ),
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm font-medium">Small:</span>
        <SplitButton mainButton="Filter" mainButtonProps={{ size: "sm" }}>
          <DropdownMenuItem>All items</DropdownMenuItem>
          <DropdownMenuItem>Active only</DropdownMenuItem>
          <DropdownMenuItem>Inactive only</DropdownMenuItem>
        </SplitButton>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm font-medium">Default:</span>
        <SplitButton mainButton="Save" mainButtonProps={{ size: "default" }}>
          <DropdownMenuItem>
            <Icon name="save" size={16} />
            Save
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="save_as" size={16} />
            Save as
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Icon name="download" size={16} />
            Export
          </DropdownMenuItem>
        </SplitButton>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm font-medium">Large:</span>
        <SplitButton
          mainButton="Create project"
          mainButtonProps={{ size: "lg" }}
        >
          <DropdownMenuItem>
            <Icon name="folder" size={16} />
            New folder
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="description" size={16} />
            New document
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Icon name="template" size={16} />
            From template
          </DropdownMenuItem>
        </SplitButton>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm font-medium">Default:</span>
        <SplitButton mainButton="Save" mainButtonProps={{ variant: "default" }}>
          <DropdownMenuItem>
            <Icon name="save" size={16} />
            Save
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="save_as" size={16} />
            Save As
          </DropdownMenuItem>
        </SplitButton>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm font-medium">Destructive:</span>
        <SplitButton
          mainButton="Delete"
          mainButtonProps={{ variant: "destructive" }}
        >
          <DropdownMenuItem>
            <Icon name="delete" size={16} />
            Delete selected
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="delete" size={16} />
            Delete all
          </DropdownMenuItem>
        </SplitButton>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm font-medium">Outline:</span>
        <SplitButton
          mainButton="Export"
          mainButtonProps={{ variant: "outline" }}
        >
          <DropdownMenuItem>
            <Icon name="download" size={16} />
            Export CSV
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="download" size={16} />
            Export PDF
          </DropdownMenuItem>
        </SplitButton>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm font-medium">Secondary:</span>
        <SplitButton
          mainButton="Filter"
          mainButtonProps={{ variant: "secondary" }}
        >
          <DropdownMenuItem>All items</DropdownMenuItem>
          <DropdownMenuItem>Active only</DropdownMenuItem>
          <DropdownMenuItem>Inactive only</DropdownMenuItem>
        </SplitButton>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm font-medium">Ghost:</span>
        <SplitButton mainButton="More" mainButtonProps={{ variant: "ghost" }}>
          <DropdownMenuItem>
            <Icon name="settings" size={16} />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="circle" size={16} />
            Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Icon name="logout" size={16} />
            Log out
          </DropdownMenuItem>
        </SplitButton>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm font-medium">Link:</span>
        <SplitButton mainButton="Share" mainButtonProps={{ variant: "link" }}>
          <DropdownMenuItem>
            <Icon name="share" size={16} />
            Copy link
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="mail" size={16} />
            Share via email
          </DropdownMenuItem>
        </SplitButton>
      </div>
    </div>
  ),
};
