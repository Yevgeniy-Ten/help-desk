const {Appeal} = require("../../../../models");


module.exports = {
    async create(req, res) {
        try {
            const {title, description} = req.body;
            const appeal = await Appeal.create({
                title,
                description,
                userId: req.user.id
            });
            res.send(appeal);
        } catch (e) {
            res.status(401).send(e);
        }
    },
    async edit(req, res) {
        try {
            const {id} = req.params
            const appeal = await Appeal.findOne({
                where: {id}
            })
            if (!appeal) res.sendStatus(404)
            await appeal.update(req.body)
            res.send(appeal)
        } catch (e) {
            res.status(401).send(e);
        }
    },
    async get(req, res) {
        try {
            const appeals = await Appeal.findAll({
                where: {
                    userId: req.user.id,
                },
            })
            res.json(appeals)
        } catch (e) {
            res.status(401).send(e);
        }
    }
};
