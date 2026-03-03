/**
 * ESLint rule to prevent "loupe-system" class usage outside of UI components
 * This ensures only design system components can use this debug class
 */

const loupeSystemRule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Prevent 'loupe-system' class usage outside of UI components",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      loupeSystemOutsideUI:
        "The 'loupe-system' class should only be used in UI components (design-system/). Remove this class or move this component to the UI folder.",
      loupeSystemMissing:
        "Design system components must include the 'loupe-system' class for debugging. Add this class to the component's root element or move it out of the design system folder.",
    },
  },
  create(context) {
    const filename = context.getFilename();
    const isUIComponent =
      filename.includes("/design-system/") ||
      filename.includes("\\design-system\\");
    const isDebugHookFile = filename.includes("use-debug-ui.ts");
    const isTestFile =
      filename.includes(".test.") || filename.includes(".spec.");
    const isPrimitiveOnly =
      filename.includes("collapsible.tsx") ||
      filename.includes("form.tsx") ||
      filename.includes("data-table.tsx") ||
      filename.includes("icons/index.tsx") ||
      filename.includes("toaster.tsx") ||
      filename.includes("format-number.tsx") ||
      filename.includes("logo-logotype-only-current-color.tsx"); // Re-export, loupe-system on target
    let hasLoupeSystem = false;

    return {
      Literal(node) {
        if (
          typeof node.value === "string" &&
          node.value.includes("loupe-system")
        ) {
          hasLoupeSystem = true;
          if (!isUIComponent && !isDebugHookFile && !isTestFile) {
            context.report({
              node,
              messageId: "loupeSystemOutsideUI",
            });
          }
        }
      },
      TemplateLiteral(node) {
        node.quasis.forEach((quasi) => {
          if (quasi.value.raw.includes("loupe-system")) {
            hasLoupeSystem = true;
            if (!isUIComponent && !isDebugHookFile && !isTestFile) {
              context.report({
                node: quasi,
                messageId: "loupeSystemOutsideUI",
              });
            }
          }
        });
      },
      "Program:exit"() {
        if (
          isUIComponent &&
          !hasLoupeSystem &&
          !isPrimitiveOnly &&
          !isTestFile
        ) {
          context.report({
            loc: { line: 1, column: 1 },
            messageId: "loupeSystemMissing",
          });
        }
      },
    };
  },
};

export default loupeSystemRule;
