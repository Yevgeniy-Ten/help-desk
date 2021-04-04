const { OrgStructure } = require("../../../../models")
// 
const OrgStructureController = {
    async getAllOrgStructure(req, res) {
        try {
            const orgStructure = await OrgStructure.findAll()
            if (!orgStructure.length) return res.sendStatus(404)
            res.send(orgStructure)
        } catch (e) {
            res.status(500).send(e);
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.params
            const orgStructure = await OrgStructure.findOne({ id })
            if (!orgStructure) return res.sendStatus(404)
            res.send(orgStructure)
        } catch (e) {
            res.status(500).json(e)
        }
    },
    async create(req, res) {
        const { positionId, departmentId, isMain } = req.body
        OrgStructure.create({
            positionId,
            departmentId,
            isMain: isMain ? isMain : false
        }).then((newOrgStructure) => {
            return res.status(201).send(newOrgStructure)
        }).catch((errors) => {
            res.status(400).send(errors)
        })
    },
    async edit(req, res) {
        try {
            const { id } = req.params
            const orgStructure = await OrgStructure.findOne({
                where: {
                    id
                }
            })
            if (!orgStructure) return res.sendStatus(404)
            await orgStructure.update(req.body)
            res.send(orgStructure)
        } catch (e) {
            res.status(401).send(e);
        }
    },
    async deleteOrgStructure(req, res) {
        try {
            const message = { message: "Delete successful" }
            await OrgStructure.destroy({ where: { id: req.params.id } })
            return res.send(message)
        } catch (e) {
            res.status(401).send(e);
        }
    }
}
module.exports = OrgStructureController
