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
//   create reglaments
When("я вижу что нахожусь на странице {string}", (url) => {
  I.seeCurrentUrlEquals(url);
});
// жму Настройки
When(
  "я нажму  на ссылку {string} аттрибут {string} с текстом {string}",
  (a, attr, text) => {
    I.wait(1);
    const element = locate(a).withAttr({ href: attr }).withText(text);
    I.click(element);
    I.wait(2);
  }
);
// страница Справочники
When("я теперь на странице справочники {string}", (text) => {
  I.see(text);
  I.wait(1);
});
// "открыть фильтр
When("я нажму на иконку {string} аттрибут {string}", (span, attr) => {
  I.wait(1);
  const element = locate(span).withAttr({ "aria-label": attr });
  I.click(element);
  I.wait(2);
});
// жму селект
When(
  "я жму селект {string} выпадающего списка {string}",
  (select, elementDiv) => {
    I.wait(1);
    const element = locate(elementDiv).withAttr({ name: select });
    I.click(element);
    I.wait(2);
  }
);
// выбрать по регламенту
When("я выберу {string} из выпадающего списка {string}", (text, elementDiv) => {
  I.wait(1);
  const element = locate(elementDiv).withAttr({ title: text });
  I.click(element);
  I.wait(2);
});
// /settings/регламент
When("я проверю путь {string}", (url) => {
  I.seeCurrentUrlEquals(url);
  I.wait(1);
});
//  кнопка Новый регламент
When("я нажму на кнопку {string}", (button) => {
  I.click(button);
  I.wait(2);
});
// Дравер оупен
When("откроется форма создания регламента {string}", (text) => {
  I.see(text);
  I.wait(1);
});
// введу новое имя регламента
When(
  "в поле название регламента с айди {string} введу текст {string}",
  (fieldName, value) => {
    I.fillField({ id: fieldName }, value);
    I.wait(1);
  }
);
// тематика заявки
When("я нажимаю на селект тематики заявки {string}", (button) => {
  I.click({ id: button });
});
// выберу тематику заявки
When(
  "выберу тематику заявки {string} из списка тематик {string}",
  (text, elementDiv) => {
    const element = locate(elementDiv).withAttr({ title: text });
    I.click(element);
    I.wait(1);
  }
);
// селект компании
When("я нажимаю на селект компании {string}", (button) => {
  I.click({ id: button });
});
// выберу компанию для заявки
When(
  "выберу компанию для заявки {string} из списка компании {string}",
  (text, elementDiv) => {
    const element = locate(elementDiv).withAttr({ title: text });
    I.click(element);
    I.wait(1);
  }
);
// селект отдела
When("я нажимаю на селект отдела {string}", (button) => {
  I.click({ id: button });
});
// выберу отдел для заявки
When(
  "выберу отдел для заявки {string} из списка отделов {string}",
  (text, elementDiv) => {
    const element = locate(elementDiv).withAttr({ title: text });
    I.click(element);
    I.wait(1);
  }
);
// реглам. стандарт
When(
  "в поле стандартный срок с айди {string} введу стандартный срок {string}",
  (fieldName, value) => {
    I.fillField({ id: fieldName }, value);
    I.wait(1);
  }
);
// реглам. средний
When(
  "в поле средний срок с айди {string} введу средний срок {string}",
  (fieldName, value) => {
    I.fillField({ id: fieldName }, value);
    I.wait(1);
  }
);
// реглам. высокий
When(
  "в поле высокий срок с айди {string} введу высокий срок {string}",
  (fieldName, value) => {
    I.fillField({ id: fieldName }, value);
    I.wait(1);
  }
);
// реглам. критично
When(
  "в поле критично срок с айди {string} введу критично срок {string}",
  (fieldName, value) => {
    I.fillField({ id: fieldName }, value);
    I.wait(1);
  }
);
//  кнопка Создать регламент
When("я нажму кнопку с текстом {string}", (button) => {
  I.click(button);
  I.wait(3);
});
// /settings/регламент
When("я далее вернусь на {string}", (url) => {
  I.seeCurrentUrlEquals(url);
  I.wait(1);
});
// появится сообщение
Then("увижу такое сообщение {string}", (text) => {
  // From 'features/register.feature' {'line':12,'column':1}
  I.see(text);
  I.wait(1);
});
