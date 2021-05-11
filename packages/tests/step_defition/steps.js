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
//   новый user
When("я нахожусь на странице заявок {string}", (url) => {
  I.seeCurrentUrlEquals(url);
});
// жму контакты
When(
  "я нажимаю на ссылку {string} аттрибут {string} с текстом {string}",
  (a, attr, text) => {
    I.wait(1);
    const element = locate(a).withAttr({ href: attr }).withText(text);
    I.click(element);
    I.wait(1);
  }
);

When("я перемещусь на страницу контакты {string}", (text) => {
  I.wait(2);
  I.see(text);
  I.wait(1);
});
//  кнопка "Создать пользователя"
When("я нажму на кнопку с текстом {string}", (button) => {
  I.click(button);
});
// проверка url
When("я перемещусь на страницу форма создания {string}", (url) => {
  I.seeCurrentUrlEquals(url);
});
// имя
When("введу в поле с айди {string} текст {string}", (fieldName, value) => {
  I.fillField({ id: fieldName }, value);
  I.wait(1);
});
//  фам
When(
  "введу в поле с айдишником {string} текст {string}",
  (fieldName, value) => {
    I.fillField({ id: fieldName }, value);
    I.wait(1);
  }
);
//  мэйл
When(
  "введу в поле email с айди {string} текст {string}",
  (fieldName, value) => {
    I.fillField({ id: fieldName }, value);
    I.wait(1);
  }
);
// тел. номер
When(
  "введу в поле телефон с айди {string} номер {string}",
  (fieldName, value) => {
    I.fillField({ id: fieldName }, value);
    I.wait(1);
  }
);
// выбор компании
When("я нажимаю на селект комапнии {string}", (button) => {
  I.click({ id: button });
});

When(
  "выберу комапнию {string} из списка комапнии {string}",
  (text, elementDiv) => {
    I.wait(1);
    const element = locate(elementDiv).withAttr({ title: text });
    I.click(element);
    I.wait(1);
  }
);
// пароль
When(
  "введу в поле пароля с айди {string} пароль {string}",
  (fieldName, value) => {
    I.fillField({ id: fieldName }, value);
    I.wait(1);
  }
);
//  кнопка создать
When("я нажиму на кнопку с текстом {string}", (button) => {
  I.click(button);
});
// /users
When("меня переместит на страницу {string}", (url) => {
  I.seeCurrentUrlEquals(url);
});

Then("увижу сообщение {string}", (text) => {
  // From 'features/register.feature' {'line':12,'column':1}
  I.see(text);
  I.wait(1);
});
