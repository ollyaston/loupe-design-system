import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { InputForm } from "@/design-system/input-form";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof InputForm> = {
  component: InputForm,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "Current input value",
    },
    onChange: {
      action: "value-changed",
      description: "Callback when input value changes",
    },
    onSubmit: {
      action: "form-submitted",
      description: "Callback when form is submitted",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the textarea",
    },
    isLoading: {
      control: "boolean",
      description: "Whether the form is in a loading state",
    },
    disabled: {
      control: "boolean",
      description: "Whether the form is disabled",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    inputId: {
      control: "text",
      description: "ID for the textarea element",
    },
    customActions: {
      control: "object",
      description: "Array of custom action buttons to display",
    },
    modes: {
      control: "object",
      description: "Array of mode options to display",
    },
    selectedMode: {
      control: "text",
      description: "Currently selected mode ID",
    },
    onModeChange: {
      action: "mode-changed",
      description: "Callback when mode is changed",
    },
    darkUI: {
      control: "boolean",
      description: "Whether to use dark sidebar theme",
    },
    allowImageUpload: {
      control: "boolean",
      description: "Whether to show image upload functionality",
    },
    selectedImage: {
      control: "text",
      description: "URL of the selected image to preview",
    },
    onImageUpload: {
      action: "image-uploaded",
      description: "Callback when an image is uploaded",
    },
    onImageRemove: {
      action: "image-removed",
      description: "Callback when the image is removed",
    },
    showImagePreview: {
      control: "boolean",
      description: "Whether to show image preview",
    },
    maxImageHeight: {
      control: "number",
      description: "Maximum height for image preview",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    isLoading: false,
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <Container className="p-4">
        <div className="w-128">
          <InputForm
            {...args}
            value={value}
            onChange={setValue}
            onSubmit={() => console.log("Form submitted with:", value)}
          />
        </div>
      </Container>
    );
  },
};

export const WithInitialValue: Story = {
  args: {
    value: "What are the key points from the meeting notes?",
    isLoading: false,
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <Container className="p-4">
        <div className="w-128">
          <InputForm
            {...args}
            value={value}
            onChange={setValue}
            onSubmit={() => console.log("Form submitted with:", value)}
          />
        </div>
      </Container>
    );
  },
};

export const Loading: Story = {
  args: {
    value: "What are the key points from the meeting notes?",
    isLoading: true,
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <Container className="p-4">
        <div className="w-128">
          <InputForm
            {...args}
            value={value}
            onChange={setValue}
            onSubmit={() => console.log("Form submitted with:", value)}
          />
        </div>
      </Container>
    );
  },
};

export const Disabled: Story = {
  args: {
    value: "What are the key points from the meeting notes?",
    isLoading: false,
    disabled: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <Container className="p-4">
        <div className="w-128">
          <InputForm
            {...args}
            value={value}
            onChange={setValue}
            onSubmit={() => console.log("Form submitted with:", value)}
          />
        </div>
      </Container>
    );
  },
};

export const CustomPlaceholder: Story = {
  args: {
    value: "",
    placeholder: "Type a message or ask a question...",
    isLoading: false,
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <Container className="p-4">
        <div className="w-128">
          <InputForm
            {...args}
            value={value}
            onChange={setValue}
            onSubmit={() => console.log("Form submitted with:", value)}
          />
        </div>
      </Container>
    );
  },
};

