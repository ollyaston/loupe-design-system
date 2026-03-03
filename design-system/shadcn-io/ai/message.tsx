import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";
import type { ComponentProps, HTMLAttributes } from "react";
import { Avatar } from "../../avatar";

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage["role"];
};

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      "loupe-system",
      "group flex items-end justify-end gap-2 py-4",
      from === "user"
        ? "is-user [&>div]:max-w-[80%]"
        : "is-assistant w-full flex-row-reverse justify-end",
      className,
    )}
    {...props}
  />
);

export type MessageContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageContent = ({
  children,
  className,
  ...props
}: MessageContentProps & {}) => (
  <div
    className={cn(
      "loupe-system",
      "flex flex-col gap-2 overflow-hidden rounded-lg text-foreground text-sm",
      "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground group-[.is-user]:px-4 group-[.is-user]:py-3",
      "group-[.is-assistant]:w-full group-[.is-assistant]:bg-muted group-[.is-assistant]:px-4 group-[.is-assistant]:py-3",
      className,
    )}
    {...props}
  >
    <div className="is-user:dark">{children}</div>
  </div>
);

export type MessageAvatarProps = ComponentProps<typeof Avatar> & {
  src: string;
  name?: string;
};

export const MessageAvatar = ({ src, name, ...props }: MessageAvatarProps) => (
  <Avatar size="sm" variant="ring" src={src} alt={name || "User"} {...props} />
);
