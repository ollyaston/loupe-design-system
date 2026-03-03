import React from "react";
import { Button } from "@/design-system/button";
import { Stepper, type Step } from "@/design-system/stepper";
import { cn } from "@/lib/utils";

interface CreateWizardNavProps {
  leftText?: string;
  onLeftClick?: () => void;
  rightText?: string;
  onRightClick?: () => void;
  rightDisabled?: boolean;
  rightLoading?: boolean;
  stepper?: {
    steps: Step[];
    currentStep: number;
    onStepClick?: (stepIndex: number) => void;
  };
  className?: string;
}

export function CreateWizardNav({
  leftText,
  onLeftClick,
  rightText,
  onRightClick,
  rightDisabled,
  rightLoading,
  stepper,
  className,
}: CreateWizardNavProps) {
  return (
    <div
      className={cn(
        "loupe-system",
        "sticky top-0 z-10 bg-background/95",
        className,
      )}
    >
      <div className="w-full mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex-1">
          {leftText && onLeftClick && (
            <Button
              variant="outline"
              onClick={onLeftClick}
              className="text-left"
            >
              {leftText}
            </Button>
          )}
        </div>

        {stepper && (
          <div className="flex-1 flex justify-center">
            <Stepper
              steps={stepper.steps}
              currentStep={stepper.currentStep}
              onStepClick={stepper.onStepClick}
            />
          </div>
        )}

        <div className="flex-1 flex justify-end">
          {rightText && onRightClick && (
            <Button
              variant="default"
              onClick={onRightClick}
              className="text-right"
              disabled={rightDisabled}
              waiting={rightLoading}
            >
              {rightText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
