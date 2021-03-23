const { Request, Rules, User } = require("../../../../models");
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
            // console.log(requests);

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
            // let client_ID = null;
            // let where_ID;
            // const user = await User.findOne({
            //     where: {
            //         id: req.user.id
            //     },
            //     include: ["role", "department"],
            // });
            // console.log(user);
            // if (user) {
            //     if (user.role.dataValues.name === "client") {
            //         where_ID = { where: { clientId: req.user.id }, }
            //         // client_ID = req.user.id
            //     } else {
            //         where_ID = { where: { departmentId: user.department.dataValues.id }, }
            //     }
            // }
            const requests = await Request.findAll({
                // where_ID,
                where: { clientId: req.user.id },
                include: ["topic", "department", "clientRequest"],
            })
            // console.log(requests);
            if (!requests.length) return res.sendStatus(404)
            res.send(requests)
        } catch (errors) {
            res.status(500).send(errors);
        }
    }
};
