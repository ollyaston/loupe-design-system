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

// Padding examples
const paddingSizes = [
  { class: "p-0", name: "0", description: "0px", value: "0" },
  { class: "p-px", name: "px", description: "1px", value: "1px" },
  { class: "p-0.5", name: "0.5", description: "2px", value: "2px" },
  { class: "p-1", name: "1", description: "4px", value: "4px" },
  { class: "p-1.5", name: "1.5", description: "6px", value: "6px" },
  { class: "p-2", name: "2", description: "8px", value: "8px" },
  { class: "p-2.5", name: "2.5", description: "10px", value: "10px" },
  { class: "p-3", name: "3", description: "12px", value: "12px" },
  { class: "p-3.5", name: "3.5", description: "14px", value: "14px" },
  { class: "p-4", name: "4", description: "16px", value: "16px" },
  { class: "p-5", name: "5", description: "20px", value: "20px" },
  { class: "p-6", name: "6", description: "24px", value: "24px" },
  { class: "p-7", name: "7", description: "28px", value: "28px" },
  { class: "p-8", name: "8", description: "32px", value: "32px" },
  { class: "p-9", name: "9", description: "36px", value: "36px" },
  { class: "p-10", name: "10", description: "40px", value: "40px" },
  { class: "p-11", name: "11", description: "44px", value: "44px" },
  { class: "p-12", name: "12", description: "48px", value: "48px" },
  { class: "p-14", name: "14", description: "56px", value: "56px" },
  { class: "p-16", name: "16", description: "64px", value: "64px" },
  { class: "p-20", name: "20", description: "80px", value: "80px" },
  { class: "p-24", name: "24", description: "96px", value: "96px" },
  { class: "p-28", name: "28", description: "112px", value: "112px" },
  { class: "p-32", name: "32", description: "128px", value: "128px" },
  { class: "p-36", name: "36", description: "144px", value: "144px" },
  { class: "p-40", name: "40", description: "160px", value: "160px" },
  { class: "p-44", name: "44", description: "176px", value: "176px" },
  { class: "p-48", name: "48", description: "192px", value: "192px" },
  { class: "p-52", name: "52", description: "208px", value: "208px" },
  { class: "p-56", name: "56", description: "224px", value: "224px" },
  { class: "p-60", name: "60", description: "240px", value: "240px" },
  { class: "p-64", name: "64", description: "256px", value: "256px" },
  { class: "p-72", name: "72", description: "288px", value: "288px" },
  { class: "p-80", name: "80", description: "320px", value: "320px" },
  { class: "p-96", name: "96", description: "384px", value: "384px" },
];

// Margin examples
const marginSizes = [
  { class: "m-0", name: "0", description: "0px", value: "0" },
  { class: "m-px", name: "px", description: "1px", value: "1px" },
  { class: "m-0.5", name: "0.5", description: "2px", value: "2px" },
  { class: "m-1", name: "1", description: "4px", value: "4px" },
  { class: "m-1.5", name: "1.5", description: "6px", value: "6px" },
  { class: "m-2", name: "2", description: "8px", value: "8px" },
  { class: "m-2.5", name: "2.5", description: "10px", value: "10px" },
  { class: "m-3", name: "3", description: "12px", value: "12px" },
  { class: "m-3.5", name: "3.5", description: "14px", value: "14px" },
  { class: "m-4", name: "4", description: "16px", value: "16px" },
  { class: "m-5", name: "5", description: "20px", value: "20px" },
  { class: "m-6", name: "6", description: "24px", value: "24px" },
  { class: "m-7", name: "7", description: "28px", value: "28px" },
  { class: "m-8", name: "8", description: "32px", value: "32px" },
  { class: "m-9", name: "9", description: "36px", value: "36px" },
  { class: "m-10", name: "10", description: "40px", value: "40px" },
  { class: "m-11", name: "11", description: "44px", value: "44px" },
  { class: "m-12", name: "12", description: "48px", value: "48px" },
  { class: "m-14", name: "14", description: "56px", value: "56px" },
  { class: "m-16", name: "16", description: "64px", value: "64px" },
  { class: "m-20", name: "20", description: "80px", value: "80px" },
  { class: "m-24", name: "24", description: "96px", value: "96px" },
  { class: "m-28", name: "28", description: "112px", value: "112px" },
  { class: "m-32", name: "32", description: "128px", value: "128px" },
  { class: "m-36", name: "36", description: "144px", value: "144px" },
  { class: "m-40", name: "40", description: "160px", value: "160px" },
  { class: "m-44", name: "44", description: "176px", value: "176px" },
  { class: "m-48", name: "48", description: "192px", value: "192px" },
  { class: "m-52", name: "52", description: "208px", value: "208px" },
  { class: "m-56", name: "56", description: "224px", value: "224px" },
  { class: "m-60", name: "60", description: "240px", value: "240px" },
  { class: "m-64", name: "64", description: "256px", value: "256px" },
  { class: "m-72", name: "72", description: "288px", value: "288px" },
  { class: "m-80", name: "80", description: "320px", value: "320px" },
  { class: "m-96", name: "96", description: "384px", value: "384px" },
];

