const { User } = require("../../../../models");
const { saveFile } = require("../../../helpers/helpers");
const axios = require("axios");
const UsersController = {
    async getAll(req, res) {
        const users = await User.findAll({
            include: ["company", "departmentUser", "role"],
        });
        res.json(users);
    },
    async getCurrentUser(req, res) {
        try {
            console.log(req.user);
            if (!req.user.isAuthorized) return res.status(403).send({ message: "Вы не потверждены администратором." });
            res.send(req.user)
        }
        catch (e) {
            res.status(401).send(e);
        }
    },
    async create(req, res) {
        try {
            const { companyId, firstName, lastName, password, email, phoneNumber } = req.body;
            if (req.files) {
                // saveFile(req.files.photo, "users")
            }
            User.create({
                companyId,
                firstName,
                lastName,
                password,
                email,
                phoneNumber
            })
                .then((result) => {
                    res.sendStatus(201)
                })
                .catch((errors) => res.status(400).json(errors));
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    async createSessions(req, res) {
        try {
            const userId = req.user.id;
            const user = await User.findOne({
                where: { id: userId },
            });
            if (!user.isAuthorized) return res.status(403).send({ message: "Вы не потверждены администратором." });
            res.send(req.user);
        } catch (e) {
            res.status(401).send(e);
        }
    },
    async updateUser(req, res) {
        //необходимо сюда добавить отдел и должность для сотрудника, когда будет орг структура
        const {
            companyId,
            firstName,
            lastName,
            phoneNumber,
            departmentId,
            orgstructureId
        } = req.body;
        console.log(req.body);
        const userId = req.params.id;
        const user = await User.findOne({
            where: { id: userId },
            include: ["company", "departmentUser", "role"],
        });
        if (!user) return res.sendStatus(404);
        console.log(user)
        if (user.role.name === "client") {
            await user.update({
                firstName,
                lastName,
                phoneNumber,
            });
            return res.send(user);
        }
        await user.update({
            companyId,
            firstName,
            lastName,
            phoneNumber,
            departmentId,
            orgStructureId: orgstructureId
        });
        res.send(user);
    },
    async authorizedUser(req, res) {
        const userId = req.params.id;
        const user = await User.findOne({ where: { id: userId } });
        if (!user) return res.sendStatus(404);
        await user.update({
            isAuthorized: true,
        });
        res.send({ message: "Вы авторизованы !" });
    },
    async deleteSessions(req, res) {
        try {
            await req.session.destroy();
            res.json(req.user);
        } catch (e) {
            res.status(401).send(e);
        }
    },
    async getUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.findOne({
                where: { id: userId },
                include: ["company", "departmentUser", "role"],
            });
            if (!user) return res.sendStatus(404);
            res.json(user);
        } catch (e) {
            res.status(401).send(e);
        }
    },
    async facebookLogin(req, res) {
        const inputToken = req.body.accessToken;
        const accessToken =
            generalConfig.facebook.appID + "|" + generalConfig.facebook.appSecret;
        const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

        try {
            const response = await axios.get(debugTokenUrl);
            if (response.data.data.error)
                return res.status(401).send({ error: "Facebook token incorrect" });
            if (req.body.id !== response.data.data.user_id)
                return res.status(401).send({ error: "Wrong User ID" });

            let user = await User.findOne({
                where: { facebookId: req.body.id },
            });

            if (!user) {
                user = await User.create({
                    username: req.body.name,
                    displayName: req.body.name,
                    password: nanoid(),
                    email: req.body.email,
                    facebookId: req.body.id,
                    avatarImage: req.body.picture.data.url,
                    token: nanoid(),
                });
            }
            return res.send({ message: "Login or Register successful", user });
        } catch (e) {
            return res.status(401).send(e);
        }
    },
};
module.exports = UsersController;
