import js from "@eslint/js";
import playwright from "eslint-plugin-playwright";
import globals from "globals"; // Импортируем стандартные списки глобальных переменных

export default [
  js.configs.recommended,
  {
    // Применяем правила к тестам и самому конфигурационному файлу Playwright
    files: ['tests/**/*.{js,mjs,cjs}', '**/*.spec.js', 'playwright.config.js', 'playwright.config.ts'],
    ...playwright.configs['flat/recommended'],
    languageOptions: {
      globals: {
        ...globals.node, // Говорим линтеру: «Переменные из Node.js (вроде process) — легальны»
      }
    },
    rules: {
      'playwright/no-focused-test': 'error',
      'no-unused-vars': 'warn',
    },
  },
];
