import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { formatNumber } from "@/design-system/format-number";
import { Container } from "@/components/layouts/container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/design-system/table";

const meta = {
  title: "Text/FormatNumber",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const testCases = [
  { input: 0, output: "0", notes: "Zero" },
  { input: 5, output: "5", notes: "Small number" },
  { input: 999, output: "999", notes: "Below 1k threshold" },
  { input: 1000, output: "1k", notes: "Thousands" },
  { input: 1500, output: "1.5k", notes: "Thousands with decimal" },
  { input: 9999, output: "10k", notes: "Rounds up" },
  { input: 1000000, output: "1M", notes: "Millions" },
  { input: 2500000, output: "2.5M", notes: "Millions with decimal" },
  { input: 1000000000, output: "1B", notes: "Billions" },
  { input: 1000000000000, output: "1T", notes: "Trillions" },
  { input: -1000, output: "-1k", notes: "Negative numbers" },
  { input: -5000000, output: "-5M", notes: "Negative millions" },
  { input: 1234.56, output: "1.2k", notes: "Decimal input" },
  {
    input: 1234.56,
    output: "1.23k",
    options: { decimals: 2 },
    notes: "Custom decimals",
  },
  {
    input: 1000,
    output: "1.0k",
    options: { showDecimalsForWhole: true },
    notes: "Show decimals for whole numbers",
  },
  { input: "1,234", output: "1.2k", notes: "String with comma" },
  { input: "$5,000", output: "5k", notes: "String with currency symbol" },
  { input: "€1,500,000", output: "1.5M", notes: "String with euro symbol" },
  { input: "hello", output: "hello", notes: "Non-numeric string (preserved)" },
  {
    input: "hello",
    output: "0",
    options: { preserveNonNumeric: false },
    notes: "Non-numeric string (not preserved)",
  },
  { input: 0.5, output: "0.5", notes: "Fractional number below 1k" },
];

export const Examples: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Input</TableHead>
          <TableHead>Output</TableHead>
          <TableHead>Options/Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {testCases.map((testCase, index) => {
          const formatted = formatNumber(testCase.input, testCase.options);
          const optionsStr = testCase.options
            ? JSON.stringify(testCase.options)
            : "default";
          const inputStr =
            typeof testCase.input === "string"
              ? `"${testCase.input}"`
              : String(testCase.input);

          return (
            <TableRow key={index}>
              <TableCell className="font-mono text-sm">{inputStr}</TableCell>
              <TableCell className="font-semibold">{formatted}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                <div className="space-y-1">
                  <div className="font-mono text-xs">{optionsStr}</div>
                  <div>{testCase.notes}</div>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  ),
};
