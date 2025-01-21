import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          radix: ["@radix-ui/react-dropdown-menu", "@radix-ui/react-tooltip", "@radix-ui/react-toast", "@radix-ui/react-slider"],
          utils: ["class-variance-authority", "tailwind-merge", "cmdk"]
        }
      }
    }
  }
});