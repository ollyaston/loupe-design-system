import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Image from "next/image";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/design-system/card";
import { Button } from "@/design-system/button";
import { Container } from "@/components/layouts/container";

const meta = {
  component: Card,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content of the card.</p>
      </CardContent>
      <CardFooter>
        <Button>Create</Button>
      </CardFooter>
    </Card>
  ),
};
export const WithoutFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Information card</CardTitle>
        <CardDescription>
          This card only has a header and content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Some important information goes here.</p>
      </CardContent>
    </Card>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Long content example</CardTitle>
        <CardDescription>
          This card demonstrates how it handles longer content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="mb-4">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="mr-2">
          Cancel
        </Button>
        <Button>Read more</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="relative h-48 w-full rounded-t-xl rounded-b-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1522252234503-e356532cafd5"
            alt="Card cover"
            fill
            className="object-cover"
          />
        </div>
        <CardTitle className="mt-4">Project overview</CardTitle>
        <CardDescription>
          View your project details and statistics.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Project statistics and information will be displayed here.</p>
      </CardContent>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Simple card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is a simple card with just a title and content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="p-6">
        <p>This card has content and a footer, but no header.</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Secondary: Story = {
  render: () => (
    <Card variant="secondary" className="w-[350px]">
      <CardHeader>
        <CardTitle>Secondary card</CardTitle>
        <CardDescription>
          This card uses the secondary variant with bg-muted background.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This variant matches the secondary KPI styling.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const SecondarySimple: Story = {
  render: () => (
    <Card variant="secondary" className="w-[350px]">
      <CardHeader>
        <CardTitle>Secondary simple</CardTitle>
      </CardHeader>
      <CardContent>
        <p>A simple secondary card with just content.</p>
      </CardContent>
    </Card>
  ),
};
