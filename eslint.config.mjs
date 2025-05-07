import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  // Next.js and TypeScript recommended rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "**/node_modules/**",
      ".next/**",
      "dist/**",
      "build/**"
    ]
  },
  // Custom rule to enforce spacing before function parens
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    rules: {
      "space-before-function-paren": ["error", {
        anonymous: "always",
        named: "always",
        asyncArrow: "always"
      }]
    }
  },
]

export default eslintConfig
