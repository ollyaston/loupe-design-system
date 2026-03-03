import { type ComponentProps, Fragment, type ReactNode } from "react";
import type { Key } from "ts-key-enum";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const DefaultKbdSeparator = ({
  className,
  children = "+",
  ...props
}: ComponentProps<"span">) => (
  <span className={cn("text-muted-foreground/50", className)} {...props}>
    {children}
  </span>
);

const kbdVariants = cva(
  "inline-flex select-none items-center gap-1 rounded border px-1.5 align-middle font-medium font-mono text-[10px] leading-loose",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        sidebar:
          "bg-sidebar-accent text-sidebar-accent-foreground border-sidebar-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type KbdProps = ComponentProps<"span"> &
  VariantProps<typeof kbdVariants> & {
    separator?: ReactNode;
  };

export const Kbd = ({
  className,
  separator = <DefaultKbdSeparator />,
  variant,
  children,
  ...props
}: KbdProps) => (
  <span
    className={cn("loupe-system", kbdVariants({ variant }), className)}
    {...props}
  >
    {Array.isArray(children)
      ? children.map((child, index) => (
          <Fragment key={index}>
            {child}
            {index < children.length - 1 && separator}
          </Fragment>
        ))
      : children}
  </span>
);

export type KbdKeyProps = Omit<ComponentProps<"kbd">, "aria-label"> & {
  "aria-label"?: keyof typeof Key | (string & {});
};

export const KbdKey = ({ className, ...props }: KbdKeyProps) => (
  <kbd {...props} />
);
