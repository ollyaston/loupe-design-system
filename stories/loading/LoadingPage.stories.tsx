import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { LoadingPage } from "../../design-system/loading-page";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof LoadingPage> = {
  component: LoadingPage,
  parameters: {
    docs: {
      description: {
        component:
          "A loading page component that can display a spinner, progress bar, or steps with completion status.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    heading: {
      control: "text",
      description: "Main heading for the loading page",
    },
    description: {
      control: "text",
      description: "Description text explaining the process",
    },
    // showProgress: {
    //   control: "boolean",
    //   description: "Whether to show a progress bar",
    // },
    showSpinner: {
      control: "boolean",
      description: "Whether to show a spinner",
    },
    // progress: {
    //   control: { type: "range", min: 0, max: 100, step: 1 },
    //   description: "Progress percentage (0-100)",
    // },
    steps: {
      control: "object",
      description: "Array of steps with completion status",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingPage>;

export const HeadingAndDescription: Story = {
  args: {
    heading: "Loading...",
    description: "This may take a few moments",
  },
};

export const HeadingOnly: Story = {
  args: {
    heading: "Loading...",
  },
};

export const DescriptionOnly: Story = {
  args: {
    description: "This may take a few moments...",
  },
};

export const WithSpinner: Story = {
  args: {
    heading: "Loading...",
    description: "This may take a few moments",
    showSpinner: true,
  },
};

export const SpinnerOnly: Story = {
  args: {
    showSpinner: true,
  },
};

// export const WithProgress: Story = {
//   args: {
//     heading: "Processing data",
//     description: "Analyzing your requirements...",
//     showProgress: true,
//   },
//   render: (args) => {
//     const [progress, setProgress] = useState(0);

//     useEffect(() => {
//       const interval = setInterval(() => {
//         setProgress((prev) => {
//           if (prev >= 100) {
//             return 0; // Reset to 0 instead of stopping
//           }
//           return prev + 10;
//         });
//       }, 500);

//       return () => clearInterval(interval);
//     }, []);

//     return <LoadingPage {...args} progress={progress} />;
//   },
// };

// export const FlashingProgress: Story = {
//   args: {
//     heading: "Please wait",
//     description: "This may take a few moments",
//     showProgress: true,
//     // no progress prop
//   },
// };

// export const ProgressOnly: Story = {
//   args: {
//     showProgress: true,
//   },
// };

export const WithSteps: Story = {
  args: {
    heading: "Setting up your team",
    description: "Please wait while we configure your environment",
    steps: [
      {
        id: "1",
        label: "Initializing project",
        completed: true,
      },
      {
        id: "2",
        label: "Installing dependencies",
        working: true,
      },
      {
        id: "3",
        label: "Configuring database",
        completed: false,
      },
      {
        id: "4",
        label: "Setting up authentication",
        completed: false,
      },
    ],
  },
};

export const AllStepsCompleted: Story = {
  args: {
    heading: "Setup complete",
    description: "Your team is ready to use",
    steps: [
      {
        id: "1",
        label: "Initializing project",
        completed: true,
      },
      {
        id: "2",
        label: "Installing dependencies",
        completed: true,
      },
      {
        id: "3",
        label: "Configuring database",
        completed: true,
      },
      {
        id: "4",
        label: "Setting up authentication",
        completed: true,
      },
    ],
  },
};

export const AllStepsPending: Story = {
  args: {
    heading: "Preparing to start",
    description: "Getting everything ready for you",
    steps: [
      {
        id: "1",
        label: "Initializing project",
        completed: false,
      },
      {
        id: "2",
        label: "Installing dependencies",
        completed: false,
      },
      {
        id: "3",
        label: "Configuring database",
        completed: false,
      },
      {
        id: "4",
        label: "Setting up authentication",
        completed: false,
      },
    ],
  },
};

export const WorkingOnStep: Story = {
  args: {
    heading: "Processing your request",
    description: "This may take a few moments",
    steps: [
      {
        id: "1",
        label: "Validating input",
        completed: true,
      },
      {
        id: "2",
        label: "Processing data",
        working: true,
      },
      {
        id: "3",
        label: "Generating results",
        completed: false,
      },
      {
        id: "4",
        label: "Saving to database",
        completed: false,
      },
    ],
  },
};
