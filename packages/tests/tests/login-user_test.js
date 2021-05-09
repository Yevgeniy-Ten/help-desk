Feature("login-user.feature");

Scenario("Успешная авторизация непотвережденного пользователя", ({ I }) => {
  Given(/^я нахожусь на странице "(.*?)"$/, () => {
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
  When("я нажимаю на кнопку с текстом {string}", (button) => {
    I.click(button);
  });
  Then("я вижу текст {string}", (text) => {
    I.see(text);
  });
});
