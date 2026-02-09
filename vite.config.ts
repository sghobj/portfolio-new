import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
