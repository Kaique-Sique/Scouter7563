// ESLint flat config for the Next.js app.
// Combines Next's core-web-vitals rules with its TypeScript rules,
// then re-declares the ignore list (needed because passing our own
// `globalIgnores` here replaces, rather than merges with, the
// defaults baked into `eslint-config-next`).
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
