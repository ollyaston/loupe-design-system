import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Kbd, KbdKey } from "@/design-system/shadcn-io/kbd";
import { Container } from "@/components/layouts/container";
import { Tooltip } from "@/design-system/tooltip";

const meta: Meta<typeof Kbd> = {
  component: Kbd,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Keyboard shortcut display component for showing key combinations and individual keys.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <Story />
        </div>
      </Container>
    ),
  ],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    children: {
      control: "text",
      description: "Key content or array of keys",
    },
    separator: {
      control: "text",
      description: 'Separator between keys (defaults to "+")',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic single key
export const SingleKey: Story = {
  args: {
    children: "Ctrl",
  },
};

// Multiple keys with default separator
export const MultipleKeys: Story = {
  args: {
    children: ["Ctrl", "C"],
  },
};

// Custom separator
export const CustomSeparator: Story = {
  args: {
    children: ["Cmd", "Shift", "K"],
    separator: " + ",
  },
};

// No separator
export const NoSeparator: Story = {
  args: {
    children: ["Ctrl", "Alt", "Del"],
    separator: "",
  },
};

// Keyboard shortcuts showcase
export const KeyboardShortcuts: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span>Copy:</span>
        <Kbd>Ctrl + C</Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Mac copy:</span>
        <Kbd>⌘ + C</Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Function key:</span>
        <Kbd>F5</Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Navigation:</span>
        <Kbd>Home</Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>Complex:</span>
        {/* eslint-disable-next-line agent-loupe-ui/sentence-case */}
        <Kbd>Ctrl + Shift + P</Kbd>
      </div>
    </div>
  ),
};

// KbdKey component stories
export const KbdKeyComponent: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {/* eslint-disable-next-line agent-loupe-ui/sentence-case */}
        <span>Using KbdKey:</span>
        <Kbd>
          <KbdKey>Ctrl</KbdKey>
          <span className="text-muted-foreground/50">+</span>
          <KbdKey>C</KbdKey>
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span>With aria-label:</span>
        <Kbd>
          <KbdKey aria-label="Control">Ctrl</KbdKey>
          <span className="text-muted-foreground/50">+</span>
          <KbdKey aria-label="C key">C</KbdKey>
        </Kbd>
      </div>
    </div>
  ),
};

// Inside tooltips
export const InsideTooltips: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span>Hover for shortcut info:</span>
        <Tooltip
          content={
            <div>
              <p>Open command palette</p>
              <Kbd className="text-xs mt-1">Ctrl + K</Kbd>
            </div>
          }
        >
          <button className="text-sm text-muted-foreground hover:text-foreground cursor-help">
            Hover over me
          </button>
        </Tooltip>
      </div>

      <div className="flex items-center gap-2">
        <span>Multiple shortcuts:</span>
        <Tooltip
          content={
            <div>
              <p>Open command palette (alternative)</p>
              {/* eslint-disable-next-line agent-loupe-ui/sentence-case */}
              <Kbd className="text-xs mt-1">Ctrl + Shift + P</Kbd>
            </div>
          }
        >
          <button className="text-sm text-muted-foreground hover:text-foreground cursor-help">
            Hover over me
          </button>
        </Tooltip>
      </div>

      <div className="flex items-center gap-2">
        <span>Quick actions:</span>
        <div className="flex gap-2">
          <Tooltip
            content={
              <div>
                <p>Copy selected text</p>
                <Kbd className="text-xs mt-1">Ctrl + C</Kbd>
              </div>
            }
          >
            <button className="text-sm text-muted-foreground hover:text-foreground cursor-help">
              Hover over me
            </button>
          </Tooltip>
          <Tooltip
            content={
              <div>
                <p>Paste from clipboard</p>
                <Kbd className="text-xs mt-1">Ctrl + V</Kbd>
              </div>
            }
          >
            <button className="text-sm text-muted-foreground hover:text-foreground cursor-help">
              Hover over me
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
};

// Sidebar variant
export const InSidebar: Story = {
  decorators: [],
  render: () => (
    <div className="bg-sidebar text-sidebar-foreground p-4 space-y-4 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-sm">Single key:</span>
        <Kbd variant="sidebar">Ctrl</Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Copy:</span>
        <Kbd variant="sidebar">Ctrl + C</Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Mac copy:</span>
        <Kbd variant="sidebar">⌘ + C</Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Function key:</span>
        <Kbd variant="sidebar">F5</Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Complex:</span>
        {/* eslint-disable-next-line agent-loupe-ui/sentence-case */}
        <Kbd variant="sidebar">Ctrl + Shift + P</Kbd>
      </div>
    </div>
  ),
};
