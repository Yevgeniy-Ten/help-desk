const { Request, Rules } = require("../../../../models");
module.exports = {
    async create(req, res) {
        try {
            const {
                topicId,
                clientId,
                title,
                description,
            } = req.body;
            const rules = await Rules.findOne({
                where: {
                    id: topicId
                }
            });
            if (rules) {
                Request.create({
                    clientId,
                    topicId,
                    title,
                    description,
                    deadline: rules.deadline,
                }).then(newRequest => {
                    res.status(201).send(newRequest)
                }).catch(errors => {
                    res.status(400).send(errors)
                });
            }
        } catch (errors) {
            res.status(500).send(errors);
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.params
            const request = await Request.findOne({ id })
            if (!request) return res.sendStatus(404)
            res.send(request)
        } catch (errors) {
            res.status(500).send(errors);
        }
    },
    async edit(req, res) {
        try {
            const { id } = req.params
            const request = await Request.findOne({
                where: { id }
            })
            if (!request) return res.sendStatus(404)
            await request.update(req.body)
            res.send(request)
        } catch (e) {
            res.status(401).send(e);
        }
    },
    async getAll(req, res) {
        try {
            const requests = await Request.findAll({
                where: {
                    userId: req.user.id,
                },
                include: ["topic", "employee", "client"],
            })
            if (!requests.length) return res.sendStatus(404)
            res.send(requests)
        } catch (errors) {
            res.status(500).send(errors);
        }
    }
};