// Border radius examples
const borderRadiusSizes = [
  { class: "rounded-none", name: "none", description: "0px", value: "0" },
  { class: "rounded-sm", name: "sm", description: "2px", value: "2px" },
  { class: "rounded", name: "default", description: "4px", value: "4px" },
  { class: "rounded-md", name: "md", description: "6px", value: "6px" },
  { class: "rounded-lg", name: "lg", description: "8px", value: "8px" },
  { class: "rounded-xl", name: "xl", description: "12px", value: "12px" },
  { class: "rounded-2xl", name: "2xl", description: "16px", value: "16px" },
  { class: "rounded-3xl", name: "3xl", description: "24px", value: "24px" },
  {
    class: "rounded-full",
    name: "full",
    description: "9999px",
    value: "9999px",
  },
];

// Gap examples
const gapSizes = [
  { class: "gap-0", name: "0", description: "0px", value: "0" },
  { class: "gap-px", name: "px", description: "1px", value: "1px" },
  { class: "gap-0.5", name: "0.5", description: "2px", value: "2px" },
  { class: "gap-1", name: "1", description: "4px", value: "4px" },
  { class: "gap-1.5", name: "1.5", description: "6px", value: "6px" },
  { class: "gap-2", name: "2", description: "8px", value: "8px" },
  { class: "gap-2.5", name: "2.5", description: "10px", value: "10px" },
  { class: "gap-3", name: "3", description: "12px", value: "12px" },
  { class: "gap-3.5", name: "3.5", description: "14px", value: "14px" },
  { class: "gap-4", name: "4", description: "16px", value: "16px" },
  { class: "gap-5", name: "5", description: "20px", value: "20px" },
  { class: "gap-6", name: "6", description: "24px", value: "24px" },
  { class: "gap-7", name: "7", description: "28px", value: "28px" },
  { class: "gap-8", name: "8", description: "32px", value: "32px" },
  { class: "gap-9", name: "9", description: "36px", value: "36px" },
  { class: "gap-10", name: "10", description: "40px", value: "40px" },
  { class: "gap-11", name: "11", description: "44px", value: "44px" },
  { class: "gap-12", name: "12", description: "48px", value: "48px" },
  { class: "gap-14", name: "14", description: "56px", value: "56px" },
  { class: "gap-16", name: "16", description: "64px", value: "64px" },
  { class: "gap-20", name: "20", description: "80px", value: "80px" },
  { class: "gap-24", name: "24", description: "96px", value: "96px" },
  { class: "gap-28", name: "28", description: "112px", value: "112px" },
  { class: "gap-32", name: "32", description: "128px", value: "128px" },
  { class: "gap-36", name: "36", description: "144px", value: "144px" },
  { class: "gap-40", name: "40", description: "160px", value: "160px" },
  { class: "gap-44", name: "44", description: "176px", value: "176px" },
  { class: "gap-48", name: "48", description: "192px", value: "192px" },
  { class: "gap-52", name: "52", description: "208px", value: "208px" },
  { class: "gap-56", name: "56", description: "224px", value: "224px" },
  { class: "gap-60", name: "60", description: "240px", value: "240px" },
  { class: "gap-64", name: "64", description: "256px", value: "256px" },
  { class: "gap-72", name: "72", description: "288px", value: "288px" },
  { class: "gap-80", name: "80", description: "320px", value: "320px" },
  { class: "gap-96", name: "96", description: "384px", value: "384px" },
];

