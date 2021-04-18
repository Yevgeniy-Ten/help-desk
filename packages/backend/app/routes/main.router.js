const { Router } = require("express");
const userRoute = require("./forUsers/users.router");
const topicsRoute = require("./forTopics/topic.router");
const requestRoute = require("./forRequest/request.router");
const companyRoute = require("./forCompany/company.router");
const departmentRoute = require("./forDepartment/departments.router");
const positionRoute = require("./forPosition/position.router");
const orgStructureRoute = require("./forOrgStructure/orgstructure.router");
const reglamentsRouter = require("./forReglaments/reglaments.router");

const mainRouter = Router();

mainRouter.use("/users", userRoute);
mainRouter.use("/topics", topicsRoute);
mainRouter.use("/requests", requestRoute);
mainRouter.use("/companies", companyRoute);
mainRouter.use("/departments", departmentRoute);
mainRouter.use("/position", positionRoute);
mainRouter.use("/orgstructure", orgStructureRoute);
mainRouter.use("/reglaments", reglamentsRouter);

module.exports = mainRouter;
