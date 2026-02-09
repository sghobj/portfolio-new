import "@testing-library/jest-dom";
import { vi } from "vitest";

const shouldIgnore = (args: unknown[]) => {
  const first = args[0] as any;

  const msg =
    typeof first === "string"
      ? first
      : first?.message
        ? String(first.message)
        : "";

  return (
    msg.includes("Could not parse CSS stylesheet") ||
    msg.includes("An error occurred! For more details, see the full error text")
  );
};

if (typeof window !== "undefined") {
  const originalError = console.error;
  const originalWarn = console.warn;

  console.error = (...args: unknown[]) => {
    if (shouldIgnore(args)) return;
    originalError(...args);
  };

  console.warn = (...args: unknown[]) => {
    if (shouldIgnore(args)) return;
    originalWarn(...args);
  };

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}
