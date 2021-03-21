const { Department, Ticket, Appeal, TicketHistory, TicketTask } = require("../../../../models")
// нужно будет синхронизировать историю тиктеа
const TicketController = {
    async getAllDepartment(req, res) {
        try {
            const department = await Department.findAll()
            if (!department.length) return res.sendStatus(404)
            res.send(department)
        } catch (e) {
            res.status(500).send(e);
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.params
            const department = await Department.findOne({ id })
            if (!department) return res.sendStatus(404)
            res.send(department)
        } catch (e) {
            res.status(500).json(e)
        }
    },
    async create(req, res) {
        const { name } = req.body
        Department.create({
            name
        }).then((newDepartment) => {
            return res.status(201).send(newDepartment)
        }).catch((errors) => {
            res.status(400).send(errors)
        })
    },
    async edit(req, res) {
        try {
            const { id } = req.params
            const department = await Department.findOne({
                where: {
                    id
                }
            })
            if (!department) return res.sendStatus(404)
            await department.update(req.body)
            res.send(department)
        } catch (e) {
            res.status(401).send(e);
        }
    },
    async deleteDepartment(req, res) {
        try {
            const message = { message: "Delete successful" }
            await Department.destroy({ where: { id: req.params.id } })
            return res.send(message)
        } catch (e) {
            res.status(401).send(e);
        }
    }
}
module.exports = TicketController