export const WithCustomActions: Story = {
  args: {
    value: "",
    isLoading: false,
    disabled: false,
    customActions: [
      {
        id: "globe",
        icon: "language",
        onClick: () => console.log("Globe action clicked"),
        tooltip: "Web search",
      },
      {
        id: "microphone",
        icon: "mic",
        onClick: () => console.log("Microphone action clicked"),
        selected: true,
        tooltip: "Voice input",
      },
      {
        id: "paperclip",
        icon: "attach_file",
        onClick: () => console.log("Paperclip action clicked"),
        tooltip: "Attach file",
      },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const [customActions, setCustomActions] = useState(
      args.customActions || [],
    );

    const handleActionClick = (actionId: string) => {
      setCustomActions((prev) =>
        prev.map((action) => ({
          ...action,
          selected: action.id === actionId ? !action.selected : action.selected,
        })),
      );
      console.log(`${actionId} action clicked`);
    };

    return (
      <Container className="p-4">
        <div className="w-128">
          <InputForm
            {...args}
            value={value}
            onChange={setValue}
            onSubmit={() => console.log("Form submitted with:", value)}
            customActions={customActions.map((action) => ({
              ...action,
              onClick: () => handleActionClick(action.id),
            }))}
          />
        </div>
      </Container>
    );
  },
};

export const WithModes: Story = {
  args: {
    value: "",
    isLoading: false,
    disabled: false,
    modes: [
      {
        id: "search",
        icon: "search",
        label: "Search",
      },
      {
        id: "lightbulb",
        icon: "lightbulb",
        label: "Ideas",
      },
    ],
    selectedMode: "search",
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const [selectedMode, setSelectedMode] = useState(args.selectedMode);

    return (
      <Container className="p-4">
        <div className="w-128">
          <InputForm
            {...args}
            value={value}
            onChange={setValue}
            onSubmit={() => console.log("Form submitted with:", value)}
            selectedMode={selectedMode}
            onModeChange={(modeId) => {
              setSelectedMode(modeId);
              console.log("Mode changed to:", modeId);
            }}
          />
        </div>
      </Container>
    );
  },
};

export const WithModesAndCustomActions: Story = {
  args: {
    value: "",
    isLoading: false,
    disabled: false,
    modes: [
      {
        id: "search",
        icon: "search",
        label: "Search",
      },
      {
        id: "lightbulb",
        icon: "lightbulb",
        label: "Ideas",
      },
    ],
    selectedMode: "lightbulb",
    customActions: [
      {
        id: "globe",
        icon: "language",
        onClick: () => console.log("Globe action clicked"),
        tooltip: "Web search",
      },
      {
        id: "microphone",
        icon: "mic",
        onClick: () => console.log("Microphone action clicked"),
        tooltip: "Voice input",
      },
      {
        id: "paperclip",
        icon: "attach_file",
        onClick: () => console.log("Paperclip action clicked"),
        tooltip: "Attach file",
      },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const [selectedMode, setSelectedMode] = useState(args.selectedMode);
    const [customActions, setCustomActions] = useState(
      args.customActions || [],
    );

    const handleActionClick = (actionId: string) => {
      setCustomActions((prev) =>
        prev.map((action) => ({
          ...action,
          selected: action.id === actionId ? !action.selected : action.selected,
        })),
      );
      console.log(`${actionId} action clicked`);
    };

    return (
      <Container className="p-4">
        <div className="w-128">
          <InputForm
            {...args}
            value={value}
            onChange={setValue}
            onSubmit={() => console.log("Form submitted with:", value)}
            selectedMode={selectedMode}
            onModeChange={(modeId) => {
              setSelectedMode(modeId);
              console.log("Mode changed to:", modeId);
            }}
            customActions={customActions.map((action) => ({
              ...action,
              onClick: () => handleActionClick(action.id),
            }))}
          />
        </div>
      </Container>
    );
  },
};

export const WithModesAndLoading: Story = {
  args: {
    value: "What are the key points from the meeting notes?",
    isLoading: true,
    disabled: false,
    modes: [
      {
        id: "search",
        icon: "search",
        label: "Search",
      },
      {
        id: "lightbulb",
        icon: "lightbulb",
        label: "Ideas",
      },
    ],
    selectedMode: "lightbulb",
    customActions: [
      {
        id: "globe",
        icon: "language",
        onClick: () => console.log("Globe action clicked"),
        tooltip: "Web search",
      },
      {
        id: "microphone",
        icon: "mic",
        onClick: () => console.log("Microphone action clicked"),
        tooltip: "Voice input",
      },
      {
        id: "paperclip",
        icon: "attach_file",
        onClick: () => console.log("Paperclip action clicked"),
        tooltip: "Attach file",
      },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const [selectedMode, setSelectedMode] = useState(args.selectedMode);

    return (
      <Container className="p-4">
        <div className="w-128">
          <InputForm
            {...args}
            value={value}
            onChange={setValue}
            onSubmit={() => console.log("Form submitted with:", value)}
            selectedMode={selectedMode}
            onModeChange={(modeId) => {
              setSelectedMode(modeId);
              console.log("Mode changed to:", modeId);
            }}
          />
        </div>
      </Container>
    );
  },
};

export const WithCustomActionsAndLoading: Story = {
  args: {
    value: "What are the key points from the meeting notes?",
    isLoading: true,
    disabled: false,
    customActions: [
      {
        id: "globe",
        icon: "language",
        onClick: () => console.log("Globe action clicked"),
        tooltip: "Web search",
      },
      {
        id: "microphone",
        icon: "mic",
        onClick: () => console.log("Microphone action clicked"),
        selected: true,
        tooltip: "Voice input",
      },
      {
        id: "paperclip",
        icon: "attach_file",
        onClick: () => console.log("Paperclip action clicked"),
        tooltip: "Attach file",
      },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <Container className="p-4">
        <div className="w-128">
          <InputForm
            {...args}
            value={value}
            onChange={setValue}
            onSubmit={() => console.log("Form submitted with:", value)}
          />
        </div>
      </Container>
    );
  },
};

export const WithImageUpload: Story = {
  args: {
    value: "",
    placeholder: "Type a message or upload an image…",
    isLoading: false,
    disabled: false,
    allowImageUpload: true,
    selectedImage: null,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const [selectedImage, setSelectedImage] = useState<string | null>(
      args.selectedImage || null,
    );

    const handleImageUpload = (file: File) => {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      console.log("Image uploaded:", file.name);
    };

    const handleImageRemove = () => {
      setSelectedImage(null);
      console.log("Image removed");
    };

    return (
      <Container className="p-4">
        <div className="w-128">
          <InputForm
            {...args}
            value={value}
            onChange={setValue}
            selectedImage={selectedImage}
            onImageUpload={handleImageUpload}
            onImageRemove={handleImageRemove}
            onSubmit={() => {
              console.log(
                "Form submitted with:",
                value,
                "and image:",
                selectedImage,
              );
            }}
          />
        </div>
      </Container>
    );
  },
};

export const WithImagePreview: Story = {
  args: {
    value: "Check out this design!",
    placeholder: "Type a message or upload an image…",
    isLoading: false,
    disabled: false,
    allowImageUpload: true,
    selectedImage: "https://picsum.photos/400/300",
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const [selectedImage, setSelectedImage] = useState<string | null>(
      args.selectedImage || null,
    );

    const handleImageUpload = (file: File) => {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      console.log("Image uploaded:", file.name);
    };

    const handleImageRemove = () => {
      setSelectedImage(null);
      console.log("Image removed");
    };

    return (
      <Container className="p-4">
        <div className="w-128">
          <InputForm
            {...args}
            value={value}
            onChange={setValue}
            selectedImage={selectedImage}
            onImageUpload={handleImageUpload}
            onImageRemove={handleImageRemove}
            onSubmit={() => {
              console.log(
                "Form submitted with:",
                value,
                "and image:",
                selectedImage,
              );
            }}
          />
        </div>
      </Container>
    );
  },
};

export const WithoutImagePreview: Story = {
  args: {
    value: "Message with hidden image preview",
    placeholder: "Type a message or upload an image…",
    isLoading: false,
    disabled: false,
    allowImageUpload: true,
    selectedImage: "https://picsum.photos/400/300",
    showImagePreview: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const [selectedImage, setSelectedImage] = useState<string | null>(
      args.selectedImage || null,
    );

    const handleImageUpload = (file: File) => {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      console.log("Image uploaded:", file.name);
    };

    const handleImageRemove = () => {
      setSelectedImage(null);
      console.log("Image removed");
    };

    return (
      <Container className="p-4">
        <div className="w-128">
          <InputForm
            {...args}
            value={value}
            onChange={setValue}
            selectedImage={selectedImage}
            onImageUpload={handleImageUpload}
            onImageRemove={handleImageRemove}
            onSubmit={() => {
              console.log(
                "Form submitted with:",
                value,
                "and image:",
                selectedImage,
              );
            }}
          />
        </div>
      </Container>
    );
  },
};

export const OnDarkUI: Story = {
  args: {
    value: "",
    placeholder: "Type a message...",
    isLoading: false,
    disabled: false,
    darkUI: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-128">
        <InputForm
          {...args}
          value={value}
          onChange={setValue}
          onSubmit={() => console.log("Form submitted with:", value)}
        />
      </div>
    );
  },
};

export const OnDarkUIWithImageUpload: Story = {
  args: {
    value: "",
    placeholder: "Type a message or upload an image…",
    isLoading: false,
    disabled: false,
    darkUI: true,
    allowImageUpload: true,
    selectedImage: "https://picsum.photos/400/300",
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const [selectedImage, setSelectedImage] = useState<string | null>(
      args.selectedImage || null,
    );

    const handleImageUpload = (file: File) => {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      console.log("Image uploaded:", file.name);
    };

    const handleImageRemove = () => {
      setSelectedImage(null);
      console.log("Image removed");
    };

    return (
      <div className="w-128">
        <InputForm
          {...args}
          value={value}
          onChange={setValue}
          selectedImage={selectedImage}
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
          onSubmit={() => {
            console.log(
              "Form submitted with:",
              value,
              "and image:",
              selectedImage,
            );
          }}
        />
      </div>
    );
  },
};
