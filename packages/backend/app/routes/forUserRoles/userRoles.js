const express = require("express");
const UserRoleController = require("./controllers.js/controllers");

const userRolesRouter = express.Router();



userRolesRouter.get("/", UserRoleController.getAll);


module.exports = userRolesRouter;
