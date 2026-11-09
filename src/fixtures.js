import { test as base, expect } from '@playwright/test';
import { Api } from './services/api.js';

export const test = base.extend({
  // api-фасад поверх request-контекста, обёрнутого pw-radar (логи + покрытие)
  api: async ({ playwright }, use) => {
    // pw-radar — ESM-only, проект CommonJS → динамический import
    const { recordContext } = await import('pw-radar/playwright');
    const context = await playwright.request.newContext({ ignoreHTTPSErrors: true });
    await use(new Api(recordContext(context, { log: 'verbose' })));
    await context.dispose(); // сбрасывает coverage-output
  },
});

export { expect };