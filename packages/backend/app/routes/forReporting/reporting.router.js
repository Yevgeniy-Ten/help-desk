const { Router } = require("express");
const ReportingControllers = require("./controllers/controllers");

const reportingRouter = Router();

reportingRouter.get("/history", ReportingControllers.getRequestHistory);

module.exports = reportingRouter;
