const express = require("express")
const PORT = 3003
const {sequelize} = require("./models")
const middlewares = require("./app/middlewares/appMiddleware.js")
const app = express()
const mainRouter = require("./app/routes/main.router");
middlewares.forEach((middleWare) => app.use(middleWare));

// passport using
const session = require("express-session");
const passport = require("passport");
const cookieparser = require("cookie-parser");
app.use(cookieparser())
const SequelizeStore = require("connect-session-sequelize")(session.Store)

app.use(
  session({
    secret: "cat",
    resave: false,
    saveUninitialized: true,
    store:new SequelizeStore({
        db:sequelize
    }),
    cookie:{
        maxAge:24*60*60*1000,
        httpOnly:true,
        domain:"localhost" 
    }
  })
);
require("./passport")(passport);
app.use(passport.initialize());
app.use(passport.session());
// passport using

app.use(mainRouter)
const start = async () => {
    try {
        // синхронизировать модели, с базой данных
        await sequelize.sync({
            alter: true, // чтобы поля в модели в коде совпадали с моделью в таблице
            // force: true, // чтобы удалить таблицу  и потом заново создать её
        })
        // подключение к базе
        await sequelize.authenticate()
        app.listen(PORT, async () => {
            console.log(`${PORT} started server`)
        })
    } catch (e) {
        console.log(e)
    }
}
start().catch(console.error)

