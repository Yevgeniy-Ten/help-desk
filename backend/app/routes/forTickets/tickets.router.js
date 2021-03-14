const {Router} = require("express");
const auth = require("../../middlewares/auth");
const TicketController = require("./controllers/controllers");

const ticketRouter = Router();

ticketRouter.post("/", [auth], TicketController.create);
ticketRouter.post("/:id/tasks", [auth], TicketController.createTasks);
ticketRouter.put("/:id", [auth], TicketController.edit);
ticketRouter.delete("/:id", [auth], TicketController.deleteTicket);
ticketRouter.get("/", [auth], TicketController.getAll);
ticketRouter.get("/:id", [auth], TicketController.getById);


module.exports = ticketRouter;
