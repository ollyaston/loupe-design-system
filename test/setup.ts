import "@testing-library/jest-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
import { beforeAll, expect, vi } from "vitest";
import failOnConsole from "vitest-fail-on-console";

expect.extend(matchers);

// // Add missing stuff to JSDom
beforeAll(() => {
  if (typeof Element !== "undefined") {
    Element.prototype.scrollTo = vi.fn();
  }
  // @radix/ui / shadcn depend on ResizeObserver which is not implemented in JSDom
  global.ResizeObserver = class ResizeObserver {
    disconnect() {
      // do nothing
    }
    observe() {
      // do nothing
    }
    unobserve() {
      // do nothing
    }
  };

  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  window.HTMLElement.prototype.hasPointerCapture = vi.fn();
  window.HTMLElement.prototype.releasePointerCapture = vi.fn();
});

failOnConsole({
  shouldFailOnDebug: true,
  shouldFailOnError: true,
  shouldFailOnInfo: true,
  shouldFailOnLog: true,
  shouldFailOnWarn: true,
});
