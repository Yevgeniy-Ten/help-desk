const { Router } = require("express");
const userRoute = require("./forUsers/users.router");
const topicsRoute = require("./forTopics/topicRoute");
const requestRoute = require("./forRequest/request.router");
const companyRoute = require("./forCompany/company.router");
const departmentRoute = require("./forDepartment/departments.router");
const rulesRoute = require("./forRules/rules.router");
const mainRouter = Router();

mainRouter.use("/users", userRoute);
mainRouter.use("/topics", topicsRoute);
mainRouter.use("/request", requestRoute);
mainRouter.use("/company", companyRoute);
mainRouter.use("/department", departmentRoute);
mainRouter.use("/rules", rulesRoute);


module.exports = mainRouter;
