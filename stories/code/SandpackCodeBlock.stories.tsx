import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  SandpackCodeBlock,
  SandpackCodeBlockWrapper,
} from "../../design-system/sandpack-code-block";
import { Container } from "@/components/layouts/container";
import { Button } from "@/design-system/button";

const meta: Meta<typeof SandpackCodeBlock> = {
  component: SandpackCodeBlock,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    language: {
      control: "select",
      options: [
        "javascript",
        "typescript",
        "tsx",
        "jsx",
        "python",
        "css",
        "html",
        "json",
        "markdown",
        "go",
        "bash",
        "shell",
        "terminal",
        "command",
        "sql",
      ],
    },
    showLineNumbers: { control: "boolean" },
    wrapContent: { control: "boolean" },
    showCopyButton: { control: "boolean" },
    readOnly: { control: "boolean" },
    height: { control: "text" },
    maxHeight: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const javascriptCode = `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`;

const pythonCode = `def greet(name):
    return f"Hello, {name}!"
    
    print(greet("World"))`;

const cssCode = `.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}`;

const htmlCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
</head>
<body>
    <div class="container">
        <h1>Welcome</h1>
        <p>This is a sample HTML page.</p>
        <button class="button">Click me</button>
    </div>
</body>
</html>`;

const jsonCode = `{
  "name": "Sample Project",
  "version": "1.0.0",
  "description": "A sample project configuration",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest",
    "build": "webpack"
  }
}`;

const markdownCode = `# Sample Markdown

This is a **sample** markdown document with various elements.

## Features

- [x] Headers
- [x] Lists
- [x] **Bold text**
- [x] *Italic text*
- [x] \`Code blocks\`

## Code Example

\`\`\`javascript
function example() {
  return "Hello World!";
}
\`\`\`

> This is a blockquote with some important information.`;

export const Default: Story = {
  args: {
    code: javascriptCode,
    language: "javascript",
    fileName: "greeting.js",
  },
};

export const NoFileName: Story = {
  args: {
    code: javascriptCode,
    language: "javascript",
  },
};

export const NoLineNumbers: Story = {
  args: {
    code: javascriptCode,
    language: "javascript",
    fileName: "simple.js",
    showLineNumbers: false,
  },
};

export const NoCopyButton: Story = {
  args: {
    code: javascriptCode,
    language: "javascript",
    fileName: "no-copy.js",
    showCopyButton: false,
  },
};

export const ReadOnly: Story = {
  args: {
    code: javascriptCode,
    language: "javascript",
    fileName: "read-only.js",
    readOnly: true,
  },
};

export const Minimal: Story = {
  args: {
    code: javascriptCode,
    language: "javascript",
    showCopyButton: false,
    showLineNumbers: false,
  },
};

export const Python: Story = {
  args: {
    code: `def greet(name):
    return f"Hello, {name}!"
    
    print(greet("World"))`,
    language: "python",
    fileName: "greeting.py",
  },
};

export const CSS: Story = {
  args: {
    code: cssCode,
    language: "css",
    fileName: "styles.css",
  },
};

export const HTML: Story = {
  args: {
    code: htmlCode,
    language: "html",
    fileName: "index.html",
  },
};

export const JSON: Story = {
  args: {
    code: jsonCode,
    language: "json",
    fileName: "package.json",
  },
};

export const Markdown: Story = {
  args: {
    code: markdownCode,
    language: "markdown",
    fileName: "README.md",
  },
};

export const WithMaxHeight: Story = {
  args: {
    code: `function veryLongFunction() {
  // This is a very long function that demonstrates
  // the maxHeight and auto-overflow functionality
  const data = {
    users: [
      { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
      { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "user" },
      { id: 4, name: "Alice Brown", email: "alice@example.com", role: "moderator" },
      { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "user" },
    ],
    settings: {
      theme: "dark",
      language: "en",
      notifications: true,
      autoSave: false,
    },
    metadata: {
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T12:30:00Z",
      version: "1.2.3",
    }
  };
  
  return data;
}

// This function also has a lot of content to demonstrate scrolling
function processUserData(users) {
  return users.map(user => ({
    ...user,
    displayName: user.name.toUpperCase(),
    isActive: user.role !== 'inactive',
    lastLogin: new Date().toISOString(),
  }));
}`,
    language: "javascript",
    fileName: "long-code.js",
    maxHeight: "200px",
  },
};

export const Wrapper: Story = {
  render: () => (
    <SandpackCodeBlockWrapper>
      <Button>Interactive button</Button>
    </SandpackCodeBlockWrapper>
  ),
};
