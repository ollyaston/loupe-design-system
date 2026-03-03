import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SplitPaneLayout } from "@/design-system/split-pane-layout";
import { Input } from "@/design-system/input";
import { Label } from "@/design-system/label";
import { Card, CardContent } from "@/design-system/card";

const meta: Meta<typeof SplitPaneLayout> = {
  title: "🚧 Quarantine/SplitPaneLayout",
  component: SplitPaneLayout,
  parameters: {
    docs: {
      description: {
        component:
          "⚠️ **PENDING DESIGN REVIEW** - This component is in quarantine awaiting designer approval before being added to the main design system.\n\nA split-screen layout component for form/preview patterns. The left pane typically contains a form and the right pane shows a live preview.",
      },
    },
    backgrounds: {
      default: "quarantine",
      values: [{ name: "quarantine", value: "#fff3cd" }],
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="h-[500px] border rounded-lg overflow-hidden">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SplitPaneLayout>;

const FormPane = () => (
  <div className="p-6 space-y-4">
    <h2 className="text-lg font-semibold">Edit details</h2>
    <div className="space-y-2">
      <Label>Title</Label>
      <Input placeholder="Enter title" defaultValue="My document" />
    </div>
    <div className="space-y-2">
      <Label>Description</Label>
      <Input placeholder="Enter description" />
    </div>
  </div>
);

const PreviewPane = () => (
  <div className="h-full flex items-center justify-center bg-muted/30 p-6">
    <Card className="w-full max-w-sm">
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-2">Preview</h3>
        <p className="text-sm text-muted-foreground">
          This area shows a live preview of the content being edited in the left
          pane.
        </p>
      </CardContent>
    </Card>
  </div>
);

export const Default: Story = {
  args: {
    leftPane: <FormPane />,
    rightPane: <PreviewPane />,
    splitRatio: "50/50",
  },
};

export const SixtyForty: Story = {
  args: {
    leftPane: <FormPane />,
    rightPane: <PreviewPane />,
    splitRatio: "60/40",
  },
  parameters: {
    docs: {
      description: {
        story: "60/40 split ratio gives more space to the form on the left.",
      },
    },
  },
};

export const FortysSixty: Story = {
  args: {
    leftPane: <FormPane />,
    rightPane: <PreviewPane />,
    splitRatio: "40/60",
  },
  parameters: {
    docs: {
      description: {
        story:
          "40/60 split ratio gives more space to the preview on the right.",
      },
    },
  },
};

export const WithDivider: Story = {
  args: {
    leftPane: <FormPane />,
    rightPane: <PreviewPane />,
    splitRatio: "50/50",
    showDivider: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Shows a vertical divider between the two panes.",
      },
    },
  },
};
