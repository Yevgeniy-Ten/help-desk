const { I } = inject();
// Add in your custom step files

Given("I have a defined step", () => {
  // TODO: replace with your own step
});

Given(/^я нахожусь на странице "(.*?)"$/, () => {
  I.amOnPage("/auth/register");
  I.waitForElement("form", 10);
});
When(
  "ввожу имя пользователя {string} в поле с айдишником {string}",
  (value, fieldName) => {
    I.fillField({ id: fieldName }, value);
  }
);
When(
  "ввожу фамилию пользователя {string} в поле с айди {string}",
  (value, fieldName) => {
    I.fillField({ id: fieldName }, value);
  }
);
When(
  "почта пользователя {string} будет введено в поле с айди {string}",
  (value, fieldName) => {
    I.fillField({ id: fieldName }, value);
  }
);
When(
  "введу телефон пользователя {string} в поле  с айди {string}",
  (value, fieldName) => {
    I.fillField({ id: fieldName }, value);
  }
);

When("нажму селект компании {string}", (button) => {
  I.click({ id: button });
  I.wait(1);
});
When(
  "выберу компанию {string} из списка компаний {string}",
  (text, elementDiv) => {
    I.wait(1);
    const element = locate(elementDiv).withAttr({ title: text });
    I.click(element);
  }
);

When(
  "придумав пароль пользователя к примеру {string} введу его в поле с айди {string}",
  (value, fieldName) => {
    I.fillField({ id: fieldName }, value);
  }
);

When("я нажимаю на кнопку с текстом {string}", (button) => {
  I.click(button);
  I.wait(1);
});

Then('я вижу текст {string} об успешной регистрации!"', (text) => {
  I.see(text);
});
