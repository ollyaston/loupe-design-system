/**
 * ESLint rule to prevent app state logic in UI components
 * This ensures UI components remain pure and don't contain business logic
 */

const noAppStateInUIRule = {
  meta: {
    type: "problem",
    docs: {
      description: "Prevent app state logic in UI components (design-system/)",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      noRoutingInUI:
        "UI components should not use routing hooks like '{{hook}}'. Move this logic to a parent component or page.",
      noOrganizationInUI:
        "UI components should not use organization context like '{{import}}'. Move this logic to a parent component or page.",
      noNetworkCallsInUI:
        "UI components should not make network calls like '{{import}}'. Move this logic to a parent component or page.",
      noBrowserStorageInUI:
        "UI components should not access browser storage like '{{storage}}'. Move this logic to a parent component or page.",
      noFeatureFlagsInUI:
        "UI components should not use feature flags like '{{import}}'. Move this logic to a parent component or page.",
      noAppImportsInUI:
        "UI components should not import app-specific modules like '{{import}}'. Move this logic to a parent component or page.",
    },
  },
  create(context) {
    const filename = context.getFilename();
    const isUIComponent =
      filename.includes("/design-system/") ||
      filename.includes("\\design-system\\");

    // Skip if not a UI component
    if (!isUIComponent) {
      return {};
    }

    // Patterns to detect app state usage
    const routingHooks = [
      "usePathname",
      "useRouter",
      "useSearchParams",
      "useParams",
    ];

    const organizationImports = [
      "useOrganization",
      "OrganizationContext",
      "OrganizationProvider",
    ];

    const networkImports = ["fetch", "axios", "api-client", "apiClient"];

    // TODO: Add back feature flag and app-specific import checks later
    // const featureFlagImports = [
    //   "useFeatureFlags",
    //   "feature-flags"
    // ];

    // const appSpecificImports = [
    //   "auth-utils",
    //   "navigation-permissions-config",
    //   "constants"
    // ];

    return {
      // Check import declarations
      ImportDeclaration(node) {
        const source = node.source.value;

        // Check for organization context imports
        organizationImports.forEach((importName) => {
          if (source.includes(importName)) {
            context.report({
              node,
              messageId: "noOrganizationInUI",
              data: {
                import: importName,
              },
            });
          }
        });

        // Check for network call imports
        networkImports.forEach((importName) => {
          if (source.includes(importName)) {
            context.report({
              node,
              messageId: "noNetworkCallsInUI",
              data: {
                import: importName,
              },
            });
          }
        });

        // TODO: Add back feature flag and app-specific import checks later
        // Check for feature flag imports
        // featureFlagImports.forEach(importName => {
        //   if (source.includes(importName)) {
        //     context.report({
        //       node,
        //       messageId: "noFeatureFlagsInUI",
        //       data: {
        //         import: importName,
        //       },
        //     });
        //   }
        // });

        // Check for app-specific imports
        // appSpecificImports.forEach(importName => {
        //   if (source.includes(importName)) {
        //     context.report({
        //       node,
        //       messageId: "noAppImportsInUI",
        //       data: {
        //         import: importName,
        //       },
        //     });
        //   }
        // });
      },

      // Check for routing hook usage and fetch calls
      CallExpression(node) {
        if (node.callee.type === "Identifier") {
          const hookName = node.callee.name;

          if (routingHooks.includes(hookName)) {
            context.report({
              node,
              messageId: "noRoutingInUI",
              data: {
                hook: hookName,
              },
            });
          }

          // Check for fetch calls
          if (hookName === "fetch") {
            context.report({
              node,
              messageId: "noNetworkCallsInUI",
              data: {
                import: "fetch",
              },
            });
          }
        }
      },

      // Check for browser storage access
      MemberExpression(node) {
        if (node.object.type === "Identifier") {
          const objectName = node.object.name;
          const propertyName = node.property.name;

          // Check for document.cookie
          if (objectName === "document" && propertyName === "cookie") {
            context.report({
              node,
              messageId: "noBrowserStorageInUI",
              data: {
                storage: "document.cookie",
              },
            });
          }

          // Check for localStorage and sessionStorage
          if (
            objectName === "localStorage" ||
            objectName === "sessionStorage"
          ) {
            context.report({
              node,
              messageId: "noBrowserStorageInUI",
              data: {
                storage: objectName,
              },
            });
          }
        }
      },

      // Check for direct localStorage/sessionStorage access
      Identifier(node) {
        if (node.name === "localStorage" || node.name === "sessionStorage") {
          context.report({
            node,
            messageId: "noBrowserStorageInUI",
            data: {
              storage: node.name,
            },
          });
        }
      },
    };
  },
};

export default noAppStateInUIRule;
