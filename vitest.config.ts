import { defineConfig } from 'vitest/config';
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // Use Node.js since we're testing APIs
    setupFiles: "./setupTests.ts",
  },
  plugins: [tsconfigPaths(),react()],
});
