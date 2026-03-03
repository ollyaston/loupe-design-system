import React from "react";
import { StepBadge } from "@/design-system/step-badge";
import { Separator } from "@/design-system/separator";
import { cn } from "@/lib/utils";

interface Step {
  index: number;
  title: string;
  completed?: boolean;
}

const Stepper = ({
  steps,
  currentStep,
  onStepClick,
}: {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}) => {
  return (
    <div className="loupe-system flex items-center justify-center w-full gap-8">
      {steps.map((step, index) => {
        const isCompleted = step.completed || index < currentStep;
        const isCurrent = index === currentStep;
        const isClickable = onStepClick && (isCompleted || isCurrent);

        return (
          <React.Fragment key={step.index}>
            <div className="flex items-center">
              <button
                onClick={() => isClickable && onStepClick(step.index)}
                disabled={!isClickable}
                className={cn(
                  "flex items-center gap-3 transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
                  isClickable && "cursor-pointer hover:opacity-80",
                  !isClickable && "cursor-default",
                )}
              >
                <StepBadge
                  index={step.index}
                  completed={isCompleted}
                  active={isCurrent}
                  size="sm"
                />
                <span
                  className={cn(
                    "text-sm font-medium max-w-[120px] truncate",
                    isCurrent && "text-foreground",
                    isCompleted && "text-foreground",
                    !isCurrent && !isCompleted && "text-muted-foreground",
                  )}
                  title={step.title}
                >
                  {step.title}
                </span>
              </button>
            </div>
            {index < steps.length - 1 && (
              <Separator orientation="horizontal" className="w-6" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export { Stepper };
export type { Step };
