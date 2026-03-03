import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/80",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
        destructiveAlt:
          "border border-destructive-alt-foreground/20 bg-background text-destructive-alt-foreground hover:bg-destructive-alt hover:text-destructive-alt-foreground shadow-input",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground bg-background shadow-input",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/60 shadow-input",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        "2xs": "h-5 px-2 py-1 text-xs",
        xs: "h-6 px-3 py-1.5 text-xs",
        sm: "h-8 px-3 text-xs",
        default: "h-9 px-4 py-2",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
      },
      aspectRatio: {
        default: "aspect-auto",
        square: "aspect-square p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      aspectRatio: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  waiting?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      aspectRatio,
      asChild = false,
      waiting = false,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    // Helper function to replace icons with spinner
    const renderChildren = () => {
      if (!waiting) return children;

      // Helper function to check if a React element is an Icon component
      const isIconComponent = (element: any) => {
        if (!React.isValidElement(element)) return false;

        // Check if it's the Icon component by looking at displayName or component name
        const componentType = element.type as any;
        const componentName = componentType?.displayName || componentType?.name;
        return componentName === "Icon" || componentName === "IconComponent";
      };

      // If children contain icons, replace them with spinner
      if (React.isValidElement(children) && children.type === React.Fragment) {
        const fragmentChildren = React.Children.toArray(
          (children.props as any).children,
        );
        const hasIcon = fragmentChildren.some(isIconComponent);

        if (hasIcon) {
          return (
            <>
              <Spinner size={16} />
              {fragmentChildren.filter((child: any) => !isIconComponent(child))}
            </>
          );
        }
      }

      // If it's a single Icon component, replace with spinner
      if (isIconComponent(children)) {
        return <Spinner size={16} />;
      }

      // Otherwise, prepend spinner to existing content
      return (
        <>
          <Spinner size={16} />
          {children}
        </>
      );
    };

    return (
      <Comp
        className={cn(
          "loupe-system",
          buttonVariants({ variant, size, aspectRatio, className }),
        )}
        ref={ref}
        disabled={disabled || waiting}
        {...props}
      >
        {renderChildren()}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export interface ButtonGroupWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ButtonGroupWrapper = React.forwardRef<
  HTMLDivElement,
  ButtonGroupWrapperProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("loupe-system", "flex gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
});
ButtonGroupWrapper.displayName = "ButtonGroupWrapper";

export { Button, buttonVariants, ButtonGroupWrapper };
