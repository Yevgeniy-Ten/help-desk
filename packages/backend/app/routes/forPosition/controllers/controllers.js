const { Position } = require("../../../../models")
// 
const PositionController = {
    async getAllPosition(req, res) {
        try {
            // if (req.query) {
            //     const { id } = req.query;
            //     const user = await User.findOne({
            //         where: { id: id },
            //         include: ["company", "departmentUser", "role"],
            //     });
            //     if (!user) return res.sendStatus(404);
            //     if (user.role.name === "client") return res.status(403).send({ message: "Не являетеся сотрудником компании." });
            // }
            const position = await Position.findAll()
            if (!position.length) return res.sendStatus(404)
            res.send(position)
        } catch (e) {
            res.status(500).send(e);
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.params
            const position = await Position.findOne({ id })
            if (!position) return res.sendStatus(404)
            res.send(position)
        } catch (e) {
            res.status(500).json(e)
        }
    },
    async create(req, res) {
        const { title } = req.body
        Position.create({
            title
        }).then((newPosition) => {
            return res.status(201).send(newPosition)
        }).catch((errors) => {
            res.status(400).send(errors)
        })
    },
    async edit(req, res) {
        try {
            const { id } = req.params
            const position = await Position.findOne({
                where: {
                    id
                }
            })
            if (!position) return res.sendStatus(404)
            await position.update(req.body)
            res.send(position)
        } catch (e) {
            res.status(401).send(e);
        }
    },
    async deletePosition(req, res) {
        try {
            const message = { message: "Delete successful" }
            await Position.destroy({ where: { id: req.params.id } })
            return res.send(message)
        } catch (e) {
            res.status(401).send(e);
        }
    }
}
module.exports = PositionController
