/**
 * ESLint rule to ensure all page.tsx files include the PageWrapper component
 * This ensures consistent page layout and structure across the application
 */

const pageWrapperRequiredRule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure all page.tsx files include the PageWrapper component",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      pageWrapperRequired:
        "All page.tsx files must include either PageWrapper, FullLayout, AccountLayout, ChatLayout, or TakeoverLayout component. Import and use one of these components from their respective paths.",
      pageWrapperNotUsed:
        "Component is imported but not used. Wrap your page content with the imported component.",
    },
  },
  create(context) {
    const filename = context.getFilename();
    const normalizedPath = filename.replace(/\\/g, "/");
    const isAppPageFile =
      normalizedPath.includes("/app/") && normalizedPath.endsWith("page.tsx");

    // Debug: log when rule is applied
    // if (normalizedPath.endsWith("page.tsx")) {
    //   console.log(
    //     "RULE DEBUG: Processing file:",
    //     normalizedPath,
    //     "isAppPageFile:",
    //     isAppPageFile,
    //   );
    // }

    // Only apply this rule to page.tsx files in the app directory
    if (!isAppPageFile) {
      return {};
    }

    let hasPageWrapperImport = false;
    let hasPageWrapperUsage = false;
    let hasFullLayoutImport = false;
    let hasFullLayoutUsage = false;
    let hasAccountLayoutImport = false;
    let hasAccountLayoutUsage = false;
    let hasChatLayoutImport = false;
    let hasChatLayoutUsage = false;
    let hasTakeoverLayoutImport = false;
    let hasTakeoverLayoutUsage = false;
    let importNode = null;

    return {
      ImportDeclaration(node) {
        // Check if PageWrapper is imported
        if (node.source.value === "@/design-system/page-wrapper") {
          node.specifiers.forEach((specifier) => {
            if (
              specifier.type === "ImportSpecifier" &&
              specifier.imported.name === "PageWrapper"
            ) {
              hasPageWrapperImport = true;
              importNode = node;
            }
          });
        }
        // Check if FullLayout is imported
        if (node.source.value === "@/components/layouts/full-layout") {
          node.specifiers.forEach((specifier) => {
            if (
              specifier.type === "ImportSpecifier" &&
              specifier.imported.name === "FullLayout"
            ) {
              hasFullLayoutImport = true;
              importNode = node;
            }
          });
        }
        // Check if AccountLayout is imported
        if (node.source.value === "@/components/layouts/account-layout") {
          node.specifiers.forEach((specifier) => {
            if (
              specifier.type === "ImportSpecifier" &&
              specifier.imported.name === "AccountLayout"
            ) {
              hasAccountLayoutImport = true;
              importNode = node;
            }
          });
        }
        // Check if ChatLayout is imported
        if (node.source.value === "@/components/layouts/chat-layout") {
          node.specifiers.forEach((specifier) => {
            if (
              specifier.type === "ImportSpecifier" &&
              specifier.imported.name === "ChatLayout"
            ) {
              hasChatLayoutImport = true;
              importNode = node;
            }
          });
        }
        // Check if TakeoverLayout is imported
        if (node.source.value === "@/components/layouts/takeover-layout") {
          node.specifiers.forEach((specifier) => {
            if (
              specifier.type === "ImportSpecifier" &&
              specifier.imported.name === "TakeoverLayout"
            ) {
              hasTakeoverLayoutImport = true;
              importNode = node;
            }
          });
        }
      },
      JSXElement(node) {
        // Check if PageWrapper is used as a JSX element
        if (node.openingElement.name.name === "PageWrapper") {
          hasPageWrapperUsage = true;
        }
        // Check if FullLayout is used as a JSX element
        if (node.openingElement.name.name === "FullLayout") {
          hasFullLayoutUsage = true;
        }
        // Check if AccountLayout is used as a JSX element
        if (node.openingElement.name.name === "AccountLayout") {
          hasAccountLayoutUsage = true;
        }
        // Check if ChatLayout is used as a JSX element
        if (node.openingElement.name.name === "ChatLayout") {
          hasChatLayoutUsage = true;
        }
        // Check if TakeoverLayout is used as a JSX element
        if (node.openingElement.name.name === "TakeoverLayout") {
          hasTakeoverLayoutUsage = true;
        }
      },
      JSXIdentifier(node) {
        // Check if PageWrapper is referenced in JSX
        if (node.name === "PageWrapper") {
          hasPageWrapperUsage = true;
        }
        // Check if FullLayout is referenced in JSX
        if (node.name === "FullLayout") {
          hasFullLayoutUsage = true;
        }
        // Check if AccountLayout is referenced in JSX
        if (node.name === "AccountLayout") {
          hasAccountLayoutUsage = true;
        }
        // Check if ChatLayout is referenced in JSX
        if (node.name === "ChatLayout") {
          hasChatLayoutUsage = true;
        }
        // Check if TakeoverLayout is referenced in JSX
        if (node.name === "TakeoverLayout") {
          hasTakeoverLayoutUsage = true;
        }
      },
      "Program:exit"() {
        // Check if any of the required components are imported
        const hasAnyImport =
          hasPageWrapperImport ||
          hasFullLayoutImport ||
          hasAccountLayoutImport ||
          hasChatLayoutImport ||
          hasTakeoverLayoutImport;

        // Check if any of the required components are used
        const hasAnyUsage =
          hasPageWrapperUsage ||
          hasFullLayoutUsage ||
          hasAccountLayoutUsage ||
          hasChatLayoutUsage ||
          hasTakeoverLayoutUsage;

        // Check if any required component is required but not imported
        if (!hasAnyImport) {
          context.report({
            loc: { line: 1, column: 1 },
            messageId: "pageWrapperRequired",
          });
        }
        // Check if any component is imported but not used
        else if (hasAnyImport && !hasAnyUsage && importNode) {
          context.report({
            node: importNode,
            messageId: "pageWrapperNotUsed",
          });
        }
      },
    };
  },
};

export default pageWrapperRequiredRule;
