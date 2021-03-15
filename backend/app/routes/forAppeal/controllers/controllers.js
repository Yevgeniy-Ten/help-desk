const {Appeal} = require("../../../../models");
module.exports = {
    async create(req, res) {
        try {
            const {title, description, topicId, serviceTopicId} = req.body;
            Appeal.create({
                title,
                description,
                userId: req.user.id,
                topicId,
                serviceTopicId
            }).then(newAppeal => {
                res.status(201).send(newAppeal)
            }).catch(errors => {
                res.status(400).send(errors)
            })
        } catch (errors) {
            res.status(500).send(errors);
        }
    },
    async getById(req, res) {
        try {
            const {id} = req.params
            const appeal = await Appeal.findOne({id})
            if (!appeal) return res.sendStatus(404)
            res.send(appeal)
        } catch (errors) {
            res.status(500).send(errors);
        }
    },
    async edit(req, res) {
        try {
            const {id} = req.params
            const appeal = await Appeal.findOne({
                where: {id}
            })
            if (!appeal) return res.sendStatus(404)
            await appeal.update(req.body)
            res.send(appeal)
        } catch (e) {
            res.status(401).send(e);
        }
    },
    async getAll(req, res) {
        try {
            const appeals = await Appeal.findAll({
                where: {
                    userId: req.user.id,
                },
                include: ["topic", "ticket"],
            })
            if (!appeals.length) return res.sendStatus(404)
            res.send(appeals)
        } catch (errors) {
            res.status(500).send(errors);
        }
    }
};
