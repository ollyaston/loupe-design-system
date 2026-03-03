/* eslint-disable agent-loupe-ui/ui-component-story-required -- Archive story removed as redundant */
import { StepBadge } from "@/design-system/step-badge";
import { cn } from "@/lib/utils";

const BigStep = ({
  index,
  completed,
  title,
  description,
  hideLine,
  children,
}: {
  index: number;
  completed?: boolean;
  title: string;
  description: string;
  hideLine?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "loupe-system",
        "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 pb-12 ml-4",
        !hideLine && "border-l",
      )}
    >
      <div className="flex flex-row gap-1">
        <div className="-ml-4">
          <StepBadge index={index} completed={completed} size="default" />
        </div>
        <div className="flex flex-col gap-1 pl-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="ml-4">{children}</div>
    </div>
  );
};
export { BigStep };
