const { User } = require("../../../../models");
const { saveFile } = require("../../../helpers/helpers");
const axios = require("axios");
const UsersController = {
    async getAll(req, res) {
        const users = await User.findAll();
        res.json(users);
    },
    async getCurrentUser(req, res) {
        try {
            res.send(req.user)
        }
        catch (e) {
            res.status(401).send(e);
        }
    },
    async create(req, res) {
        try {
            const { firstName, lastName, password, email } = req.body;
            if (req.files) {
                // saveFile(req.files.photo, "users")
            }
            User.create({
                firstName,
                lastName,
                password,
                email,
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
            res.send(req.user);
        } catch (e) {
            res.status(401).send(e);
        }
    },
    async updateUser(req, res) {
        const { id: userId } = req.params;
        const user = await User.findOne({ where: { userId } });
        if (!user) return res.sendStatus(404);
        await user.update(req.body);
        res.send(user);
    },
    async deleteSessions(req, res) {
        try {
            await req.session.destroy();
            res.json(req.user);
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
