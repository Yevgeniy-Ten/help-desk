const { Request, Reglaments, Department, OrgStructure, User } = require("../../../../models");
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
            let companyId = null;
            let employeeId = null;
            //сотрудник создал заявку от имени клиента
            if (clientId) {
                const client = await User.findOne({
                    where: {
                        id: clientId
                    },
                });
                companyId = client.dataValues.companyId;
            }
            //клиент или сотрудник создал заявку от своего имени
            if (!clientId) {
                if (req.user.dataValues.companyId) {
                    companyId = req.user.dataValues.companyId;
                }
            }
            const rule = await Reglaments.findOne({
                where: {
                    topicId: topicId,
                    priority: priority,
                    companyId: companyId
                },
            });
            let deadline = null;
            let departmentId = null;
            // console.log('rule1', rule);
            if (rule) {
                deadline = rule.dataValues.deadline;
                departmentId = rule.dataValues.departmentId;
                const orgStructure = await orgStructureFunc(departmentId);
                if(orgStructure) {
                    const employee = await userFunc(orgStructure.id);
                    employeeId = employee.id;
                }
            }
            if (!rule) {
                const ruleCopy = await Reglaments.findOne({
                    where: {
                        topicId: topicId,
                        priority: priority,
                        companyId: null
                    },
                });
                if (!ruleCopy) {
                    return res.status(404).send({ message: "Обратитесь к поставщику услуг, по регламентам" })
                }
                // console.log('rule2', ruleCopy);
                if (ruleCopy) {
                    deadline = ruleCopy.dataValues.deadline;
                    departmentId = ruleCopy.dataValues.departmentId;
                    const orgStructure = await orgStructureFunc(departmentId);
                    // console.log('orgStructure', orgStructure.id);
                    if(orgStructure) {
                        const employee = await userFunc(orgStructure.id);
                        employeeId = employee.id;
                    }
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
                employeeId
            }).then(newRequest => {
                // console.log('newRequest', newRequest)
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
            let requests = [];
            requests = await Request.findAll({
                include: [{
                    model: User,
                    as: 'clientRequest',
                    attributes: ['firstName', 'lastName', 'companyId'],
                }, 'department', 'topic', 'employeeRequest'],
            })
            if(req.user.roleId === 2) {//надо изменить на client
                requests = await Request.findAll({
                    where: { clientId: req.user.id },
                    include: [{
                        model: User,
                        as: 'clientRequest',
                        attributes: ['firstName', 'lastName', 'companyId'],
                    }, 'department', 'topic', 'employeeRequest'],
                })
            }
            if (!requests.length) return res.sendStatus(404)
            res.send(requests)
        } catch (errors) {
            res.status(500).send(errors);
        }
    }
};
