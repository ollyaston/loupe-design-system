import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/design-system/button";
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/design-system/toast";
import { Toaster } from "@/design-system/toaster";

const meta = {
  component: Toast,
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Destructive = () => {
  return (
    <div className="min-h-32">
      <ToastProvider>
        <Toast variant="destructive" open>
          <div className="grid gap-1">
            <ToastTitle>Uh oh! Something went wrong.</ToastTitle>
            <ToastDescription>
              There was a problem with your request.
            </ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </div>
  );
};

export const DestructiveWithAction = () => {
  return (
    <div className="min-h-32">
      <ToastProvider>
        <Toast variant="destructive" open>
          <div className="grid gap-1">
            <ToastTitle>Error with action</ToastTitle>
            <ToastDescription>
              Something went wrong. You can retry.
            </ToastDescription>
          </div>
          <ToastAction altText="Retry">Retry</ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </div>
  );
};

export const WithoutCloseButton = () => {
  return (
    <div className="min-h-32">
      <ToastProvider>
        <Toast open>
          <div className="grid gap-1">
            <ToastTitle>Toast without close</ToastTitle>
            <ToastDescription>This toast has no close button.</ToastDescription>
          </div>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </div>
  );
};

export const DestructiveWithoutCloseButton = () => {
  return (
    <div className="min-h-32">
      <ToastProvider>
        <Toast variant="destructive" open>
          <div className="grid gap-1">
            <ToastTitle>Error without close</ToastTitle>
            <ToastDescription>
              This error toast has no close button.
            </ToastDescription>
          </div>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </div>
  );
};

export const TitleOnly = () => {
  return (
    <div className="min-h-32">
      <ToastProvider>
        <Toast open>
          <div className="grid gap-1">
            <ToastTitle>Simple notification</ToastTitle>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </div>
  );
};

export const DestructiveTitleOnly = () => {
  return (
    <div className="min-h-32">
      <ToastProvider>
        <Toast variant="destructive" open>
          <div className="grid gap-1">
            <ToastTitle>Error occurred</ToastTitle>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </div>
  );
};

export const DescriptionOnly = () => {
  return (
    <div className="min-h-32">
      <ToastProvider>
        <Toast open>
          <div className="grid gap-1">
            <ToastDescription>
              This is a description-only toast notification.
            </ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </div>
  );
};

export const DestructiveDescriptionOnly = () => {
  return (
    <div className="min-h-32">
      <ToastProvider>
        <Toast variant="destructive" open>
          <div className="grid gap-1">
            <ToastDescription>
              Something went wrong with your request.
            </ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </div>
  );
};

// Toaster component stories
function ToastDemo() {
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: "Scheduled: catch up",
            description: "Friday, February 10, 2023 at 3:00 PM",
          });
        }}
      >
        Show toast
      </Button>
      <Toaster />
    </div>
  );
}

export const ToasterDefault = () => {
  return <ToastDemo />;
};

function MultipleToastsDemo() {
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Success",
              description: "Your changes have been saved.",
            });
          }}
        >
          Success toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Error",
              description: "Something went wrong.",
              variant: "destructive",
            });
          }}
        >
          Error toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Info",
              description: "Here's some information for you.",
            });
          }}
        >
          Info toast
        </Button>
      </div>
      <Toaster />
    </div>
  );
}

export const ToasterMultipleToasts = () => {
  return <MultipleToastsDemo />;
};

function ToasterWithActionDemo() {
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: "Undo action",
            description: "This action can be undone.",
            action: (
              <Button size="sm" variant="outline">
                Undo
              </Button>
            ),
          });
        }}
      >
        Show toast with action
      </Button>
      <Toaster />
    </div>
  );
}

export const ToasterWithAction = () => {
  return <ToasterWithActionDemo />;
};
