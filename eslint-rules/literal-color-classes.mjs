/**
 * ESLint rule to warn when using literal color classes in Tailwind CSS
 * This encourages using semantic color classes from the design system
 */

const literalColorClassesRule = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Warn when using literal color classes in Tailwind CSS and suggest using semantic color classes",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      useSemanticColor:
        "Use semantic color classes (ie `text-primary`) instead of literal color '{{className}}' to keep dark mode working.",
    },
  },
  create(context) {
    // Common literal color classes that should trigger the warning
    const literalColorClasses = [
      // Black and white colors
      "text-black",
      "bg-black",
      "border-black",
      "ring-black",
      "shadow-black",
      "from-black",
      "to-black",
      "via-black",

      "text-white",
      "bg-white",
      "border-white",
      "ring-white",
      "shadow-white",
      "from-white",
      "to-white",
      "via-white",

      // Tailwind common literal colors
      "text-gray-",
      "bg-gray-",
      "border-gray-",
      "ring-gray-",
      "shadow-gray-",
      "from-gray-",
      "to-gray-",
      "via-gray-",

      "text-red-",
      "bg-red-",
      "border-red-",
      "ring-red-",
      "shadow-red-",
      "from-red-",
      "to-red-",
      "via-red-",

      "text-blue-",
      "bg-blue-",
      "border-blue-",
      "ring-blue-",
      "shadow-blue-",
      "from-blue-",
      "to-blue-",
      "via-blue-",

      "text-green-",
      "bg-green-",
      "border-green-",
      "ring-green-",
      "shadow-green-",
      "from-green-",
      "to-green-",
      "via-green-",

      "text-yellow-",
      "bg-yellow-",
      "border-yellow-",
      "ring-yellow-",
      "shadow-yellow-",
      "from-yellow-",
      "to-yellow-",
      "via-yellow-",

      "text-purple-",
      "bg-purple-",
      "border-purple-",
      "ring-purple-",
      "shadow-purple-",
      "from-purple-",
      "to-purple-",
      "via-purple-",

      "text-pink-",
      "bg-pink-",
      "border-pink-",
      "ring-pink-",
      "shadow-pink-",
      "from-pink-",
      "to-pink-",
      "via-pink-",

      "text-indigo-",
      "bg-indigo-",
      "border-indigo-",
      "ring-indigo-",
      "shadow-indigo-",
      "from-indigo-",
      "to-indigo-",
      "via-indigo-",

      "text-orange-",
      "bg-orange-",
      "border-orange-",
      "ring-orange-",
      "shadow-orange-",
      "from-orange-",
      "to-orange-",
      "via-orange-",

      "text-teal-",
      "bg-teal-",
      "border-teal-",
      "ring-teal-",
      "shadow-teal-",
      "from-teal-",
      "to-teal-",
      "via-teal-",

      "text-cyan-",
      "bg-cyan-",
      "border-cyan-",
      "ring-cyan-",
      "shadow-cyan-",
      "from-cyan-",
      "to-cyan-",
      "via-cyan-",

      "text-slate-",
      "bg-slate-",
      "border-slate-",
      "ring-slate-",
      "shadow-slate-",
      "from-slate-",
      "to-slate-",
      "via-slate-",

      "text-zinc-",
      "bg-zinc-",
      "border-zinc-",
      "ring-zinc-",
      "shadow-zinc-",
      "from-zinc-",
      "to-zinc-",
      "via-zinc-",

      "text-neutral-",
      "bg-neutral-",
      "border-neutral-",
      "ring-neutral-",
      "shadow-neutral-",
      "from-neutral-",
      "to-neutral-",
      "via-neutral-",

      "text-stone-",
      "bg-stone-",
      "border-stone-",
      "ring-stone-",
      "shadow-stone-",
      "from-stone-",
      "to-stone-",
      "via-stone-",

      "text-emerald-",
      "bg-emerald-",
      "border-emerald-",
      "ring-emerald-",
      "shadow-emerald-",
      "from-emerald-",
      "to-emerald-",
      "via-emerald-",

      "text-lime-",
      "bg-lime-",
      "border-lime-",
      "ring-lime-",
      "shadow-lime-",
      "from-lime-",
      "to-lime-",
      "via-lime-",

      "text-rose-",
      "bg-rose-",
      "border-rose-",
      "ring-rose-",
      "shadow-rose-",
      "from-rose-",
      "to-rose-",
      "via-rose-",

      "text-fuchsia-",
      "bg-fuchsia-",
      "border-fuchsia-",
      "ring-fuchsia-",
      "shadow-fuchsia-",
      "from-fuchsia-",
      "to-fuchsia-",
      "via-fuchsia-",

      "text-violet-",
      "bg-violet-",
      "border-violet-",
      "ring-violet-",
      "shadow-violet-",
      "from-violet-",
      "to-violet-",
      "via-violet-",

      "text-amber-",
      "bg-amber-",
      "border-amber-",
      "ring-amber-",
      "shadow-amber-",
      "from-amber-",
      "to-amber-",
      "via-amber-",

      "text-sky-",
      "bg-sky-",
      "border-sky-",
      "ring-sky-",
      "shadow-sky-",
      "from-sky-",
      "to-sky-",
      "via-sky-",

      // Custom design system colors from color-ramps.css

      "text-pigeon-",
      "bg-pigeon-",
      "border-pigeon-",
      "ring-pigeon-",
      "shadow-pigeon-",
      "from-pigeon-",
      "to-pigeon-",
      "via-pigeon-",

      "text-granite-",
      "bg-granite-",
      "border-granite-",
      "ring-granite-",
      "shadow-granite-",
      "from-granite-",
      "to-granite-",
      "via-granite-",

      "text-coral-",
      "bg-coral-",
      "border-coral-",
      "ring-coral-",
      "shadow-coral-",
      "from-coral-",
      "to-coral-",
      "via-coral-",

      "text-carmine-",
      "bg-carmine-",
      "border-carmine-",
      "ring-carmine-",
      "shadow-carmine-",
      "from-carmine-",
      "to-carmine-",
      "via-carmine-",

      "text-earth-",
      "bg-earth-",
      "border-earth-",
      "ring-earth-",
      "shadow-earth-",
      "from-earth-",
      "to-earth-",
      "via-earth-",

      "text-sunglow-",
      "bg-sunglow-",
      "border-sunglow-",
      "ring-sunglow-",
      "shadow-sunglow-",
      "from-sunglow-",
      "to-sunglow-",
      "via-sunglow-",

      "text-yolk-",
      "bg-yolk-",
      "border-yolk-",
      "ring-yolk-",
      "shadow-yolk-",
      "from-yolk-",
      "to-yolk-",
      "via-yolk-",

      "text-kiwi-",
      "bg-kiwi-",
      "border-kiwi-",
      "ring-kiwi-",
      "shadow-kiwi-",
      "from-kiwi-",
      "to-kiwi-",
      "via-kiwi-",

      "text-jade-",
      "bg-jade-",
      "border-jade-",
      "ring-jade-",
      "shadow-jade-",
      "from-jade-",
      "to-jade-",
      "via-jade-",

      "text-azure-",
      "bg-azure-",
      "border-azure-",
      "ring-azure-",
      "shadow-azure-",
      "from-azure-",
      "to-azure-",
      "via-azure-",

      "text-rosemary-",
      "bg-rosemary-",
      "border-rosemary-",
      "ring-rosemary-",
      "shadow-rosemary-",
      "from-rosemary-",
      "to-rosemary-",
      "via-rosemary-",

      "text-pacific-",
      "bg-pacific-",
      "border-pacific-",
      "ring-pacific-",
      "shadow-pacific-",
      "from-pacific-",
      "to-pacific-",
      "via-pacific-",

      "text-sapphire-",
      "bg-sapphire-",
      "border-sapphire-",
      "ring-sapphire-",
      "shadow-sapphire-",
      "from-sapphire-",
      "to-sapphire-",
      "via-sapphire-",

      "text-cerulean-",
      "bg-cerulean-",
      "border-cerulean-",
      "ring-cerulean-",
      "shadow-cerulean-",
      "from-cerulean-",
      "to-cerulean-",
      "via-cerulean-",

      "text-lavender-",
      "bg-lavender-",
      "border-lavender-",
      "ring-lavender-",
      "shadow-lavender-",
      "from-lavender-",
      "to-lavender-",
      "via-lavender-",

      "text-amethyst-",
      "bg-amethyst-",
      "border-amethyst-",
      "ring-amethyst-",
      "shadow-amethyst-",
      "from-amethyst-",
      "to-amethyst-",
      "via-amethyst-",

      "text-plum-",
      "bg-plum-",
      "border-plum-",
      "ring-plum-",
      "shadow-plum-",
      "from-plum-",
      "to-plum-",
      "via-plum-",

      "text-orchid-",
      "bg-orchid-",
      "border-orchid-",
      "ring-orchid-",
      "shadow-orchid-",
      "from-orchid-",
      "to-orchid-",
      "via-orchid-",

      "text-fawn-",
      "bg-fawn-",
      "border-fawn-",
      "ring-fawn-",
      "shadow-fawn-",
      "from-fawn-",
      "to-fawn-",
      "via-fawn-",

      "text-eggplant-",
      "bg-eggplant-",
      "border-eggplant-",
      "ring-eggplant-",
      "shadow-eggplant-",
      "from-eggplant-",
      "to-eggplant-",
      "via-eggplant-",

      "text-clay-",
      "bg-clay-",
      "border-clay-",
      "ring-clay-",
      "shadow-clay-",
      "from-clay-",
      "to-clay-",
      "via-clay-",

      "text-brass-",
      "bg-brass-",
      "border-brass-",
      "ring-brass-",
      "shadow-brass-",
      "from-brass-",
      "to-brass-",
      "via-brass-",

      "text-cyanide-",
      "bg-cyanide-",
      "border-cyanide-",
      "ring-cyanide-",
      "shadow-cyanide-",
      "from-cyanide-",
      "to-cyanide-",
      "via-cyanide-",
    ];

    // Function to check if a string contains any literal color classes
    function containsLiteralColorClass(str) {
      return literalColorClasses.some((className) => str.includes(className));
    }

    // Function to extract the specific literal color class from a string
    function getLiteralColorClass(str) {
      return literalColorClasses.find((className) => str.includes(className));
    }

    // Function to check for arbitrary color values like text-[#18181B]
    function containsArbitraryColor(str) {
      return /\[#[0-9A-Fa-f]{3,8}\]/.test(str);
    }

    // Function to extract arbitrary color from a string
    function getArbitraryColor(str) {
      const match = str.match(/\[#[0-9A-Fa-f]{3,8}\]/);
      return match ? match[0] : null;
    }

    return {
      Literal(node) {
        // Check string literals in className props
        if (typeof node.value === "string") {
          // Check for literal color classes
          if (containsLiteralColorClass(node.value)) {
            const className = getLiteralColorClass(node.value);
            context.report({
              node,
              messageId: "useSemanticColor",
              data: {
                className: className,
              },
            });
          }

          // Check for arbitrary color values
          if (containsArbitraryColor(node.value)) {
            const arbitraryColor = getArbitraryColor(node.value);
            context.report({
              node,
              messageId: "useSemanticColor",
              data: {
                className: arbitraryColor,
              },
            });
          }
        }
      },
      TemplateLiteral(node) {
        // Check template literals for literal color classes
        node.quasis.forEach((quasi) => {
          // Check for literal color classes
          if (containsLiteralColorClass(quasi.value.raw)) {
            const className = getLiteralColorClass(quasi.value.raw);
            context.report({
              node: quasi,
              messageId: "useSemanticColor",
              data: {
                className: className,
              },
            });
          }

          // Check for arbitrary color values
          if (containsArbitraryColor(quasi.value.raw)) {
            const arbitraryColor = getArbitraryColor(quasi.value.raw);
            context.report({
              node: quasi,
              messageId: "useSemanticColor",
              data: {
                className: arbitraryColor,
              },
            });
          }
        });
      },
    };
  },
};

export default literalColorClassesRule;
