const express = require("express");
const auth = require("../../middlewares/auth");
const { create, edit, get, deleteTicket } = require("./controllers/controllers");

const ticketRouter = express.Router();

ticketRouter.post("/",[auth,],create);
ticketRouter.put("/:id",[auth,],edit);
ticketRouter.delete("/:id",[auth],deleteTicket);
ticketRouter.get("/",[auth],get);


module.exports = ticketRouter;
