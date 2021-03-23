const { Rules } = require("../../../../models")
// нужно будет синхронизировать историю тиктеа
const RulesController = {
    async createRules(req, res) {
        try {
            const {
                topicId,
                departmentId,
                title,
                deadline,
            } = req.body
            Rules.create({
                topicId,
                departmentId,
                title,
                deadline,
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
            const rules = await Rules.findOne({
                where: {
                    id
                }
            })
            if (!rules) return res.sendStatus(404)
            await rules.update(req.body)
            res.send(rules)
        } catch (e) {
            res.status(401).send(e);
        }
    },
    async getAll(req, res) {
        try {
            const rules = await Rules.findAll()
            if (!rules.length) return res.sendStatus(404)
            res.send(rules)
        } catch (e) {
            res.status(500).send(e);
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.params
            const rules = await Rules.findOne({ id })
            if (!rules) return res.sendStatus(404)
            res.send(rules)
        } catch (errors) {
            res.status(500).send(errors);
        }
    },
    async deleteRules(req, res) {
        try {
            const message = { message: "Delete successful" }
            await Rules.destroy({ where: { id: req.params.id } })
            return res.send(message)
        } catch (e) {
            res.status(401).send(e);
        }
    }
}
module.exports = RulesController
