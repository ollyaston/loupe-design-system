// Simple container with background and rounded corners
// for use in other layouts

import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  background = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  background?: "primary" | "secondary";
}) {
  const backgroundColorVariable =
    background === "secondary"
      ? "var(--color-sidebar-background-light)"
      : "var(--color-background)";

  return (
    <div
      className={cn("flex-1 rounded-xl overflow-hidden min-h-0", className)}
      style={{ backgroundColor: backgroundColorVariable }}
    >
      {children}
    </div>
  );
}
