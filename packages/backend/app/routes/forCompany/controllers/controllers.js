const { Company } = require("../../../../models");
module.exports = {
    async createCompany(req, res) {
        try {
            const { title } = req.body;
            Company.create({
                title,
            }).then(newCompany => {
                res.status(201).send(newCompany)
            }).catch(errors => {
                res.status(400).send(errors)
            })
        } catch (errors) {
            res.status(500).send(errors);
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.params
            const company = await Company.findOne({ id })
            if (!company) return res.sendStatus(404)
            res.send(company)
        } catch (errors) {
            res.status(500).send(errors);
        }
    },
    async editCompany(req, res) {
        try {
            const { id } = req.params
            const company = await Company.findOne({
                where: { id }
            })
            if (!company) return res.sendStatus(404)
            await company.update(req.body)
            res.send(company)
        } catch (e) {
            res.status(401).send(e);
        }
    },
    async get(req, res) {
        try {
            if (req.query.params) {
                const { id } = req.query.params;
                const user = await User.findOne({
                    where: { id: id },
                    include: ["company", "departmentUser", "role"],
                });
                if (!user) return res.sendStatus(404);
                console.log(user)
                if (user.role.name === "client") return res.status(403).send({ message: "Не являетеся сотрудником компании." });
            }
            const company = await Company.findAll()
            if (!company.length) return res.sendStatus(404)
            res.send(company)
        } catch (errors) {
            res.status(500).send(errors);
        }
    },
    async deleteCompany(req, res) {
        try {
            const message = { message: "Delete successful" }
            await Company.destroy({ where: { id: req.params.id } })
            return res.send(message)
        } catch (e) {
            res.status(401).send(e);
        }
    }
};
