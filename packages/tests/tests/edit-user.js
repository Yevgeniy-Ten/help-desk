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
//   edit user
When("я теперь нахожусь на странице заявок {string}", (url) => {
  I.seeCurrentUrlEquals(url);
});
// жму Контакты
When(
  "я жму на ссылку {string} аттрибут {string} с текстом {string}",
  (text, attr, elementDiv) => {
    I.wait(1);
    const element = locate(elementDiv).withAttr({ href: attr }).withText(text);
    I.click(element);
  }
);
// жму редактировать
When(
  "я нажму ссылку {string} аттрибут {string} с текстом {string}",
  (text, attr, elementDiv) => {
    I.wait(1);
    const element = locate(elementDiv).withAttr({ href: attr }).withText(text);
    I.click(element);
    I.wait(1);
  }
);

When("я перемещусь на страницу редактирования и увижу {string}", (text) => {
  I.see(text);
  I.wait(1);
});
// селект "Дополнительная информация"
When("я нажимаю на текст {string}", (button) => {
  I.click(button);
});
// жму селект роли
When("я нажму на селект роль {string}", (button) => {
  I.click({ id: button });
  I.wait(1);
});
// выбор роли админ
When("выберу роль {string} из списка ролей {string}", (text, elementDiv) => {
  I.wait(1);
  const element = locate(elementDiv).withAttr({ title: text });
  I.click(element);
});
// жму Обновить дааные
When("я нажму кнопку с текстом {string}", (button) => {
  I.click(button);
  I.wait(3);
});

When("меня переместит на страницу с таблицей {string}", (url) => {
  I.seeCurrentUrlEquals(url);
  I.wait(1);
});

Then("увижу текст в таблице {string}", (text) => {
  // From 'features/register.feature' {'line':12,'column':1}
  I.wait(1);
  I.see(text);
  I.wait(1);
});
