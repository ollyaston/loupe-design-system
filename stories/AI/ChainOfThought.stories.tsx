import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { useRef, useEffect } from "react";

import {
  ChainOfThought,
  type ChainOfThoughtRef,
} from "@/design-system/chain-of-thought";
import { Container } from "@/components/layouts/container";
import { Button } from "@/design-system/button";

const meta: Meta<typeof ChainOfThought> = {
  title: "AI/ChainOfThought",
  component: ChainOfThought,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays AI tool execution as a chain of thought with expandable tool logs, status indicators, and duration. Shows which tools are running, completed, or errored.",
      },
    },
  },
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const ref = useRef<ChainOfThoughtRef>(null);

    useEffect(() => {
      if (ref.current) {
        // Simulate tool execution
        ref.current.updateTool("searchTool", {
          toolName: "searchTool",
          status: "running",
          logs: ["Searching for information..."],
          startTime: Date.now(),
        });

        setTimeout(() => {
          if (ref.current) {
            ref.current.addToolLog("searchTool", "Found 10 results");
            ref.current.addToolLog("searchTool", "Filtering results...");
          }
        }, 1000);

        setTimeout(() => {
          if (ref.current) {
            ref.current.updateTool("searchTool", {
              status: "completed",
              endTime: Date.now(),
            });
          }
        }, 2000);
      }
    }, []);

    return <ChainOfThought ref={ref} />;
  },
};

export const MultipleTools: Story = {
  render: () => {
    const ref = useRef<ChainOfThoughtRef>(null);

    useEffect(() => {
      if (ref.current) {
        // Start multiple tools
        ref.current.updateTool("dataQuery", {
          toolName: "dataQuery",
          status: "running",
          logs: ["Executing query..."],
          startTime: Date.now(),
        });

        ref.current.updateTool("apiCall", {
          toolName: "apiCall",
          status: "running",
          logs: ["Making API request..."],
          startTime: Date.now(),
        });

        setTimeout(() => {
          if (ref.current) {
            ref.current.addToolLog("dataQuery", "Query executed successfully");
            ref.current.addToolLog("apiCall", "API response received");
          }
        }, 1000);

        setTimeout(() => {
          if (ref.current) {
            ref.current.updateTool("dataQuery", {
              status: "completed",
              endTime: Date.now(),
            });
            ref.current.updateTool("apiCall", {
              status: "completed",
              endTime: Date.now(),
            });
          }
        }, 2000);
      }
    }, []);

    return <ChainOfThought ref={ref} />;
  },
};

export const WithError: Story = {
  render: () => {
    const ref = useRef<ChainOfThoughtRef>(null);

    useEffect(() => {
      if (ref.current) {
        ref.current.updateTool("failingTool", {
          toolName: "failingTool",
          status: "running",
          logs: ["Attempting operation..."],
          startTime: Date.now(),
        });

        setTimeout(() => {
          if (ref.current) {
            ref.current.updateTool("failingTool", {
              status: "error",
              endTime: Date.now(),
            });
          }
        }, 1500);
      }
    }, []);

    return <ChainOfThought ref={ref} />;
  },
};

export const Interactive: Story = {
  render: () => {
    const ref = useRef<ChainOfThoughtRef>(null);

    const addTool = () => {
      if (ref.current) {
        const toolName = `tool_${Date.now()}`;
        ref.current.updateTool(toolName, {
          toolName,
          status: "running",
          logs: ["Starting..."],
          startTime: Date.now(),
        });

        setTimeout(() => {
          if (ref.current) {
            ref.current.updateTool(toolName, {
              status: "completed",
              endTime: Date.now(),
            });
          }
        }, 2000);
      }
    };

    const reset = () => {
      if (ref.current) {
        ref.current.reset();
      }
    };

    const completeAll = () => {
      if (ref.current) {
        ref.current.completeAll();
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={addTool} size="sm">
            Add tool
          </Button>
          <Button onClick={reset} size="sm" variant="outline">
            Reset
          </Button>
          <Button onClick={completeAll} size="sm" variant="outline">
            Complete all
          </Button>
        </div>
        <ChainOfThought ref={ref} />
      </div>
    );
  },
};

export const Hidden: Story = {
  render: () => {
    return <ChainOfThought isVisible={false} />;
  },
};
