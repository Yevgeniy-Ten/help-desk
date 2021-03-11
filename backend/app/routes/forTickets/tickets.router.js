const {Router} = require("express");
const auth = require("../../middlewares/auth");
const {create, edit, getAll, deleteTicket} = require("./controllers/controllers");

const ticketRouter = Router();

ticketRouter.post("/", [auth], create);
ticketRouter.put("/:id", [auth], edit);
ticketRouter.delete("/:id", [auth], deleteTicket);
ticketRouter.get("/", [auth], getAll);


module.exports = ticketRouter;
