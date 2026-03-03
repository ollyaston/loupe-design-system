"use client";

import * as React from "react";
import { usePress } from "react-aria";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/design-system/button";
import type { VariantProps } from "class-variance-authority";

const HOLD_DURATION = 1000;

interface HoldButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  onComplete: () => void;
  holdDuration?: number;
  children: React.ReactNode;
}

export const HoldButton = React.forwardRef<HTMLButtonElement, HoldButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      onComplete,
      holdDuration = HOLD_DURATION,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const [isHolding, setIsHolding] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const progressRef = React.useRef(0);
    const startTimeRef = React.useRef<number | null>(null);
    const animationFrameRef = React.useRef<number | null>(null);
    const hasCompletedRef = React.useRef(false);

    const updateProgress = React.useCallback(() => {
      if (!startTimeRef.current || hasCompletedRef.current) return;

      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / holdDuration) * 100, 100);
      progressRef.current = newProgress;
      setProgress(newProgress);

      if (newProgress >= 100) {
        hasCompletedRef.current = true;
        setIsHolding(false);
        onComplete();
      } else {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    }, [holdDuration, onComplete]);

    const handlePressStart = React.useCallback(() => {
      if (disabled) return;
      hasCompletedRef.current = false;
      startTimeRef.current = Date.now();
      setIsHolding(true);
      setProgress(0);
      progressRef.current = 0;
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }, [disabled, updateProgress]);

    const handlePressEnd = React.useCallback(() => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      startTimeRef.current = null;
      setIsHolding(false);
      setProgress(0);
      progressRef.current = 0;
    }, []);

    const { pressProps } = usePress({
      onPressStart: handlePressStart,
      onPressEnd: handlePressEnd,
      isDisabled: disabled,
    });

    React.useEffect(() => {
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, []);

    return (
      <button
        ref={ref}
        className={cn(
          "loupe-system",
          "relative overflow-hidden",
          buttonVariants({ variant, size, className }),
        )}
        disabled={disabled}
        {...pressProps}
        {...props}
      >
        <span
          className="absolute inset-0 bg-primary-foreground/30 transition-opacity duration-100"
          style={{
            width: `${progress}%`,
            opacity: isHolding ? 1 : 0,
          }}
        />
        <span className="relative z-10">{children}</span>
      </button>
    );
  },
);

HoldButton.displayName = "HoldButton";
