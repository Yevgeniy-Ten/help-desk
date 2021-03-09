const {User} = require("../../models")

const auth = async (req, res, next) => {
    const token = req.get("Authorization");
    if (!token) return res.status(401).send({error: "No token presents"});
    const user = await User.findOne({where: {token}});
    if (!user)
        return res.status(401).send({error: "Wrong token, Unauthorized"});

    req.user = user;
    next();
};

module.exports = auth;
