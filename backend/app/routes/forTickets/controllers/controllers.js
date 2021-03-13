const {Ticket, Appeal} = require("../../../../models")

module.exports = {
    async create(req, res) {
        try {
            const {type, description, deadline, topicId, title, priority, status, appeals, serviceTopicId} = req.body
            Ticket.create({
                type,
                description,
                deadline,
                topicId,
                title,
                priority,
                status,
                serviceTopicId
            }).then(newTicket => {
                if (appeals && appeals.length) {
                    appeals.forEach(async appealId => {
                        const appeal = await Appeal.findOne({
                            where: {
                                id: appealId
                            }
                        })
                        if (appeal) {
                            await appeal.update({
                                ticketId: newTicket.id,
                                status: "started"
                            })
                            // юзерам отправить уведомления
                        }
                    })
                }
                res.status(201).send(newTicket)
            }).catch(errors => {
                res.status(400).send(errors)
            })
        } catch (errors) {
            res.status(500).send(errors)
        }
    },
    async edit(req, res) {
        try {
            const {id} = req.params
            const ticket = await Ticket.findOne({
                where: {
                    id
                }
            })
            if (!ticket) res.sendStatus(404)
            await ticket.update(req.body)
            res.send(ticket)
        } catch (e) {
            res.status(401).send(e);
        }
    },
    async getAll(req, res) {
        try {
            const tickets = await Ticket.findAll()
            if (!tickets.length) res.sendStatus(404)
            res.send(tickets)
        } catch (e) {
            res.status(500).send(e);
        }
    },
    async getById(req, res) {
        try {
            const {id} = req.params
            const ticket = await Ticket.findOne({id})
            if (!ticket) res.sendStatus(404)
            res.send(ticket)
        } catch (errors) {
            res.status(500).send(errors);
        }
    },
    async deleteTicket(req, res) {
        try {
            const message = {message: "successful"}
            await Ticket.destroy({where: {id: req.params.id}})
            return res.send(message)
        } catch (e) {
            res.status(401).send(e);
        }
    }
};
