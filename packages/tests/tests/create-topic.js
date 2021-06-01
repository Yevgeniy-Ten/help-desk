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
//   новая тематика
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
// "Новая тематика"
When("я жму на кнопку с текстом {string}", (button) => {
  I.click(button);
  I.wait(1);
});
// Дравер оупен
When("откроется форма создания тематики {string}", (text) => {
  I.see(text);
  I.wait(1);
});
// имя тематики
When(
  "в поле тематики с айди {string} введу текст {string}",
  (fieldName, value) => {
    I.fillField({ id: fieldName }, value);
    I.wait(1);
  }
);
//  кнопка создать тематику
When("я жму кнопку с текстом {string}", (button) => {
  I.click(button);
  I.wait(3);
});
// /settings/topics
When("меня переместит обратно на страницу {string}", (url) => {
  I.seeCurrentUrlEquals(url);
  I.wait(1);
});
// "Тестовая тематика"
Then("увижу созданную тематику {string}", (text) => {
  // From 'features/register.feature' {'line':12,'column':1}
  I.see(text);
  I.wait(1);
});
