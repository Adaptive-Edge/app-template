import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// {{APP_NAME}} - Update base path to match your app's URL path
export default defineConfig({
  base: "/{{APP_SLUG}}/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:{{PORT}}",
        changeOrigin: true,
      },
    },
  },
});
