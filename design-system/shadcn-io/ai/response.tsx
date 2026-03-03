"use client";

import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { Streamdown } from "streamdown";

export function Response(props: ComponentProps<typeof Streamdown>) {
  return (
    <Streamdown
      {...props}
      className={cn("loupe-system", props.className)}
      components={{
        ...props.components,

        a: (props) => (
          <a
            {...props}
            target="_blank"
            className="underline group-[.is-user]:text-sidebar-foreground hover:opacity-80"
            rel="noreferrer"
          />
        ),
      }}
    />
  );
}
Response.displayName = "Response";
