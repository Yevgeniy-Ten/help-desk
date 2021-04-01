const auth = async (req, res, next) => {
    if (!req.user) {
        return res.status(403).send({message:"Необходимо авторизоваться"})
    }
    next();
};

module.exports = auth;
