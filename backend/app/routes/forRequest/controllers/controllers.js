const { Request, Rules } = require("../../../../models");
module.exports = {
    async create(req, res) {
        try {
            const {
                topicId,
                title,
                description,
            } = req.body;
            const rule = await Rules.findOne({
                where: {
                    id: topicId
                },
                include: ["topicRules", "departmentRules"],
            });
            let deadline = null;
            let departmentId = null;
            if (rule) {
                deadline = rule.dataValues.deadline;
                departmentId = rule.dataValues.departmentId;
            }
            Request.create({
                clientId: req.user.id,
                topicId,
                title,
                description,
                deadline,
                departmentId,
            }).then(newRequest => {
                res.status(201).send(newRequest)
            }).catch(errors => {
                res.status(400).send(errors)
            });
        } catch (errors) {
            res.status(500).send(errors);
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.params
            const request = await Request.findOne({
                where: { id },
                include: ["topic", "department", "clientRequest"],
            });
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
                where: { id },
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
                include: ["topic", "department", "clientRequest"],
            })
            if (!requests.length) return res.sendStatus(404)
            res.send(requests)
        } catch (errors) {
            res.status(500).send(errors);
        }
    }
};
