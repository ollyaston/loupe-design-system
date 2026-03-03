import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Markdown } from "@/design-system/markdown";
import { Container } from "@/components/layouts/container";

const meta = {
  title: "Text/Markdown",
  component: Markdown,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4 max-w-3xl">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Markdown>;

export default meta;
type Story = StoryObj<typeof Markdown>;

export const Default: Story = {
  args: {
    content: `# Heading 1

This is a paragraph with **bold text** and *italic text*.

## Heading 2

Here's a list:
- Item 1
- Item 2
- Item 3

### Heading 3

Here's a [link](https://example.com) to an external site.`,
  },
};

export const Compact: Story = {
  args: {
    content: `# Compact Heading

This is compact markdown with smaller text sizes.

## Subheading

- Compact list item 1
- Compact list item 2`,
    size: "compact",
  },
};

export const WithCitations: Story = {
  args: {
    content: `# Research Article

This is a research article with citations. Here's a claim that needs a source *Sources: [1, 2]*.

Another paragraph with multiple citations *Sources: [1, 3]*.

## Conclusion

Final thoughts with a single citation *Sources: [2]*.`,
    citationLinks: {
      1: "https://example.com/source1",
      2: "https://example.com/source2",
      3: "https://example.com/source3",
    },
  },
};

export const WithCode: Story = {
  args: {
    content: `# Code Example

Here's some inline code: \`const x = 5;\`

And here's a paragraph with code: The function \`formatNumber()\` formats numbers with suffixes.`,
  },
};

export const WithLists: Story = {
  args: {
    content: `# Lists Example

## Unordered List

- First item
- Second item
  - Nested item
  - Another nested item
- Third item

## Ordered List

1. First step
2. Second step
3. Third step`,
  },
};

export const CompactWithCitations: Story = {
  args: {
    content: `# Compact Research

This compact version has citations *Sources: [1]* and multiple sources *Sources: [1, 2]*.`,
    size: "compact",
    citationLinks: {
      1: "https://example.com/source1",
      2: "https://example.com/source2",
    },
  },
};

export const LongContent: Story = {
  args: {
    content: `# Long Form Content

This is a longer article with multiple sections and paragraphs.

## Section One

This is the first section with multiple paragraphs. It contains **important information** and *emphasized text*.

Here's another paragraph in the same section. It includes a [link to more information](https://example.com).

## Section Two

This section discusses various topics:

- Topic A with details
- Topic B with more details
- Topic C with even more details

### Subsection

This is a subsection with its own content and formatting.`,
  },
};

export const WithMissingCitations: Story = {
  args: {
    content: `# Article with Missing Citations

This article references citation [1] *Sources: [1]* and citation [2] *Sources: [2]*, but citation [2] is missing a URL.`,
    citationLinks: {
      1: "https://example.com/source1",
      // Citation 2 is intentionally missing
    },
  },
};
