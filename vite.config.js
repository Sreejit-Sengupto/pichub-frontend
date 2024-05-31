import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  // server: {
  //   proxy: {
  //     "/api": "http://localhost:8080",
  // //     "api": {
  // //       target: "https://pichub-backend-tlwt.onrender.com/",
  // //       changeOrigin: true,
  // //       secure: false,
  // //     },
  //   },
  // },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
