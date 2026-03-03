"use client";

import React, { useState, useRef, useCallback } from "react";
import { GridApi } from "ag-grid-community";
import { Button } from "./button";
import { Icon } from "./icon";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { Tooltip } from "./tooltip";

interface GridAIInputProps {
  /** AG Grid API reference for applying filters */
  gridApi: GridApi | null;
  /** Column definitions with descriptions for context */
  columns?: Array<{
    field?: string;
    headerName: string;
    description?: string;
  }>;
  /** Callback to send AI query to backend */
  onQuery: (params: {
    query: string;
    currentState: any;
    schema: any;
    columns?: any[];
  }) => Promise<{
    gridState: any;
    propertiesToIgnore: string[];
    explanation: string;
  }>;
  /** Additional class names */
  className?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Input width - narrow (256px) or wide (512px) */
  width?: "narrow" | "wide";
}

export function GridAIInput({
  gridApi,
  columns,
  onQuery,
  className,
  placeholder = "Search...",
  disabled = false,
  width = "narrow",
}: GridAIInputProps) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastExplanation, setLastExplanation] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(async () => {
    if (!query.trim() || !gridApi || isLoading) return;

    setIsLoading(true);
    setLastExplanation(null);

    try {
      // Get current grid state for context
      const currentState = gridApi.getState?.() ?? {};

      // Send query to backend
      const response = await onQuery({
        query: query.trim(),
        currentState,
        schema: {}, // Schema not used for simple filtering
        columns,
      });

      // Apply filter model if returned (check for non-empty object)
      if (
        response.gridState?.filter &&
        Object.keys(response.gridState.filter).length > 0
      ) {
        gridApi.setFilterModel(response.gridState.filter);
      }

      // Apply sort model if returned (check for non-empty array)
      if (response.gridState?.sort && response.gridState.sort.length > 0) {
        gridApi.applyColumnState({
          state: response.gridState.sort,
          defaultState: { sort: null },
        });
      }

      // Apply column visibility if returned (check for non-empty array)
      if (
        response.gridState?.columnState &&
        response.gridState.columnState.length > 0
      ) {
        gridApi.applyColumnState({
          state: response.gridState.columnState,
        });
      }

      // Show explanation
      setLastExplanation(response.explanation);
      setQuery("");
    } catch (error) {
      console.error("Grid AI query failed:", error);
      setLastExplanation("Failed to process your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [query, gridApi, columns, onQuery, isLoading]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
      if (e.key === "Escape") {
        setIsExpanded(false);
        setQuery("");
        setLastExplanation(null);
      }
    },
    [handleSubmit],
  );

  // Input width class based on prop
  const inputWidthClass = width === "wide" ? "w-[512px]" : "w-64";

  // Collapsed state - just show the AI button (h-9 to match Input height and prevent layout jump)
  if (!isExpanded) {
    return (
      <Tooltip content="Query your data">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setIsExpanded(true);
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
          disabled={disabled || !gridApi}
          className={cn("h-9 gap-2", className)}
        >
          <Icon name="magic_button" size={16} />
          <span>Query</span>
        </Button>
      </Tooltip>
    );
  }

  // Expanded state - show input field
  return (
    <div className={cn("loupe-system flex items-center gap-2", className)}>
      <div className="relative">
        <Icon
          name="magic_button"
          size={16}
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 transition-colors",
            isLoading ? "text-primary animate-pulse" : "text-muted-foreground",
          )}
        />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          className={cn(inputWidthClass, "pl-9 pr-16")}
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query.trim() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSubmit}
              disabled={isLoading}
              className="h-7 w-7 p-0"
            >
              {isLoading ? (
                <Icon
                  name="progress_activity"
                  size={14}
                  className="animate-spin"
                />
              ) : (
                <Icon name="arrow_forward" size={14} />
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsExpanded(false);
              setQuery("");
              setLastExplanation(null);
            }}
            className="h-7 w-7 p-0"
          >
            <Icon name="close" size={14} />
          </Button>
        </div>
      </div>

      {lastExplanation && (
        <Tooltip content={lastExplanation}>
          <div className="flex items-center gap-1 text-xs text-muted-foreground max-w-[180px] truncate cursor-default">
            <Icon
              name="check_circle"
              size={14}
              className="text-success shrink-0"
            />
            <span className="truncate">{lastExplanation}</span>
          </div>
        </Tooltip>
      )}
    </div>
  );
}

GridAIInput.displayName = "GridAIInput";
