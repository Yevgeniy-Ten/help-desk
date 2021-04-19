const express = require("express");

const PORT = process.env.BACK_PORT || 3003;
const passport = require("passport");
const { sequelize } = require("./models");
const middlewares = require("./app/middlewares/appMiddleware.js");

const g = "sadasd";
const app = express();
const mainRouter = require("./app/routes/main.router");

middlewares.forEach((middleWare) => app.use(middleWare));
// passport using
require("./passport")(passport);

app.use(passport.initialize());
app.use(passport.session({
    cookie: {
      secret: "some-key",
      resave: false,
      saveUninitialized: false,
      secure: false,
    },
  }));
app.use(mainRouter);

const start = async () => {
  try {
    // синхронизировать модели, с базой данных
    await sequelize.sync({
      alter: true, // чтобы поля в модели в коде совпадали с моделью в таблице
      // force: true, // чтобы удалить таблицу  и потом заново создать её
    });
    // подключение к базе
    await sequelize.authenticate();
    app.listen(PORT, async () => {
      console.log(`${PORT} started server`);
    });
  } catch (e) {
    console.log(e);
  }
};
start().catch(console.error);
