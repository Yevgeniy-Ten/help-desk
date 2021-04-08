const { Reglaments } = require("../../../../models")
// нужно будет синхронизировать историю тиктеа
const ReglamentsController = {
    async createRules(req, res) {
        try {
            const {
                copmanyId,
                topicId,
                departmentId,
                title,
                deadline,
                priority
            } = req.body
            Reglaments.create({
                copmanyId,
                topicId,
                departmentId,
                title,
                deadline,
                priority
            }).then(newRules => {
                res.status(201).send(newRules)
            }).catch(errors => {
                res.status(400).send(errors)
            })
        } catch (errors) {
            res.status(500).send(errors)
        }
    },
    async edit(req, res) {
        try {
            const { id } = req.params
            const reglaments = await Reglaments.findOne({
                where: {
                    id
                }
            })
            if (!reglaments) return res.sendStatus(404)
            await reglaments.update(req.body)
            res.send(reglaments)
        } catch (e) {
            res.status(401).send(e);
        }
    },
    async getAll(req, res) {
        try {
            const reglaments = await Reglaments.findAll({
                include: ["topic", "department", "copmany"],
            })
            console.log(reglaments)
            if (!reglaments.length) return res.sendStatus(404)
            res.send(reglaments)
        } catch (e) {
            res.status(500).send(e);
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.params
            const reglaments = await Reglaments.findOne({ id })
            if (!reglaments) return res.sendStatus(404)
            res.send(reglaments)
        } catch (errors) {
            res.status(500).send(errors);
        }
    },
    async deleteRules(req, res) {
        try {
            const message = { message: "Delete successful" }
            await Reglaments.destroy({ where: { id: req.params.id } })
            return res.send(message)
        } catch (e) {
            res.status(401).send(e);
        }
    }
}
module.exports = ReglamentsController
