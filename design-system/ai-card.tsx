import * as React from "react";

import { cn } from "@/lib/utils";
import { Textarea } from "@/design-system/textarea";
import { Button } from "@/design-system/button";
import { Icon, IconName } from "@/design-system/icon";

interface AICardExampleButton {
  title: string;
  description: string;
  icon: IconName;
}

interface AICardProps {
  title?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  exampleButtons?: AICardExampleButton[];
  rows?: number;
  className?: string;
}

const AICard = React.forwardRef<HTMLDivElement, AICardProps>(
  (
    {
      title = "Describe your request",
      placeholder = "Describe your request...",
      value,
      onChange,
      exampleButtons = [],
      rows = 8,
      className,
    },
    ref,
  ) => {
    const handleExampleClick = (example: AICardExampleButton) => {
      onChange(example.description);
    };

    return (
      <div
        ref={ref}
        className={cn("loupe-system", className)}
        style={{
          borderRadius: "var(--border-radius-rounded-xl, 14px)",
          border:
            "var(--border-width-border, 1px) solid var(--base-border, #E5E5E5)",
        }}
      >
        <div
          className="p-6"
          style={{
            background: "var(--base-primary-foreground, #FAFAFA)",
            borderRadius: "var(--border-radius-rounded-xl, 14px)",
            padding: "24px",
          }}
        >
          {title && <h2 className="text-xl font-semibold mb-6">{title}</h2>}

          <div className="relative">
            <Textarea
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              rows={rows}
              className="resize-none bg-background shadow-none"
              style={{
                height: "112px",
                minHeight: "112px",
              }}
            />
          </div>

          {exampleButtons.length > 0 && (
            <div className="mt-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {exampleButtons.map((example) => (
                  <Button
                    key={example.title}
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => handleExampleClick(example)}
                  >
                    <Icon name={example.icon} size={16} />
                    {example.title}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);
AICard.displayName = "AICard";

export { AICard };
export type { AICardProps, AICardExampleButton };
