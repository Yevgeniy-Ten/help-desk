const { Router } = require("express");
const userRoute = require("./forUsers/users.router");
const topicsRoute = require("./forTopics/topic.router");
const requestRoute = require("./forRequest/request.router");
const companyRoute = require("./forCompany/company.router");
const departmentRoute = require("./forDepartment/departments.router");
const rulesRoute = require("./forRules/rules.router");
const mainRouter = Router();

mainRouter.use("/users", userRoute);
mainRouter.use("/topics", topicsRoute);
mainRouter.use("/requests", requestRoute);
mainRouter.use("/companies", companyRoute);
mainRouter.use("/departments", departmentRoute);
mainRouter.use("/rules", rulesRoute);


module.exports = mainRouter;
