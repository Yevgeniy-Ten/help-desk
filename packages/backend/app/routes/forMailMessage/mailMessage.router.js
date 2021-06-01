const { Router } = require("express");
const auth = require("../../middlewares/auth");
const permit = require("../../middlewares/permit");
const mailController = require("./controller");

const mailMessageRouter = Router();

mailMessageRouter.get("/", [auth], mailController.getAll);
mailMessageRouter.put(
  "/:id",
  [auth],
  mailController.editTemplateMessage
);

module.exports = mailMessageRouter;
