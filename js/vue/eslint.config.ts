import { globalIgnores } from "eslint/config";
import { type ConfigArray } from "typescript-eslint";
import globals from "globals";
import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";

export default defineConfigWithVueTs([
  js.configs.recommended,
  globalIgnores(["**/dist"]),
  pluginVue.configs["flat/essential"],
  vueTsConfigs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },

    rules: {
      "no-sparse-arrays": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
    },
  },
]) as ConfigArray;
