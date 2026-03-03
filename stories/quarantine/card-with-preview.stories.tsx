import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Image from "next/image";
import { CardWithPreview } from "@/design-system/card-with-preview";
import { Button } from "@/design-system/button";
import { Badge } from "@/design-system/badge";
import { Icon } from "@/design-system/icon";
import {
  DropdownMenuWrapper,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/design-system/dropdown-menu";

const meta = {
  title: "🚧 Quarantine/CardWithPreview",
  component: CardWithPreview,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "⚠️ **PENDING DESIGN REVIEW** - This component is in quarantine awaiting designer approval before being added to the main design system.\n\nA card component with a preview area at the top and content below. Commonly used for template galleries, file previews, or any content with a visual representation.",
      },
    },
    backgrounds: {
      default: "quarantine",
      values: [{ name: "quarantine", value: "#fff3cd" }],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    preview: {
      description: "The preview content to display at the top of the card",
      control: false,
    },
    previewHeight: {
      description: "The height of the preview area",
      control: "text",
    },
    previewClassName: {
      description: "Optional className for the preview container",
      control: "text",
    },
    children: {
      description: "The main content of the card below the preview",
      control: false,
    },
    contentClassName: {
      description: "Optional className for the content container",
      control: "text",
    },
  },
} satisfies Meta<typeof CardWithPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic usage with simple preview content
 */
export const Default: Story = {
  args: {
    preview: (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <div className="text-center">
          <Icon
            name="image"
            size={48}
            className="text-muted-foreground mx-auto mb-2"
          />
          <p className="text-sm text-muted-foreground">Preview content</p>
        </div>
      </div>
    ),
    children: (
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">
          Card title
        </h3>
        <p className="text-xs text-muted-foreground">
          This is the main content area of the card.
        </p>
      </div>
    ),
  },
};

/**
 * Template card example - similar to quote templates page
 */
export const TemplateCard: Story = {
  args: {
    preview: (
      <div className="w-full h-full bg-card p-8">
        <div className="bg-accent h-full rounded-lg border border-border p-6">
          <div className="space-y-3">
            <div className="h-3 bg-accent-foreground/20 rounded w-3/4"></div>
            <div className="h-3 bg-accent-foreground/10 rounded w-full"></div>
            <div className="h-3 bg-accent-foreground/10 rounded w-5/6"></div>
            <div className="h-8 bg-card rounded mt-4 border border-border"></div>
          </div>
        </div>
      </div>
    ),
    children: (
      <>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold text-foreground truncate">
                Professional template
              </h3>
              <Badge variant="secondary" className="text-xs flex-shrink-0">
                Default
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              A clean and professional template for quotes and proposals
            </p>
          </div>
          <DropdownMenuWrapper>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="sm" className="flex-shrink-0">
                <Icon name="more_vert" size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Icon name="visibility" size={16} />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="content_copy" size={16} />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Icon name="delete" size={16} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuWrapper>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
          <div className="flex items-center gap-1">
            <Icon name="widgets" size={12} />
            <span>8 blocks</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="schedule" size={12} />
            <span>Dec 1, 2024</span>
          </div>
        </div>
      </>
    ),
  },
};

/**
 * Image preview card
 */
export const ImageCard: Story = {
  args: {
    preview: (
      <div className="relative w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=300&fit=crop"
          alt="Preview"
          fill
          className="object-cover"
        />
      </div>
    ),
    children: (
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1">
          Mountain landscape
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          A beautiful mountain landscape photograph
        </p>
        <Button size="sm" className="w-full">
          View details
        </Button>
      </div>
    ),
  },
};

/**
 * Custom height preview
 */
export const CustomHeight: Story = {
  args: {
    previewHeight: "h-48",
    preview: (
      <div className="w-full h-full flex items-center justify-center bg-success/10">
        <Icon name="folder" size={32} className="text-success" />
      </div>
    ),
    children: (
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">
          Custom height card
        </h3>
        <p className="text-xs text-muted-foreground">
          This card has a custom preview height of h-48
        </p>
      </div>
    ),
  },
};

/**
 * Grid layout with multiple cards
 */
export const GridLayout: Story = {
  args: {
    preview: <></>,
    children: <></>,
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <CardWithPreview
          key={i}
          className="cursor-pointer"
          preview={
            <div
              className={`w-full h-full flex items-center justify-center ${
                i % 3 === 0
                  ? "bg-info/10"
                  : i % 3 === 1
                    ? "bg-accent"
                    : "bg-success/10"
              }`}
            >
              <Icon
                name="description"
                size={32}
                className={
                  i % 3 === 0
                    ? "text-info"
                    : i % 3 === 1
                      ? "text-accent-foreground"
                      : "text-success"
                }
              />
            </div>
          }
        >
          <h3 className="text-sm font-semibold text-foreground mb-1">
            Template {i}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
            Description for template {i}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
            <Icon name="schedule" size={12} />
            <span>Updated today</span>
          </div>
        </CardWithPreview>
      ))}
    </div>
  ),
};

/**
 * With clickable action
 */
export const ClickableCard: Story = {
  args: {
    className: "cursor-pointer",
    onClick: () => alert("Card clicked!"),
    preview: (
      <div className="w-full h-full flex items-center justify-center bg-warning/10">
        <Icon name="touch_app" size={48} className="text-warning" />
      </div>
    ),
    children: (
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">
          Clickable card
        </h3>
        <p className="text-xs text-muted-foreground">
          Click anywhere on this card to trigger an action
        </p>
      </div>
    ),
  },
};
