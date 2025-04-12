// vite.config.ts
import { defineConfig } from "file:///C:/Users/TIBU/adridev-portfolio/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/TIBU/adridev-portfolio/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { viteStaticCopy } from "file:///C:/Users/TIBU/adridev-portfolio/node_modules/vite-plugin-static-copy/dist/index.js";
import viteImagemin from "file:///C:/Users/TIBU/adridev-portfolio/node_modules/vite-plugin-imagemin/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\TIBU\\adridev-portfolio";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  plugins: [
    react(),
    viteImagemin({
      gifsicle: { optimizationLevel: 3 },
      optipng: { optimizationLevel: 5 },
      mozjpeg: { quality: 75 },
      pngquant: { quality: [0.65, 0.9], speed: 4 },
      svgo: {
        plugins: [
          { removeViewBox: false },
          { removeEmptyAttrs: false }
        ]
      }
    }),
    viteStaticCopy({
      targets: [
        {
          src: "./public/og-image.png",
          dest: "images"
        },
        {
          src: "./public/favicon.ico",
          dest: "images"
        }
      ]
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        }
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxUSUJVXFxcXGFkcmlkZXYtcG9ydGZvbGlvXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxUSUJVXFxcXGFkcmlkZXYtcG9ydGZvbGlvXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9USUJVL2FkcmlkZXYtcG9ydGZvbGlvL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgdml0ZVN0YXRpY0NvcHkgfSBmcm9tICd2aXRlLXBsdWdpbi1zdGF0aWMtY29weSc7XHJcbmltcG9ydCB2aXRlSW1hZ2VtaW4gZnJvbSAndml0ZS1wbHVnaW4taW1hZ2VtaW4nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcclxuICBzZXJ2ZXI6IHtcclxuICAgIGhvc3Q6IFwiOjpcIixcclxuICAgIHBvcnQ6IDgwODAsXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCI6IFwiKlwiLFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIHZpdGVJbWFnZW1pbih7XHJcbiAgICAgIGdpZnNpY2xlOiB7IG9wdGltaXphdGlvbkxldmVsOiAzIH0sXHJcbiAgICAgIG9wdGlwbmc6IHsgb3B0aW1pemF0aW9uTGV2ZWw6IDUgfSxcclxuICAgICAgbW96anBlZzogeyBxdWFsaXR5OiA3NSB9LFxyXG4gICAgICBwbmdxdWFudDogeyBxdWFsaXR5OiBbMC42NSwgMC45XSwgc3BlZWQ6IDQgfSxcclxuICAgICAgc3Znbzoge1xyXG4gICAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICAgIHsgcmVtb3ZlVmlld0JveDogZmFsc2UgfSxcclxuICAgICAgICAgIHsgcmVtb3ZlRW1wdHlBdHRyczogZmFsc2UgfVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgICB2aXRlU3RhdGljQ29weSh7XHJcbiAgICAgIHRhcmdldHM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzcmM6ICcuL3B1YmxpYy9vZy1pbWFnZS5wbmcnLFxyXG4gICAgICAgICAgZGVzdDogJ2ltYWdlcydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNyYzogJy4vcHVibGljL2Zhdmljb24uaWNvJyxcclxuICAgICAgICAgIGRlc3Q6ICdpbWFnZXMnXHJcbiAgICAgICAgfSxcclxuICAgICAgXVxyXG4gICAgfSlcclxuICBdLmZpbHRlcihCb29sZWFuKSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBtYW51YWxDaHVua3M6IChpZCkgPT4ge1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3ZlbmRvcic7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF1UixTQUFTLG9CQUFvQjtBQUNwVCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsc0JBQXNCO0FBQy9CLE9BQU8sa0JBQWtCO0FBSnpCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsK0JBQStCO0FBQUEsSUFDakM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixhQUFhO0FBQUEsTUFDWCxVQUFVLEVBQUUsbUJBQW1CLEVBQUU7QUFBQSxNQUNqQyxTQUFTLEVBQUUsbUJBQW1CLEVBQUU7QUFBQSxNQUNoQyxTQUFTLEVBQUUsU0FBUyxHQUFHO0FBQUEsTUFDdkIsVUFBVSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxPQUFPLEVBQUU7QUFBQSxNQUMzQyxNQUFNO0FBQUEsUUFDSixTQUFTO0FBQUEsVUFDUCxFQUFFLGVBQWUsTUFBTTtBQUFBLFVBQ3ZCLEVBQUUsa0JBQWtCLE1BQU07QUFBQSxRQUM1QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELGVBQWU7QUFBQSxNQUNiLFNBQVM7QUFBQSxRQUNQO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsRUFBRSxPQUFPLE9BQU87QUFBQSxFQUNoQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjLENBQUMsT0FBTztBQUNwQixjQUFJLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFDL0IsbUJBQU87QUFBQSxVQUNUO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
