"use client";

import {
  SandpackProvider,
  SandpackCodeEditor,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { go } from "@codemirror/lang-go";
import { sql } from "@codemirror/lang-sql";
import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

const SUPPORTED_LANGUAGES = {
  javascript: { name: "JavaScript", ext: "js", language: javascript() },
  typescript: { name: "TypeScript", ext: "ts", language: javascript() },
  tsx: { name: "TSX", ext: "tsx", language: javascript() },
  jsx: { name: "JSX", ext: "jsx", language: javascript() },
  python: { name: "Python", ext: "py", language: python() },
  css: { name: "CSS", ext: "css", language: css() },
  html: { name: "HTML", ext: "html", language: html() },
  json: { name: "JSON", ext: "json", language: json() },
  markdown: { name: "Markdown", ext: "md", language: markdown() },
  go: { name: "Go", ext: "go", language: go() },
  bash: { name: "Bash", ext: "sh", language: javascript() }, // Generic command line styling
  shell: { name: "Shell", ext: "sh", language: javascript() }, // Generic command line styling
  terminal: { name: "Terminal", ext: "txt", language: javascript() }, // Generic command line styling
  command: { name: "Command", ext: "txt", language: javascript() }, // Generic command line styling
  sql: { name: "SQL", ext: "sql", language: sql() },
} as const;

type LanguageKey = keyof typeof SUPPORTED_LANGUAGES;

// Internal component to listen for code changes
function CodeChangeListener({
  onChange,
  fileName,
}: {
  onChange?: (code: string) => void;
  fileName: string;
}) {
  const { sandpack } = useSandpack();
  const lastCodeRef = useRef<string>("");

  useEffect(() => {
    if (!onChange || !sandpack.files[fileName]) return;

    const currentCode = sandpack.files[fileName].code;
    if (currentCode !== lastCodeRef.current) {
      lastCodeRef.current = currentCode;
      onChange(currentCode);
    }
  }, [sandpack.files, onChange, fileName]);

  return null;
}

interface SandpackCodeBlockProps {
  code: string;
  language?: LanguageKey | string;
  fileName?: string;
  height?: string;
  maxHeight?: string;
  showLineNumbers?: boolean;
  wrapContent?: boolean;
  showCopyButton?: boolean;
  readOnly?: boolean;
  onChange?: (code: string) => void;
  display?: "block" | "inline";
  width?: string;
  maxWidth?: string;
}

export function SandpackCodeBlock({
  code,
  language = "javascript",
  fileName,
  height,
  maxHeight,
  showLineNumbers = true,
  wrapContent = true,
  showCopyButton = true,
  readOnly = false,
  onChange,
  display = "block",
  width,
  maxWidth,
}: SandpackCodeBlockProps) {
  // Automatically trim whitespace from code
  const trimmedCode = code.trim();

  const langConfig =
    SUPPORTED_LANGUAGES[language as LanguageKey] ||
    SUPPORTED_LANGUAGES.javascript;
  const displayFileName = fileName || `file.${langConfig.ext}`;

  // Build dynamic classes based on props
  const containerClasses = cn(
    "w-full rounded-lg bg-card relative flex flex-col overflow-hidden",
  );

  const containerStyle = {
    display,
    ...(width && { width }),
    ...(maxWidth && { maxWidth }),
    ...(height && { height }),
    ...(maxHeight && { maxHeight }),
  };

  // Calculate editor height when maxHeight is set (account for header)
  const editorHeight = maxHeight
    ? `calc(${maxHeight} - ${fileName ? "48px" : "0px"})`
    : undefined;

  const editorWidth = maxWidth ? maxWidth : undefined;

  return (
    <div className={containerClasses} style={containerStyle}>
      {fileName && (
        <div className="flex items-center justify-between border-b border-sidebar-ring bg-sidebar text-sidebar-foreground px-4 py-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{displayFileName}</span>
            <span className="text-xs">({langConfig.name})</span>
          </div>
          {showCopyButton && (
            <CopyButton text={trimmedCode} className="h-8 w-8" />
          )}
        </div>
      )}

      <div className="flex-1 relative">
        {!fileName && showCopyButton && (
          <CopyButton
            text={trimmedCode}
            className="absolute top-2 right-2 z-10"
          />
        )}

        <SandpackProvider
          template="static"
          theme="dark"
          files={{
            [displayFileName]: trimmedCode,
          }}
          options={{
            visibleFiles: [displayFileName],
            activeFile: displayFileName,
          }}
        >
          {/* in sandpack.files the file name starts with a '/' */}
          <CodeChangeListener
            onChange={onChange}
            fileName={`/${displayFileName}`}
          />
          <SandpackCodeEditor
            showLineNumbers={showLineNumbers}
            wrapContent={wrapContent}
            readOnly={readOnly}
            additionalLanguages={[
              {
                name: langConfig.name,
                extensions: [langConfig.ext],
                language: langConfig.language,
              },
            ]}
            style={{
              height: editorHeight,
              width: editorWidth,
              overflow: "auto",
            }}
          />
        </SandpackProvider>
      </div>
    </div>
  );
}

interface SandpackCodeBlockWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function SandpackCodeBlockWrapper({
  children,
  className,
}: SandpackCodeBlockWrapperProps) {
  return (
    <div
      className={cn("loupe-system", "relative group rounded-lg p-4", className)}
      style={{
        background: "rgb(40, 42, 54)",
      }}
    >
      {children}
    </div>
  );
}
