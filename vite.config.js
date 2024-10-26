import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "normalize.css/normalize.css";`,
      },
    },
  },
  build: {
    outDir: 'dist', // Ensure your build output is directed to the dist folder
  },
});
