import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import reactSvgPlugin from "vite-plugin-react-svg";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactSvgPlugin(),
    VitePWA({ workbox: { sourcemap: true } }),
  ],
  server: {
    https: true,
  },
});
