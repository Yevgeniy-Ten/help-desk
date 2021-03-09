const express = require("express")
const PORT = 3003
const {sequelize} = require("./models")
const middlewares = require("./app/middlewares/appMiddleware.js")
const app = express()
const mainRouter = require("./app/routes/main.router");
middlewares.forEach((middleWare) => app.use(middleWare));
app.use(mainRouter)
const start = async () => {
    try {

        await sequelize.sync({
            alter: true, // чтобы поля в модели в коде совпадали с моделью в таблице
            // force: true, // чтобы удалить таблицу  и потом заново создать её
        })
        await sequelize.authenticate()
        app.listen(PORT, async () => {
            console.log(`${PORT} started server`)
        })
    } catch (e) {
        console.log(e)
    }
}
start().catch(console.error)

