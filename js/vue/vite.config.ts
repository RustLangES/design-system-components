import { defineConfig } from "vite";
import { extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";

const shouldBuildShowcase = process.env.BUILD_SHOWCASE === "1";

if (shouldBuildShowcase) {
  console.log("==================\n BUILDING SHOWCASE \n==================");
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    !shouldBuildShowcase &&
      dts({
        tsconfigPath: resolve(__dirname, "tsconfig.app.json"),
      }),
  ],
  resolve: {
    alias: {
      "@rustlanges/vue/styles.css": resolve(__dirname, "lib/styles.css"),
      "@rustlanges/vue": resolve(__dirname, "lib/index.ts"),
      "@rustlanges/showcase/vue": resolve(__dirname, "../showcase/dist/vue/index.js"),
      "@rustlanges/showcase/styles.css": resolve(__dirname, "../showcase/dist/styles.css"),
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
          external: ["vue"],
          input: Object.fromEntries(
            // https://rollupjs.org/configuration-options/#input
            glob
              .sync("lib/**/*.{ts,vue}", {
                ignore: [
                  "lib/**/*.showcase.{ts,vue}",
                  "lib/**/*.d.ts",
                  "lib/showcases.ts",
                ],
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
