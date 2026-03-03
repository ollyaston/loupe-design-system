"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

type MarkdownSize = "default" | "compact";

function getComponents(
  size: MarkdownSize,
  citationLinks?: Record<number, string>,
  usedCitationNumbers?: Set<number>,
) {
  const renderCitationLinks = (numbers: number[]) => {
    const parts: React.ReactNode[] = [];
    numbers.forEach((n, idx) => {
      if (usedCitationNumbers) usedCitationNumbers.add(n);
      const href = citationLinks?.[n];
      parts.push(
        href ? (
          <a
            key={n}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={href}
            className="text-muted-foreground text-xs underline decoration-dotted align-super"
          >
            [{n}]
          </a>
        ) : (
          <span key={n} className="text-muted-foreground text-xs align-super">
            [{n}]
          </span>
        ),
      );
      if (idx < numbers.length - 1)
        parts.push(<span key={`sep-${n}`}>, </span>);
    });
    return parts;
  };

  const createCitationEm = (className: string) => {
    const CitationEm = ({ children }: { children?: React.ReactNode }) => {
      const text = React.Children.toArray(children)
        .filter((c) => typeof c === "string")
        .join("")
        .trim();

      // Handle "Sources: [1, 2, 3]" format
      const numberMatch = /^Sources:\s*\[([^\]]+)\]$/.exec(text);
      if (numberMatch && citationLinks) {
        const numbers = numberMatch[1]
          .split(",")
          .map((s) => parseInt(s.trim(), 10))
          .filter((n) => Number.isFinite(n));
        return (
          <span className={className}>{renderCitationLinks(numbers)}</span>
        );
      }

      // Legacy: Handle "Sources: <url>" format (fallback for old data)
      if (text.startsWith("Sources:") && citationLinks) {
        const mapped = React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === "a") {
            const props = child.props as { className?: string };
            return React.cloneElement(child as React.ReactElement<any>, {
              className:
                `${props.className || ""} text-muted-foreground text-xs hover:underline`.trim(),
            });
          }
          return child;
        });
        return <em className={className}>{mapped}</em>;
      }

      return <em className={className}>{children}</em>;
    };
    CitationEm.displayName = "CitationEm";
    return CitationEm;
  };

  if (size === "compact") {
    return {
      h1: ({ children }: { children?: React.ReactNode }) => (
        <h1 className="text-sm font-semibold text-muted-foreground mb-2 mt-3 first:mt-0">
          {children}
        </h1>
      ),
      h2: ({ children }: { children?: React.ReactNode }) => (
        <h2 className="text-xs font-semibold text-muted-foreground mb-1.5 mt-2">
          {children}
        </h2>
      ),
      h3: ({ children }: { children?: React.ReactNode }) => (
        <h3 className="text-xs font-medium text-muted-foreground mb-1.5 mt-2">
          {children}
        </h3>
      ),
      p: ({ children }: { children?: React.ReactNode }) => (
        <p className="text-xs text-muted-foreground leading-relaxed my-1.5">
          {children}
        </p>
      ),
      ul: ({ children }: { children?: React.ReactNode }) => (
        <ul className="list-disc pl-5 space-y-0.5 my-1.5">{children}</ul>
      ),
      ol: ({ children }: { children?: React.ReactNode }) => (
        <ol className="list-decimal pl-5 space-y-0.5 my-1.5">{children}</ol>
      ),
      li: ({ children }: { children?: React.ReactNode }) => (
        <li className="text-xs text-muted-foreground">{children}</li>
      ),
      strong: ({ children }: { children?: React.ReactNode }) => (
        <strong className="font-semibold text-muted-foreground">
          {children}
        </strong>
      ),
      em: createCitationEm("italic text-muted-foreground"),
      code: ({ children }: { children?: React.ReactNode }) => (
        <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-muted-foreground">
          {children}
        </code>
      ),
      a: ({
        children,
        href,
      }: {
        children?: React.ReactNode;
        href?: string;
      }) => (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          {children}
        </a>
      ),
    } as const;
  }

  // default (research) sizing
  return {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-xl font-bold text-foreground mb-4 mt-6 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-lg font-semibold text-foreground mb-3 mt-5">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-md font-medium text-foreground mb-2 mt-4">
        {children}
      </h3>
    ),
    p: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-sm text-foreground leading-relaxed my-2">{children}</p>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-6 space-y-1 my-2">{children}</ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-6 space-y-1 my-2">{children}</ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-sm text-foreground">{children}</li>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: createCitationEm("italic text-muted-foreground"),
    a: ({ children, href }: { children?: React.ReactNode; href?: string }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:no-underline"
      >
        {children}
      </a>
    ),
  } as const;
}

/**
 * Renders a markdown component with the given content, size, and citation links.
 */
export function Markdown({
  content,
  size = "default",
  className = "",
  citationLinks,
}: {
  content: string;
  size?: MarkdownSize;
  className?: string;
  citationLinks?: Record<number, string>;
}) {
  const usedCitationNumbersRef = React.useRef(new Set<number>());
  const [usedNumbers, setUsedNumbers] = React.useState<number[]>([]);

  // Reset the set on each render
  usedCitationNumbersRef.current.clear();

  const components = getComponents(
    size,
    citationLinks,
    usedCitationNumbersRef.current,
  );

  // After the markdown subtree renders and mutates the ref, capture numbers in state
  React.useEffect(() => {
    const numbers = Array.from(usedCitationNumbersRef.current).sort(
      (a, b) => a - b,
    );
    setUsedNumbers(numbers);
  }, [content, citationLinks]);

  return (
    <div className={`loupe-system ${className}`}>
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
      {citationLinks && usedNumbers.length > 0 ? (
        <div className="mt-6 border-t pt-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Sources
          </h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            {usedNumbers.map((n) => (
              <div key={n} className="flex gap-2">
                <span className="font-mono">[{n}]</span>
                {citationLinks[n] ? (
                  <a
                    href={citationLinks[n]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline break-all"
                  >
                    {citationLinks[n]}
                  </a>
                ) : (
                  <span>Missing URL</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
