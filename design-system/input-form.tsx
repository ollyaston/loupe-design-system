import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Button } from "@/design-system/button";
import { Icon } from "@/design-system/icon";
import { Tabs } from "@/design-system/tabs";
import { cn } from "@/lib/utils";
import { useRealtimeTranscription } from "@/hooks/use-realtime-transcription";
import { useGhostCompletion } from "@/hooks/use-ghost-completion";

interface CustomAction {
  id: string;
  icon: string;
  onClick: () => void;
  selected?: boolean;
  disabled?: boolean;
  tooltip?: string;
}

interface Mode {
  id: string;
  icon: string;
  label: string;
  disabled?: boolean;
}

interface InputFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  inputId?: string;
  customActions?: CustomAction[];
  modes?: Mode[];
  selectedMode?: string;
  onModeChange?: (modeId: string) => void;
  darkUI?: boolean;
  // Image upload props
  allowImageUpload?: boolean;
  selectedImage?: string | null | undefined;
  onImageUpload?: (file: File) => void;
  onImageRemove?: () => void;
  showImagePreview?: boolean;
  maxImageHeight?: number;
  // Realtime transcription
  allowAudioTranscription?: boolean;
  // Autocomplete
  enableAutocomplete?: boolean;
  autocompleteDebounceMs?: number;
  autocompleteMaxChars?: number;
  autocompleteFieldKey?: string;
}

