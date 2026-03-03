import { cva } from "class-variance-authority";
import { Icon } from "../../icon";
import {
  ReasoningUIPart,
  ToolUIPart,
  UIDataTypes,
  UIMessage,
  UITools,
} from "ai";
import { useEffect, useRef, useState } from "react";
import { intervalToDuration } from "date-fns";
import { throttle } from "lodash";
import { cn } from "@/lib/utils";

///////////////////////////////////////////////////
// Types – minimal type for web search preview (no app/agent-config)
///////////////////////////////////////////////////

type WebSearchToolUIPart = ToolUIPart & {
  type: "tool-web_search_preview";
};

///////////////////////////////////////////////////
// Utils
///////////////////////////////////////////////////

function assertIsReasoningPart(
  part: UIMessage["parts"][number],
): part is ReasoningUIPart | WebSearchToolUIPart {
  return part.type === "reasoning" || part.type === "tool-web_search_preview";
}

function deriveIsStreaming(
  part: ReasoningUIPart | WebSearchToolUIPart,
): boolean {
  const type = part.type;
  switch (type) {
    case "reasoning": {
      const state = part.state;
      switch (state) {
        case "streaming":
        case undefined:
          return true;
        case "done":
          return false;
        default:
          return state satisfies never;
      }
    }
    case "tool-web_search_preview": {
      const state = part.state;
      switch (state) {
        case "input-streaming":
          return true;
        case "input-available":
        case "output-available":
        case "output-error":
          return false;
        default:
          return state satisfies never;
      }
    }
    default:
      return type satisfies never;
  }
}

/**
 * Utility for parsing a title from a reasoning block's text (typically markdown).
 * Strategy:
 * - Only return a title when it is a multi-line block (otherwise we could
 *   return an entire paragraph = bad UX)
 * - Grab the text content before the first newline
 * - Sanitize it by removing any non-alphanumeric or space characters
 * - Return null if the resulting title is empty
 */
