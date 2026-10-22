import { test, expect } from '@playwright/test';
 
// Переключай форму и перезапускай тест — комментарии ниже объясняют разницу.
// [старая] burger-order.html       (как было, с багами доступности)
// [новая]  burger-order-a11y.html  (fieldset, role="switch", aria-label, dialog)
const FORM = 'burger-order.html';
// const FORM = 'burger-order-a11y.html';
 
test('test', async ({ page }) => {
  await page.goto(`file://${process.cwd()}/${FORM}`);
  // NB: Было: 'file:///Users/sniper/pw8/burger-order.html' — работает только на твоей машине.
  //    process.cwd() — папка, из которой запущен npx playwright test (корень проекта).
 
  await page.getByRole('textbox', { name: 'Имя клиента:' }).click();
  await page.getByRole('textbox', { name: 'Имя клиента:' }).fill('Sniper');
  // [старая] Работает: подпись «Имя клиента:» — с двоеточием.
  // [новая] НЕ работает: подпись «Имя клиента» — без двоеточия, а искомая строка длиннее.
  // Лучше (работает на обеих): { name: 'Имя клиента' } — подстрока без знаков.
  // NB: click() перед fill() лишний — артефакт codegen.
 
  //await page.locator('#customerName').fill('Sniper');
  // [обе] Работает: id не менялся. Но id — деталь реализации.
 
  //await page.locator('.form-group').filter({ hasText: 'Введите ваше имя' }).fill('Sniper');
  // [старая] НЕ работает: hasText видит только текст между тегами, плейсхолдер — атрибут.
  //    И fill() на div всё равно бы не сработал.
  // [новая] НЕ работает по другой причине: класса .form-group там нет, он называется .field.
  //    Редизайн поменял классы — CSS-тест сломался, хотя форма для пользователя та же.
  // Лучше (CSS, старая): .locator('.form-group').filter({ hasText: 'Имя клиента' }).locator('input')
 
  //await page.getByPlaceholder('Введите ваше имя:').fill('Sniper');
  // [обе] НЕ работает: в плейсхолдере нет двоеточия.
  // Лучше: getByPlaceholder('Введите ваше имя') — работает на обеих.
 
  //await page.getByText('Введите ваше имя').fill('Sniper');
  // [обе] НЕ работает: у <input> нет текста между тегами, плейсхолдер — атрибут.
  // Лучше: getByLabel('Имя клиента') — работает на обеих.
 
  await page.locator('[for="burgerType"]').selectOption('cheeseburger');
  // [обе] Работает: Playwright перенаправляет действие с <label> на связанный select.
  // Лучше: getByLabel('Тип бургера').selectOption('cheeseburger')
 
  await page.getByRole('radio', { name: 'Маленький' }).check();
  // [обе] Работает.
  // [новая] Бонус новой формы — скоупинг по группе:
  //    getByRole('group', { name: 'Размер порции' }).getByRole('radio', { name: 'Маленький' })
  //    На старой так нельзя: подпись «Размер порции:» — голый <label>, группы с именем нет.
 
  await page.getByRole('checkbox', { name: 'Горчица' }).check();
  // [обе] Работает.
 
  await page.locator('span').first().click();
  // [обе] Проходит — но случайно: первый span оказывается частью свитча.
  //    Добавят span выше по странице — тест начнёт кликать не туда.
  //    Такие локаторы (span, div:nth-child(3), .first() без фильтра) часто выдаёт codegen,
  //    когда у элемента нет роли и имени. Понятность — нулевая: по коду не угадать,
  //    что это свитч. Стабильность — тоже: зависит от порядка элементов в вёрстке.
  //    Если элемент не находится по роли/подписи — это сигнал о баге доступности,
  //    а не повод брать span.
 
  await page.getByRole('checkbox', { name: 'Да' }).check();
  // [старая] Проходит только благодаря клику по span выше: флажок уже включён, check() ничего не делает.
  //    Без span упадёт: инпут 0×0, кликнуть нельзя. Имя «Да» — баг доступности.
  // [новая] НЕ работает: это больше не checkbox, а switch, и зовут его «Заказ с собой».
  // Лучше (новая): getByRole('switch', { name: 'Заказ с собой' }).check() — без всяких span.
  // Не надо: { force: true } — не решение ни на одной форме.
 
  await page.getByRole('button', { name: '+' }).click();
  // [старая] Работает: имя кнопки — её текст «+».
  // [новая] НЕ работает: aria-label заменяет имя, теперь кнопка — «Увеличить количество».
  //    Скринридер больше не читает «плюс, кнопка» — и тест тоже видит новое имя.
  // Лучше (новая): getByRole('button', { name: 'Увеличить количество' }).click()
  //    Кнопку «−» по имени с дефисом '-' не найти: там символ U+2212.
 
  await page.getByRole('radio', { name: 'Картой онлайн' }).check();
  // [обе] Работает.
 
  await page.getByRole('button', { name: 'Заказать бургер' }).click();
  // [обе] Работает.
 
  await expect(page.locator('#popupMessage')).toContainText('Спасибо за заказ, Любовь!');
  // [обе] НЕ работает: в поле ввели 'Sniper', а ждём 'Любовь'.
  // NB: и это проверка копирайта — ей место в компонентных тестах, не в E2E.
  // Лучше (работает на обеих):
  //    await expect(page.getByRole('heading', { name: 'Заказ принят' })).toBeVisible();
  // Лучше (только новая, диалог с именем):
  //    await expect(page.getByRole('dialog', { name: 'Заказ принят' })).toBeVisible();
  //    На старой попап — просто div без роли, диалога в дереве доступности нет.
});
 