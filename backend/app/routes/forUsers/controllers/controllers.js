const { User } = require("../../../../models");
const { saveFile } = require("../../../helpers/helpers");
const axios = require("axios");
const UsersController = {
  async get(req, res) {
    const users = await User.findAll({
      include: ["appeals", "tickets"],
    });
    res.json(users);
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
          const user = result.toJSON();
          res.status(201).json(user);
        })
        .catch((errors) => res.status(400).json(errors));
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },
  async createSessions(req, res) {
    try {
      // const {email, password} = req.body
      // let user = await User.findOne({where: {email}});
      // if (!user) return res.sendStatus(404)
      // const isMatch = await user.checkPassword(password)
      // if (!isMatch) return res.status(400).send({message: "Password is wrong"});
      // user.generateToken();
      // user = await user.save()
      // res.send(user);
      res.send(req.user);
    } catch (e) {
      res.status(401).send(e);
    }
  },
  async updateUser(req, res) {
    const { id: userId } = req.params;
    const user = await User.findOne({ where: { userId } });
    if (!user) res.sendStatus(404);
    await user.update(req.body);
    res.send(user);
  },
  async deleteSessions(req, res) {
    try {
      // const user = req.user;
      // user.generateToken()
      // await user.save()
      // res.sendStatus(200)
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
