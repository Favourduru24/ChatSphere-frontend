import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Make sure Vite outputs files to 'dist' (Vercel default)
    outDir: "dist",
    // Ensure relative paths work correctly with Vercel
    assetsDir: "assets",
  },
  base: "/", // important for React Router SPA routing
});
