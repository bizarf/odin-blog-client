import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    base: "/odin-blog-client/",
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./tests/setup.js",
    },
});
