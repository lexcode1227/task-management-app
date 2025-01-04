import eslintReact from "@eslint-react/eslint-plugin";
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import eslintPluginPrettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintReact.configs.recommended,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react: react,
      import: importPlugin,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      quotes: ["error", "double"],
      "no-unused-vars": "off",
      "prefer-const": "warn",
      "react/prop-types": "off",
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true,
        },
      ],
      "react/jsx-sort-props": "error",
      "no-multi-spaces": "error",
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
        },
      ],
      "import/newline-after-import": ["error", { count: 1 }],
      "prettier/prettier": "error",
      "@eslint-react/naming-convention/component-name": ["error"],
    },
  },
);
