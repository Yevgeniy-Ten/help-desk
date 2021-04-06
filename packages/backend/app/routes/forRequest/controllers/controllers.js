const { Request, Rules, User } = require("../../../../models");
module.exports = {
    async create(req, res) {
        try {
            let {
                clientId,
                topicId,
                priority,
                status,
                title,
                description,
            } = req.body;
            let copmanyId = null;
            //сотрудник создал заявку от имени клиента
            if (clientId) {
                const client = await User.findOne({
                    where: {
                        id: clientId
                    },
                });
                copmanyId = client.dataValues.companyId;
            }
            //клиент или сотрудник создал заявку от своего имени
            if (!clientId) {
                if (req.user.dataValues.companyId) {
                    copmanyId = req.user.dataValues.companyId;
                }
            }
            const rule = await Rules.findOne({
                where: {
                    topicId: topicId,
                    priority: priority,
                    copmanyId: copmanyId
                },
            });
            let deadline = null;
            let departmentId = null;
            if (rule) {
                deadline = rule.dataValues.deadline;
                departmentId = rule.dataValues.departmentId;
            }
            if (!rule) {
                const ruleCopy = await Rules.findOne({
                    where: {
                        topicId: topicId,
                        priority: priority,
                        copmanyId: null
                    },
                });
                if (!ruleCopy) {
                    return res.status(404).send({ message: "Обратитесь к поставщику услуг, по регламентам" })
                }
                if (ruleCopy) {
                    deadline = ruleCopy.dataValues.deadline;
                    departmentId = ruleCopy.dataValues.departmentId;
                }
            }
            Request.create({
                clientId: clientId ? clientId : req.user.id,
                topicId,
                priority,
                status,
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
            const {
                topicId,
                priority,
                status,
                deadline,
                departmentId,
                hourWork
            } = req.body;
            const { id } = req.params
            const request = await Request.findOne({
                where: { id },
            })
            if (!request) return res.sendStatus(404)
            await request.update({
                topicId,
                priority,
                status,
                deadline,
                departmentId,
                hourWork
            })
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
                where: { clientId: req.user.id },
                include: [{
                    model: User,
                    as: 'clientRequest',
                    attributes: ['firstName', 'lastName', 'companyId'],
                }, 'department', 'topic']

            })
            if (!requests.length) return res.sendStatus(404)
            res.send(requests)
        } catch (errors) {
            res.status(500).send(errors);
        }
    }
};
