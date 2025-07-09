import globals from "globals";
import { globalIgnores } from "eslint/config";
import js from "@eslint/js";
import ts from "typescript-eslint";

export default ts.config([
  js.configs.recommended,
  ts.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },

    rules: {
      "no-sparse-arrays": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^h$|^_",
        },
      ],
    },
  },
  globalIgnores(["**/dist"]),
]);
