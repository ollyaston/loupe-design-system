import * as React from "react";

// Theme cookie management
export const THEME_COOKIE_NAME = "theme-preference";
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

// Contrast cookie management
export const CONTRAST_COOKIE_NAME = "contrast-preference";
export const CONTRAST_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export type Theme = "light" | "dark" | "system";
export type Contrast = "high" | "low" | "default";

/**
 * Theme Utilities
 *
 * Server and client-side utilities for theme management.
 * These functions handle theme detection, validation, and resolution.
 *
 * This system prevents FOUC (Flash of Unstyled Content) by:
 * 1. Reading theme from cookies during server-side rendering
 * 2. Applying theme class to HTML element before page loads
 * 3. Using cookies for persistent storage (works on both client and server)
 */

/**
 * Resolves a theme to its actual value (light or dark)
 * If theme is "system", it returns the system preference
 */
export function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") {
    // Get system theme preference
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return theme;
}

/**
 * Gets the current theme from browser cookies
 * Returns "system" if no theme cookie is found
 */
export function getCurrentTheme(): Theme {
  if (typeof window === "undefined") return "light";

  try {
    const cookies = document.cookie.split(";");
    const themeCookie = cookies.find((c) =>
      c.trim().startsWith(`${THEME_COOKIE_NAME}=`),
    );

    if (themeCookie) {
      const theme = themeCookie.split("=")[1];
      if (["light", "dark", "system"].includes(theme)) {
        return theme as Theme;
      }
    }
  } catch (error) {
    console.warn("Failed to parse theme from cookie:", error);
  }

  return "light";
}

/**
 * Applies a theme to the document element
 * Removes existing theme classes and adds the resolved theme class
 */
export function applyThemeToDocument(theme: Theme): "light" | "dark" {
  if (typeof window === "undefined") return "light";

  const root = document.documentElement;
  const resolved = resolveTheme(theme);

  // Remove existing theme classes
  root.classList.remove("light", "dark");

  // Apply the resolved theme
  root.classList.add(resolved);

  return resolved;
}

/**
 * Sets the theme cookie in the browser
 * Only works on the client side
 */
export function setThemeCookie(theme: Theme): void {
  if (typeof window === "undefined") return;

  document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`;
}

/**
 * Checks if the user has a theme cookie
 * Returns true if a theme-preference cookie exists
 */
export function hasThemeCookie(): boolean {
  if (typeof window === "undefined") return false;
  return document.cookie.includes("theme-preference=");
}

/**
 * Gets the current contrast from browser cookies
 * Returns "default" if no contrast cookie is found
 */
export function getCurrentContrast(): Contrast {
  if (typeof window === "undefined") return "default";

  try {
    const cookies = document.cookie.split(";");
    const contrastCookie = cookies.find((c) =>
      c.trim().startsWith(`${CONTRAST_COOKIE_NAME}=`),
    );

    if (contrastCookie) {
      const contrast = contrastCookie.split("=")[1];
      if (["high", "low", "default"].includes(contrast)) {
        return contrast as Contrast;
      }
    }
  } catch (error) {
    console.warn("Failed to parse contrast from cookie:", error);
  }

  return "default";
}

/**
 * Resolves a contrast preference to its actual value (high or low)
 * If contrast is "default", it returns "high"
 */
export function resolveContrast(contrast: Contrast): "high" | "low" {
  if (contrast === "default") {
    return "high";
  }
  return contrast;
}

/**
 * Applies a contrast to the document element
 * Removes existing contrast classes and adds the resolved contrast class
 */
export function applyContrastToDocument(contrast: Contrast): "high" | "low" {
  if (typeof window === "undefined") return "high";

  const root = document.documentElement;
  const resolved = resolveContrast(contrast);

  // Remove existing contrast classes
  root.classList.remove("contrast-high", "contrast-low");

  // Apply the resolved contrast
  root.classList.add(`contrast-${resolved}`);

  return resolved;
}

/**
 * Sets the contrast cookie in the browser
 * Only works on the client side
 */
export function setContrastCookie(contrast: Contrast): void {
  if (typeof window === "undefined") return;

  document.cookie = `${CONTRAST_COOKIE_NAME}=${contrast}; path=/; max-age=${CONTRAST_COOKIE_MAX_AGE}; SameSite=Lax`;
}

/**
 * Checks if the user has a contrast cookie
 * Returns true if a contrast-preference cookie exists
 */
export function hasContrastCookie(): boolean {
  if (typeof window === "undefined") return false;
  return document.cookie.includes("contrast-preference=");
}

/**
 * React hook to detect if dark mode is currently active
 *
 * TODO: Convert this to use cookies instead of just checking the DOM class.
 * This would provide better consistency with the server-side theme resolution
 * and prevent potential hydration mismatches.
 */
export function useDarkMode(): boolean {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    // Check if dark mode is active by looking for the 'dark' class on html or body
    const checkDarkMode = () => {
      const isDarkMode =
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark");
      setIsDark(isDarkMode);
    };

    // Initial check
    checkDarkMode();

    // Set up observer to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          checkDarkMode();
        }
      });
    });

    // Observe changes to the html element's class attribute
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}
