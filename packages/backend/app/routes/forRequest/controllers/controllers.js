const {Request, Reglaments, Department, OrgStructure, User, RequestHistory} = require("../../../../models");

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
                rule = await Reglaments.findOne({
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
            let employee = null
            if (orgStructure) {
                employee = await User.findOne({
                    where: {
                        orgStructureId: orgStructure.id
                    },
                })
            }
            Request.create({
                clientId: client.id,
                topicId,
                priority,
                status,
                title,
                description,
                deadline,
                departmentId,
                employeeId: employee && employee.id
            }).then(async newRequest => {
                await RequestHistory.create({
                    requestId: newRequest.dataValues.id,
                    topicId,
                    priority,
                    status,
                    deadline: newRequest.dataValues.deadline,
                    departmentId: newRequest.dataValues.departmentId,
                    employeeId: newRequest.dataValues.departmentId,
                    hourWork: newRequest.dataValues.hourWork,
                    comment: "Заявка создана!"
                })
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
            const {id} = req.params
            const request = await Request.findOne({
                where: {id},
                include: ["topic", "department", "clientRequest"],
            });
            if (!request) return res.sendStatus(404)
            res.send(request)
        } catch (errors) {
            res.status(500).send(errors);
        }
    },
    async getRequestHistory(req, res) {
        try {
            const {id: requestId} = req.query
            let histories = null

            if (requestId) {
                histories = await RequestHistory.findAll({
                    where: {
                        requestId
                    }
                })
            } else {
                histories = await RequestHistory.findAll()
            }
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
                hourWork,
                comment: employeeComment,
                employeeId,
            } = req.body;
            const {id} = req.params
            const request = await Request.findOne({
                where: {id},
            })
            if (!request) return res.sendStatus(404)
            const prevRequest = {...request.dataValues}
            await request.update({
                topicId,
                priority,
                status,
                deadline,
                departmentId,
                hourWork,
                employeeId
            })
            const comment = Object.keys(request.dataValues).reduce((comment, key) => {
                if (request.dataValues[key] !== prevRequest[key] && key !== "createdAt" && key !== "updatedAt") {
                    comment += `${key} сменился c ${request.previous(key)} на ${request.getDataValue(key)} \n`
                }
                return comment
            }, `${employeeComment ? employeeComment + "\n" : ""}`)
            delete request.dataValues.id
            await RequestHistory.create({
                requestId: id,
                comment,
                ...request.dataValues
            })
            res.sendStatus(200)
        } catch (e) {
            res.status(401).send(e);
        }
    },
    async getAll(req, res) {
        try {
            // queryParams=== filters!
            let requests = [];

            if (req.user.roleId !== 2) {
                requests = await Request.findAll({
                    include: [{
                        model: User,
                        as: "clientRequest",
                        attributes: ["firstName", "lastName", "companyId"],
                    }, "department", "topic", "employeeRequest"],
                })
            } else {
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
