/* eslint-disable agent-loupe-ui/literal-color-classes -- Demo banner uses brand cerulean-600 */
import { Button } from "@/design-system/button";
import { Icon } from "@/design-system/icon";
import { CSSProperties, ReactNode } from "react";

interface DemoBannerProps {
  className?: string;
  style?: CSSProperties;
  icon?: string;
  title?: string;
  children?: ReactNode;
  actionText?: string;
  onActionClick?: () => void;
  actionIcon?: string;
  backButtonText?: string;
  onBackClick?: () => void;
  backIcon?: string;
}

export function DemoBanner({
  className,
  style,
  icon = "play_shapes",
  title = "Demo",
  children,
  actionText,
  onActionClick,
  actionIcon,
  backButtonText,
  onBackClick,
  backIcon,
}: DemoBannerProps) {
  return (
    <div
      className={`loupe-system px-4 py-3 rounded-xl flex items-center justify-between bg-cerulean-600 text-cerulean-50 text-sm ${className || ""}`}
      style={style}
    >
      <div>
        {backButtonText && onBackClick ? (
          <Button
            variant="outline"
            size="sm"
            className="border-cerulean-50 text-cerulean-50 shadow-none bg-transparent hover:bg-cerulean-500 active:bg-cerulean-500"
            onClick={onBackClick}
          >
            {backIcon && (
              <Icon name={backIcon} size={16} className="-ml-1 -mr-1" />
            )}
            {backButtonText}
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Icon name={icon} size={18} />
            <span className="font-semibold">{title}</span>
          </div>
        )}
      </div>
      <div className="flex-1 text-center px-4">{children}</div>
      <div className="flex items-center gap-2">
        {actionText && (
          <Button
            variant="outline"
            size="sm"
            className="border-cerulean-50 text-cerulean-50 shadow-none bg-transparent hover:bg-cerulean-500 active:bg-cerulean-500"
            onClick={onActionClick}
          >
            {actionText}
            {actionIcon && (
              <Icon name={actionIcon} size={16} className="-ml-1 -mr-1" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
