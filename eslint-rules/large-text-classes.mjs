/**
 * ESLint rule to warn when using large text size Tailwind classes
 * This encourages using the Heading component for consistent typography
 */

const largeTextClassesRule = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Warn when using large text size Tailwind classes and suggest using Heading component",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      useHeadingComponent:
        "Use the Heading component instead of '{{className}}'. Import Heading from '@/design-system/heading' and use appropriate size prop (x-large, large, normal, or section).",
    },
  },
  create(context) {
    // Large text size classes that should trigger the warning
    const largeTextClasses = [
      "text-xl",
      "text-2xl",
      "text-3xl",
      "text-4xl",
      "text-5xl",
      "text-6xl",
      "text-7xl",
      "text-8xl",
      "text-9xl",
    ];

    // Function to check if a string contains any of the large text classes
    function containsLargeTextClass(str) {
      return largeTextClasses.some((className) => str.includes(className));
    }

    // Function to extract the specific large text class from a string
    function getLargeTextClass(str) {
      return largeTextClasses.find((className) => str.includes(className));
    }

    // Function to check if the current file is in the UI components directory
    function isInUIDirectory() {
      const filename = context.getFilename();
      return (
        filename.includes("/design-system/") ||
        filename.includes("\\design-system\\")
      );
    }

    return {
      Literal(node) {
        // Skip if file is in UI components directory
        if (isInUIDirectory()) {
          return;
        }

        // Check string literals in className props
        if (
          typeof node.value === "string" &&
          containsLargeTextClass(node.value)
        ) {
          const className = getLargeTextClass(node.value);
          context.report({
            node,
            messageId: "useHeadingComponent",
            data: {
              className: className,
            },
          });
        }
      },
      TemplateLiteral(node) {
        // Skip if file is in UI components directory
        if (isInUIDirectory()) {
          return;
        }

        // Check template literals for large text classes
        node.quasis.forEach((quasi) => {
          if (containsLargeTextClass(quasi.value.raw)) {
            const className = getLargeTextClass(quasi.value.raw);
            context.report({
              node: quasi,
              messageId: "useHeadingComponent",
              data: {
                className: className,
              },
            });
          }
        });
      },
    };
  },
};

export default largeTextClassesRule;
