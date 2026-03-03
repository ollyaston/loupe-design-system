import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Response } from "@/design-system/shadcn-io/ai/response";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof Response> = {
  component: Response,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    children: {
      control: "text",
      description: "The content to render with Streamdown",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleText: Story = {
  args: {
    children: "This is a simple text response.",
  },
};

export const TextWithLinks: Story = {
  args: {
    children:
      "Here's a [link to documentation](https://example.com) and another [external resource](https://github.com) for reference.",
  },
};

export const MarkdownContent: Story = {
  args: {
    children: `# Welcome to the AI Assistant

This is a **bold** statement and this is *italic* text.

## Features

- Feature 1: Advanced processing
- Feature 2: Real-time updates
- Feature 3: Secure communication

### Code Example

\`\`\`javascript
function greetUser(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> This is a blockquote with important information.

For more details, visit our [documentation](https://docs.example.com).`,
  },
};

export const LongContent: Story = {
  args: {
    children: `# Comprehensive Guide

This is a comprehensive guide that demonstrates how the Response component handles long-form content with various formatting elements.

## Introduction

The Response component is designed to handle rich text content with proper formatting and link handling. It uses Streamdown to parse and render markdown content efficiently.

## Key Features

### 1. Markdown Support
- **Bold text** and *italic text*
- Headers of various levels
- Lists (both ordered and unordered)
- Code blocks and inline code
- Blockquotes and more

### 2. Link Handling
All links are automatically configured to:
- Open in new tabs
- Include proper security attributes
- Maintain consistent styling

### 3. Performance
The component is optimized for:
- Fast rendering
- Minimal re-renders
- Efficient memory usage

## Code Examples

Here's a simple React component:

\`\`\`jsx
import { Response } from '@/design-system/shadcn-io/ai/response';

function ChatMessage({ content }) {
  return (
    <Response>
      {content}
    </Response>
  );
}
\`\`\`

## Best Practices

1. **Content Structure**: Use proper markdown formatting
2. **Link Management**: Ensure all links are relevant and secure
3. **Performance**: Keep content reasonable in length
4. **Accessibility**: Use semantic HTML elements

## Conclusion

The Response component provides a robust solution for rendering AI-generated content with proper formatting and security considerations.

For more information, check out our [documentation](https://docs.example.com) and [GitHub repository](https://github.com/example/repo).`,
  },
};

export const CodeHeavy: Story = {
  args: {
    children: `# Code Implementation Guide

Here's how to implement a complete solution:

## Frontend Component

\`\`\`tsx
import React, { useState, useEffect } from 'react';
import { Response } from '@/design-system/shadcn-io/ai/response';

interface ChatMessageProps {
  content: string;
  isLoading?: boolean;
}

export function ChatMessage({ content, isLoading }: ChatMessageProps) {
  const [displayContent, setDisplayContent] = useState('');

  useEffect(() => {
    if (isLoading) {
      setDisplayContent('Thinking...');
    } else {
      setDisplayContent(content);
    }
  }, [content, isLoading]);

  return (
    <div className="p-4 border rounded-lg">
      <Response>{displayContent}</Response>
    </div>
  );
}
\`\`\`

## Backend API

\`\`\`python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class MessageRequest(BaseModel):
    content: str
    user_id: str

@app.post("/api/chat")
async def process_message(request: MessageRequest):
    # Process the message
    response = await ai_service.generate_response(request.content)
    return {"response": response}
\`\`\`

## Database Schema

\`\`\`sql
CREATE TABLE messages (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_messages_user_id ON messages(user_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
\`\`\`

## Configuration

\`\`\`yaml
# config.yaml
database:
  host: localhost
  port: 5432
  name: chat_app

ai:
  model: gpt-4
  temperature: 0.7
  max_tokens: 1000
\`\`\`

This implementation provides a complete chat system with proper error handling and performance optimization.`,
  },
};

export const WithCustomComponents: Story = {
  args: {
    children: "This response uses custom components for rendering.",
    components: {
      // Custom component overrides can be added here
    },
  },
};

export const EmptyContent: Story = {
  args: {
    children: "",
  },
};

export const SpecialCharacters: Story = {
  args: {
    children: `# Special Characters & Symbols

This content includes various special characters and symbols:

- **Math symbols**: ∑, ∫, ∞, π, α, β, γ
- **Currency**: $, €, £, ¥, ₹
- **Arrows**: →, ←, ↑, ↓, ↔, ⇄
- **Emojis**: 🚀, 💡, ⚡, 🔥, ✨
- **Unicode**: ñ, é, ü, ç, ø, å

## Code with Special Characters

\`\`\`python
def calculate_π():
    return 3.141592653589793

def process_currency(amount, symbol='$'):
    return f"{symbol}{amount:.2f}"

# Handle unicode strings
message = "Héllo, wørld! 🌍"
\`\`\`

## Links with Special Characters

- [Unicode.org](https://unicode.org)
- [Math Symbols](https://en.wikipedia.org/wiki/Mathematical_symbols)
- [Emoji Reference](https://emojipedia.org)`,
  },
};
