import React from "react";
import type { Meta } from "@storybook/nextjs-vite";

import { Container } from "@/components/layouts/container";
import { Heading } from "@/design-system/heading";

// Shadow utility definitions
interface ShadowUtility {
  name: string;
  class: string;
  description: string;
  cssValue: string;
}

const shadowUtilities: ShadowUtility[] = [
  {
    name: "shadow-none",
    class: "shadow-none",
    description: "Removes any existing shadow",
    cssValue: "none",
  },
  {
    name: "shadow-inner",
    class: "shadow-inner",
    description: "Inset shadow for pressed/indented effects",
    cssValue: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  },
  {
    name: "shadow-sm",
    class: "shadow-sm",
    description: "Small shadow for subtle depth",
    cssValue: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  },
  {
    name: "shadow",
    class: "shadow",
    description: "Default medium shadow",
    cssValue: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  },
  {
    name: "shadow-md",
    class: "shadow-md",
    description: "Medium shadow for cards and panels",
    cssValue:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
  {
    name: "shadow-lg",
    class: "shadow-lg",
    description: "Large shadow for modals and overlays",
    cssValue:
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  },
  {
    name: "shadow-xl",
    class: "shadow-xl",
    description: "Extra large shadow for prominent elements",
    cssValue:
      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  {
    name: "shadow-2xl",
    class: "shadow-2xl",
    description: "2x extra large shadow for dramatic effect",
    cssValue: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  },
];

const ShadowComparison: React.FC = () => {
  return (
    <div className="mb-12">
      <h3 className="font-bold mb-6 text-lg">Shadow comparison</h3>
      <div className="space-y-4">
        {shadowUtilities.map((shadow) => (
          <div key={shadow.name} className="flex items-center space-x-6">
            <div className="w-24 text-sm font-mono">{shadow.class}</div>
            <div className="flex-1">
              <div
                className={`w-full h-16 rounded-lg ${shadow.class} border border-border flex items-center justify-center`}
              >
                <span className="text-sm text-primary-foreground">
                  {shadow.description}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
};

export default meta;

export const ShadowUtilities = () => {
  return (
    <>
      <Heading
        size="large"
        title="Shadow utilities"
        description="Complete documentation of Tailwind CSS shadow utilities with visual examples"
      />
      <br />
      <br />

      <ShadowComparison />
    </>
  );
};
