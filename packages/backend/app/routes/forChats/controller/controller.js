const events = require("events")

const emitter = new events.EventEmitter();
const chatController = {
    async getChatMessages(req, res) {

        emitter.once("newMessage", (message) => {
            res.json(message)
        })
    },
    async createMessage(req, res) {
        const message = req.body
        emitter.emit("newMessage", message)
        res.sendStatus(200)
    }
}

module.exports = chatController;
