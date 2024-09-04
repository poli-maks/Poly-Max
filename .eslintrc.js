module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  plugins: [
    "react",
    "@typescript-eslint",
    "react-hooks",
    "eslint-plugin-import-helpers",
    // 'testing-library'
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  rules: {
    "react-hooks/rules-of-hooks": 2,
    "react-hooks/exhaustive-deps": 1,
    "newline-before-return": 2,
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
    "import-helpers/order-imports": [
      2,
      {
        newlinesBetween: "always",
        groups: [
          ["/^next/", "module"],
          "/^@/styles/",
          "/^@/components/",
          "/^@/lib/",
          ["parent", "sibling", "index"],
        ],
        alphabetize: {
          order: "asc",
          ignoreCase: true,
        },
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      2,
      {
        argsIgnorePattern: "^_",
      },
    ],
    "no-console": [
      2,
      {
        allow: ["warn", "error"],
      },
    ],
    "prettier/prettier": [
      "error",
      {
        useTabs: true,
        singleQuote: true,
        tabWidth: 2,
        endOfLine: "auto",
      },
    ],
  },
  overrides: [
    {
      // Disable ESLint and Prettier for specific files
      files: ["app/[lang]/catalog/[...id]/page.tsx", "app/lib/interfaces.ts"],
      rules: {
        "prettier/prettier": "off",
        "react-hooks/rules-of-hooks": "off",
        "react-hooks/exhaustive-deps": "off",
        "newline-before-return": "off",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "import-helpers/order-imports": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "no-console": "off",
      },
    },
  ],
};