// Space between examples
const spaceBetweenSizes = [
  { class: "space-x-0", name: "0", description: "0px", value: "0" },
  { class: "space-x-px", name: "px", description: "1px", value: "1px" },
  { class: "space-x-0.5", name: "0.5", description: "2px", value: "2px" },
  { class: "space-x-1", name: "1", description: "4px", value: "4px" },
  { class: "space-x-1.5", name: "1.5", description: "6px", value: "6px" },
  { class: "space-x-2", name: "2", description: "8px", value: "8px" },
  { class: "space-x-2.5", name: "2.5", description: "10px", value: "10px" },
  { class: "space-x-3", name: "3", description: "12px", value: "12px" },
  { class: "space-x-3.5", name: "3.5", description: "14px", value: "14px" },
  { class: "space-x-4", name: "4", description: "16px", value: "16px" },
  { class: "space-x-5", name: "5", description: "20px", value: "20px" },
  { class: "space-x-6", name: "6", description: "24px", value: "24px" },
  { class: "space-x-7", name: "7", description: "28px", value: "28px" },
  { class: "space-x-8", name: "8", description: "32px", value: "32px" },
  { class: "space-x-9", name: "9", description: "36px", value: "36px" },
  { class: "space-x-10", name: "10", description: "40px", value: "40px" },
  { class: "space-x-11", name: "11", description: "44px", value: "44px" },
  { class: "space-x-12", name: "12", description: "48px", value: "48px" },
  { class: "space-x-14", name: "14", description: "56px", value: "56px" },
  { class: "space-x-16", name: "16", description: "64px", value: "64px" },
  { class: "space-x-20", name: "20", description: "80px", value: "80px" },
  { class: "space-x-24", name: "24", description: "96px", value: "96px" },
  { class: "space-x-28", name: "28", description: "112px", value: "112px" },
  { class: "space-x-32", name: "32", description: "128px", value: "128px" },
  { class: "space-x-36", name: "36", description: "144px", value: "144px" },
  { class: "space-x-40", name: "40", description: "160px", value: "160px" },
  { class: "space-x-44", name: "44", description: "176px", value: "176px" },
  { class: "space-x-48", name: "48", description: "192px", value: "192px" },
  { class: "space-x-52", name: "52", description: "208px", value: "208px" },
  { class: "space-x-56", name: "56", description: "224px", value: "224px" },
  { class: "space-x-60", name: "60", description: "240px", value: "240px" },
  { class: "space-x-64", name: "64", description: "256px", value: "256px" },
  { class: "space-x-72", name: "72", description: "288px", value: "288px" },
  { class: "space-x-80", name: "80", description: "320px", value: "320px" },
  { class: "space-x-96", name: "96", description: "384px", value: "384px" },
];

export const PaddingAndMargin = () => {
  return (
    <>
      <Heading
        size="large"
        title="Padding & margin"
        description="All available padding and margin utilities from Tailwind CSS"
      />
      <br />
      <br />

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Padding class</TableHead>
              <TableHead>Margin class</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Example</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paddingSizes.map((size, index) => (
              <TableRow key={size.class}>
                <TableCell className="font-medium">{size.name}</TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {size.class}
                </TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {marginSizes[index].class}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {size.description}
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className={`bg-secondary rounded-xs ${size.class}`}>
                    <div
                      className={`bg-sidebar text-sidebar-foreground text-xs p-2`}
                    >
                      Content
                    </div>
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

export const BorderRadius = () => {
  return (
    <>
      <Heading
        size="large"
        title="Border radius"
        description="All available border radius utilities from Tailwind CSS"
      />
      <br />
      <br />

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
          {borderRadiusSizes.map((size) => (
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
                  className={`${size.class} bg-sidebar text-sidebar-foreground text-xs p-4 w-16 h-16 flex items-center justify-center`}
                >
                  Box
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export const GapAndSpaceBetween = () => {
  return (
    <>
      <Heading
        size="large"
        title="Gap & space between"
        description="Gap utilities for flexbox/grid layouts and space between utilities for child elements"
      />
      <br />
      <br />

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Gap class</TableHead>
              <TableHead>Space between class</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Example</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gapSizes.slice(0, 20).map((size, index) => (
              <TableRow key={size.class}>
                <TableCell className="font-medium">{size.name}</TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {size.class}
                </TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {spaceBetweenSizes[index]?.class || "-"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {size.description}
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className={`flex ${size.class} bg-secondary rounded`}>
                    <div className="bg-sidebar text-sidebar-foreground text-xs p-2 rounded">
                      Item 1
                    </div>
                    <div className="bg-sidebar text-sidebar-foreground text-xs p-2 rounded">
                      Item 2
                    </div>
                    <div className="bg-sidebar text-sidebar-foreground text-xs p-2 rounded">
                      Item 3
                    </div>
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
