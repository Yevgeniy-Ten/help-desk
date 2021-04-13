const {Request, Reglaments, OrgStructure, User, RequestHistory, Company} = require("../../../../models");

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
    async getRequestsAudit(req, res) {
        let audit = await Company.findAll({
            include: [{
                model: User,
                as: "users",
                include: ["clientRequest"]
            }]
        })
        audit = audit.reduce((a, companyWithUsers) => {
            const companyInfo = {
                name: companyWithUsers.title,
                users: companyWithUsers.users.length
            }
            // company {users:[user: clientRequest:[ ]  }
            const requests = companyWithUsers.users.reduce((requestReport, user) => {
                if (!user.clientRequest.length) return requestReport
                requestReport.count += user.clientRequest.length
                for (request of user.clientRequest){
                    switch (requestReport.priority) {
                        case "Стандартно":
                            requestReport.priority.standart += 1
                            break
                        case "Критично":
                            requestReport.priority.critical += 1
                            break
                        case "Средний":
                            requestReport.priority.medium += 1
                            break
                        case "Срочно":
                            requestReport.priority.urgent += 1
                            break
                    }
                    switch (request.status) {
                        case "Открыто":
                            requestReport.status.open += 1
                            break
                        case "Выполняется":
                            requestReport.status.inProgress += 1
                            break
                        case "Выполнено":
                            requestReport.status.done += 1
                            break
                    }
                }
                return requestReport
            }, {
                count: 0,
                status: {
                    open: 0,
                    inProgress: 0,
                    done: 0
                },
                priority: {
                    standart: 0,
                    medium: 0,
                    urgent: 0,
                    critical: 0
                }
            })
            companyInfo["requests"] = requests
            a.push(companyInfo)
            return a
        }, [])
        res.send(audit)
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
                    comment += `${key} сменился c ${prevRequest[key]} на ${request.getDataValue(key)} \n`
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