function attemptToParseTitle(text: string): string | null {
  if (text.includes("\n") === false) return null;
  // Look for a title in the first line, e.g., "## Title"
  const lines = text.split("\n");
  if (lines.length === 0) return null;

  const sanitizedTitle = lines[0]
    .replace(/^#+\s*/, "")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim();

  return sanitizedTitle.length > 0 ? `${sanitizedTitle}...` : null;
}

/**
 * Derive a user-friendly title for the reasoning block based on its type and state.
 */
function deriveReasoningTitle(
  part: ReasoningUIPart | WebSearchToolUIPart,
): string {
  const type = part.type;
  switch (type) {
    case "reasoning": {
      const title = attemptToParseTitle(part.text);
      const state = part.state;
      switch (state) {
        case "streaming":
        case undefined: {
          return title || "Reasoning...";
        }
        case "done":
          return title || "Reasoning complete";
        default:
          return state satisfies never;
      }
    }
    case "tool-web_search_preview": {
      const state = part.state;
      switch (state) {
        case "input-streaming":
          return "Searching the web...";
        case "input-available":
        case "output-available":
        case "output-error":
          return "Analyzing web search results...";
        default:
          return state satisfies never;
      }
    }
    default:
      return type satisfies never;
  }
}

function ReasoningIcon({ isStreaming }: { isStreaming: boolean }) {
  switch (isStreaming) {
    case true:
      return (
        <Icon name="progress_activity" size={16} className="animate-spin" />
      );

    case false:
      return <Icon name="check_circle" size={16} />;
    default:
      return null;
  }
}

/**
 * Format a reasoning duration between two Date objects into a human-readable string.
 * - If no minutes, show seconds only (e.g., "45s")
 * - If minutes, show minutes and seconds (e.g., "2m30s")
 */
function formatReasoningDuration(startTime: Date, endTime: Date) {
  const duration = intervalToDuration({
    start: startTime,
    end: endTime,
  });

  const minutes = duration.minutes ?? 0;
  const seconds = duration.seconds ?? 0;

  return minutes > 0 ? `${minutes}m${seconds}s` : `${seconds}s`;
}

/**
 * Custom hook to manage timing state for reasoning parts.
 * Tracks start and end times based on streaming status of parts.
 */
function useTiming(
  parts: (ReasoningUIPart | WebSearchToolUIPart)[],
  allPartsFinished: boolean,
) {
  const [timing, setTiming] = useState<{
    startTime: Date | null;
    endTime: Date | null;
  }>({
    startTime: null,
    endTime: null,
  });

  useEffect(() => {
    if (!parts || parts.length === 0) return;

    const hasStreamingParts = parts.some(deriveIsStreaming);

    setTiming((prevTiming) => {
      // Set start time if we don't have one and there are streaming parts
      if (!prevTiming.startTime && hasStreamingParts) {
        return {
          ...prevTiming,
          startTime: new Date(),
        };
      }

      // Set end time if all parts are finished and we don't have an end time yet
      if (allPartsFinished && !prevTiming.endTime && prevTiming.startTime) {
        return {
          ...prevTiming,
          endTime: new Date(),
        };
      }

      // Reset end time if parts start streaming again
      if (hasStreamingParts && prevTiming.endTime) {
        return {
          ...prevTiming,
          endTime: null,
        };
      }

      return prevTiming;
    });
  }, [parts, allPartsFinished]);

  return timing;
}

///////////////////////////////////////////////////
// Components
///////////////////////////////////////////////////

/**
 * Displays a "ticker" style timing indicator showing the elapsed time
 * since the start time, updating every second until an end time is set.
 */
function TimingIndicator({
  endTime,
  startTime,
}: {
  startTime: Date | null;
  endTime: Date | null;
}) {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    if (!startTime || endTime) return;

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  if (startTime === null) return null;

  const formattedDuration = formatReasoningDuration(
    startTime,
    endTime ?? currentTime,
  );

  return (
    <div className="text-muted-foreground text-xs font-mono">
      ({formattedDuration})
    </div>
  );
}

const reasoningTextStyles = cva("block w-full", {
  variants: {
    isCurrent: {
      true: "animate-[500ms_ease-out_normal_forwards_fade-up-xs]",
      false: [
        "absolute top-0 left-0",
        "animate-[500ms_ease-in_reverse_forwards_fade-down-xs]",
      ],
    },
    shouldAnimate: {
      true: "animate-play",
      false: "animate-paused",
    },
  },
});

function ReasoningText({ title }: { title: string }) {
  const [displayTitle, setDisplayTitle] = useState<{
    curr: string;
    prev: string | null;
  }>(() => ({
    curr: title,
    prev: null,
  }));

  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Create a ref to store the throttled function
  const throttledUpdateTitleRef = useRef(
    throttle((newTitle: string) => {
      if (
        newTitle &&
        newTitle !== "Reasoning..." &&
        newTitle !== displayTitle.curr
      ) {
        setShouldAnimate(true);
        setDisplayTitle((prev) => ({
          prev: prev.curr,
          curr: newTitle,
        }));
      }
    }, 1000),
  );

  useEffect(() => {
    throttledUpdateTitleRef.current(title);
  }, [title]);

  return (
    <span className="block relative w-full">
      {displayTitle.prev ? (
        <span
          className={reasoningTextStyles({
            isCurrent: false,
            shouldAnimate,
          })}
          key={`${displayTitle.prev}-prev`}
        >
          {displayTitle.prev}
        </span>
      ) : null}
      <span
        className={reasoningTextStyles({
          isCurrent: true,
          shouldAnimate,
        })}
        key={`${displayTitle.curr}-curr`}
      >
        {displayTitle.curr}
      </span>
    </span>
  );
}

const reasoningIndicatorStyles = cva(
  ["flex items-center gap-2 my-6", "text-muted-foreground text-sm"],
  {
    variants: {
      isStreaming: {
        true: "animate-pulse",
        false: "",
      },
    },
  },
);

function ReasoningIndicator({
  title,
  isStreaming,
  startTime,
  endTime,
  part,
}: {
  part: ReasoningUIPart | WebSearchToolUIPart;
  title: string;
  isStreaming: boolean;
  startTime: Date | null;
  endTime: Date | null;
}) {
  return (
    <div
      className={cn("loupe-system", reasoningIndicatorStyles({ isStreaming }))}
    >
      <ReasoningIcon isStreaming={isStreaming} />

      {isStreaming ? (
        <TimingIndicator startTime={startTime} endTime={endTime} />
      ) : null}

      <ReasoningText title={title} />
    </div>
  );
}

export function ReasoningPartsRenderer<
  METADATA = unknown,
  DATA_PARTS extends UIDataTypes = UIDataTypes,
  TOOLS extends UITools = UITools,
>({ message }: { message: UIMessage<METADATA, DATA_PARTS, TOOLS> }) {
  const parts = message.parts.filter(assertIsReasoningPart) as Array<
    ReasoningUIPart | WebSearchToolUIPart
  >;

  const allPartsFinished = parts.every(
    (part) => deriveIsStreaming(part) === false,
  );

  const timing = useTiming(parts, allPartsFinished);

  if (!parts || parts.length === 0) return null;
  const lastPart = parts[parts.length - 1];
  if (!lastPart) return null;

  const isStreaming: boolean = parts.some((part) =>
    deriveIsStreaming(lastPart),
  );

  const title: string =
    allPartsFinished && timing.startTime && timing.endTime
      ? `Thought for ${formatReasoningDuration(timing.startTime!, timing.endTime!)}`
      : deriveReasoningTitle(lastPart);

  return (
    <ReasoningIndicator
      part={lastPart}
      endTime={timing.endTime}
      startTime={timing.startTime}
      title={title}
      isStreaming={isStreaming}
    />
  );
}
