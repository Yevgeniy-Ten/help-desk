const {Request, Reglaments, Department, OrgStructure, User, RequestHistory} = require("../../../../models");
const orgStructureFunc = async (copyID) => {
    const orgStructure = await OrgStructure.findOne({
        where: {
            departmentId: copyID,
            isMain: true,
        },
    });
    return orgStructure;
}
const userFunc = async (copyID) => {
    const user = await User.findOne({
        where: {
            orgStructureId: copyID,
        },
    });
    return user;
}

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
            const client = await User.findOne({
                where: {
                    id: clientId ? clientId : req.user.id
                },
            });
            // если клиент найден то присваеиваем companyId клиента, если не найден берем companyId юзера который создает запрос
            const companyId = client ? client.companyId : req.user.companyId && req.user.companyId
            let rule = await Reglaments.findOne({
                where: {topicId, priority, companyId}
            });
            if (!rule) {
                await Reglaments.findOne({
                    where: {
                        topicId,
                        priority,
                        companyId: null
                    },
                });
            }
            if (!rule) return res.status(404).send({message: "Обратитесь к поставщику услуг, по регламентам"})
            const deadline = rule.deadline;
            const departmentId = rule.departmentId;
            const orgStructure = await OrgStructure.findOne({
                where: {
                    departmentId,
                    isMain: true,
                },
            });
            const employee = await User.findOne({
                where: {
                    orgStructureId: orgStructure.id
                },
            })
            Request.create({
                clientId,
                topicId,
                priority,
                status,
                title,
                description,
                deadline,
                departmentId,
                employeeId: employee && employee.id
            }).then(newRequest => {
                // console.log('newRequest', newRequest)
                res.status(201).send(newRequest)
            }).catch(errors => {
                res.status(400).send(errors)
            });
        } catch (errors) {
            console.log(errors, "ошибка")
            res.status(500).send(errors);
        }
    },
    async getById(req, res) {
        try {
            const {id} = req.params
            const request = await Request.findOne({
                where: {id},
                include: ["topic", "department", "clientRequest"],
            });
            // console.log(requests);

            if (!request) return res.sendStatus(404)
            res.send(request)
        } catch (errors) {
            res.status(500).send(errors);
        }
    },
    async getRequestHistory(req, res) {
        try {
            const {id: requestId} = req.params
            const histories = await RequestHistory.findAll({
                where: {
                    requestId
                }
            })
            if (!histories.length) return res.sendStatus(404)
            res.send(histories)
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
            const {id} = req.params
            const request = await Request.findOne({
                where: {id},
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
            let requests = [];
            requests = await Request.findAll({
                include: [{
                    model: User,
                    as: "clientRequest",
                    attributes: ["firstName", "lastName", "companyId"],
                }, "department", "topic", "employeeRequest"],
            })
            if (req.user.roleId === 2) {//надо изменить на client
                requests = await Request.findAll({
                    where: {clientId: req.user.id},
                    include: [{
                        model: User,
                        as: "clientRequest",
                        attributes: ["firstName", "lastName", "companyId"],
                    }, "department", "topic", "employeeRequest"],
                })
            }

            if (!requests.length) return res.sendStatus(404)
            res.send(requests)
        } catch (errors) {
            res.status(500).send(errors);
        }
    }
};
