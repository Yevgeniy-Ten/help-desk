const { I } = inject();
// Add in your custom step files

Given("I have a defined step", () => {
  // TODO: replace with your own step
});

Given(/^я нахожусь на главной "(.*?)"$/, () => {
  I.amOnPage("/auth");
  I.wait(5);
});

When("я проверю путь {string}", (url) => {
  I.seeCurrentUrlEquals(url);
  I.wait(1);
});

Then("я вижу окно логина {string}", (text) => {
  I.see(text);
  I.wait(1);
});
