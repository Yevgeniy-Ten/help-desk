const {Ticket} = require("../../../../models")

module.exports = {
    async create(req, res) {
        try {
            const {type, description, deadline, employeeId, topicId} = req.body
            const ticket = await Ticket.create({
                employeeId,
                type,
                description,
                deadline,
                topicId
            });
            res.send(ticket);
        } catch (e) {
            res.sendStatus(500)
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
    async get(req, res) {
        try {
            const tickets = await Ticket.findAll()
            console.log(tickets)
            res.send(tickets)
        } catch (e) {
            res.status(500).send(e);
        }
    },
    async deleteTicket(req, res) {
        try {
            console.log(req.params)
            const message = {message: "successful"}
            await Ticket.destroy({where: {_id: req.params.id}})
            return res.send(message)
        } catch (e) {
            res.status(401).send(e);
        }
    }
};
