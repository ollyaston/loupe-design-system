import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../design-system/table";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof Table> = {
  component: Table,
  parameters: {
    docs: {
      description: {
        component: "Basic table for displaying small amounts of data.",
      },
    },
  },
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
type Story = StoryObj<typeof Table>;

export const KitchenSink: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Favorite color</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Jane Doe</TableCell>
          <TableCell>Blue</TableCell>
          <TableCell>London</TableCell>
          <TableCell className="font-mono">$1,234.56</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>Red</TableCell>
          <TableCell>New York</TableCell>
          <TableCell className="font-mono">$2,500.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
