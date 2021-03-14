const auth = async (req, res, next) => {
    console.log(req.user)
    if (!req.user) {
        return res.sendStatus(403)
    }
    next();
};

module.exports = auth;
