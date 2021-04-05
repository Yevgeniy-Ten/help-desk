const { Topic, Rules, ServicesTopic } = require("../../../../models")

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
    async editTopic(req, res) {
        try {
            const { id } = req.params
            const topic = await Topic.findOne({
                where: {
                    id
                }
            })
            if (!topic) return res.sendStatus(404)
            await topic.update(req.body)
            res.send(topic)
        } catch (e) {
            res.status(401).send(e);
        }
    },
    async createTopic(req, res) {
        const titleCopy = 'Регламент';
        // const rulesArr = [
        //     {

        // }]
        const { title } = req.body;
        Topic.create({
            title
        }).then((newTopic) => {
            // Rules.create({
            //     topicId: newTopic.dataValues.id,
            //     priority: "Стандартно",
            //     title: titleCopy,
            //     deadline: 24,
            //     // departmentId: 0,
            // })
            // Rules.create({
            //     topicId: newTopic.dataValues.id,
            //     priority: "Средний",
            //     title: titleCopy,
            //     deadline: 16,
            //     // departmentId: 0,
            // })
            // Rules.create({
            //     topicId: newTopic.dataValues.id,
            //     priority: "Срочно",
            //     title: titleCopy,
            //     deadline: 8,
            //     // departmentId: 0,
            // })
            // Rules.create({
            //     topicId: newTopic.dataValues.id,
            //     priority: "Критично",
            //     title: titleCopy,
            //     deadline: 4,
            //     // departmentId: 0,
            // })
            return res.status(201).send(newTopic)
        }).catch((errors) => {
            res.status(400).send(errors)
        })
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
}

module.exports = TopicController