export function InputForm({
  value,
  onChange,
  onSubmit,
  placeholder = "Type a message...",
  isLoading = false,
  disabled = false,
  className = "",
  inputId = "input-form-textarea",
  customActions = [],
  modes = [],
  selectedMode,
  onModeChange,
  darkUI = false,
  allowImageUpload = false,
  selectedImage = null,
  onImageUpload,
  onImageRemove,
  showImagePreview = true,
  maxImageHeight = 120,
  allowAudioTranscription = false,
  enableAutocomplete = false,
  autocompleteDebounceMs = 200,
  autocompleteMaxChars = 50,
  autocompleteFieldKey,
}: InputFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const baseInputAtStartRef = useRef<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX_TEXTAREA_HEIGHT = 256; // px
  const [scrollTop, setScrollTop] = useState<number>(0);
  const {
    suggestion,
    suggestionVisible,
    onKeyDown: onGhostKeyDown,
  } = useGhostCompletion({
    value,
    onChange,
    enable: enableAutocomplete,
    debounceMs: autocompleteDebounceMs,
    maxChars: autocompleteMaxChars,
    disabled,
    isLoading,
    fieldKey: autocompleteFieldKey,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const isSubmitDisabled =
    isLoading || disabled || (!value.trim() && !selectedImage);

  const { isRecording, isConnecting, error, start, stop } =
    useRealtimeTranscription({
      onTranscriptDelta: (delta) => {
        const base = baseInputAtStartRef.current;
        const next = `${base}${delta}`;
        onChange(next);
      },
      onTranscriptDone: (finalText) => {
        const base = baseInputAtStartRef.current;
        const committed = `${base}${finalText} `;
        baseInputAtStartRef.current = committed;
        onChange(committed);
      },
    });

  const toggleRecording = async () => {
    if (isRecording || isConnecting) {
      stop();
      return;
    }
    baseInputAtStartRef.current = value
      ? `${value}${value.endsWith(" ") ? "" : " "}`
      : "";
    await start();
  };

  // Auto-resize the textarea up to a max height, then enable scrolling
  const adjustTextareaHeight = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const newHeight = Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT);
    el.style.height = `${newHeight}px`;
    el.style.overflowY =
      el.scrollHeight > MAX_TEXTAREA_HEIGHT ? "auto" : "hidden";
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  return (
    <div className={cn("loupe-system", className)}>
      {/* Image Preview */}
      {showImagePreview && allowImageUpload && selectedImage && (
        <div className="mb-3 relative">
          <Image
            src={selectedImage}
            alt="Selected image"
            width={800}
            height={600}
            className={cn(
              "max-w-full h-auto rounded-lg border",
              darkUI ? "border-sidebar-border" : "border-border",
            )}
            style={{ maxHeight: `${maxImageHeight}px` }}
            unoptimized
          />
          <button
            onClick={onImageRemove}
            className={cn(
              "absolute top-1 right-1 rounded-full p-1 shadow-xs border",
              darkUI
                ? "bg-sidebar hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-foreground border-sidebar-border"
                : "bg-background hover:bg-accent text-foreground hover:text-foreground border-border",
            )}
            type="button"
          >
            <Icon name="close" size={12} />
          </button>
        </div>
      )}

      <div
        className={cn(
          "rounded-xl border shadow-xs transition-all cursor-text p-4",
          disabled || isLoading
            ? "border-border"
            : "hover:border-ring focus-within:border-ring",
          darkUI
            ? "bg-sidebar-accent/95 backdrop-blur-xs border-sidebar-border"
            : "bg-background border-border",
          !disabled && !isLoading && darkUI
            ? "hover:border-sidebar-ring focus-within:border-sidebar-ring"
            : !disabled && !isLoading
              ? "hover:border-ring focus-within:border-ring"
              : "",
        )}
        // onClick={() => document.getElementById(inputId)?.focus()}
      >
        <div className="flex flex-col min-h-16">
          <div className="flex-1 relative overflow-hidden">
            {/* Ghost suggestion layer */}
            <div
              aria-hidden
              className={cn(
                "absolute inset-0 pointer-events-none whitespace-pre-wrap break-words p-0 m-0",
                "text-base leading-relaxed font-normal",
                "text-foreground",
              )}
              style={{ transform: `translateY(-${scrollTop}px)` }}
            >
              <span className="invisible">{value}</span>
              {suggestion && (
                <span
                  className={cn(
                    "text-muted-foreground",
                    "transition-opacity duration-200",
                  )}
                  style={{ opacity: suggestionVisible ? 1 : 0 }}
                >
                  {suggestion}
                </span>
              )}
            </div>

            <textarea
              id={inputId}
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => {
                onGhostKeyDown(e);
                handleKeyDown(e);
              }}
              onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
              disabled={disabled || isLoading}
              ref={textareaRef}
              className={cn(
                "w-full min-h-16 resize-none border-none outline-hidden bg-transparent text-base leading-relaxed font-normal placeholder:font-normal p-0 m-0 disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
                darkUI
                  ? "text-sidebar-foreground placeholder:text-sidebar-muted-foreground"
                  : "text-foreground placeholder:text-muted-foreground",
              )}
              style={{ boxShadow: "none" }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-2 mt-4">
            {/* Mode Picker */}
            {modes.length > 0 && (
              <Tabs
                value={selectedMode || modes[0]?.id}
                onValueChange={onModeChange}
                className="flex-1"
                tabs={modes.map((mode) => ({
                  value: mode.id,
                  label: <Icon name={mode.icon} size={18} />,
                  disabled: mode.disabled || isLoading || disabled,
                }))}
              />
            )}

            {/* Actions and Submit */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Hidden file input */}
              {allowImageUpload && (
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              )}

              {/* Image upload action (hard-coded) */}
              {allowImageUpload && (
                <Button
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "h-8 w-8 p-0 rounded-full transition-colors",
                    darkUI
                      ? "text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      : "text-muted-foreground hover:bg-accent",
                  )}
                  disabled={disabled || isLoading}
                  onClick={handleFileButtonClick}
                  title="Upload image"
                >
                  <Icon name="add" size={16} />
                </Button>
              )}

              {/* Voice transcription toggle */}
              {allowAudioTranscription && (
                <Button
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "h-8 w-8 p-0 rounded-full transition-colors",
                    isRecording || isConnecting
                      ? "text-primary hover:bg-accent"
                      : darkUI
                        ? "text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                        : "text-muted-foreground hover:bg-accent",
                  )}
                  disabled={disabled || isLoading}
                  onClick={toggleRecording}
                  title={isRecording ? "Stop voice" : "Start voice"}
                >
                  {isConnecting ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : isRecording ? (
                    <Icon name="mic_off" size={16} />
                  ) : (
                    <Icon name="mic" size={16} />
                  )}
                </Button>
              )}

              {/* Custom action buttons */}
              {customActions.map((action) => (
                <Button
                  key={action.id}
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "h-8 w-8 p-0 rounded-full transition-colors",
                    action.selected
                      ? "text-primary hover:bg-accent"
                      : darkUI
                        ? "text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                        : "text-muted-foreground hover:bg-accent",
                    action.disabled ? "opacity-50 cursor-not-allowed" : "",
                  )}
                  disabled={action.disabled || isLoading || disabled}
                  onClick={action.onClick}
                  title={action.tooltip}
                >
                  <Icon name={action.icon} size={16} />
                </Button>
              ))}

              {/* Submit button */}
              <Button
                size="sm"
                className={cn(
                  "h-8 w-8 p-0 rounded-full transition-colors",
                  isSubmitDisabled
                    ? "bg-primary/90 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90",
                )}
                disabled={isSubmitDisabled}
                onClick={() => onSubmit()}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Icon
                    name="arrow_forward"
                    size={16}
                    className="text-primary-foreground"
                  />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
