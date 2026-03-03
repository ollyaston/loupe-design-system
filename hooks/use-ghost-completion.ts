/**
 * Stub implementation for design-system-only build.
 * No API calls – returns empty suggestions.
 */
import { useCallback, useState } from "react";

interface UseGhostCompletionArgs {
  value: string;
  onChange: (value: string) => void;
  enable?: boolean;
  debounceMs?: number;
  maxChars?: number;
  disabled?: boolean;
  isLoading?: boolean;
  fieldKey?: string;
}

interface UseGhostCompletionResult {
  suggestion: string;
  suggestionVisible: boolean;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export function useGhostCompletion(
  _args: UseGhostCompletionArgs,
): UseGhostCompletionResult {
  const [suggestion] = useState("");
  const [suggestionVisible] = useState(false);

  const onKeyDown = useCallback(
    (_e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // No-op – no autocomplete in design-system stub
    },
    [],
  );

  return {
    suggestion,
    suggestionVisible,
    onKeyDown,
  };
}
