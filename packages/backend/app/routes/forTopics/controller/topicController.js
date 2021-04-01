const { Topic, ServicesTopic } = require("../../../../models")

const TopicController = {
    async getTopics(req, res) {
        try {
            const topics = await Topic.findAll()
            if (!topics.length) return res.sendStatus(404)
            res.send(topics)
        } catch (e) {
            res.status(500).json(e)
        }
    },
    // async getTopicServices(req, res) {
    //     const { id: topicId } = req.params
    //     const servicesByTopic = await ServicesTopic.findAll({
    //         where: {
    //             topicId
    //         }
    //     })
    //     if (!servicesByTopic) return res.sendStatus(404)
    //     res.send(servicesByTopic)
    // },
    // async createTopicServices(req, res) {
    //     try {
    //         const { id: topicId } = req.params
    //         const topic = await Topic.findOne({
    //             where: {
    //                 id: topicId
    //             }
    //         })
    //         if (!topic) return res.sendStatus(400)
    //         const { name } = req.body
    //         ServicesTopic.create({ name, topicId }).then(newServiceTopic => {
    //             res.status(201).send(newServiceTopic)
    //         }).catch(errors => {
    //             res.status(400).send(errors)
    //         })
    //     } catch (e) {
    //         res.status(e).send(e)
    //     }
    // },
    async createTopic(req, res) {
        const { title } = req.body
        Topic.create({
            title
        }).then((newTopic) => {
            return res.status(201).send(newTopic)
        }).catch((errors) => {
            res.status(400).send(errors)
        })
    }
}

module.exports = TopicController