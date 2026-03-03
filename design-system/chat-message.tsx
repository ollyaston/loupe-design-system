import React, { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Attachment {
  name: string;
  contentType: string;
  url: string;
}

interface ChatMessageProps {
  role: "user" | "assistant" | "system";
  content: ReactNode;
  attachments?: Attachment[];
  isLoading?: boolean;
  className?: string;
  showAttachments?: boolean;
  maxAttachmentHeight?: number;
  whitespacePrewrap?: boolean;
}

export function ChatMessage({
  role,
  content,
  attachments = [],
  isLoading = false,
  className = "",
  showAttachments = true,
  maxAttachmentHeight = 200,
  whitespacePrewrap = true,
}: ChatMessageProps) {
  if (isLoading) {
    return (
      <div className={cn("flex gap-3 justify-start", className)}>
        {/* <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center shrink-0 mt-1">
          <div className="w-5 h-5 bg-sidebar-primary-foreground rounded-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-sidebar-primary rounded-full"></div>
          </div>
        </div> */}
        <div className="bg-sidebar border border-sidebar-border shadow-xs rounded-2xl px-4 py-3 flex items-center">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-sidebar-accent-foreground rounded-full animate-bounce"></div>
            <div
              className="w-1 h-1 bg-sidebar-accent-foreground rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-1 h-1 bg-sidebar-accent-foreground rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "loupe-system",
        "flex gap-3",
        role === "user" ? "justify-end" : "justify-start",
        className,
      )}
    >
      {/* Avatar */}
      {/* <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center shrink-0 mt-1">
        {role === "assistant" ? (
          <div className="w-5 h-5 bg-sidebar-primary-foreground rounded-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-sidebar-primary rounded-full"></div>
          </div>
        ) : (
          <div className="w-5 h-5 bg-sidebar-primary-foreground rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-sidebar-primary rounded-sm"></div>
          </div>
        )}
      </div> */}

      {/* Message Content */}
      <div
        className={cn(
          "rounded-2xl px-4 py-3 text-sm max-w-[85%] break-words",
          role === "user"
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "bg-sidebar text-sidebar-foreground border border-sidebar-border shadow-xs",
        )}
      >
        {/* Show attachments */}
        {showAttachments && attachments && attachments.length > 0 && (
          <div className="mb-2">
            {attachments.map((attachment, index) => (
              <Image
                key={index}
                src={attachment.url}
                alt={attachment.name || "Uploaded image"}
                width={800}
                height={600}
                className="max-w-full h-auto rounded-lg border border-sidebar-border mb-2"
                style={{ maxHeight: `${maxAttachmentHeight}px` }}
                unoptimized
              />
            ))}
          </div>
        )}

        {/* Message text */}
        {/**
         * NOTE: In some instances (e.g. when using `<StreamDown />`),
         * we won't want to preserve whitespace, as it can interfere
         * with the markdown rendering.
         */}
        {whitespacePrewrap ? (
          <div className="whitespace-pre-wrap">{content}</div>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
