const {Topic} = require("../../../../models")

const TopicController = {
    async getTopics(req, res) {
        try {
            const topics = await Topic.findAll()
            if (!topics.length) res.sendStatus(404)
            res.send(topics)
        } catch (e) {
            res.status(500).json(e)
        }
    },
    async createTopic(req, res) {
        const {name} = req.body
        Topic.create({
            name
        }).then((newTopic) => {
            res.status(201).send(newTopic)
        }).catch((errors) => {
            res.status(400).send(errors)
        })
    }
}

module.exports = TopicController