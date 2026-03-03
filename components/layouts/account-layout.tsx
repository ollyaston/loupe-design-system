"use client";

import { useEffect } from "react";

import { useFeatureFlags } from "@/lib/feature-flags";
import { FeatureList } from "@/design-system/feature-list";
import { Logo } from "@/design-system/logo";
import { ScrollArea } from "@/design-system/scroll-area";
import { Container } from "./container";

export function AccountLayout({
  children,
  sidebarContent,
  sidebarType,
  demoBanner,
  containerBackground,
}: {
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
  sidebarType?: "logo" | "features";
  demoBanner?: React.ReactNode;
  containerBackground?: "primary" | "secondary";
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

  const currentYear = new Date().getFullYear();

  const defaultFeatures = [
    {
      title: "Simple to get started",
      description:
        "Create your account and you're ready to go in minutes. No complex setup required.",
      icon: "bolt",
    },
    {
      title: "Grows with you",
      description:
        "Built to scale from your first project to your largest deployment.",
      icon: "ssid_chart",
    },
    {
      title: "Secure and reliable",
      description:
        "Enterprise-grade security and uptime you can count on. Your data is protected.",
      icon: "lock",
    },
    {
      title: "Designed for teams",
      description:
        "Collaborate with your team from day one. Invite others and work together seamlessly.",
      icon: "groups",
    },
  ];

  const renderSidebarContent = () => {
    if (sidebarContent) {
      return sidebarContent;
    }

    switch (sidebarType) {
      case "logo":
        return <Logo size={150} className="mt-4" />;
      case "features":
        return <FeatureList features={defaultFeatures} />;
      default:
        return <FeatureList features={defaultFeatures} />;
    }
  };

  const Comp = insetScrolling ? ScrollArea : "div";

  return (
    <div className="flex flex-col gap-2 h-screen bg-sidebar p-2">
      {demoBanner}
      <div className="flex flex-1 gap-4">
        <div className="hidden md:flex flex-col justify-between w-1/4 md:w-1/3 px-8 py-2">
          {sidebarType !== "logo" && (
            <Logo size={36} variant="icon" className="mt-4" />
          )}
          <div className="flex flex-col items-center justify-center flex-1 text-sidebar-foreground">
            {renderSidebarContent()}
          </div>
          <div className="text-xs text-muted-foreground text-center">
            © {currentYear} Loupe
          </div>
        </div>
        <Container background={containerBackground}>
          <Comp className="h-full flex flex-col justify-center">
            <div className="w-full max-w-sm mx-auto px-4 py-[20vh]">
              {children}
            </div>
          </Comp>
        </Container>
      </div>
    </div>
  );
}
