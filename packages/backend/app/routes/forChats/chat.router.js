const express = require("express");
const chatContrroler = require("./controller/controller")
const auth = require("../../middlewares/auth");

const chatRouter = express.Router();
chatRouter.get("/:id", auth, chatContrroler.getChatMessages);
chatRouter.post("/", auth, chatContrroler.createMessage);

module.exports = chatRouter;
