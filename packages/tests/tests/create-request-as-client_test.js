Feature("create-request-as-client");

Scenario("Создание заявки от клиента", ({ I }) => {
  //  вход на сайт HelpDesk
  Given(/^я нахожусь на странице входа "(.*?)"$/, () => {
    // From "features/create-request.feature" {"line":14,"column":5}
    I.amOnPage("/auth");
    I.waitForElement("form", 10);
  });

  When(
    "почта пользователя {string} будет введено в поле с айди {string}",
    (value, fieldName) => {
      // From "features/create-request.feature" {"line":8,"column":5}
      I.fillField({ id: fieldName }, value);
    }
  );
  When(
    "пароль пользователя {string} будет введено в поле с айди {string}",
    (value, fieldName) => {
      // From "features/user-login.feature" {"line":8,"column":5}
      I.fillField({ id: fieldName }, value);
    }
  );
  When("я нажимаю на кнопку с текстом {string}", (button) => {
    // From "features/create-request.feature" {"line":15,"column":5}
    I.click({ id: button });
  });

  When("я жду пока пользователь зайдет в сессию", () => {
    // From "features/create-request.feature" {"line":11,"column":5}
    I.wait(8);
  });
  // ------------------------------------------------------------
  //   новая заявка
  When(/^я нахожусь на странице "(.*?)"$/, () => {
    // From "features/user-register.feature" {"line":5,"column":5}
    I.amOnPage("/appeals");
  });
  When("я нажимаю на кнопку с текстом {string}", (button) => {
    // From "features/user-register.feature" {"line":12,"column":5}
    I.click({ id: button });
  });
  When("я нажимаю на селект тематики {string}", (button) => {
    // From "features/user-register.feature" {"line":12,"column":5}
    I.click({ id: button });
  });
  When(
    "выберу тематику заявки {string} из списка тематик {string}",
    (text, elementDiv) => {
      // From "features/create-request.feature" {"line":16,"column":5}
      I.wait(1);
      const element = locate(elementDiv).withAttr({ name: text });
      I.click(element);
    }
  );

  When("я нажимаю на селект клиента {string}", (button) => {
    // From "features/user-register.feature" {"line":12,"column":5}
    I.click({ id: button });
  });
  When(
    "выберу клиента заявки {string} из списка клиентов {string}",
    (text, elementDiv) => {
      // From "features/create-request.feature" {"line":16,"column":5}
      I.wait(1);
      const element = locate(elementDiv).withAttr({ name: text });
      I.click(element);
    }
  );

  When("я нажимаю на селект статуса {string}", (button) => {
    // From "features/user-register.feature" {"line":12,"column":5}
    I.click({ id: button });
  });
  When(
    "выберу статус заявки {string} из списка статусов {string}",
    (text, elementDiv) => {
      // From "features/create-request.feature" {"line":16,"column":5}
      I.wait(1);
      const element = locate(elementDiv).withAttr({ name: text });
      I.click(element);
    }
  );

  When(
    "введу в поле с заголовка {string} текст {string}",
    (fieldName, value) => {
      // From "features/create-request.feature" {"line":17,"column":5}
      I.fillField({ id: fieldName }, value);
    }
  );

  When("я нажимаю на селект приоритета {string}", (button) => {
    // From "features/user-register.feature" {"line":12,"column":5}
    I.click({ id: button });
  });
  When(
    "выберу приоритет заявки {string} из списка приоритетов {string}",
    (text, elementDiv) => {
      // From "features/create-request.feature" {"line":16,"column":5}
      I.wait(1);
      const element = locate(elementDiv).withAttr({ name: text });
      I.click(element);
    }
  );

  When("введу в поле с айди {string} текст {string}", (fieldName, value) => {
    // From "features/create-request.feature" {"line":19,"column":5}
    I.fillField({ id: fieldName }, value);
  });

  When("я нажимаю на кнопку с текстом {string}", (button) => {
    // From "features/user-register.feature" {"line":12,"column":5}
    I.click({ id: button });
    I.wait(7);
  });

  When(/^меня переместит на страницу"(.*?)"$/, () => {
    // From "features/register.feature" {"line":5,"column":1}
    I.amOnPage("/appeals");
  });

  Then("увижу созданную заявку от {string}", (text) => {
    // From "features/register.feature" {"line":12,"column":1}
    I.see(text);
    I.wait(1);
  });
});
