"use client";

import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";
import { Icon } from "@/design-system/icon";

export interface ToolLog {
  toolName: string;
  status: "running" | "completed" | "error";
  logs: string[];
  startTime?: number;
  endTime?: number;
}

interface ChainOfThoughtProps {
  className?: string;
  isVisible?: boolean;
}

export interface ChainOfThoughtRef {
  updateTool: (toolName: string, update: Partial<ToolLog>) => void;
  addToolLog: (toolName: string, log: string) => void;
  setReasoning: (thought: string) => void;
  reset: () => void;
  completeAll: () => void;
}

export const ChainOfThought = forwardRef<
  ChainOfThoughtRef,
  ChainOfThoughtProps
>(({ className, isVisible = true }, ref) => {
  const [tools, setTools] = useState<Map<string, ToolLog>>(new Map());
  const [currentThought, setCurrentThought] = useState<string>("");
  const [isFading, setIsFading] = useState<boolean>(false);
  const scrollRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    if (!isVisible) {
      // Reset state when hidden
      setTools(new Map());
      setCurrentThought("");
      setIsFading(false);
    }
  }, [isVisible]);

  // Public method to update tool status
  const updateTool = (toolName: string, update: Partial<ToolLog>) => {
    setTools((prev) => {
      const newTools = new Map(prev);
      const existing = newTools.get(toolName) || {
        toolName,
        status: "running",
        logs: [],
        startTime: Date.now(),
      };

      const updated = {
        ...existing,
        ...update,
        logs: update.logs ? [...existing.logs, ...update.logs] : existing.logs,
      };

      newTools.set(toolName, updated);
      return newTools;
    });

    // Auto-scroll to bottom for updated tool
    setTimeout(() => {
      const scrollDiv = scrollRefs.current.get(toolName);
      if (scrollDiv) {
        scrollDiv.scrollTop = scrollDiv.scrollHeight;
      }
    }, 50);
  };

  // Public method to add a log line to a tool
  const addToolLog = (toolName: string, log: string) => {
    // Filter out sensitive data from logs (security measure)
    if (shouldFilterLog(log)) {
      return; // Don't add sensitive logs
    }
    updateTool(toolName, { logs: [log] });
  };

  // Public method to set current reasoning/thought
  const setReasoning = (thought: string) => {
    setCurrentThought(thought);
  };

  // Expose methods via ref
  useImperativeHandle(
    ref,
    () => ({
      updateTool,
      addToolLog,
      setReasoning,
      reset: () => {
        setTools(new Map());
        setCurrentThought("");
        setIsFading(false);
      },
      completeAll: () => {
        setTools((prev) => {
          const newTools = new Map(prev);
          const now = Date.now();
          for (const [name, tool] of newTools) {
            const isError = tool.status === "error";
            const isRunning = tool.status === "running";
            const end = tool.endTime ?? now;
            // Mark any non-error tool as completed; ensure endTime is set
            if (isRunning || !tool.endTime) {
              newTools.set(name, {
                ...tool,
                status: isError ? "error" : "completed",
                endTime: end,
              });
            }
          }
          return newTools;
        });
        // Trigger fade-out animation; parent unmounts after a delay
        setIsFading(true);
      },
    }),
    [],
  );

  // Determine overall state
  const toolsArray = Array.from(tools.values());
  const hasAnyTools = toolsArray.length > 0;
  const allCompleted =
    hasAnyTools &&
    toolsArray.every((t) => t.status === "completed" || t.status === "error");

  // Smooth appear/disappear
  const transitionClasses = cn(
    "transition-all duration-300 ease-out",
    isVisible && !isFading
      ? "opacity-100 translate-y-0"
      : "opacity-0 -translate-y-1",
  );

  if (!isVisible) return null;

  return (
    <div className={cn("loupe-system", "flex gap-3 justify-start", className)}>
      <div
        className={cn(
          "rounded-2xl px-4 py-3 text-sm w-fit max-w-[75%] break-words bg-sidebar text-sidebar-foreground border border-sidebar-border shadow-xs",
          transitionClasses,
        )}
        aria-live="polite"
      >
        {/* Planning placeholder when no tools yet */}
        {!hasAnyTools && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Spinner size={14} />
            <span>Planning…</span>
          </div>
        )}

        {/* Tools stack */}
        {hasAnyTools && (
          <div className="flex flex-col gap-2">
            {toolsArray.map((tool) => (
              <div
                key={tool.toolName}
                className={cn(
                  "flex flex-col rounded-lg border border-sidebar-border/60 p-3 transition-all bg-transparent",
                )}
              >
                {/* Tool Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon
                      name="chevron_right"
                      size={12}
                      className="text-muted-foreground"
                    />
                    <span className="text-xs font-medium text-sidebar-foreground">
                      {formatToolName(tool.toolName)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {tool.status === "error" ? (
                      <Icon
                        name="error"
                        size={12}
                        className="text-primary-foreground"
                      />
                    ) : tool.endTime || tool.status === "completed" ? (
                      <Icon
                        name="check_circle"
                        size={12}
                        className="text-primary-foreground"
                      />
                    ) : (
                      <Spinner size={12} className="text-primary-foreground" />
                    )}
                  </div>
                </div>

                {/* Tool Logs */}
                <div
                  ref={(el) => {
                    if (el) scrollRefs.current.set(tool.toolName, el);
                  }}
                  className="h-16 overflow-y-auto border border-sidebar-border/50 rounded p-2 text-[11px] font-mono leading-relaxed bg-transparent"
                >
                  {tool.logs.length === 0 ? (
                    <span className="text-muted-foreground">
                      Initializing...
                    </span>
                  ) : (
                    tool.logs.slice(-5).map((log, idx) => (
                      <div
                        key={idx}
                        className="text-sidebar-foreground break-all"
                      >
                        {log}
                      </div>
                    ))
                  )}
                </div>

                {/* Duration (only show when complete) */}
                {tool.startTime && tool.endTime && (
                  <div className="text-[10px] text-muted-foreground mt-2">
                    {`${((tool.endTime - tool.startTime) / 1000).toFixed(1)}s`}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

// Helper function to check if log contains sensitive data that should be filtered
function shouldFilterLog(log: string): boolean {
  if (!log || typeof log !== "string") return false;

  // Filter out logs containing sensitive patterns
  const sensitivePatterns = [
    /SELECT\s+.*FROM/i, // SQL SELECT queries
    /INSERT\s+INTO/i, // SQL INSERT queries
    /UPDATE\s+.*SET/i, // SQL UPDATE queries
    /DELETE\s+FROM/i, // SQL DELETE queries
    /CREATE\s+TABLE/i, // SQL CREATE queries
    /sql.*:/i, // Any log with "sql:"
    /query.*:/i, // Any log with "query:"
    /result.*:/i, // Any log with "result:"
    /data.*:/i, // Any log with "data:"
    /rows.*:/i, // Any log with "rows:"
    /args.*=.*{/i, // Tool args (may contain sensitive data)
    /\[\[.*\]\]/i, // Clickhouse data arrays
    /\{.*"id".*"name".*\}/i, // JSON data objects
  ];

  return sensitivePatterns.some((pattern) => pattern.test(log));
}

// Helper function to format tool names
function formatToolName(name?: string): string {
  if (!name || typeof name !== "string") return "Tool";

  // Special case: rename clickhouseQuery to Data Query
  if (name.toLowerCase() === "clickhousequery") {
    return "Data query";
  }

  // Convert camelCase or snake_case to Title Case
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

ChainOfThought.displayName = "ChainOfThought";
