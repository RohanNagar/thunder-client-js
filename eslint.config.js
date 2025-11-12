import js from "@eslint/js";
import stylisticJs from '@stylistic/eslint-plugin-js'
import mochaPlugin from 'eslint-plugin-mocha'

export default [
  js.configs.recommended,
  mochaPlugin.configs.recommended,
  {
    plugins: {
      '@stylistic/js': stylisticJs
    },
    languageOptions: {
      globals: {
        __dirname: "readonly",
        console: "readonly",
        process: "readonly",
        require: "readonly",
        module: "readonly",
      }
    },
    rules: {
      // Allow unused vars in try/catch blocks
      "no-unused-vars": ["error", {caughtErrors: "none"}],

      // Never allow trailing commas on lists
      "@stylistic/js/comma-dangle": ["error", "never"],

      // Align based on key values
      "@stylistic/js/key-spacing": ["error", { "align": "value" }],

      // Max line length should be 120
      "@stylistic/js/max-len": ["error", { "code": 120 }],

      // Allow multiple spaces when declaring requires
      "@stylistic/js/no-multi-spaces": ["error", { "exceptions": { "VariableDeclarator": true } }],

      // Always force spacing between curly braces
      "@stylistic/js/object-curly-spacing": ["error", "always"],
    }
  }
];

