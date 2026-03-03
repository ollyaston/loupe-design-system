/* eslint-disable agent-loupe-ui/ui-component-story-required -- Archive story removed as redundant */
import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface FeatureListProps extends React.HTMLAttributes<HTMLDivElement> {
  features: Feature[];
}

const FeatureList = React.forwardRef<HTMLDivElement, FeatureListProps>(
  ({ className, features, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("loupe-system", "flex flex-col space-y-8", className)}
        {...props}
      >
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Icon name={feature.icon} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold leading-none tracking-tight mb-2">
                {feature.title}
              </h3>
              <p className="text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  },
);

FeatureList.displayName = "FeatureList";

export { FeatureList };
