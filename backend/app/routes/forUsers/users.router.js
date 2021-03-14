const express = require("express");
const UsersController = require("./controllers/controllers");
const auth = require("../../middlewares/auth")
const userRouter = express.Router();
const passport = require("passport");

userRouter.post("/", UsersController.create);
userRouter.get("/", UsersController.get);
userRouter.patch("/:id", UsersController.get);
userRouter.post("/sessions", passport.authenticate("local-signin"), UsersController.createSessions);
userRouter.delete("/sessions", UsersController.deleteSessions);
// нужно доделать facebook login
// userRouter.post("/facebookLogin", facebookLogin);

module.exports = userRouter;
