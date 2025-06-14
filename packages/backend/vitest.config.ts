import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["**/__tests__/**/*.test.ts"],
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["domain/**/*.ts"],
      exclude: ["**/node_modules/**", "**/dist/**"],
    },
  },
});
