import React from "react";
import type { Meta } from "@storybook/nextjs-vite";

// Import CSS files as raw text using Vite's ?raw suffix
import colorRampsCss from "../../styles/color-ramps.css?raw";
import semanticColorsCss from "../../styles/semantic-colors.css?raw";

import { Container } from "@/components/layouts/container";
import { Heading } from "@/design-system/heading";

// Utility to extract color tokens from CSS custom properties
interface ColorToken {
  name: string;
  family: string;
  shade: number;
  value: string;
  cssVar: string;
  /** Resolved hex/rgb for swatch display (avoids CSS var resolution issues in Storybook) */
  displayColor: string;
}

interface ColorFamily {
  name: string;
  tokens: ColorToken[];
}

// Resolve var(--x) to hex using a lookup map (handles aliases like --color-gray-100 -> --color-pigeon-100)
function resolveToColor(value: string, varMap: Record<string, string>): string {
  const varMatch = value.match(/^var\((--[\w-]+)\)$/);
  if (!varMatch) return value; // Already a hex/rgb
  const ref = varMap[varMatch[1]];
  if (!ref) return value;
  return resolveToColor(ref, varMap);
}

// Extract all color tokens from color-ramps.css by parsing the raw CSS
// (getComputedStyle fails because Tailwind v4 @theme vars may not be on :root)
function extractColorTokens(): ColorFamily[] {
  const colorFamilies: Record<string, ColorToken[]> = {};
  const varMap: Record<string, string> = {};

  try {
    // Match --color-name: value; in the raw CSS (handles @theme block)
    const varRegex = /--color-([\w-]+):\s*([^;]+);/g;
    let match: RegExpExecArray | null;
    const parsed: Array<{ cssVar: string; name: string; value: string }> = [];

    while ((match = varRegex.exec(colorRampsCss)) !== null) {
      const cssVar = `--color-${match[1]}`;
      const value = match[2].trim();
      varMap[cssVar] = value;
      parsed.push({
        cssVar,
        name: match[1],
        value,
      });
    }

    // Group into families and resolve display color (use parsed hex, not var, so swatches render)
    parsed.forEach(({ cssVar, name, value }) => {
      const numericShadeMatch = name.match(/^(.+)-(\d+)$/);
      let family: string;
      let shade: number;

      if (numericShadeMatch) {
        family = numericShadeMatch[1];
        shade = parseInt(numericShadeMatch[2], 10);
      } else {
        family = name.split("-")[0] ?? "base";
        shade = 0;
      }

      const displayColor = resolveToColor(value, varMap);

      if (!colorFamilies[family]) {
        colorFamilies[family] = [];
      }
      colorFamilies[family].push({
        name,
        family,
        shade,
        value,
        cssVar,
        displayColor,
      });
    });
  } catch (error) {
    console.log("Could not process color-ramps.css:", error);
  }

  // Sort families alphabetically and tokens by shade
  return Object.keys(colorFamilies)
    .sort()
    .map((family) => ({
      name: family,
      tokens: colorFamilies[family].sort((a, b) => a.shade - b.shade),
    }));
}

// Get semantic colors from semantic-colors.css by parsing the raw CSS
function extractSemanticColors(): Record<string, Record<string, string>> {
  const semanticColors: Record<string, string> = {};
  const lightColors: Record<string, string> = {};
  const darkColors: Record<string, string> = {};

  try {
    const varRegex = /--(color-[\w-]+):\s*([^;]+);/g;
    let match: RegExpExecArray | null;

    while ((match = varRegex.exec(semanticColorsCss)) !== null) {
      const cssVar = `--${match[1]}`;
      const value = match[2].trim();
      if (cssVar.endsWith("-light")) {
        lightColors[cssVar] = value;
      } else if (cssVar.endsWith("-dark")) {
        darkColors[cssVar] = value;
      } else {
        semanticColors[cssVar] = value;
      }
    }
  } catch (error) {
    console.log("Could not process semantic-colors.css:", error);
  }

  return {
    semantic: semanticColors,
    light: lightColors,
    dark: darkColors,
  };
}

