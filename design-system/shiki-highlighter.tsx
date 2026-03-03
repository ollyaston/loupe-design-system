/* eslint-disable agent-loupe-ui/ui-component-story-required -- Archive story removed as redundant */
import React from "react";
import { createHighlighter } from "shiki";
import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";
import { Spinner } from "@/design-system/spinner";

interface ShikiHighlighterProps {
  code: string;
  language?: string;
  theme?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  className?: string;
}

export function ShikiHighlighter({
  code,
  language = "typescript",
  theme = "dracula",
  showLineNumbers = true,
  showCopyButton = true,
  className,
}: ShikiHighlighterProps) {
  const [highlightedCode, setHighlightedCode] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const highlightCode = async () => {
      try {
        setIsLoading(true);
        const highlighter = await createHighlighter({
          themes: [theme],
          langs: [language],
        });

        const highlighted = highlighter.codeToHtml(code, {
          lang: language,
          themes: {
            light: theme,
            dark: theme,
          },
        });

        setHighlightedCode(highlighted);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        // Fallback to plain text
        setHighlightedCode(`<pre><code>${code}</code></pre>`);
      } finally {
        setIsLoading(false);
      }
    };

    highlightCode();
  }, [code, language, theme, showLineNumbers]);

  if (isLoading) {
    return (
      <div className={cn("loupe-system", "animate-pulse", className)}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={cn("loupe-system", "relative group", className)}>
      {showCopyButton && (
        <CopyButton text={code} className="absolute top-2 right-2 z-10" />
      )}
      <div
        className="rounded-lg overflow-hidden p-4"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
        style={{
          fontSize: "0.875rem",
          lineHeight: "1.5",
        }}
      />
    </div>
  );
}
