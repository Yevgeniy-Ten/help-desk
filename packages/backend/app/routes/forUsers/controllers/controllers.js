const axios = require("axios");
const {User, OrgStructure} = require("../../../../models");
const {saveFile} = require("../../../helpers/helpers");
const LogCreator = require("../../../creators/LogCreator")
const MessageSender = require("../../../mailer/index")
const encodeDecode = require("encode-decode-js");
const {backUrl, webURL} = require("../../../../config/general.config")
const CONFIRM_URL = `${backUrl}/users/confirm/`
const UsersController = {
    async getAll(req, res) {
        const {departmentId} = req.query;
        if (departmentId) {
            let orgStructures = await OrgStructure.findAll({
                where: {
                    departmentId
                },
                include: ["users"]
            });
            orgStructures = orgStructures.reduce(
                (allUsers, o) => allUsers.concat(o.users),
                []
            );
            if (!orgStructures.length) return res.sendStatus(404);
            return res.json(orgStructures);
        }

        const users = await User.findAll({
            include: ["company", "role", "orgStructure"]
        });
        res.json(users);
    },
    async getCurrentUser(req, res) {
        try {
            if (!req.user.isAuthorized)
                return res
                    .status(403)
                    .send({message: "Вы не потверждены администратором."});
            const user = await User.findOne({
                where: {id: req.user.id},
                include: ["company", "role", "orgStructure"]
            });
            res.send(user);
        } catch (e) {
            res.status(401).send(e);
        }
    },
    async create(req, res) {
        try {
            const {
                companyId,
                firstName,
                lastName,
                password,
                email,
                phoneNumber
            } = req.body;
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
                .then(async (result) => {
                    const emailEncodeForUrl = encodeDecode.encode(result.email)
                    const confirmURL = `${CONFIRM_URL}${emailEncodeForUrl}`
                    await MessageSender.sendVerifyMessage(result.email, confirmURL)
                    await LogCreator.createSuccessLog(`${result.firstName} ${result.lastName}`, "registerSuccess")
                    res.sendStatus(201);
                })
                .catch((errors) => res.status(400).json(errors));
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    async confirmUserEmail(req, res) {
        const {encodemail} = req.params
        const decodeEmail = encodeDecode.decode(encodemail)
        const user = await User.findOne({
            where: {
                email: decodeEmail
            }
        })
        if (!user) return res.send("Неопознанное действие!")
        await user.update({
            isFake: false
        });
        return res.status(301).redirect(webURL)
    },
    async createSessions(req, res) {
        try {
            const userId = req.user.id;
            const user = await User.findOne({
                where: {id: userId},
                include: ["company", "role", "orgStructure"]
            });
            res.send(user);
        } catch (e) {
            await LogCreator.createSystemCrashLog("when create sessing some errors", e)
            res.status(401).send(e);
        }
    },
    async updateUser(req, res) {
        // необходимо сюда добавить отдел и должность для сотрудника, когда будет орг структура
        const {
            companyId,
            firstName,
            lastName,
            phoneNumber,
            departmentId,
            orgstructureId,
            userRoleId
        } = req.body;
        // console.log(userRoleId);
        const userId = req.params.id;
        const user = await User.findOne({
            where: {id: userId},
            include: ["company", "role"]
        });
        if (!user) return res.sendStatus(404);
        if (user.role.name === "client") {
            await user.update({
                companyId,
                firstName,
                lastName,
                phoneNumber,
                roleId: userRoleId
            });
            return res.send(user);
        }
        await user.update({
            companyId,
            firstName,
            lastName,
            phoneNumber,
            departmentId,
            orgStructureId: orgstructureId,
            roleId: userRoleId
        });
        res.send(user);
    },
    async authorizedUser(req, res) {
        const userId = req.params.id;
        const user = await User.findOne({where: {id: userId}});
        if (!user) return res.sendStatus(404);
        await user.update({
            isAuthorized: true
        });
        res.send({message: "Вы авторизованы !"});
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
                where: {id: userId},
                include: ["company", "role", "orgStructure"]
            });
            // const user = await User.findOne({
            //     where: { id: userId },
            //     include: [{
            //         model: OrgStructure,
            //         // as: "orgStructure",
            //         include: ['position', 'department']
            //     }]
            // });
            if (!user) return res.sendStatus(404);
            res.json(user);
        } catch (e) {
            res.status(401).send(e);
        }
    },
    async facebookLogin(req, res) {
        const inputToken = req.body.accessToken;
        const accessToken = `${generalConfig.facebook.appID}|${generalConfig.facebook.appSecret}`;
        const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

        try {
            const response = await axios.get(debugTokenUrl);
            if (response.data.data.error)
                return res.status(401).send({error: "Facebook token incorrect"});
            if (req.body.id !== response.data.data.user_id)
                return res.status(401).send({error: "Wrong User ID"});

            let user = await User.findOne({
                where: {facebookId: req.body.id}
            });

            if (!user) {
                user = await User.create({
                    username: req.body.name,
                    displayName: req.body.name,
                    password: nanoid(),
                    email: req.body.email,
                    facebookId: req.body.id,
                    avatarImage: req.body.picture.data.url,
                    token: nanoid()
                });
            }
            return res.send({message: "Login or Register successful", user});
        } catch (e) {
            return res.status(401).send(e);
        }
    }
};
module.exports = UsersController;
