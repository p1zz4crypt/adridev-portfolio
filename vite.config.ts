import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: './public/og-image.png',
          dest: 'images'
        },
        {
          src: './public/favicon.ico',
          dest: 'images'
        },
      ]
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  }
}));