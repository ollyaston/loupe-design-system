"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  type Theme,
  type Contrast,
  getCurrentTheme,
  getCurrentContrast,
  applyThemeToDocument,
  applyContrastToDocument,
  setThemeCookie,
  setContrastCookie,
} from "@/lib/theme-utils";

/**
 * Theme/Contrast System
 *
 * - Light, Dark, and System (follows OS preference) modes
 * - High, Low, and Default contrast modes for sidebar
 * - Persistent storage in cookies (works on both client and server)
 * - No flash of unstyled content (FOUC) via server-side rendering
 */

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
  contrast: Contrast;
  setContrast: (contrast: Contrast) => void;
  resolvedContrast: "high" | "low";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check cookie first (works on both client and server)
    return getCurrentTheme();
  });

  const [contrast, setContrastState] = useState<Contrast>(() => {
    // Check cookie first (works on both client and server)
    return getCurrentContrast();
  });

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [resolvedContrast, setResolvedContrast] = useState<"high" | "low">(
    "high",
  );

  // Function to apply theme to document
  const applyTheme = (newTheme: Theme) => {
    const resolved = applyThemeToDocument(newTheme);
    setResolvedTheme(resolved);
  };

  // Function to apply contrast to document
  const applyContrast = (newContrast: Contrast) => {
    const resolved = applyContrastToDocument(newContrast);
    setResolvedContrast(resolved);
  };

  // Set theme function
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);

    // Save to cookie (works for both client and server)
    setThemeCookie(newTheme);

    applyTheme(newTheme);
  };

  // Set contrast function
  const setContrast = (newContrast: Contrast) => {
    setContrastState(newContrast);

    // Save to cookie (works for both client and server)
    setContrastCookie(newContrast);

    applyContrast(newContrast);
  };

  // Listen for system theme changes
  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = () => {
        applyTheme("system");
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Apply contrast on mount and when contrast changes
  useEffect(() => {
    applyContrast(contrast);
  }, [contrast]);

  // Initial theme and contrast application
  useEffect(() => {
    applyTheme(theme);
    applyContrast(contrast);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        resolvedTheme,
        contrast,
        setContrast,
        resolvedContrast,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
