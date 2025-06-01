import globals from "globals";
import { globalIgnores } from "eslint/config";
import reactRefresh from "eslint-plugin-react-refresh";
import reactHooks from "eslint-plugin-react-hooks";
import js from "@eslint/js";
import ts from "typescript-eslint";

export default ts.config([
  js.configs.recommended,
  ts.configs.recommended,
  reactHooks.configs["recommended-latest"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      "react-refresh": reactRefresh,
    },

    rules: {
      "no-sparse-arrays": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "react-refresh/only-export-components": ["warn", {
        allowConstantExport: true,
      }],
    },
  },
  globalIgnores(["**/dist"]),
]);
