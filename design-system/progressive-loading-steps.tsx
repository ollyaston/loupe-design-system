/* eslint-disable agent-loupe-ui/ui-component-story-required -- Archive story removed as redundant */
import { useEffect, useState, useRef } from "react";
import { Icon } from "./icon";

interface ProgressiveLoadingStepsProps {
  steps: {
    text: string;
    delay: number;
  }[];
  className?: string;
}

export function ProgressiveLoadingSteps({
  steps,
  className = "",
}: ProgressiveLoadingStepsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTimeRef.current;

      let newStep = 0;
      for (let i = steps.length - 1; i >= 0; i--) {
        if (elapsedTime >= steps[i].delay) {
          newStep = i;
          break;
        }
      }

      setCurrentStep(newStep);
    }, 100);

    return () => clearInterval(interval);
  }, [steps]);

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return "completed";
    if (stepIndex === currentStep) return "active";
    return "pending";
  };

  const getStepIcon = (stepIndex: number) => {
    const status = getStepStatus(stepIndex);

    if (status === "completed") {
      return <Icon name="check" size={16} className="text-muted-foreground" />;
    } else if (status === "active") {
      return (
        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
      );
    } else {
      return <div className="w-2 h-2 bg-secondary rounded-full"></div>;
    }
  };

  const getStepTextColor = (stepIndex: number) => {
    const status = getStepStatus(stepIndex);

    if (status === "completed") return "text-muted-foreground";
    if (status === "active") return "text-secondary";
    return "text-muted-foreground";
  };

  return (
    <div className={`loupe-system flex justify-center ${className}`}>
      <div className="w-full max-w-md space-y-3">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          return (
            <div key={`step-${index}`} className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-6 h-6">
                {getStepIcon(index)}
              </div>
              <span className={`text-sm ${getStepTextColor(index)}`}>
                {step.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
