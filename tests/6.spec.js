// 1. Импортируем test и expect ИЗ ФАЙЛА ФИКСТУР (а не из @playwright/test).
// Это обязательно: только так Playwright увидит кастомную фикстуру 'app'.
import { test, expect } from '../src/helpers/fixtures/fixture.js';

// 2. Импортируем UserBuilder. 
// Обратите внимание: это обычный хелпер, а не фикстура.
import { UserBuilder } from '../src/helpers/index.js';


test('Пользователь может зарегистрироваться используя email и пароль ', async ({ app }) => {
    // 3. В аргументах теперь { app }, а не { page }.
    // Фикстура 'app' уже создала фасад внутри себя, тест получил готовый инструмент.
    
    // 4. Создание данных (Генерация объекта в памяти).
    // Это часть теста. UserBuilder создает уникального пользователя.
    const user = new UserBuilder().withEmail().withPassword(12).withName().build();

    // 5. Шаги сценария остаются в тесте!
    // Открытие страницы и регистрация — это не инфраструктура, 
    // а то, что проверяет данный тест. Поэтому мы не прячем их в фикстуру.
    await app.main.open();        // Шаг 1: Открываем сайт
    await app.main.signup();      // Шаг 2: Переходим на форму регистрации
    await app.register.register(user); // Шаг 3: Регистрируем созданного пользователя

    // 6. Проверка (Assert).
    // Проверяем, что в личном кабинете отображается имя НАШЕГО пользователя.
    await expect(app.yourFeed.getProfileName()).toContainText(user.name);
});


// Тест помечен тегом '@fast', чтобы его можно было запускать отдельно (npx playwright test --grep @fast)
test('Еще некий тест на регистрацию', { tag: '@fast' }, async ({ app }) => {
    // Здесь фикстура 'app' создается для этого конкретного теста (Ленивый запуск).
    const user = new UserBuilder().withEmail().withPassword(12).withName().build();

    // Тест полностью независим от предыдущего. 
    // У него свой пользователь и свой чистый 'app'.
    await app.main.open();
    await app.main.signup();
    await app.register.register(user);    

    await expect(app.yourFeed.getProfileName()).toContainText(user.name);
});