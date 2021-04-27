const express = require("express");
const chatContrroler = require("./controller/controller")
const auth = require("../../middlewares/auth");

const chatRouter = express.Router();
chatRouter.get("/", auth, chatContrroler.getChatMessages);
chatRouter.get("/message", auth, chatContrroler.getChatMessage);
chatRouter.post("/", auth, chatContrroler.createMessage);

module.exports = chatRouter;
