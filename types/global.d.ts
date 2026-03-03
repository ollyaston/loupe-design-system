/** Intercom widget API (when loaded on the page) */
interface Intercom {
  (command: "update", settings: { horizontal_padding?: number }): void;
}

declare global {
  interface Window {
    Intercom?: Intercom;
  }
}

export {};
