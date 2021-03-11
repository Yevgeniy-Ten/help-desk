const {Ticket} = require("../../../../models")

module.exports = {
    async create(req, res) {
        try {
            const {type, description, deadline, topicId, title, priority, status} = req.body
            Ticket.create({
                type,
                description,
                deadline,
                topicId,
                title,
                priority,
                status
            }).then(newTicket => {
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
                where: {id}
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
