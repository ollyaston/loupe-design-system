/**
 * ESLint rule to ensure every UI component has a corresponding Storybook story
 * This ensures all components in design-system/ are documented in our design system docs.
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uiComponentStoryRequiredRule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure every UI component has a corresponding Storybook story",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missingStory:
        "UI component '{{componentName}}' does not have a corresponding Storybook story. Create a story file in the stories/ directory that imports this component.",
    },
  },
  create(context) {
    const filename = context.getFilename();
    const isUIComponent =
      filename.includes("/design-system/") ||
      filename.includes("\\design-system\\");

    // Only apply this rule to UI components
    if (!isUIComponent) {
      return {};
    }

    // Get the component name from the filename
    const fileName = filename
      .split(/[/\\]/)
      .pop()
      ?.replace(/\.(tsx|ts)$/, "");

    if (!fileName) {
      return {};
    }

    // Try to extract all exported component names from the file content
    let exportedComponents = [fileName];
    try {
      const componentContent = readFileSync(filename, "utf8");

      // Look for all exported components in the file
      const allExports = [];

      // Look for exported function components (capitalized - React components)
      const functionExports = componentContent.match(
        /export\s+(?:function\s+)?([A-Z][a-zA-Z0-9]*)/g,
      );
      if (functionExports) {
        functionExports.forEach((exp) => {
          const match = exp.match(
            /export\s+(?:function\s+)?([A-Z][a-zA-Z0-9]*)/,
          );
          if (match) allExports.push(match[1]);
        });
      }

      // Look for exported lowercase function exports (utility functions)
      const lowercaseFunctionExports = componentContent.match(
        /export\s+function\s+([a-z][a-zA-Z0-9]*)/g,
      );
      if (lowercaseFunctionExports) {
        lowercaseFunctionExports.forEach((exp) => {
          const match = exp.match(/export\s+function\s+([a-z][a-zA-Z0-9]*)/);
          if (match) allExports.push(match[1]);
        });
      }

      // Look for exported const components (capitalized - React components)
      const constExports = componentContent.match(
        /export\s+const\s+([A-Z][a-zA-Z0-9]*)/g,
      );
      if (constExports) {
        constExports.forEach((exp) => {
          const match = exp.match(/export\s+const\s+([A-Z][a-zA-Z0-9]*)/);
          if (match) allExports.push(match[1]);
        });
      }

      // Look for exported lowercase const exports (utility functions)
      const lowercaseConstExports = componentContent.match(
        /export\s+const\s+([a-z][a-zA-Z0-9]*)/g,
      );
      if (lowercaseConstExports) {
        lowercaseConstExports.forEach((exp) => {
          const match = exp.match(/export\s+const\s+([a-z][a-zA-Z0-9]*)/);
          if (match) allExports.push(match[1]);
        });
      }

      // Look for named exports: export { ComponentName, ... }
      const namedExportMatch = componentContent.match(
        /export\s*{\s*([^}]+)\s*}/,
      );
      if (namedExportMatch) {
        const exports = namedExportMatch[1]
          .split(",")
          .map((exp) => exp.trim())
          .filter((exp) => /^[A-Za-z]/.test(exp)) // Component names starting with any letter (capital or lowercase)
          .map((exp) => exp.replace(/\s+as\s+.*$/, "")); // Remove "as" aliases
        allExports.push(...exports);
      }

      // Look for default exports (including export default function)
      const defaultExportMatch = componentContent.match(
        /export\s+default\s+(?:function\s+)?([A-Z][a-zA-Z0-9]*)/,
      );
      if (defaultExportMatch) {
        allExports.push(defaultExportMatch[1]);
      }

      if (allExports.length > 0) {
        exportedComponents = allExports;
      }
    } catch {
      // If we can't read the file, fall back to filename
      exportedComponents = [fileName];
    }

    // Skip certain files that don't need stories
    const skipFiles = [
      "index.tsx",
      "index.ts",
      "icons/index.tsx", // Icons are handled differently
      "logo-icon-current-color.tsx", // Used internally by Logo component
      "logo-logotype-current-color.tsx", // Used internally by Logo component
      "logo-logotype-only-current-color.tsx", // Re-exports wordmark, used by Logo
      "logo-wordmark-only-current-color.tsx", // Used internally by Logo component
      "usage-table-preview.tsx", // Internal preview used by StyleControls
    ];

    // Skip test files
    if (
      filename.includes(".test.") ||
      filename.includes(".spec.") ||
      filename.includes("__tests__")
    ) {
      return {};
    }

    if (skipFiles.some((skipFile) => filename.includes(skipFile))) {
      return {};
    }

    // Get the project root directory (assuming eslint config is in root)
    const projectRoot = __dirname.replace(/[/\\]eslint-rules$/, "");
    const storiesDir = join(projectRoot, "stories");

    // Check if stories directory exists
    try {
      if (!statSync(storiesDir).isDirectory()) {
        return {};
      }
    } catch {
      return {};
    }

    // Recursively find all story files
    function findStoryFiles(dir) {
      const files = [];
      try {
        const entries = readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = join(dir, entry.name);

          if (entry.isDirectory()) {
            files.push(...findStoryFiles(fullPath));
          } else if (entry.isFile() && entry.name.endsWith(".stories.tsx")) {
            files.push(fullPath);
          }
        }
      } catch {
        // Ignore errors reading directories
      }

      return files;
    }

    const storyFiles = findStoryFiles(storiesDir);

    // Check if the component is imported in any story file or used indirectly
    let isImportedInStory = false;

    // First, check for direct imports in story files
    for (const storyFile of storyFiles) {
      try {
        const content = readFileSync(storyFile, "utf8");

        // Check if any of the exported components are imported
        for (const componentName of exportedComponents) {
          const importPatterns = [
            // Direct import: import { ComponentName } from "@/design-system/component-name"
            new RegExp(
              `import\\s*{[^}]*\\b${componentName}\\b[^}]*}\\s*from\\s*["']@/design-system/${fileName}["']`,
              "gi",
            ),
            // Relative import: import { ComponentName } from "../../design-system/component-name"
            new RegExp(
              `import\\s*{[^}]*\\b${componentName}\\b[^}]*}\\s*from\\s*["'][^"']*design-system/${fileName}["']`,
              "gi",
            ),
            // Default import: import ComponentName from "@/design-system/component-name"
            new RegExp(
              `import\\s+${componentName}\\s+from\\s*["']@/design-system/${fileName}["']`,
              "gi",
            ),
            // Default import with relative path
            new RegExp(
              `import\\s+${componentName}\\s+from\\s*["'][^"']*design-system/${fileName}["']`,
              "gi",
            ),
            // Check for any import that contains the component name and the component file path
            new RegExp(
              `import\\s*{[^}]*\\b${componentName}\\b[^}]*}\\s*from\\s*["'][^"']*${fileName}["']`,
              "gi",
            ),
            new RegExp(
              `import\\s+${componentName}\\s+from\\s*["'][^"']*${fileName}["']`,
              "gi",
            ),
          ];

          for (const pattern of importPatterns) {
            // Reset regex state and test
            pattern.lastIndex = 0;
            const match = pattern.test(content);

            if (match) {
              isImportedInStory = true;
              break;
            }
          }

          if (isImportedInStory) {
            break;
          }
        }

        if (isImportedInStory) {
          break;
        }
      } catch {
        // Ignore errors reading files
        continue;
      }
    }

    // If not found in stories, check if any UI components import from this file and have stories
    if (!isImportedInStory) {
      try {
        const uiComponentsDir = join(projectRoot, "components", "ui");
        // Find all UI component files (not stories)
        function findUIComponentFiles(dir) {
          const files = [];
          try {
            const entries = readdirSync(dir, { withFileTypes: true });

            for (const entry of entries) {
              const fullPath = join(dir, entry.name);

              if (entry.isDirectory()) {
                files.push(...findUIComponentFiles(fullPath));
              } else if (
                entry.isFile() &&
                (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) &&
                !entry.name.endsWith(".stories.tsx")
              ) {
                files.push(fullPath);
              }
            }
          } catch {
            // Ignore errors reading directories
          }

          return files;
        }

        const uiComponentFiles = findUIComponentFiles(uiComponentsDir);

        for (const uiFile of uiComponentFiles) {
          try {
            const uiContent = readFileSync(uiFile, "utf8");

            // Check if this UI component imports from our target file
            const importPattern = new RegExp(
              `import\\s*{[^}]*}\\s*from\\s*["'][^"']*${fileName}["']`,
              "gi",
            );
            if (importPattern.test(uiContent)) {
              // Check if this UI component has a story
              const uiFileName = uiFile
                .split(/[/\\]/)
                .pop()
                ?.replace(/\.(tsx|ts)$/, "");
              if (uiFileName) {
                const hasStory = storyFiles.some((storyFile) => {
                  try {
                    const storyContent = readFileSync(storyFile, "utf8");
                    const storyImportPattern = new RegExp(
                      `import\\s*{[^}]*}\\s*from\\s*["'][^"']*${uiFileName}["']`,
                      "gi",
                    );
                    return storyImportPattern.test(storyContent);
                  } catch {
                    return false;
                  }
                });

                if (hasStory) {
                  isImportedInStory = true;
                  break;
                }
              }
            }
          } catch {
            continue;
          }
        }
      } catch {
        // Ignore errors
      }
    }

    return {
      "Program:exit"() {
        if (!isImportedInStory) {
          context.report({
            loc: { line: 1, column: 1 },
            messageId: "missingStory",
            data: {
              componentName: exportedComponents[0],
            },
          });
        }
      },
    };
  },
};

export default uiComponentStoryRequiredRule;
