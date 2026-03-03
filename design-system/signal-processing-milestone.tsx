"use client";

import * as React from "react";
import { Icon } from "@/design-system/icon";
import { cn } from "@/lib/utils";

export interface ProcessingStep {
  id: string;
  label: string;
}

const DEFAULT_STEPS: ProcessingStep[] = [
  { id: "validation", label: "Validation" },
  { id: "processing", label: "Processing" },
  { id: "enrichment", label: "Enrichment" },
  { id: "delivery", label: "Delivery" },
];

export interface SignalProcessingMilestoneProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom steps to display. Defaults to a generic pipeline. */
  steps?: ProcessingStep[];
  /** Title shown above the steps */
  title?: string;
  /** ID of the step that failed. When set, that step shows as failed and others before it as completed. */
  failedStepId?: string;
  failureReason?: string;
  isPending?: boolean; // If true, show all steps as pending
  failureAction?: React.ReactNode;
}

const SignalProcessingMilestone = React.forwardRef<
  HTMLDivElement,
  SignalProcessingMilestoneProps
>(
  (
    {
      steps = DEFAULT_STEPS,
      title = "Processing steps",
      failedStepId,
      failureReason,
      failureAction,
      isPending = false,
      className,
      ...props
    },
    ref,
  ) => {
    // If isPending is true, show all steps as pending
    // If no failure and not pending, show all steps as completed (success case)
    const failedStepIndex = isPending
      ? -2 // Special value to indicate all pending
      : failedStepId
        ? steps.findIndex((step) => step.id === failedStepId)
        : -1;

    return (
      <div
        ref={ref}
        className={cn("loupe-system space-y-1", className)}
        {...props}
      >
        <div className="text-sm font-medium mb-4">{title}</div>
        <ol className="flex flex-col gap-0">
          {steps.map((step, index) => {
            const isCompleted =
              failedStepIndex === -1 ||
              (failedStepIndex >= 0 && index < failedStepIndex);
            const isFailed = failedStepIndex >= 0 && index === failedStepIndex;
            // isPendingStep would be: failedStepIndex === -2 || (!isCompleted && !isFailed)

            return (
              <li
                key={step.id}
                className={cn(
                  "relative flex gap-3",
                  index === steps.length - 1 ? "pb-0" : "pb-6",
                  "pl-4 ml-2",
                )}
              >
                {/* Timeline connector */}
                <div className="relative shrink-0 -ml-[18px]">
                  {index !== steps.length - 1 && (
                    <div
                      className={cn(
                        "absolute left-1/2 top-8 h-[calc(100%-8px)] w-0.5 -translate-x-1/2",
                        isCompleted
                          ? "bg-success"
                          : isFailed
                            ? "bg-destructive"
                            : "bg-border",
                      )}
                    />
                  )}
                  {/* Icon container */}
                  <div
                    className={cn(
                      "relative flex size-8 items-center justify-center rounded-full border-2 bg-background z-10",
                      isCompleted
                        ? "border-success bg-success/10"
                        : isFailed
                          ? "border-destructive bg-destructive/10"
                          : "border-border",
                    )}
                  >
                    {isCompleted ? (
                      <Icon
                        name="check_circle"
                        size={16}
                        className="text-success"
                      />
                    ) : isFailed ? (
                      <Icon
                        name="cancel"
                        size={16}
                        className="text-destructive"
                      />
                    ) : (
                      <div className="size-2 rounded-full bg-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex min-w-0 flex-1 flex-col pt-1">
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isCompleted
                            ? "text-success"
                            : isFailed
                              ? "text-destructive"
                              : "text-muted-foreground",
                        )}
                      >
                        {step.label}
                      </span>
                      {isFailed && failureAction ? (
                        <div className="ml-auto">{failureAction}</div>
                      ) : null}
                    </div>
                    {isFailed && failureReason && (
                      <p className="text-xs text-destructive mt-1">
                        {failureReason}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  },
);

SignalProcessingMilestone.displayName = "SignalProcessingMilestone";

export { SignalProcessingMilestone };
