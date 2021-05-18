const express = require("express");
const MessageSender = require("./app/mailer/index");
const PORT = process.env.BACK_PORT || 3003;
const passport = require("passport");
const { sequelize } = require("./models");
const middlewares = require("./app/middlewares/appMiddleware.js");

const app = express();
const mainRouter = require("./app/routes/main.router");

middlewares.forEach((middleWare) => app.use(middleWare));
// passport using
require("./passport")(passport);

app.use(passport.initialize());
app.use(passport.session());
app.use(mainRouter);

const start = async () => {
  try {
    // синхронизировать модели, с базой данных
    await sequelize.sync({
      alter: true, // чтобы поля в модели в коде совпадали с моделью в таблице
      force: false, // чтобы удалить таблицу  и потом заново создать её
    });
    // подключение к базе
    await sequelize.authenticate();
    app.listen(PORT, async () => {
      console.log(`${PORT} started server`);
    });
    MessageSender.connect();
  } catch (e) {
    console.log(e);
  }
};
start().catch(console.error);
