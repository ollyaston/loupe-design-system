/**
 * ESLint rule to warn when using title case and encourage sentence case
 * This ensures consistent text formatting throughout the application
 */

const sentenceCaseRule = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Warn when using title case and suggest using sentence case instead",
      category: "Best Practices",
      recommended: true,
    },
    fixable: "code",
    schema: [],
    messages: {
      useSentenceCase:
        "Use sentence case instead of title case. Change '{{text}}' to '{{suggested}}'.",
    },
  },
  create(context) {
    // Proper nouns that should remain in title case
    const properNouns = [
      "United States",
      "United Kingdom",
      "Loupe",
      "Cloud Run",
      "Github",
      "Gmail",
      "Google",
      "Outlook",
      "Paragon Salesforce",
      "GitHub",
      "Salesforce",
      "San Francisco",
      "San Francisco, CA",
      "New York",
      "New York, NY",
      "Slack",
      "Ava",
      "Stripe",
      "Cursor",
      "Oracle",
      "PostgreSQL",
      "Open Sans",
      "Source Sans Pro",
      "PT Sans",
      "Human Value Equivalent",
      "Jane Diaz",
      "Jane Smith",
      "Bob Johnson",
      "John Doe",
      "Jane Doe",
      "South Korea",
      "Datadog",
    ];

    // Function to detect if text is in title case
    function isTitleCase(text) {
      // Skip very short strings (1-2 characters)
      if (text.length <= 2) return false;

      // Skip strings that are all uppercase (likely acronyms)
      if (text === text.toUpperCase()) return false;

      // Skip strings that are all lowercase
      if (text === text.toLowerCase()) return false;

      // Skip strings that start with lowercase (already sentence case)
      if (text[0] === text[0].toLowerCase()) return false;

      // Skip strings that contain numbers or special characters (likely technical)
      if (/[\d\-_\(\)\[\]{}]/.test(text)) return false;

      // Only skip if the entire text is a proper noun
      if (properNouns.includes(text)) return false;

      // Check if multiple words start with uppercase letters
      // This is a simple heuristic - words are separated by spaces
      const words = text.split(/\s+/);

      // Must have at least 2 words to be considered title case
      if (words.length < 2) return false;

      // Check if most words (excluding articles, prepositions, conjunctions) start with uppercase
      const skipWords = new Set([
        "a",
        "an",
        "and",
        "as",
        "at",
        "but",
        "by",
        "for",
        "if",
        "in",
        "nor",
        "of",
        "on",
        "or",
        "per",
        "so",
        "the",
        "to",
        "up",
        "via",
        "yet",
      ]);

      let titleCaseWords = 0;
      let totalWords = 0;

      for (const word of words) {
        // Skip empty words
        if (!word.trim()) continue;

        // Skip words that are all uppercase (likely acronyms)
        if (word === word.toUpperCase()) continue;

        // Skip words with special characters
        if (/[\d\-_\(\)\[\]{}]/.test(word)) continue;

        totalWords++;

        // First word should always be capitalized
        if (totalWords === 1) {
          if (word[0] === word[0].toUpperCase()) {
            titleCaseWords++;
          }
        } else {
          // Other words: if it's not a skip word and starts with uppercase, count as title case
          const lowerWord = word.toLowerCase();
          if (!skipWords.has(lowerWord) && word[0] === word[0].toUpperCase()) {
            titleCaseWords++;
          }
        }
      }

      // Consider it title case if more than half of the non-skip words are capitalized
      // and we have at least 2 meaningful words
      return totalWords >= 2 && titleCaseWords > totalWords / 2;
    }

    // Function to convert title case to sentence case
    function toSentenceCase(text) {
      const skipWords = new Set([
        "a",
        "an",
        "and",
        "as",
        "at",
        "but",
        "by",
        "for",
        "if",
        "in",
        "nor",
        "of",
        "on",
        "or",
        "per",
        "so",
        "the",
        "to",
        "up",
        "via",
        "yet",
      ]);

      // Convert proper nouns array to Set for efficient lookup
      const properNounsSet = new Set(properNouns);

      // Check if the entire text is a proper noun
      if (properNounsSet.has(text)) {
        return text;
      }

      // Create a map to track which parts of the text should be preserved
      const preserveMap = new Map();
      let preserveIndex = 0;

      // First, identify and preserve all multi-word proper nouns
      let result = text;
      for (const properNoun of properNouns) {
        if (properNoun.includes(" ")) {
          const regex = new RegExp(
            `\\b${properNoun.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
            "gi",
          );
          result = result.replace(regex, (match) => {
            const placeholder = `__PRESERVE_${preserveIndex}__`;
            preserveMap.set(placeholder, match);
            preserveIndex++;
            return placeholder;
          });
        }
      }

      // Now process the result word by word
      const words = result.split(/\s+/);
      const processedWords = words.map((word, index) => {
        // Check if this is a preserved multi-word proper noun
        if (preserveMap.has(word)) {
          return preserveMap.get(word);
        }

        // Preserve all-caps words (acronyms like "SDR", "CRM", etc.)
        if (word === word.toUpperCase() && word.length > 1) {
          return word;
        }

        // Preserve single-word proper nouns
        if (properNounsSet.has(word)) {
          return word;
        }

        // First word is always capitalized
        if (index === 0) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }

        // Other words: lowercase unless they're not skip words and were originally capitalized
        const lowerWord = word.toLowerCase();
        if (skipWords.has(lowerWord)) {
          return lowerWord;
        }

        // For non-skip words, keep them lowercase in sentence case
        return lowerWord;
      });

      return processedWords.join(" ");
    }

    // Function to check if this is likely user-facing text
    function isUserFacingText(node) {
      // Check if this is in a JSX element that typically contains user-facing text
      const parent = node.parent;

      // Check for common text-containing props
      if (parent && parent.type === "JSXAttribute") {
        const propName = parent.name?.name;
        const textProps = [
          "title",
          "label",
          "placeholder",
          "alt",
          "aria-label",
          "aria-describedby",
          "children",
          "text",
          "content",
          "description",
          "message",
          "error",
          "success",
          "warning",
          "info",
          "help",
          "tooltip",
        ];

        if (textProps.includes(propName)) {
          return true;
        }
      }

      // Check if this is direct text content in JSX
      if (parent && parent.type === "JSXElement") {
        return true;
      }

      // Check if this is JSX text content (direct child of JSX element)
      if (parent && parent.type === "JSXElement") {
        return true;
      }

      // Check if this is in a string that's likely user-facing
      // This is a heuristic - we'll be conservative and check most string literals
      return true;
    }

    return {
      JSXText(node) {
        // Check JSX text content for title case
        const text = node.value.trim();

        // Skip very short strings or empty text
        if (text.length < 3) return;

        // Skip strings that are clearly not user-facing text
        if (/^[A-Z_$][A-Z0-9_$]*$/.test(text)) return;
        if (/^[a-z][a-zA-Z0-9]*$/.test(text) && text.length < 10) return;
        if (/^[a-z]+-[a-z-]+$/.test(text)) return;
        if (/^[a-z]+:[a-z-]+$/.test(text)) return;
        if (/^[a-z]+\.[a-z]+$/.test(text)) return;
        if (/^[a-z]+\/[a-z-]+$/.test(text)) return;
        if (/^[a-z]+\([a-z, ]*\)$/.test(text)) return;
        if (/^[a-z]+-[a-z]+-[a-z]+$/.test(text)) return;
        if (/^[a-z]+_[a-z]+_[a-z]+$/.test(text)) return;

        // Skip SVG path data and other technical strings
        if (/^M[\d\s\-\.]+[zZ]?$/.test(text)) return; // SVG paths
        if (/^[MmLlHhVvCcSsQqTtAaZz][\d\s\-\.]+$/.test(text)) return; // SVG commands
        if (/^[a-z]+\([^)]*\)$/.test(text)) return; // Function calls with params
        if (/^[a-z]+\.[a-z]+\.[a-z]+$/.test(text)) return; // Nested object properties
        if (/^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/.test(text)) return; // Long kebab case
        if (/^[a-z]+_[a-z]+_[a-z]+_[a-z]+$/.test(text)) return; // Long snake case

        // Check if the text is in title case
        if (isTitleCase(text)) {
          const suggested = toSentenceCase(text);
          // Only report if the suggested text is different from the original
          if (suggested !== text) {
            context.report({
              node,
              messageId: "useSentenceCase",
              data: {
                text: text,
                suggested: suggested,
              },
              fix(fixer) {
                return fixer.replaceText(node, suggested);
              },
            });
          }
        }
      },

      Literal(node) {
        // Only check string literals
        if (typeof node.value !== "string") return;

        // Skip very short strings
        if (node.value.length < 3) return;

        // Skip strings that are clearly not user-facing text
        // (contain special characters, are likely code/identifiers)
        if (/^[A-Z_$][A-Z0-9_$]*$/.test(node.value)) return; // Constants
        if (/^[a-z][a-zA-Z0-9]*$/.test(node.value) && node.value.length < 10)
          return; // Variables
        if (/^[a-z]+-[a-z-]+$/.test(node.value)) return; // CSS classes
        if (/^[a-z]+:[a-z-]+$/.test(node.value)) return; // CSS properties
        if (/^[a-z]+\.[a-z]+$/.test(node.value)) return; // Object properties
        if (/^[a-z]+\/[a-z-]+$/.test(node.value)) return; // Paths
        if (/^[a-z]+\([a-z, ]*\)$/.test(node.value)) return; // Function calls
        if (/^[a-z]+-[a-z]+-[a-z]+$/.test(node.value)) return; // Kebab case
        if (/^[a-z]+_[a-z]+_[a-z]+$/.test(node.value)) return; // Snake case

        // Skip SVG path data and other technical strings
        if (/^M[\d\s\-\.]+[zZ]?$/.test(node.value)) return; // SVG paths
        if (/^[MmLlHhVvCcSsQqTtAaZz][\d\s\-\.]+$/.test(node.value)) return; // SVG commands
        if (/^[a-z]+\([^)]*\)$/.test(node.value)) return; // Function calls with params
        if (/^[a-z]+\.[a-z]+\.[a-z]+$/.test(node.value)) return; // Nested object properties
        if (/^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/.test(node.value)) return; // Long kebab case
        if (/^[a-z]+_[a-z]+_[a-z]+_[a-z]+$/.test(node.value)) return; // Long snake case

        // Check if this looks like user-facing text
        if (!isUserFacingText(node)) return;

        // Check if the text is in title case
        if (isTitleCase(node.value)) {
          const suggested = toSentenceCase(node.value);
          context.report({
            node,
            messageId: "useSentenceCase",
            data: {
              text: node.value,
              suggested: suggested,
            },
            fix(fixer) {
              return fixer.replaceText(node, `"${suggested}"`);
            },
          });
        }
      },

      TemplateLiteral(node) {
        // Check template literals for title case
        node.quasis.forEach((quasi) => {
          const text = quasi.value.raw;

          // Skip very short strings
          if (text.length < 3) return;

          // Skip strings that are clearly not user-facing text
          if (/^[A-Z_$][A-Z0-9_$]*$/.test(text)) return;
          if (/^[a-z][a-zA-Z0-9]*$/.test(text) && text.length < 10) return;
          if (/^[a-z]+-[a-z-]+$/.test(text)) return;
          if (/^[a-z]+:[a-z-]+$/.test(text)) return;
          if (/^[a-z]+\.[a-z]+$/.test(text)) return;
          if (/^[a-z]+\/[a-z-]+$/.test(text)) return;
          if (/^[a-z]+\([a-z, ]*\)$/.test(text)) return;
          if (/^[a-z]+-[a-z]+-[a-z]+$/.test(text)) return;
          if (/^[a-z]+_[a-z]+_[a-z]+$/.test(text)) return;

          // Skip SVG path data and other technical strings
          if (/^M[\d\s\-\.]+[zZ]?$/.test(text)) return; // SVG paths
          if (/^[MmLlHhVvCcSsQqTtAaZz][\d\s\-\.]+$/.test(text)) return; // SVG commands
          if (/^[a-z]+\([^)]*\)$/.test(text)) return; // Function calls with params
          if (/^[a-z]+\.[a-z]+\.[a-z]+$/.test(text)) return; // Nested object properties
          if (/^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/.test(text)) return; // Long kebab case
          if (/^[a-z]+_[a-z]+_[a-z]+_[a-z]+$/.test(text)) return; // Long snake case

          // Check if the text is in title case
          if (isTitleCase(text)) {
            const suggested = toSentenceCase(text);
            // Only report if the suggested text is different from the original
            if (suggested !== text) {
              context.report({
                node: quasi,
                messageId: "useSentenceCase",
                data: {
                  text: text,
                  suggested: suggested,
                },
                fix(fixer) {
                  return fixer.replaceText(quasi, `\`${suggested}\``);
                },
              });
            }
          }
        });
      },
    };
  },
};

export default sentenceCaseRule;
