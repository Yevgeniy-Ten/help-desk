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
//   edit reglaments
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
// жму цифру 3, пагинация в таблице
When(
  "я нажму кнопку {string} аттрибут {string} с текстом {string}",
  (a, attr, text) => {
    I.wait(1);
    const element = locate(a).withAttr({ href: attr }).withText(text);
    I.click(element);
    I.wait(1);
  }
);
// жму редактировать регламент по id
When(
  "я  жму ссылку {string} с id {string} и с текстом {string}",
  (a, id, text) => {
    I.wait(1);
    const element = locate(a).withAttr({ id: id }).withText(text);
    I.click(element);
    I.wait(1);
  }
);
// Дравер оупен
When("откроется форма редактирования регламента {string}", (text) => {
  I.see(text);
  I.wait(1);
});
// edit имя регламента
When(
  "в поле название с айди {string} введу текст {string}",
  (fieldName, value) => {
    I.fillField({ id: fieldName }, value);
    I.wait(1);
  }
);
// edit темы регламента
When("в поле темы с айди {string} введу текст {string}", (fieldName, value) => {
  I.fillField({ id: fieldName }, value);
  I.wait(1);
});
// реглам. стандарт
When(
  "в поле стандартный срок с айди {string} введу текст {string}",
  (fieldName, value) => {
    I.fillField({ id: fieldName }, value);
    I.wait(1);
  }
);
// реглам. средний
When(
  "в поле средний срок с айди {string} введу текст {string}",
  (fieldName, value) => {
    I.fillField({ id: fieldName }, value);
    I.wait(1);
  }
);
// реглам. высокий
When(
  "в поле высокий срок с айди {string} введу текст {string}",
  (fieldName, value) => {
    I.fillField({ id: fieldName }, value);
    I.wait(1);
  }
);
// реглам. критично
When(
  "в поле критично срок с айди {string} введу текст {string}",
  (fieldName, value) => {
    I.fillField({ id: fieldName }, value);
    I.wait(1);
  }
);
//  кнопка Обновить регламент
When("я жму кнопку с текстом {string}", (button) => {
  I.click(button);
  I.wait(3);
});
// /settings/компании
When("меня переместит на {string}", (url) => {
  I.seeCurrentUrlEquals(url);
  I.wait(1);
});
// "Регламент Тестовый"
Then("увижу отредактированный регламент {string}", (text) => {
  // From 'features/register.feature' {'line':12,'column':1}
  I.see(text);
  I.wait(1);
});
