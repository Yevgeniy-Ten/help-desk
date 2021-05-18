const { Router } = require("express");
const auth = require("../../middlewares/auth");
const permit = require("../../middlewares/permit");
const mailController = require("./controller");

const mailMessageRouter = Router();

mailMessageRouter.get("/", [auth, permit("admin")], mailController.getAll);
mailMessageRouter.post(
  "/:id",
  [auth, permit("admin")],
  mailController.editTemplateMessage
);

module.exports = mailMessageRouter;
