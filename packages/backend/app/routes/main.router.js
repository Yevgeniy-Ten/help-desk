const {Router} = require("express");
const userRoute = require("./forUsers/users.router");
const topicsRoute = require("./forTopics/topic.router");
const requestRoute = require("./forRequest/request.router");
const companyRoute = require("./forCompany/company.router");
const departmentRoute = require("./forDepartment/departments.router");
const positionRoute = require("./forPosition/position.router");
const orgStructureRoute = require("./forOrgStructure/orgstructure.router");
const reglamentsRouter = require("./forReglaments/reglaments.router");
const reportingRouter = require("./forReporting/reporting.router");
const chatRouter = require("./forChats/chat.router");
const userRolesRouter = require("./forUserRoles/userRoles");
const mailMessageRouter = require("./forMailMessage/mailMessage.router");
const logRouter = require("./forLogs/logs.router");
const mainRouter = Router();
const auth = require("../middlewares/auth")
const permit = require("../middlewares/permit")

mainRouter.use("/mailmessages", [auth,],
    mailMessageRouter
);
mainRouter.use("/users", userRoute);
mainRouter.use("/topics",  topicsRoute);
mainRouter.use("/requests", auth, requestRoute);
mainRouter.use("/companies",  companyRoute);
mainRouter.use("/departments", departmentRoute);
mainRouter.use("/position", positionRoute);
mainRouter.use("/orgstructure",  orgStructureRoute);
mainRouter.use("/reglaments", auth, reglamentsRouter);
mainRouter.use("/reporting", auth, reportingRouter);
mainRouter.use("/chats", auth, chatRouter);
mainRouter.use("/userRoles", auth, userRolesRouter);
mainRouter.use("/logs", auth, logRouter);

module.exports = mainRouter;