interface ColorSwatchProps {
  token: ColorToken;
  showValue?: boolean;
  showCssVar?: boolean;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  token,
  showValue = true,
  showCssVar = false,
}) => {
  return (
    <div className="flex flex-row gap-4 mb-2 items-center">
      <div className="w-80 font-mono text-sm">{token.name}</div>
      <div className="relative w-12 h-4 rounded-sm overflow-hidden border border-border">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iI2YwZjBmMCIvPjxyZWN0IHg9IjgiIHk9IjgiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNmMGYwZjAiLz48L3N2Zz4=')]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: /^#[0-9a-fA-F]{3,8}$/.test(token.displayColor)
              ? token.displayColor
              : `var(${token.cssVar})`,
          }}
        />
      </div>
      {showValue && (
        <div className="font-mono text-xs text-muted-foreground w-20">
          {token.value}
        </div>
      )}
      {showCssVar && (
        <div className="font-mono text-xs text-muted-foreground w-32">
          {token.cssVar}
        </div>
      )}
    </div>
  );
};

interface ColorSectionProps {
  family: {
    name: string;
    tokens: ColorToken[];
  };
  showValue?: boolean;
  showCssVar?: boolean;
}

const ColorSection: React.FC<ColorSectionProps> = ({
  family,
  showValue = true,
  showCssVar = false,
}) => {
  return (
    <div className="mb-8">
      <h3 className="font-bold mb-4 capitalize text-lg">{family.name}</h3>
      {family.tokens.map((token) => (
        <ColorSwatch
          key={token.name}
          token={token}
          showValue={showValue}
          showCssVar={showCssVar}
        />
      ))}
    </div>
  );
};

interface AlphaVariationProps {
  baseColor: string;
  colorName: string;
  cssVar: string;
}

const AlphaVariation: React.FC<AlphaVariationProps> = ({
  baseColor,
  colorName,
  cssVar,
}) => {
  const alphaValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <div className="mb-8">
      <h3 className="font-bold mb-4 capitalize text-lg">Alpha variations</h3>
      <div className="space-y-2">
        {alphaValues.map((alpha) => (
          <div key={alpha} className="flex flex-row gap-4 mb-2 items-center">
            <div className="w-80 font-mono text-sm">
              {colorName}/{alpha}
            </div>
            <div className="relative w-12 h-4 rounded-sm overflow-hidden border border-border">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iI2YwZjBmMCIvPjxyZWN0IHg9IjgiIHk9IjgiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNmMGYwZjAiLz48L3N2Zz4=')]" />
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: `var(${cssVar})`,
                  opacity: alpha / 100,
                }}
              />
            </div>
            <div className="font-mono text-xs text-muted-foreground w-20">
              {alpha}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
};

export default meta;

export const ColorTokens = () => {
  const colorFamilies = extractColorTokens();

  return (
    <>
      <Heading
        size="large"
        title="Color tokens"
        description="Raw color tokens extracted from CSS custom properties in color-ramps.css"
      />
      <br />
      <br />

      {colorFamilies.map((family) => (
        <ColorSection key={family.name} family={family} />
      ))}
    </>
  );
};

export const SemanticColors = () => {
  const semanticColors = extractSemanticColors();

  // Convert semantic colors to ColorToken format for consistent display
  const lightTokens: ColorToken[] = Object.entries(
    semanticColors.light || {},
  ).map(([cssVar, value]) => ({
    name: cssVar.replace("--", ""),
    family: "light",
    shade: 0,
    value,
    cssVar,
    displayColor: value,
  }));

  const darkTokens: ColorToken[] = Object.entries(
    semanticColors.dark || {},
  ).map(([cssVar, value]) => ({
    name: cssVar.replace("--", ""),
    family: "dark",
    shade: 0,
    value,
    cssVar,
    displayColor: value,
  }));

  const semanticTokens: ColorToken[] = Object.entries(
    semanticColors.semantic || {},
  ).map(([cssVar, value]) => ({
    name: cssVar.replace("--", ""),
    family: "semantic",
    shade: 0,
    value,
    cssVar,
    displayColor: value,
  }));

  return (
    <>
      <Heading
        size="large"
        title="Semantic colors"
        description="Functional colors used throughout the application"
      />
      <br />
      <br />

      <ColorSection
        family={{
          name: "Semantic colors",
          tokens: semanticTokens,
        }}
        showValue={true}
        showCssVar={false}
      />

      <ColorSection
        family={{
          name: "Light theme colors",
          tokens: lightTokens,
        }}
        showValue={true}
        showCssVar={false}
      />

      <ColorSection
        family={{
          name: "Dark theme colors",
          tokens: darkTokens,
        }}
        showValue={true}
        showCssVar={false}
      />
    </>
  );
};

export const Opacity = () => {
  return (
    <>
      <Heading
        size="large"
        title="Opacity"
        description="Gray color with different alpha values using Tailwind opacity classes"
      />
      <br />
      <br />

      <AlphaVariation
        baseColor="#262626"
        colorName="pigeon-800"
        cssVar="--color-pigeon-800"
      />
    </>
  );
};
