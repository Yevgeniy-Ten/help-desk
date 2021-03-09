const express = require("express");
const UsersController = require("./controllers/controllers");
const auth = require("../../middlewares/auth")
const userRouter = express.Router();

userRouter.post("/", UsersController.create);
userRouter.get("/", UsersController.get);
userRouter.post("/sessions", UsersController.createSessions);
userRouter.delete("/sessions", auth, UsersController.deleteSessions);
// нужно доделать facebook login
// userRouter.post("/facebookLogin", facebookLogin);

module.exports = userRouter;
