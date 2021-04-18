const express = require("express");
const UsersController = require("./controllers/controllers");
const auth = require("../../middlewares/auth");

const userRouter = express.Router();
const passport = require("passport");

userRouter.post("/", UsersController.create);
userRouter.get("/", UsersController.getAll);
userRouter.get("/current", auth, UsersController.getCurrentUser);
userRouter.put("/authorize/:id", UsersController.authorizedUser);
userRouter.put("/:id", auth, UsersController.updateUser);
userRouter.get("/:id", UsersController.getUser); // получение юзера по id
userRouter.post("/sessions", (req, res) => {
  passport.authenticate("local-signin", (err, user, info) => {
    if (info) return res.status(400).send({ ...info });
    UsersController.createSessions(req, res);
  })(req, res);
});
userRouter.delete("/sessions", UsersController.deleteSessions);
// нужно доделать facebook login
// userRouter.post("/facebookLogin", facebookLogin);

module.exports = userRouter;
