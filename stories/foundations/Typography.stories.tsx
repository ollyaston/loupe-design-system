/* eslint-disable agent-loupe-ui/large-text-classes */

import React from "react";
import type { Meta } from "@storybook/nextjs-vite";
import { Container } from "@/components/layouts/container";
import { Heading } from "@/design-system/heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/design-system/table";

const meta: Meta = {
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
};

export default meta;

// Text size examples
const textSizes = [
  { class: "text-xs", name: "Extra small", description: "12px" },
  { class: "text-sm", name: "Small", description: "14px" },
  { class: "text-base", name: "Base", description: "16px" },
  { class: "text-lg", name: "Large", description: "18px" },
  { class: "text-xl", name: "Extra large", description: "20px" },
  { class: "text-2xl", name: "2x large", description: "24px" },
  { class: "text-3xl", name: "3x large", description: "30px" },
  { class: "text-4xl", name: "4x large", description: "36px" },
  { class: "text-5xl", name: "5x large", description: "48px" },
  { class: "text-6xl", name: "6x large", description: "60px" },
  { class: "text-7xl", name: "7x large", description: "72px" },
  { class: "text-8xl", name: "8x large", description: "96px" },
  { class: "text-9xl", name: "9x large", description: "128px" },
];

// Font weight examples
const fontWeights = [
  { class: "font-light", name: "Light", description: "300" },
  { class: "font-normal", name: "Normal", description: "400" },
  { class: "font-medium", name: "Medium", description: "500" },
  { class: "font-semibold", name: "Semibold", description: "600" },
  { class: "font-bold", name: "Bold", description: "700" },
  { class: "font-extrabold", name: "Extra bold", description: "800" },
];

// Container semantic text colors
const containerColors = [
  {
    class: "text-foreground",
    name: "Foreground",
    description: "Primary text color",
    backgroundClass: null,
  },
  {
    class: "text-muted-foreground",
    name: "Muted foreground",
    description: "Secondary text color",
    backgroundClass: null,
  },
  {
    class: "text-primary",
    name: "Primary",
    description: "Primary brand color for links and accent text",
    backgroundClass: null,
  },
  {
    class: "text-primary-foreground",
    name: "Primary foreground",
    description: "Text on primary background (buttons, etc.)",
    backgroundClass: "bg-primary",
  },
  {
    class: "text-secondary",
    name: "Secondary",
    description: "Secondary brand color for text",
    backgroundClass: null,
  },
  {
    class: "text-secondary-foreground",
    name: "Secondary foreground",
    description: "Text on secondary background (buttons, badges)",
    backgroundClass: "bg-secondary",
  },
  {
    class: "text-accent",
    name: "Accent",
    description: "Accent color for text",
    backgroundClass: null,
  },
  {
    class: "text-accent-foreground",
    name: "Accent foreground",
    description: "Text on accent background (hover states, selections)",
    backgroundClass: "bg-accent",
  },
  {
    class: "text-destructive",
    name: "Destructive",
    description: "Error/danger color",
    backgroundClass: null,
  },
  {
    class: "text-destructive-foreground",
    name: "Destructive foreground",
    description: "Text on destructive background",
    backgroundClass: "bg-destructive",
  },
  {
    class: "text-card-foreground",
    name: "Card foreground",
    description: "Text on card background",
    backgroundClass: "bg-card",
  },
  {
    class: "text-popover-foreground",
    name: "Popover foreground",
    description: "Text on popover background",
    backgroundClass: "bg-popover",
  },
];

// Sidebar semantic text colors
const sidebarColors = [
  {
    class: "text-sidebar-foreground",
    name: "Sidebar foreground",
    description: "Primary text color in sidebar",
    backgroundClass: null,
  },
  {
    class: "text-sidebar-primary",
    name: "Sidebar primary",
    description: "Primary color in sidebar",
    backgroundClass: null,
  },
  {
    class: "text-sidebar-primary-foreground",
    name: "Sidebar primary foreground",
    description: "Text on sidebar primary background",
    backgroundClass: "bg-sidebar-primary",
  },
  {
    class: "text-sidebar-accent",
    name: "Sidebar accent",
    description: "Accent color in sidebar",
    backgroundClass: null,
  },
  {
    class: "text-sidebar-accent-foreground",
    name: "Sidebar accent foreground",
    description: "Text on sidebar accent background",
    backgroundClass: "bg-sidebar-accent",
  },
];

