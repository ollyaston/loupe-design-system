import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Sources } from "@/design-system/shadcn-io/ai/source";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof Sources> = {
  component: Sources,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSource: Story = {
  render: () => (
    <Sources
      sources={[
        {
          href: "https://example.com",
          title: "Example documentation",
          children: (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-info rounded"></div>
              <span className="font-medium">Example documentation</span>
            </div>
          ),
        },
      ]}
    />
  ),
};

export const MultipleSources: Story = {
  render: () => (
    <Sources
      sources={[
        {
          href: "https://docs.example.com",
          title: "Official documentation",
          children: (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-success rounded"></div>
              <span className="font-medium">Official documentation</span>
            </div>
          ),
        },
        {
          href: "https://github.com/example/repo",
          title: "GitHub repository",
          children: (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-neutral rounded"></div>
              <span className="font-medium">GitHub repository</span>
            </div>
          ),
        },
        {
          href: "https://blog.example.com/post",
          title: "Blog post",
          children: (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-info rounded"></div>
              <span className="font-medium">Blog post</span>
            </div>
          ),
        },
      ]}
    />
  ),
};

export const ManySources: Story = {
  render: () => (
    <Sources
      sources={[
        {
          href: "https://docs.example.com",
          title: "Official documentation",
        },
        {
          href: "https://github.com/example/repo",
          title: "GitHub repository",
        },
        {
          href: "https://blog.example.com/post",
          title: "Blog post",
        },
        {
          href: "https://stackoverflow.com/questions/123",
          // eslint-disable-next-line agent-loupe-ui/sentence-case
          title: "Stack Overflow answer",
        },
        {
          href: "https://medium.com/@user/article",
          title: "Medium article",
        },
        {
          href: "https://dev.to/user/post",
          title: "Dev.to post",
        },
        {
          href: "https://youtube.com/watch?v=abc123",
          title: "Youtube tutorial",
        },
      ]}
    />
  ),
};

export const SourcesOnly: Story = {
  render: () => (
    <Sources
      sources={[
        {
          href: "https://example.com",
          title: "Example source",
        },
        {
          href: "https://docs.example.com",
          title: "Documentation",
        },
      ]}
    />
  ),
};

export const CustomTrigger: Story = {
  render: () => (
    <Sources
      sources={[
        {
          href: "https://example.com",
          title: "Reference 1",
        },
        {
          href: "https://docs.example.com",
          title: "Reference 2",
        },
      ]}
      triggerContent={
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-info rounded"></div>
          <p className="font-medium">References (2)</p>
        </div>
      }
    />
  ),
};

export const LongSourceTitles: Story = {
  render: () => (
    <Sources
      sources={[
        {
          href: "https://example.com",
          title:
            "A very long source title that demonstrates how the component handles long text content",
        },
        {
          href: "https://docs.example.com",
          title:
            "Another extremely long title that shows text wrapping and proper spacing in the source component",
        },
        {
          href: "https://blog.example.com",
          title:
            "This title is so long that it should wrap to multiple lines and still look good",
        },
      ]}
    />
  ),
};

export const DifferentSourceTypes: Story = {
  render: () => (
    <Sources
      sources={[
        {
          href: "https://docs.example.com",
          title: "Documentation",
          children: (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-info rounded"></div>
              <span className="font-medium">📚 Documentation</span>
            </div>
          ),
        },
        {
          href: "https://github.com/example/repo",
          title: "GitHub repository",
          children: (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-neutral rounded"></div>
              <span className="font-medium">💻 GitHub repository</span>
            </div>
          ),
        },
        {
          href: "https://youtube.com/watch?v=abc123",
          title: "Video tutorial",
          children: (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-destructive rounded"></div>
              <span className="font-medium">🎥 Video tutorial</span>
            </div>
          ),
        },
        {
          href: "https://stackoverflow.com/questions/123",
          // eslint-disable-next-line agent-loupe-ui/sentence-case
          title: "Stack Overflow",
          children: (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-warning rounded"></div>
              <span className="font-medium">❓ Stack Overflow</span>
            </div>
          ),
        },
        {
          href: "https://blog.example.com/post",
          title: "Blog post",
          children: (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-success rounded"></div>
              <span className="font-medium">📝 Blog post</span>
            </div>
          ),
        },
      ]}
    />
  ),
};

export const CollapsedState: Story = {
  render: () => (
    <Sources
      sources={[
        {
          href: "https://example.com",
          title: "Source 1",
        },
        {
          href: "https://docs.example.com",
          title: "Source 2",
        },
        {
          href: "https://github.com/example/repo",
          title: "Source 3",
        },
        {
          href: "https://blog.example.com/post",
          title: "Source 4",
        },
      ]}
    />
  ),
};
