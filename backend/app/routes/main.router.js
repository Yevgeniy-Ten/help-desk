const {Router} = require("express");
const userRouter = require("./forUsers/users.router");
const appealsRoutes = require("./forAppeal/appeal.router")
const mainRouter = Router()

mainRouter.use("/users", userRouter);
// mainRouter.use("/tickets", ticketRouter);
mainRouter.use("/appeals", appealsRoutes);


module.exports = mainRouter;
