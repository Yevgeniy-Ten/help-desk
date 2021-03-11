const {Router} = require("express");
const userRoute = require("./forUsers/users.router");
const appealsRoute = require("./forAppeal/appeal.router")
const topicsRoute = require("./forTopics/topicRoute")
const ticketsRoute = require("./forTickets/tickets.router")
const mainRouter = Router()

mainRouter.use("/users", userRoute);
mainRouter.use("/topics", topicsRoute);
mainRouter.use("/tickets", ticketsRoute);
mainRouter.use("/appeals", appealsRoute);


module.exports = mainRouter;
