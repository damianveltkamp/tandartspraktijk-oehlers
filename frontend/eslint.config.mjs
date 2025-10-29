import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylisticTypeChecked,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: ["**/node_modules/**", "eslint.config.js"],
  },
  {
    plugins: {
      perfectionist,
    },
    rules: {
      "@typescript-eslint/array-type": [
        "error",
        {
          default: "array-simple",
        },
      ],
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/no-misused-promises": [
        2,
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/no-unnecessary-condition": [
        "error",
        {
          allowConstantLoopConditions: true,
        },
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "perfectionist/sort-array-includes": ["warn"],
      "perfectionist/sort-exports": ["warn"],
      "perfectionist/sort-named-exports": ["warn"],
      "perfectionist/sort-named-imports": ["warn"],
      "perfectionist/sort-interfaces": ["warn", { newlinesBetween: "never" }],
      "perfectionist/sort-jsx-props": "off",
      "perfectionist/sort-object-types": ["warn", { newlinesBetween: "never" }],
      "perfectionist/sort-union-types": ["warn", { newlinesBetween: "never" }],
    },
    settings: {
      perfectionist: {
        type: "alphabetical",
        partitionByComment: true,
      },
    },
    linterOptions: { reportUnusedDisableDirectives: true },
    languageOptions: { parserOptions: { projectService: true } },
  },
);
