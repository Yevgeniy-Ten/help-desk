const { I } = inject();
// Add in your custom step files

Given("I have a defined step", () => {
  // TODO: replace with your own step
});

Given(/^я нахожусь на странице входа "(.*?)"$/, () => {
  I.amOnPage("/auth");
  I.waitForElement("form", 10);
});

When(
  "почта пользователя {string} будет введено в поле с айди {string}",
  (value, fieldName) => {
    I.fillField({ id: fieldName }, value);
  }
);
When(
  "пароль пользователя {string} будет введено в поле с айди {string}",
  (value, fieldName) => {
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
//   новая заявка
When("я нахожусь на странице {string}", (url) => {
  I.seeCurrentUrlEquals(url);
});
When("я нажимаю кнопку с текстом {string}", (button) => {
  I.click(button);
});
When("я нажимаю на селект тематики {string}", (button) => {
  I.click({ id: button });
});
When(
  "выберу тематику заявки {string} из списка тематик {string}",
  (text, elementDiv) => {
    I.wait(1);
    const element = locate(elementDiv).withAttr({ title: text });
    I.click(element);
  }
);

When("я нажимаю на селект клиента {string}", (button) => {
  // From 'features/user-register.feature' {'line':12,'column':5}
  I.click({ id: button });
});
When(
  "выберу клиента заявки {string} из списка клиентов {string} с классом {string}",
  (text, elementDiv) => {
    I.wait(1);
    const element = locate(elementDiv).withAttr({ name: text });
    I.click(element);
    I.wait(1);
  }
);

When("я нажимаю на селект статуса {string}", (button) => {
  // From 'features/user-register.feature' {'line':12,'column':5}
  I.click({ id: button });
});
When(
  "выберу статус заявки {string} из списка статусов {string}",
  (text, elementDiv) => {
    // From 'features/create-request.feature' {'line':16,'column':5}
    I.wait(1);
    const element = locate(elementDiv).withAttr({ title: text });
    I.click(element);
    I.wait(1);
  }
);

When("введу в поле заголовка {string} текст {string}", (fieldName, value) => {
  // From 'features/create-request.feature' {'line':17,'column':5}
  I.fillField({ id: fieldName }, value);
  I.wait(1);
});

When("я нажимаю на селект приоритета {string}", (button) => {
  // From 'features/user-register.feature' {'line':12,'column':5}
  I.click({ id: button });
});
When(
  "выберу приоритет заявки {string} из списка приоритетов {string}",
  (text, elementDiv) => {
    // From 'features/create-request.feature' {'line':16,'column':5}
    I.wait(1);
    const element = locate(elementDiv).withAttr({ title: text });
    I.click(element);
    I.wait(1);
  }
);

When("введу в поле с айди {string} текст {string}", (fieldName, value) => {
  // From 'features/create-request.feature' {'line':19,'column':5}
  I.fillField({ id: fieldName }, value);
});

When("я нажимаю на кнопку с текстом {string}", (button) => {
  // From 'features/user-register.feature' {'line':12,'column':5}
  I.click(button);
  I.wait(4);
});

When("меня переместит на страницу {string}", (url) => {
  I.seeCurrentUrlEquals(url);
});

Then("увижу созданную заявку от {string}", (text) => {
  // From 'features/register.feature' {'line':12,'column':1}
  I.see(text);
  I.wait(1);
});
