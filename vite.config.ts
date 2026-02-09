import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

function ignoreStyles() {
  return {
    name: "ignore-styles",
    enforce: "pre" as const,
    resolveId(source: string) {
      if (/\.(css|less|sass|scss)$/.test(source)) return source;
      return null;
    },
    load(id: string) {
      if (/\.(css|less|sass|scss)$/.test(id)) return "export default {}";
      return null;
    },
  };
}

export default defineConfig({
  plugins: [ignoreStyles(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    environmentOptions: {
      jsdom: {
        // This reduces noisy jsdom console output in many cases
        pretendToBeVisual: true,
      },
    },
    setupFiles: "./src/test/setupTests.ts",
  },
});