// Font family examples
const fontFamilies = [
  {
    class: "font-sans",
    name: "DM Sans",
    description: "DM Sans, body text and UI",
  },
  {
    class: "font-serif",
    // eslint-disable-next-line agent-loupe-ui/sentence-case -- font name
    name: "DM Serif Text",
    description: "DM Serif Text, display and headings",
  },
  {
    class: "font-mono",
    name: "DM Mono",
    description: "DM Mono, code and monospace",
  },
];

// Text decoration examples
const textDecorations = [
  {
    class: "",
    name: "Regular",
    description: "Normal text style (no decoration)",
  },
  {
    class: "italic",
    name: "Italic",
    description: "Italic text style",
  },
  {
    class: "underline",
    name: "Underline",
    description: "Underlined text",
  },
  {
    class: "line-through",
    name: "Strikethrough",
    description: "Text with line through it",
  },
];

export const TextSizes = () => {
  return (
    <>
      <Heading
        size="large"
        title="Text sizes"
        description="All available text size utilities from Tailwind CSS"
      />
      <br />
      <br />

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Example</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {textSizes.map((size) => (
              <TableRow key={size.class}>
                <TableCell className="font-medium">{size.name}</TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {size.class}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {size.description}
                </TableCell>
                <TableCell className="max-w-xs">
                  <div
                    className={`${size.class} text-foreground whitespace-nowrap truncate`}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export const FontWeights = () => {
  return (
    <>
      <Heading
        size="large"
        title="Font weights"
        description="All available font weight utilities from Tailwind CSS"
      />
      <br />
      <br />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Example</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fontWeights.map((weight) => (
            <TableRow key={weight.class}>
              <TableCell className="font-medium">{weight.name}</TableCell>
              <TableCell className="font-mono text-sm text-muted-foreground">
                {weight.class}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {weight.description}
              </TableCell>
              <TableCell className="max-w-xs">
                <div
                  className={`${weight.class} text-2xl text-foreground whitespace-nowrap truncate`}
                >
                  The quick brown fox jumps over the lazy dog
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export const ContainerColors = () => {
  return (
    <>
      <Heading
        size="large"
        title="Container text colors"
        description="Semantic color utilities for text that lives inside containers (cards, popovers, etc.)"
      />
      <br />
      <br />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Example</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {containerColors.map((color) => (
            <TableRow key={color.class}>
              <TableCell className="font-medium">{color.name}</TableCell>
              <TableCell className="font-mono text-sm text-muted-foreground">
                {color.class}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {color.description}
              </TableCell>
              <TableCell className="max-w-xs">
                <div
                  className={`${color.class} text-lg whitespace-nowrap truncate ${
                    color.backgroundClass
                      ? `${color.backgroundClass} p-2 rounded`
                      : ""
                  }`}
                >
                  The quick brown fox jumps over the lazy dog
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export const SidebarColors = () => {
  return (
    <>
      <Heading
        size="large"
        title="Sidebar text colors"
        description="Semantic color utilities for text that lives outside containers (sidebar-specific colors)"
      />
      <br />
      <br />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Example</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sidebarColors.map((color) => (
            <TableRow key={color.class}>
              <TableCell className="font-medium">{color.name}</TableCell>
              <TableCell className="font-mono text-sm text-muted-foreground">
                {color.class}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {color.description}
              </TableCell>
              <TableCell className="max-w-xs">
                <div
                  className={`${color.class} text-lg whitespace-nowrap truncate ${
                    color.backgroundClass
                      ? `${color.backgroundClass} p-2 rounded`
                      : ""
                  }`}
                >
                  The quick brown fox jumps over the lazy dog
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export const FontFamilies = () => {
  return (
    <>
      <Heading
        size="large"
        title="Font families"
        description="Available font family utilities"
      />
      <br />
      <br />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Example</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fontFamilies.map((family) => (
            <TableRow key={family.class}>
              <TableCell className="font-medium">{family.name}</TableCell>
              <TableCell className="font-mono text-sm text-muted-foreground">
                {family.class}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {family.description}
              </TableCell>
              <TableCell className="max-w-xs">
                <div
                  className={`${family.class} text-xl text-foreground whitespace-nowrap truncate`}
                >
                  The quick brown fox jumps over the lazy dog
                </div>
                <div
                  className={`${family.class} text-sm text-muted-foreground mt-2 whitespace-nowrap truncate`}
                >
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
                  0123456789
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export const TextDecorations = () => {
  return (
    <>
      <Heading
        size="large"
        title="Text decorations"
        description="Text decoration utilities for italic, underline, and strikethrough"
      />
      <br />
      <br />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Example</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {textDecorations.map((decoration) => (
            <TableRow key={decoration.class}>
              <TableCell className="font-medium">{decoration.name}</TableCell>
              <TableCell className="font-mono text-sm text-muted-foreground">
                {decoration.class}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {decoration.description}
              </TableCell>
              <TableCell className="max-w-xs">
                <div
                  className={`${decoration.class} text-lg text-foreground whitespace-nowrap truncate`}
                >
                  The quick brown fox jumps over the lazy dog
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export const TypographyScale = () => {
  return (
    <>
      <Heading
        size="large"
        title="Typography scale"
        description="Complete typography scale showing size, weight, and color combinations"
      />
      <br />
      <br />

      <div className="space-y-4">
        <div className="text-5xl font-extrabold text-foreground">Heading 1</div>
        <div className="text-4xl font-bold text-foreground">Heading 2</div>
        <div className="text-3xl font-semibold text-foreground">Heading 3</div>
        <div className="text-2xl font-semibold text-foreground">Heading 4</div>
        <div className="text-xl font-medium text-foreground">Heading 5</div>
        <div className="text-lg font-medium text-foreground">Heading 6</div>
        <div className="text-lg text-foreground leading-relaxed">
          Large body text for important content and introductions. This size is
          perfect for lead paragraphs and key information that needs to stand
          out.
        </div>
        <div className="text-base text-foreground leading-relaxed">
          Regular body text for most content. This is the standard size for
          paragraphs, descriptions, and general reading content throughout the
          application.
        </div>
        <div className="text-sm text-foreground leading-relaxed">
          Small body text for secondary information, captions, and supporting
          details. Use this size for less important content that still needs to
          be readable.
        </div>
        <div className="text-xs text-muted-foreground leading-relaxed">
          Extra small text for labels, timestamps, and metadata. This size
          should be used sparingly and only for non-critical information.
        </div>
        <div className="text-base font-medium text-primary hover:text-primary/80 cursor-pointer">
          Primary link
        </div>
        <div className="text-base font-medium text-secondary hover:text-secondary/80 cursor-pointer">
          Secondary link
        </div>
        <div className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
          Muted link
        </div>
      </div>
    </>
  );
};

export const ResponsiveTypography = () => {
  // eslint-disable agent-loupe-ui/large-text-classes
  const responsiveExamples = [
    {
      class: "text-lg md:text-xl lg:text-2xl",
      description: "Responsive heading that scales from large to 2x large",
      example: "Responsive heading",
      exampleClass:
        "text-lg md:text-xl lg:text-2xl font-semibold text-foreground",
    },
    {
      class: "text-sm md:text-base lg:text-lg",
      description: "Responsive body text that scales appropriately",
      example:
        "This text will be small on mobile, base size on tablet, and large on desktop. Perfect for responsive design where readability is important across all devices.",
      exampleClass:
        "text-sm md:text-base lg:text-lg text-foreground leading-relaxed",
    },
    {
      class: "text-xs md:text-sm lg:text-base",
      description: "Responsive small text for captions and metadata",
      example: "Last updated 2 hours ago • 1,234 views",
      exampleClass: "text-xs md:text-sm lg:text-base text-muted-foreground",
    },
  ];
  // eslint-enable agent-loupe-ui/large-text-classes

  return (
    <>
      <Heading
        size="large"
        title="Responsive typography"
        description="Typography that adapts to different screen sizes using Tailwind's responsive prefixes"
      />
      <br />
      <br />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Class</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Example</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {responsiveExamples.map((example, index) => (
            <TableRow key={index}>
              <TableCell className="font-mono text-sm text-muted-foreground">
                {example.class}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {example.description}
              </TableCell>
              <TableCell className="max-w-md">
                <div
                  className={`${example.exampleClass} whitespace-nowrap truncate`}
                >
                  {example.example}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
