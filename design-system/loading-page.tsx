import React from "react";
import { Icon } from "./icon";

import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

interface LoadingPageProps {
  heading?: string;
  description?: string;
  showProgress?: boolean;
  showSpinner?: boolean;
  progress?: number; // 0-100
  steps?: {
    id: string;
    label: string;
    completed?: boolean;
    working?: boolean;
  }[];
  className?: string;
}

export function LoadingPage({
  heading,
  description,
  showProgress,
  showSpinner,
  progress,
  steps,
  className = "",
}: LoadingPageProps) {
  return (
    <div
      className={cn(
        "loupe-system",
        "flex flex-col items-center justify-center text-center min-h-[calc(100vh-64px)]",
        className,
      )}
    >
      {heading && (
        <h3 className="font-semibold text-foreground mb-1 text-lg">
          {heading}
        </h3>
      )}
      {description && (
        <p className="text-muted-foreground max-w-md mb-1 text-sm">
          {description}
        </p>
      )}

      {showSpinner ? (
        <div className="mt-6">
          <Spinner size={32} />
        </div>
      ) : showProgress ? (
        <div className="w-full max-w-md mt-6">
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            {progress !== undefined ? (
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${Math.min(100, Math.max(0, progress))}%`,
                }}
              />
            ) : (
              <div className="bg-primary h-2 rounded-full animate-pulse" />
            )}
          </div>
        </div>
      ) : steps && steps.length > 0 ? (
        <div className="flex flex-col gap-2 mt-4 max-w-sm">
          {steps.map((step) => (
            <div key={step.id} className="flex gap-1 items-center">
              <div className="p-1">
                {step.completed ? (
                  <Icon name="check" size={16} className="text-success" />
                ) : step.working ? (
                  <Spinner size={16} />
                ) : (
                  <div className="h-4 w-4" />
                )}
              </div>
              <div className="text-sm text-foreground">{step.label}</div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
