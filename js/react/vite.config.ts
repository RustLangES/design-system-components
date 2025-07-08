import { defineConfig } from "vite";
import { extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";

const shouldBuildShowcase = process.env.BUILD_SHOWCASE === "1";

shouldBuildShowcase && console.log("==================\n BUILDING SHOWCASE \n==================");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    !shouldBuildShowcase &&
      dts({
        tsconfigPath: resolve(__dirname, "tsconfig.lib.json"),
      }),
  ],
  resolve: {
    alias: {
      "@rustlanges/react/styles.css": resolve(__dirname, "lib/styles.css"),
      "@rustlanges/react": resolve(__dirname, "lib/index.ts"),
      "@": resolve(__dirname, "./lib"),
    },
  },
  build: shouldBuildShowcase
    ? {}
    : {
        copyPublicDir: false,
        lib: {
          entry: resolve(__dirname, "lib/index.ts"),
          formats: ["es"],
        },
        rollupOptions: {
          external: ["react", "react/jsx-runtime"],
          input: Object.fromEntries(
            // https://rollupjs.org/configuration-options/#input
            glob
              .sync("lib/**/*.{ts,tsx}", {
                ignore: ["lib/**/*.showcase.{ts,tsx}", "lib/**/*.d.ts"],
              })
              .map(file => [
                // 1. The name of the entry point
                // lib/nested/foo.js becomes nested/foo
                relative(
                  "lib",
                  file.slice(0, file.length - extname(file).length)
                ),
                // 2. The absolute path to the entry file
                // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
                fileURLToPath(new URL(file, import.meta.url)),
              ])
          ),
          output: {
            assetFileNames: "assets/[name][extname]",
            entryFileNames: "[name].js",
          },
        },
      },
});
