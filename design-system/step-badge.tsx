import { Icon } from "@/design-system/icon";
import { cn } from "@/lib/utils";

const StepBadge = ({
  index,
  completed,
  active,
  size = "default",
}: {
  index: number;
  completed?: boolean;
  active?: boolean;
  size?: "sm" | "default" | "lg";
}) => {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    default: "w-7 h-7 text-xs",
    lg: "w-8 h-8 text-sm",
  };

  return (
    <div
      className={cn(
        "loupe-system",
        "flex items-center justify-center bg-card rounded-lg border border-border shrink-0 font-mono font-semibold",
        sizeClasses[size],
        completed && "bg-foreground text-background border-transparent",
        active && !completed && "bg-muted",
      )}
    >
      {completed ? (
        <Icon
          name="check"
          size={size === "sm" ? 12 : size === "lg" ? 18 : 16}
        />
      ) : (
        index
      )}
    </div>
  );
};

export { StepBadge };
