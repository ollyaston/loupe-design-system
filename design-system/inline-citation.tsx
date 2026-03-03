"use client";

import { Badge } from "@/design-system/badge";
import { Button } from "@/design-system/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/design-system/carousel";
import { HoverCard } from "@/design-system/hover-card";
import { cn } from "@/lib/utils";
import { Icon } from "@/design-system/icon";
import * as React from "react";
import {
  type ComponentProps,
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type InlineCitationProps = ComponentProps<"span">;

export const InlineCitation = ({
  className,
  ...props
}: InlineCitationProps) => (
  <span
    className={cn("loupe-system", "group inline items-center gap-1", className)}
    {...props}
  />
);

export type InlineCitationTextProps = ComponentProps<"span">;

export const InlineCitationText = ({
  className,
  ...props
}: InlineCitationTextProps) => (
  <span
    className={cn("transition-colors group-hover:bg-accent", className)}
    {...props}
  />
);

export type InlineCitationCardTriggerProps = ComponentProps<typeof Badge> & {
  sources: string[];
};

function getHostname(urlStr: string): string | null {
  try {
    return new URL(urlStr).hostname;
  } catch {
    return null;
  }
}

export const InlineCitationCardTrigger = ({
  sources,
  className,
  ...props
}: InlineCitationCardTriggerProps) => {
  const hostnames = sources
    .map((u) => getHostname(u))
    .filter((h): h is string => h != null);
  const firstHost = hostnames[0] ?? "unknown";
  const extraCount = sources.length - 1;

  return (
    <Badge
      className={cn(
        "ml-1 flex items-center gap-2 rounded-full px-3 py-1.5",
        className,
      )}
      variant="secondary"
      {...props}
    >
      <span className="font-medium">
        {firstHost}
        {extraCount > 0 ? ` +${extraCount}` : ""}
      </span>
    </Badge>
  );
};
InlineCitationCardTrigger.displayName = "InlineCitationCardTrigger";

export type InlineCitationCardBodyProps = ComponentProps<"div">;

export const InlineCitationCardBody = ({
  className,
  ...props
}: InlineCitationCardBodyProps) => (
  <div className={cn("relative w-80 p-0", className)} {...props} />
);
InlineCitationCardBody.displayName = "InlineCitationCardBody";

export type InlineCitationCardProps = Omit<
  ComponentProps<typeof HoverCard>,
  "trigger" | "content"
> & {
  children: React.ReactNode;
};

export const InlineCitationCard = ({
  children,
  ...props
}: InlineCitationCardProps) => {
  let trigger: React.ReactNode = null;
  let content: React.ReactNode = null;

  Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const childType = child.type as React.ComponentType<any>;
      if (
        childType === InlineCitationCardTrigger ||
        (childType as any)?.displayName === "InlineCitationCardTrigger"
      ) {
        trigger = child;
      } else if (
        childType === InlineCitationCardBody ||
        (childType as any)?.displayName === "InlineCitationCardBody"
      ) {
        content = child;
      }
    }
  });

  return (
    <HoverCard
      closeDelay={0}
      openDelay={0}
      trigger={trigger}
      content={content}
      {...props}
    />
  );
};

const CarouselApiContext = createContext<CarouselApi | undefined>(undefined);

const useCarouselApi = () => {
  const context = useContext(CarouselApiContext);
  return context;
};

export type InlineCitationCarouselProps = ComponentProps<typeof Carousel>;

export const InlineCitationCarousel = ({
  className,
  children,
  ...props
}: InlineCitationCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <CarouselApiContext.Provider value={api}>
      <Carousel className={cn("w-full", className)} setApi={setApi} {...props}>
        {children}
      </Carousel>
    </CarouselApiContext.Provider>
  );
};

export type InlineCitationCarouselContentProps = ComponentProps<"div">;

export const InlineCitationCarouselContent = (
  props: InlineCitationCarouselContentProps,
) => <CarouselContent {...props} />;

export type InlineCitationCarouselItemProps = ComponentProps<"div">;

export const InlineCitationCarouselItem = ({
  className,
  ...props
}: InlineCitationCarouselItemProps) => (
  <CarouselItem
    className={cn("w-full space-y-2 p-4 pl-8", className)}
    {...props}
  />
);

export type InlineCitationCarouselHeaderProps = ComponentProps<"div">;

export const InlineCitationCarouselHeader = ({
  className,
  ...props
}: InlineCitationCarouselHeaderProps) => (
  <div
    className={cn(
      "flex items-center justify-between gap-2 rounded-t-md bg-secondary p-2",
      className,
    )}
    {...props}
  />
);

export type InlineCitationCarouselIndexProps = ComponentProps<"div">;

export const InlineCitationCarouselIndex = ({
  children,
  className,
  ...props
}: InlineCitationCarouselIndexProps) => {
  const api = useCarouselApi();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <div
      className={cn(
        "flex flex-1 items-center justify-end px-3 py-1 text-muted-foreground text-xs",
        className,
      )}
      {...props}
    >
      {children ?? `${current}/${count}`}
    </div>
  );
};

export type InlineCitationCarouselPrevProps = ComponentProps<typeof Button>;

export const InlineCitationCarouselPrev = ({
  className,
  ...props
}: InlineCitationCarouselPrevProps) => {
  const api = useCarouselApi();

  const handleClick = useCallback(() => {
    if (api) {
      api.scrollPrev();
    }
  }, [api]);

  return (
    <Button
      aria-label="Previous"
      variant="ghost"
      size="icon"
      className={cn("shrink-0 size-8 rounded-lg", className)}
      onClick={handleClick}
      type="button"
      {...props}
    >
      <Icon name="arrow_back" size={16} className="text-muted-foreground" />
    </Button>
  );
};

export type InlineCitationCarouselNextProps = ComponentProps<typeof Button>;

export const InlineCitationCarouselNext = ({
  className,
  ...props
}: InlineCitationCarouselNextProps) => {
  const api = useCarouselApi();

  const handleClick = useCallback(() => {
    if (api) {
      api.scrollNext();
    }
  }, [api]);

  return (
    <Button
      aria-label="Next"
      variant="ghost"
      size="icon"
      className={cn("shrink-0 size-8 rounded-lg", className)}
      onClick={handleClick}
      type="button"
      {...props}
    >
      <Icon name="arrow_forward" size={16} className="text-muted-foreground" />
    </Button>
  );
};

export type InlineCitationSourceProps = ComponentProps<"div"> & {
  title?: string;
  url?: string;
  description?: string;
};

export const InlineCitationSource = ({
  title,
  url,
  description,
  className,
  children,
  ...props
}: InlineCitationSourceProps) => (
  <div className={cn("space-y-1", className)} {...props}>
    {(title || url) && (
      <div className="min-w-0">
        {title && (
          <h4 className="truncate font-semibold text-sm leading-tight">
            {title}
          </h4>
        )}
        {url && (
          <p className="truncate break-all text-muted-foreground text-xs">
            {url}
          </p>
        )}
      </div>
    )}
    {description && (
      <p className="line-clamp-3 text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    )}
    {children}
  </div>
);

export type InlineCitationQuoteProps = ComponentProps<"blockquote">;

export const InlineCitationQuote = ({
  children,
  className,
  ...props
}: InlineCitationQuoteProps) => (
  <blockquote
    className={cn(
      "border-muted border-l-2 pl-3 text-muted-foreground text-sm italic",
      className,
    )}
    {...props}
  >
    {children}
  </blockquote>
);
