"use client";

import { useEffect } from "react";

import { useFeatureFlags } from "@/lib/feature-flags";
import { ScrollArea } from "@/design-system/scroll-area";
import { CreateWizardNav } from "@/design-system/create-wizard-nav";
import { Container } from "./container";
import type { Step } from "@/design-system/stepper";

export function FullLayout({
  children,
  demoBanner,
  containerBackground,
  topNav,
}: {
  children: React.ReactNode;
  demoBanner?: React.ReactNode;
  containerBackground?: "primary" | "secondary";
  topNav?: {
    leftText?: string;
    onLeftClick?: () => void;
    rightText?: string;
    onRightClick?: () => void;
    stepper?: {
      steps: Step[];
      currentStep: number;
      onStepClick?: (stepIndex: number) => void;
    };
  };
}) {
  const { insetScrolling } = useFeatureFlags();

  // Prevent body scrolling when this layout is used (only if insetScrolling is enabled)
  useEffect(() => {
    if (insetScrolling) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [insetScrolling]);

  const Comp = insetScrolling ? ScrollArea : "div";

  return (
    <div className="fixed inset-0 flex flex-col h-screen bg-sidebar p-2 gap-2 z-100">
      {demoBanner}
      <Container background={containerBackground}>
        <Comp className="h-full flex flex-col justify-start overflow-y-auto">
          {topNav && (
            <CreateWizardNav
              leftText={topNav.leftText}
              onLeftClick={topNav.onLeftClick}
              rightText={topNav.rightText}
              onRightClick={topNav.onRightClick}
              stepper={topNav.stepper}
            />
          )}
          <div className="w-full h-full max-w-7xl mx-auto p-4">{children}</div>
        </Comp>
      </Container>
    </div>
  );
}
