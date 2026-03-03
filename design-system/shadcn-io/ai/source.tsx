"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@/design-system/icon";
import type { ComponentProps, ReactNode } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../collapsible";

export type SourceItem = {
  href?: string;
  title?: string;
  children?: ReactNode;
};

export type SourcesProps = ComponentProps<typeof Collapsible> & {
  sources: SourceItem[];
  triggerContent?: ReactNode;
};

export const Sources = ({
  className,
  sources,
  triggerContent,
  ...props
}: SourcesProps) => {
  const count = sources.length;

  return (
    <Collapsible
      className={cn(
        "loupe-system",
        "not-prose mb-4 text-primary text-xs",
        className,
      )}
      {...props}
    >
      <CollapsibleTrigger className="flex items-center gap-2">
        {triggerContent ?? (
          <p className="font-medium">
            Used {count} {count === 1 ? "source" : "sources"}
          </p>
        )}
      </CollapsibleTrigger>
      <CollapsibleContent
        className={cn(
          "loupe-system",
          "mt-3 flex w-fit flex-col gap-2",
          "data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 outline-none data-[state=closed]:animate-out data-[state=open]:animate-in",
        )}
      >
        {sources.map((source, i) => (
          <a
            key={i}
            className={cn("loupe-system", "flex items-center gap-2")}
            href={source.href}
            rel="noreferrer"
            target="_blank"
          >
            {source.children ?? (
              <>
                <Icon name="book" size={16} />
                <span className="block font-medium">{source.title}</span>
              </>
            )}
          </a>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
