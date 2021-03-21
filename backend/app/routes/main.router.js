const { Router } = require("express");
const userRoute = require("./forUsers/users.router");
const topicsRoute = require("./forTopics/topicRoute");
const ticketsRoute = require("./forTickets/tickets.router");
const companyRoute = require("./forCompany/company.router");
const mainRouter = Router();

mainRouter.use("/users", userRoute);
mainRouter.use("/topics", topicsRoute);
mainRouter.use("/tickets", ticketsRoute);
mainRouter.use("/company", companyRoute);


module.exports = mainRouter;
