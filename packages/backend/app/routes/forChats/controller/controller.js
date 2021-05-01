const events = require("events");
const { Chat } = require("../../../../models");

const emitter = new events.EventEmitter();
const chatController = {
  async getChatMessages(req, res) {
    const { requestId } = req.query;
    try {
      const chats = await Chat.findAll({
        where: { requestId },
      });
      res.send(chats);
    } catch (error) {
      res.status(500).send(errors);
    }
  },
  async getChatMessage(req, res) {
    const { requestId } = req.query;
    emitter.once("newMessage", (newMessage) => {
      if (requestId === newMessage.requestId) {
        res.send(newMessage);
      }
    });
  },
  async createMessage(req, res) {
    const { requestId } = req.query;
    const { message } = req.body;
    try {
      if (req.user.roleId !== 2) {
        Chat.create({
          employeeId: req.user.id,
          requestId,
          message,
        })
          .then((newMessage) => {
            emitter.emit("newMessage", newMessage);
          })
          .catch((errors) => {
            res.status(400).send(errors);
          });
      } else {
        Chat.create({
          clientId: req.user.id,
          requestId,
          message,
        })
          .then((newMessage) => {
            emitter.emit("newMessage", newMessage);
          })
          .catch((errors) => {
            res.status(400).send(errors);
          });
      }
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(errors);
    }
  },
};

module.exports = chatController;
