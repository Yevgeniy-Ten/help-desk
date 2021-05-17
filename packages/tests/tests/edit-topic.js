const { I } = inject();
// Add in your custom step files

Given("I have a defined step", () => {
  // TODO: replace with your own step
});
//  login
Given(/^я нахожусь на странице входа "(.*?)"$/, () => {
  I.amOnPage("/auth");
  I.waitForElement("form", 10);
});

When(
  "почта пользователя {string} будет введено в поле с айди {string}",
  (fieldName, value) => {
    I.fillField({ id: fieldName }, value);
  }
);
When(
  "пароль пользователя {string} будет введено в поле с айди {string}",
  (fieldName, value) => {
    I.fillField({ id: fieldName }, value);
  }
);
When("я жму на кнопку с текстом {string}", (button) => {
  I.click(button);
});

When("я жду пока пользователь зайдет в сессию", () => {
  I.wait(3);
});
// ------------------------------------------------------------
//   edit тематика
When("я теперь нахожусь на странице заявок {string}", (url) => {
  I.seeCurrentUrlEquals(url);
});
// жму Настройки
When(
  "я на ссылку нажму {string} аттрибут {string} с текстом {string}",
  (a, attr, text) => {
    I.wait(1);
    const element = locate(a).withAttr({ href: attr }).withText(text);
    I.click(element);
    I.wait(2);
  }
);
// страница Справочники
When("я перемещусь на страницу справочники {string}", (text) => {
  I.see(text);
  I.wait(1);
});
// /settings/topics
When("я проверю путь {string}", (url) => {
  I.seeCurrentUrlEquals(url);
  I.wait(1);
});
// жму редактировать Отчетность
When(
  "я жму ссылку {string} аттрибут {string} с текстом {string}",
  (a, attr, text) => {
    I.wait(1);
    const element = locate(a).withAttr({ href: attr }).withText(text);
    I.click(element);
    I.wait(2);
  }
);
// Дравер оупен
When("откроется форма редактирования тематики {string}", (text) => {
  I.see(text);
  I.wait(1);
});
// редактирование имя тематики
When(
  "в поле редактирования тематики с айди {string} введу текст {string}",
  (fieldName, value) => {
    I.fillField({ id: fieldName }, value);
    I.wait(1);
  }
);
//  тематика. кнопка Обновить
When("я  нажму  кнопку с  текстом {string}", (button) => {
  I.click(button);
  I.wait(3);
});
// /settings/topics
When("я вернусь обратно на страницу {string}", (url) => {
  I.seeCurrentUrlEquals(url);
  I.wait(1);
});
// "Тестовая тематика"
Then("увижу отредактированную тематику {string}", (text) => {
  I.see(text);
  I.wait(1);
});
