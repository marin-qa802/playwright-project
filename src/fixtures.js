import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  // переопределяем стандартный request: логирование в консоль + запись покрытия
  request: async ({ playwright }, use) => {
    // pw-radar — ESM-only пакет, а проект CommonJS, поэтому динамический import
    const { recordContext } = await import('pw-radar/playwright');
    const context = await playwright.request.newContext({ ignoreHTTPSErrors: true });
    await use(recordContext(context, { log: 'verbose' }));
    await context.dispose(); // сбрасывает coverage-output
  },
});

export { expect };