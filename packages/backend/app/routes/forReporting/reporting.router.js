const { Router } = require("express");
const auth = require("../../middlewares/auth");
const ReportingControllers = require("./controllers/controllers");

const reportingRouter = Router();

reportingRouter.get("/history", ReportingControllers.getRequestHistory);


module.exports = reportingRouter;
