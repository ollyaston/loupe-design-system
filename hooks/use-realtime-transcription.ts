/**
 * Stub implementation for design-system-only build.
 * No API calls – recording/transcription disabled.
 */
import { useCallback, useState } from "react";

interface UseRealtimeTranscriptionOptions {
  onTranscriptDelta?: (delta: string) => void;
  onTranscriptDone?: (finalText: string) => void;
}

interface UseRealtimeTranscriptionResult {
  isRecording: boolean;
  isConnecting: boolean;
  error: string | null;
  start: () => Promise<void>;
  stop: () => void;
}

export function useRealtimeTranscription(
  _options?: UseRealtimeTranscriptionOptions,
): UseRealtimeTranscriptionResult {
  const [isRecording] = useState(false);
  const [isConnecting] = useState(false);
  const [error] = useState<string | null>(null);

  const start = useCallback(async () => {
    // No-op – no transcription in design-system stub
  }, []);

  const stop = useCallback(() => {
    // No-op
  }, []);

  return {
    isRecording,
    isConnecting,
    error,
    start,
    stop,
  };
}
